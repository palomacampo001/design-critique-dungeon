import { distance } from './geometryHelpers.js';
import { entranceAnchorForFloor } from './locationConfig.js';

function featureCenter(feature) {
  if (!feature) return null;
  if (feature.geometry?.type === 'Point') return { x: feature.geometry.coordinates[0], y: feature.geometry.coordinates[1] };
  if (!feature.bbox) return null;
  return { x: feature.bbox[0] + feature.bbox[2] / 2, y: feature.bbox[1] + feature.bbox[3] / 2 };
}

function formatFeatureLabel(feature) {
  return feature?.displayName || feature?.name || feature?.roomNumber || feature?.category || 'Location';
}

const STORAGE_KEY = 'svg-indoor-route-graphs-v1';
const graphStatuses = new Set(['generated_suggestion', 'admin_reviewed', 'published']);

function connectorType(feature) {
  const text = `${feature?.displayName || ''} ${feature?.name || ''} ${feature?.roomNumber || ''} ${feature?.category || ''}`;
  if (/elevator|\belev\b|\bel\b|\d+EL\d*/i.test(text)) return 'elevator';
  if (/escalator|\besc\b|ESC-G/i.test(text)) return 'escalator';
  if (/stair|stairs|\bst\b|\d+ST\d*/i.test(text)) return 'stair';
  if (/entrance|vestibule|lobby|reception/i.test(text)) return feature.category === 'reception' ? 'reception' : 'entrance';
  return '';
}

function connectorGroupId(feature, type) {
  const raw = `${feature?.roomNumber || feature?.displayName || feature?.name || feature?.id || ''}`.toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!raw) return '';
  if (type === 'elevator') return raw.replace(/^\d+/, '');
  if (type === 'stair') return raw.replace(/^\d+/, '');
  if (type === 'escalator') return raw.replace(/^\d+/, '');
  return raw;
}

export function seedRouteGraphs(floors = []) {
  return Object.fromEntries(floors.map((floor) => {
    const anchor = entranceAnchorForFloor(floor);
    const nodes = [];
    if (anchor) {
      nodes.push({
        id: `${floor.id}-start-${anchor.id}`,
        floorId: floor.id,
        x: anchor.mapPoint.x,
        y: anchor.mapPoint.y,
        type: anchor.type === 'reception' ? 'reception' : 'entrance',
        name: anchor.name,
        connectorGroupId: anchor.id,
        source: 'generated',
      });
    }
    (floor.features || []).forEach((feature) => {
      if (feature.visible === false || feature.geometry?.type !== 'Point') return;
      const type = connectorType(feature);
      if (!type) return;
      const point = featureCenter(feature);
      if (!point) return;
      const id = `${floor.id}-node-${feature.id}`;
      if (nodes.some((node) => Math.abs(node.x - point.x) < 2 && Math.abs(node.y - point.y) < 2 && node.type === type)) return;
      nodes.push({
        id,
        floorId: floor.id,
        x: point.x,
        y: point.y,
        type,
        name: formatFeatureLabel(feature),
        linkedPoiId: feature.id,
        linkedFeatureId: feature.id,
        connectorGroupId: connectorGroupId(feature, type),
        source: 'generated',
      });
    });
    return [floor.id, { floorId: floor.id, status: 'admin_reviewed', nodes, edges: [] }];
  }));
}

export function loadRouteGraphs(floors = []) {
  const seeded = seedRouteGraphs(floors);
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    return Object.fromEntries(Object.entries(seeded).map(([floorId, graph]) => {
      const savedGraph = saved[floorId];
      if (!savedGraph) return [floorId, graph];
      const nodeIds = new Set(savedGraph.nodes?.map((node) => node.id) || []);
      const seededNodes = graph.nodes.filter((node) => !nodeIds.has(node.id));
      return [floorId, {
        floorId,
        status: graphStatuses.has(savedGraph.status) ? savedGraph.status : 'admin_reviewed',
        nodes: [...(savedGraph.nodes || []), ...seededNodes],
        edges: savedGraph.edges || [],
      }];
    }));
  } catch {
    return seeded;
  }
}

