import React, { useRef } from "react";
import { MapPin, Navigation } from "lucide-react";
import { floorGeometry } from "../data/mockFloors.js";
import { generatedRoomBlocks } from "../data/generatedRooms.js";

function pointsForPath(path = []) {
  return path.map(([x, y]) => `${x},${y}`).join(" ");
}

export default function NavigationMap({
  activeFloor,
  route,
  currentStep,
  destination,
  camera,
  heading,
  isPannedAway,
  onPan,
  onPanEnd,
  onZoom
}) {
  const dragRef = useRef(null);
  const pointersRef = useRef(new Map());
  const pinchRef = useRef(null);
  const geometry = floorGeometry[activeFloor] ?? floorGeometry[1];
  const roomBlocks = generatedRoomBlocks[activeFloor] ?? [];
  const routePath = currentStep?.path?.length > 1 ? pointsForPath(currentStep.path) : "";
  const showBlocks = camera.zoom >= 1.02;
  const showLabels = camera.zoom >= 1.34;
  const showFineLabels = camera.zoom >= 1.88;
  const userPoint = currentStep?.path?.[0] ?? route?.start;
  const destinationOnFloor = destination?.floor === activeFloor;
  const inverseScale = Number((1 / Math.max(camera.zoom, 0.01)).toFixed(3));

  function getPointerDistance() {
    const points = [...pointersRef.current.values()];
    if (points.length < 2) return null;
    return Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  }

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointersRef.current.size === 2) {
      pinchRef.current = getPointerDistance();
      dragRef.current = null;
    } else {
      dragRef.current = { x: event.clientX, y: event.clientY };
    }
  }

  function handlePointerMove(event) {
    if (!pointersRef.current.has(event.pointerId)) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (pointersRef.current.size >= 2) {
      const nextDistance = getPointerDistance();
      if (pinchRef.current && nextDistance) {
        onZoom((nextDistance - pinchRef.current) / 120);
      }
      pinchRef.current = nextDistance;
      return;
    }

    if (!dragRef.current) return;
    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    dragRef.current = { x: event.clientX, y: event.clientY };
    onPan(deltaX, deltaY);
  }

  function handlePointerUp(event) {
    pointersRef.current.delete(event.pointerId);
    pinchRef.current = null;
    dragRef.current = null;
    onPanEnd();
  }

  function handleWheel(event) {
    event.preventDefault();
    onZoom(event.deltaY < 0 ? 0.16 : -0.16);
  }

  return (
    <div
      className="navigation-map"
      role="application"
      aria-label={`Floor ${activeFloor} indoor navigation map`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      <div
        className={`flat-map-camera ${camera.isDragging ? "is-dragging" : ""}`}
        style={{ transform: `translate3d(${camera.x}px, ${camera.y}px, 0) scale(${camera.zoom})` }}
      >
        <svg viewBox="0 0 100 100" aria-label={`Floor ${activeFloor} plan`}>
          <rect className="flat-floor-shell" x="5" y="9" width="90" height="74" rx="2" />
          <g className="flat-zone-layer">
            {geometry.zones.map((zone, index) => (
              <g key={zone.id} className={`flat-zone zone-${index + 1}`}>
                <rect x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="1.1" />
                {camera.zoom >= 1.18 && (
                  <text x={zone.x + 2.2} y={zone.y + 6}>
                    {zone.label}
                  </text>
                )}
              </g>
            ))}
          </g>
          <path className="flat-corridor" d={geometry.corridor} />
          {showBlocks && (
            <g className="flat-block-layer">
              {roomBlocks.map((block) => (
                <g key={block.id} className={`flat-block flat-block-${block.type.toLowerCase()}`}>
                  <rect
                    x={block.x - block.w / 2}
                    y={block.y - block.h / 2}
                    width={block.w}
                    height={block.h}
                    rx="0.45"
                  />
                  {showLabels && (showFineLabels || block.type !== "Desk") && (
                    <text x={block.x} y={block.y + 0.8}>
                      {block.label}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )}
          <circle className="flat-elevator" cx="48" cy="46" r="4.2" />
          <text className="flat-elevator-label" x="48" y="49">
            E
          </text>
          {routePath && (
            <>
              <polyline className="flat-route-underlay" points={routePath} />
              <polyline className="flat-route" points={routePath} />
            </>
          )}
          {userPoint && activeFloor === currentStep?.floor && (
            <g className="flat-user" transform={`translate(${userPoint[0]} ${userPoint[1]}) scale(${inverseScale})`}>
              <circle className="flat-user-halo" r="7" />
              <path
                className="flat-user-arrow"
                d="M 0 -6 L 4.4 5 L 0 2.8 L -4.4 5 Z"
                transform={`rotate(${heading ?? 0})`}
              />
            </g>
          )}
          {destinationOnFloor && (
            <g className="flat-destination" transform={`translate(${destination.x} ${destination.y}) scale(${inverseScale})`}>
              <circle r="6.6" />
              <path d="M 0 -9 C -4.4 -9 -7.3 -5.9 -7.3 -2.2 C -7.3 3.2 0 9 0 9 C 0 9 7.3 3.2 7.3 -2.2 C 7.3 -5.9 4.4 -9 0 -9 Z" />
            </g>
          )}
        </svg>
      </div>

      <div className="flat-floor-badge">
        <span>Floor {activeFloor}</span>
        <strong>{isPannedAway ? "Map moved" : "Following route"}</strong>
      </div>

      {destination && (
        <div className="flat-destination-label">
          <MapPin size={16} />
          <span>{destination.label}</span>
        </div>
      )}

      <div className="flat-compass">
        <Navigation size={18} style={{ transform: `rotate(${heading ?? 0}deg)` }} />
      </div>
    </div>
  );
}
