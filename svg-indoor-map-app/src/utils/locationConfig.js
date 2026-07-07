export const BUILDING_GEOFENCE = {
  id: 'us-oma',
  name: 'US OMA',
  // IBM One Madison Ave, New York, NY 10010
  center: { lat: 40.7425, lng: -73.9878 },
  // 250 m covers the full building footprint with indoor GPS drift margin.
  radiusMeters: 250,
};

// Affine GPS↔SVG transform for the One Madison Ave floor plan.
// Two surveyed reference points: a real-world GPS coordinate paired with
// the corresponding SVG pixel position on the 1224×792 viewBox.
// Adjust these if the SVG ever gets re-exported at a different scale/origin.
export const BUILDING_GPS_TRANSFORM = {
  // NW corner of the building footprint (SVG top-left area)
  ref0: { gps: { lat: 40.74335, lng: -73.98895 }, svg: { x: 30,   y: 60  } },
  // SE corner of the building footprint (SVG bottom-right area)
  ref1: { gps: { lat: 40.74155, lng: -73.98655 }, svg: { x: 1194, y: 752 } },
};

/**
 * Convert a real-world GPS coordinate to an SVG map point.
 * Uses bilinear interpolation between the two reference corners.
 * Returns null when the position is too far outside the building.
 */
export function gpsToMapPoint(latLng, transform = BUILDING_GPS_TRANSFORM) {
  const { ref0, ref1 } = transform;
  const tLat = (latLng.lat - ref0.gps.lat) / (ref1.gps.lat - ref0.gps.lat);
  const tLng = (latLng.lng - ref0.gps.lng) / (ref1.gps.lng - ref0.gps.lng);
  // Allow up to 40 % outside the footprint (GPS can drift indoors)
  if (tLat < -0.4 || tLat > 1.4 || tLng < -0.4 || tLng > 1.4) return null;
  return {
    x: ref0.svg.x + tLng * (ref1.svg.x - ref0.svg.x),
    y: ref0.svg.y + tLat * (ref1.svg.y - ref0.svg.y),
  };
}

export const BUILDING_START_ANCHORS = [
  {
    id: 'street-entrance',
    name: 'Street Entrance',
    floorId: 'floor-us-oma-01',
    type: 'entrance',
    mapPoint: { x: 145, y: 570 },
    isDefault: true,
  },
  {
    id: 'reception',
    name: 'Reception',
    floorId: 'floor-us-oma-01',
    type: 'reception',
    mapPoint: { x: 190, y: 500 },
  },
];

export function haversineDistanceMeters(a, b) {
  const earthRadius = 6371000;
  const toRad = (degrees) => degrees * (Math.PI / 180);
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * earthRadius * Math.asin(Math.sqrt(h));
}

export function isInsideBuildingGeofence(userLatLng, geofence = BUILDING_GEOFENCE) {
  return haversineDistanceMeters(userLatLng, geofence.center) <= geofence.radiusMeters;
}

export function formatDistanceFeet(meters) {
  const feet = Math.max(0, Math.round(meters * 3.28084));
  if (feet < 1000) return `${feet} ft`;
  return `${(feet / 5280).toFixed(1)} mi`;
}

export function entranceAnchorForFloor(floor) {
  if (!floor) return null;
  const explicit = BUILDING_START_ANCHORS.find((anchor) => anchor.floorId === floor.id && anchor.isDefault)
    || BUILDING_START_ANCHORS.find((anchor) => anchor.floorId === floor.id);
  const preferred = floor.features?.find((feature) => feature.visible !== false && feature.isDefaultStart && feature.geometry?.type === 'Point')
    || floor.features?.find((feature) => feature.visible !== false && feature.id === 'poi-main-ibm-entrance' && feature.geometry?.type === 'Point')
    || floor.features?.find((feature) => feature.visible !== false && ['entrance', 'reception'].includes(feature.category) && feature.geometry?.type === 'Point')
    || floor.features?.find((feature) => feature.visible !== false && feature.geometry?.type === 'Point' && /main ibm entrance|entrance|vestibule|lobby|reception|01A23/i.test(`${feature.displayName || ''} ${feature.name || ''} ${feature.roomNumber || ''}`));
  if (preferred) {
    return {
      id: preferred.id,
      name: preferred.displayName || preferred.name || preferred.roomNumber || 'Main Entrance',
      floorId: floor.id,
      type: preferred.category,
      mapPoint: { x: preferred.geometry.coordinates[0], y: preferred.geometry.coordinates[1] },
    };
  }
  if (explicit) return explicit;
  const [x, y, width, height] = floor.viewBox || [0, 0, 1200, 800];
  return {
    id: 'main-entrance',
    name: 'Main Entrance',
    floorId: floor.id,
    type: 'entrance',
    mapPoint: { x: x + width * 0.12, y: y + height * 0.72 },
  };
}

export function getDefaultStartAnchor(floors = []) {
  const explicit = BUILDING_START_ANCHORS.find((anchor) => anchor.isDefault);
  const explicitFloor = explicit && floors.find((floor) => floor.id === explicit.floorId);
  if (explicitFloor) return entranceAnchorForFloor(explicitFloor);
  return entranceAnchorForFloor(floors[0]);
}