export function saveRouteGraphs(graphs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(graphs));
}

function featureText(feature) {
  return `${feature?.displayName || ''} ${feature?.name || ''} ${feature?.roomNumber || ''} ${feature?.category || ''} ${feature?.type || ''}`.toLowerCase();
}

function featurePoint(feature) {
  const point = featureCenter(feature);
  return point ? { ...point, floorId: feature.floorId } : null;
}

function nodeDistance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function addNode(nodes, node) {
  if (!node || !Number.isFinite(node.x) || !Number.isFinite(node.y)) return null;
  const existing = nodes.find((item) => nodeDistance(item, node) < 8 && item.type === node.type);
  if (existing) return existing;
  nodes.push(node);
  return node;
}

function addEdge(edges, floorId, from, to, source = 'generated') {
  if (!from || !to || from.id === to.id) return;
  const key = [from.id, to.id].sort().join('|');
  if (edges.some((edge) => [edge.fromNodeId, edge.toNodeId].sort().join('|') === key)) return;
  edges.push({
    id: `${floorId}-generated-edge-${edges.length + 1}`,
    floorId,
    fromNodeId: from.id,
    toNodeId: to.id,
    distance: nodeDistance(from, to),
    accessible: true,
    source,
  });
}

function isOpenOrCorridorLike(feature, mapArea) {
  if (feature.visible === false || feature.geometry?.type !== 'Polygon' || !feature.bbox) return false;
  const [,, width, height] = feature.bbox;
  const area = Math.max(1, width * height);
  const ratio = Math.max(width, height) / Math.max(1, Math.min(width, height));
  const text = featureText(feature);
  const category = String(feature.category || '').toLowerCase();
  const roomNumber = String(feature.roomNumber || '').toUpperCase();
  // Named patterns: standard words + this floor plan's PAISLE/SECA zone codes
  if (/corridor|circulation|aisle|lobby|reception|vestibule|entrance|open|gallery|hall|walkway|turnstile/i.test(text)) return true;
  if (/^PAISLE|^SECA/i.test(roomNumber)) return true;
  if (['corridor', 'lobby', 'reception', 'entrance', 'wayfinding_zone', 'meeting_area', 'custom'].includes(category)) return true;
  // Geometry heuristic: long narrow shape (aspect ratio > 2.5) that covers enough map area
  if (area / Math.max(1, mapArea) > 0.012 && ratio > 2.5) return true;
  return false;
}

/**
 * Generate evenly-spaced skeleton nodes along the centerline of a corridor polygon.
 * For a horizontal corridor the spine runs along y=center; for vertical along x=center.
 * Returns an array of {x, y} points spaced ~stepSize apart.
 */
function corridorSkeleton(bbox, stepSize = 90) {
  const [x, y, width, height] = bbox;
  const cx = x + width / 2;
  const cy = y + height / 2;
  const points = [];
  if (width >= height) {
    // Horizontal corridor — walk along x
    const steps = Math.max(1, Math.floor(width / stepSize));
    for (let i = 0; i <= steps; i++) {
      points.push({ x: x + (width * i) / steps, y: cy });
    }
  } else {
    // Vertical corridor — walk along y
    const steps = Math.max(1, Math.floor(height / stepSize));
    for (let i = 0; i <= steps; i++) {
      points.push({ x: cx, y: y + (height * i) / steps });
    }
  }
  return points;
}

function usefulDestination(feature) {
  if (feature.visible === false || feature.geometry?.type !== 'Point') return false;
  if (connectorType(feature)) return false;
  const text = featureText(feature);
  if (!text.trim() || /unknown|decorative|noise/.test(text)) return false;
  return Boolean(feature.displayName || feature.name || feature.roomNumber);
}

