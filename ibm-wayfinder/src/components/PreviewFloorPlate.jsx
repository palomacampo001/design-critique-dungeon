import React from "react";
import { floorGeometry } from "../data/mockFloors.js";
import { generatedRoomBlocks } from "../data/generatedRooms.js";

function pointsForPath(path) {
  return path.map(([x, y]) => `${x},${y}`).join(" ");
}

export default function PreviewFloorPlate({
  mode,
  floor,
  stackIndex,
  route,
  currentStep,
  userPosition,
  userHeading,
  cameraZoom,
  isActive,
  isStart,
  isDestination
}) {
  const geometry = floorGeometry[floor];
  const destination = route?.destination;
  const hasRoute = Boolean(route && destination);
  const previewRoutePoints =
    hasRoute && floor === route.start.floor
      ? `${route.start.x},${route.start.y} 48,64 48,46`
      : hasRoute && floor === destination.floor
        ? `48,46 62,44 ${destination.x},${destination.y}`
        : "";
  const activeRoutePoints =
    mode === "navigating" && currentStep?.floor === floor && currentStep.path.length > 1
      ? pointsForPath(currentStep.path)
      : "";
  const routePoints = activeRoutePoints || previewRoutePoints;
  const showUser = mode === "navigating" && userPosition && currentStep?.floor === floor;
  const showBlockPlan = isActive && cameraZoom >= 1.28;
  const showBlockLabels = isActive && cameraZoom >= 1.74;
  const showOverviewZones = mode === "idle" && cameraZoom <= 1.08;
  const roomBlocks = generatedRoomBlocks[floor] ?? [];

  return (
    <article
      className={`preview-plate ${showBlockPlan ? "is-detail" : ""} ${isActive ? "is-active" : ""} ${isStart ? "is-start" : ""} ${isDestination ? "is-destination" : ""}`}
      style={{ "--stack-index": stackIndex }}
    >
      <div className="plate-label">
        <strong>Floor {floor}</strong>
        {isStart && <span>Start</span>}
        {isDestination && <span>Destination</span>}
      </div>
      <img className="floor-plan-image" src={geometry.svg} alt="" draggable="false" />
      <svg viewBox="0 0 100 74" role="img" aria-label={`Floor ${floor} preview plate`}>
        <rect className="plate-shell" x="6" y="8" width="88" height="54" rx="3" />
        {showOverviewZones && (
          <g className="overview-zone-layer">
            {geometry.zones.map((zone, index) => (
              <rect
                key={zone.id}
                className={`overview-zone zone-${index + 1}`}
                x={zone.x}
                y={zone.y}
                width={zone.w}
                height={zone.h}
                rx="1.4"
              />
            ))}
          </g>
        )}
        {showBlockPlan && (
          <g className="office-block-layer">
            {roomBlocks.map((block) => (
              <g key={block.id} className={`office-block office-block-${block.type.toLowerCase()}`}>
                <rect
                  x={block.x - block.w / 2}
                  y={block.y - block.h / 2}
                  width={block.w}
                  height={block.h}
                  rx="0.45"
                />
                {showBlockLabels && (
                  <text x={block.x} y={block.y + 0.8}>
                    {block.label}
                  </text>
                )}
              </g>
            ))}
          </g>
        )}
        <circle className="elevator-node" cx="48" cy="46" r="3.2" />
        <circle className="preview-marker marker-a" cx="58" cy="43" r="2.4" />
        <circle className="preview-marker marker-b" cx="66" cy="39" r="2.2" />
        <circle className="preview-marker marker-c" cx="36" cy="51" r="2.1" />
        {routePoints && <polyline className={activeRoutePoints ? "preview-route active-route" : "preview-route"} points={routePoints} />}
        {hasRoute && floor === route.start.floor && <circle className="start-node" cx={route.start.x} cy={route.start.y} r="3.4" />}
        {showUser && (
          <g className="live-user" transform={`translate(${userPosition[0]} ${userPosition[1]})`}>
            <circle className="user-pulse" r="7" />
            <path
              className="user-heading"
              d="M 0 -5.8 L 4.2 4.6 L 0 2.6 L -4.2 4.6 Z"
              transform={`rotate(${userHeading ?? 0})`}
            />
            <circle className="user-core" r="2.1" />
          </g>
        )}
        {isDestination && <circle className="destination-node" cx={destination.x} cy={destination.y} r="4.1" />}
      </svg>
    </article>
  );
}