function nearestNode(point, nodes, filter = () => true) {
  return nodes
    .filter(filter)
    .map((node) => ({ node, distance: nodeDistance(point, node) }))
    .sort((a, b) => a.distance - b.distance)[0] || null;
}

export function generateHallwayGraph(floor) {
  const [viewX = 0, viewY = 0, viewWidth = 1200, viewHeight = 800] = floor?.viewBox || [];
  const mapArea = viewWidth * viewHeight;
  const nodes = [];
  const edges = [];
  const features = floor?.features || [];
  const openFeatures = features.filter((feature) => isOpenOrCorridorLike(feature, mapArea));

  // ── Step 1: skeleton nodes along each corridor's centerline ───────────────
  // Place nodes every ~80 units along the long axis so the route traces the
  // actual corridor shape instead of cutting straight across walls.
  openFeatures.forEach((feature, featureIndex) => {
    if (!feature.bbox) return;
    const isIntersectionLike = /intersection|lobby|reception|entrance|vestibule/i.test(featureText(feature));
    const nodeType = isIntersectionLike ? 'intersection' : 'hallway';
    const label = formatFeatureLabel(feature);
    const [,, bw, bh] = feature.bbox;
    const stepSize = Math.min(bw, bh) < 40 ? 60 : 80;
    const skeletonPts = corridorSkeleton(feature.bbox, stepSize);
    const skeletonNodes = skeletonPts.map((pt, ptIndex) => addNode(nodes, {
      id: `${floor.id}-hall-${featureIndex + 1}-s${ptIndex}`,
      floorId: floor.id,
      x: pt.x,
      y: pt.y,
      type: ptIndex === 0 || ptIndex === skeletonPts.length - 1 ? 'turn' : nodeType,
      name: ptIndex === 0 ? `${label} start` : ptIndex === skeletonPts.length - 1 ? `${label} end` : label,
      linkedFeatureId: feature.id,
      source: 'generated',
    })).filter(Boolean);
    // Chain skeleton nodes — this is the corridor's internal walkable path.
    for (let i = 0; i < skeletonNodes.length - 1; i++) {
      addEdge(edges, floor.id, skeletonNodes[i], skeletonNodes[i + 1]);
    }
  });

  // Fallback when no corridor features detected
  if (!nodes.length) {
    addNode(nodes, {
      id: `${floor.id}-generated-hall-center`,
      floorId: floor.id,
      x: viewX + viewWidth / 2,
      y: viewY + viewHeight / 2,
      type: 'hallway',
      name: 'Suggested hallway center',
      source: 'generated',
    });
  }

  // ── Step 2: cross-connect corridor endpoints ──────────────────────────────
  // Only connect endpoint/turn nodes to their nearest neighbours so adjacent
  // corridor segments join up without long diagonal wall-crossing jumps.
  const hallwayNodes = () => nodes.filter((n) => ['hallway', 'intersection', 'turn', 'doorway', 'entrance', 'reception'].includes(n.type));
  const endpointNodes = nodes.filter((n) => n.type === 'turn' || n.type === 'intersection' || n.type === 'entrance' || n.type === 'reception');
  endpointNodes.forEach((node) => {
    const crossThreshold = Math.max(120, Math.min(viewWidth, viewHeight) * 0.18);
    hallwayNodes()
      .filter((other) => other.id !== node.id)
      .map((other) => ({ node: other, distance: nodeDistance(node, other) }))
      .filter((item) => item.distance < crossThreshold)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 2)
      .forEach((item) => addEdge(edges, floor.id, node, item.node));
  });

  // ── Step 3: connectors (elevators, stairs, escalators) ────────────────────
  features.forEach((feature, index) => {
    if (feature.visible === false || feature.geometry?.type !== 'Point') return;
    const point = featurePoint(feature);
    if (!point) return;
    const type = connectorType(feature);
    if (!type) return;
    const connector = addNode(nodes, {
      id: `${floor.id}-generated-connector-${index + 1}`,
      floorId: floor.id,
      x: point.x,
      y: point.y,
      type,
      name: formatFeatureLabel(feature),
      linkedPoiId: feature.id,
      linkedFeatureId: feature.id,
      connectorGroupId: connectorGroupId(feature, type),
      source: 'generated',
    });
    const nearest = nearestNode(connector, hallwayNodes(), (n) => n.id !== connector.id);
    if (nearest) addEdge(edges, floor.id, connector, nearest.node);
  });

  // ── Step 4: destination approach stubs ────────────────────────────────────
  // Each named POI gets a short stub node off the nearest hallway node so the
  // route enters from the corridor rather than cutting through walls.
  const destinations = features.filter(usefulDestination).slice(0, 300);
  destinations.forEach((feature, index) => {
    const point = featurePoint(feature);
    if (!point) return;
    const nearest = nearestNode(point, hallwayNodes());
    if (!nearest) return;
    const approach = addNode(nodes, {
      id: `${floor.id}-generated-destination-${index + 1}`,
      floorId: floor.id,
      x: nearest.node.x + (point.x - nearest.node.x) * 0.15,
      y: nearest.node.y + (point.y - nearest.node.y) * 0.15,
      type: 'destination_approach',
      name: `${formatFeatureLabel(feature)} approach`,
      linkedPoiId: feature.id,
      linkedFeatureId: feature.id,
      source: 'generated',
    });
    addEdge(edges, floor.id, nearest.node, approach);
  });

  return {
    floorId: floor.id,
    status: 'generated_suggestion',
    nodes,
    edges,
  };
}

export function nearestRouteNode(point, graph, filter = () => true) {
  if (!point || !graph?.nodes?.length) return null;
  return graph.nodes
    .filter(filter)
    .map((node) => ({ node, distance: distance(point, node) }))
    .sort((a, b) => a.distance - b.distance)[0]?.node || null;
}

export function shortestGraphPath(graph, startNodeId, endNodeId) {
  if (!graph || !startNodeId || !endNodeId) return null;
  if (startNodeId === endNodeId) return [graph.nodes.find((node) => node.id === startNodeId)].filter(Boolean);
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const adjacency = new Map(graph.nodes.map((node) => [node.id, []]));
  graph.edges.forEach((edge) => {
    if (!byId.has(edge.fromNodeId) || !byId.has(edge.toNodeId)) return;
    const weight = edge.distance || distance(byId.get(edge.fromNodeId), byId.get(edge.toNodeId));
    adjacency.get(edge.fromNodeId).push({ id: edge.toNodeId, weight });
    adjacency.get(edge.toNodeId).push({ id: edge.fromNodeId, weight });
  });
  const distances = new Map(graph.nodes.map((node) => [node.id, Number.POSITIVE_INFINITY]));
  const previous = new Map();
  const unvisited = new Set(graph.nodes.map((node) => node.id));
  distances.set(startNodeId, 0);
  while (unvisited.size) {
    const current = [...unvisited].sort((a, b) => distances.get(a) - distances.get(b))[0];
    if (!current || distances.get(current) === Number.POSITIVE_INFINITY) break;
    if (current === endNodeId) break;
    unvisited.delete(current);
    adjacency.get(current).forEach((next) => {
      if (!unvisited.has(next.id)) return;
      const score = distances.get(current) + next.weight;
      if (score < distances.get(next.id)) {
        distances.set(next.id, score);
        previous.set(next.id, current);
      }
    });
  }
  if (!previous.has(endNodeId)) return null;
  const ids = [endNodeId];
  while (ids[0] !== startNodeId) ids.unshift(previous.get(ids[0]));
  return ids.map((id) => byId.get(id)).filter(Boolean);
}

export function nodesToPoints(nodes = []) {
  return nodes.map((node) => ({ x: node.x, y: node.y, floorId: node.floorId, id: node.id, name: node.name, category: node.type }));
}
