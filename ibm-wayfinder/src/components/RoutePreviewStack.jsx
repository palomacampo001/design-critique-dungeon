import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { floors } from "../data/mockFloors.js";
import PreviewFloorPlate from "./PreviewFloorPlate.jsx";

export default function RoutePreviewStack({
  mode,
  route,
  activeFloor,
  destination,
  currentStep,
  userPosition,
  userHeading,
  camera,
  onPan,
  onPanEnd
}) {
  const dragRef = useRef(null);
  const startFloor = route?.start?.floor ?? 1;
  const destinationFloor = destination?.floor ?? activeFloor;
  const isRouteActive = Boolean(route && destination);
  const zoomLevel = camera?.zoom ?? 1;
  const zoomClass = zoomLevel >= 1.65 ? "zoom-close" : zoomLevel <= 1 ? "zoom-far" : "zoom-mid";

  function handlePointerDown(event) {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY };
  }

  function handlePointerMove(event) {
    if (!dragRef.current) return;
    const deltaX = event.clientX - dragRef.current.x;
    const deltaY = event.clientY - dragRef.current.y;
    dragRef.current = { x: event.clientX, y: event.clientY };
    onPan(deltaX, deltaY);
  }

  function handlePointerUp() {
    dragRef.current = null;
    onPanEnd();
  }

  return (
    <div
      className="preview-stack"
      aria-label="Office multilevel map"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="preview-topbar">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <strong>One Madison <em>Wayfinder</em></strong>
      </div>
      <div className="preview-header">
        <span>{mode === "idle" ? "Interior map" : mode === "navigating" ? "Guidance active" : "Route preview"}</span>
        {isRouteActive ? (
          <strong>
            F{startFloor} <ArrowRight size={14} /> F{destinationFloor}
          </strong>
        ) : (
          <strong>OMA</strong>
        )}
      </div>
      <div
        className={`floor-stack-scene ${zoomClass} ${camera?.isDragging ? "is-dragging" : ""}`}
        style={{
          transform: `translate3d(${camera?.x ?? 0}px, ${camera?.y ?? 0}px, 0) rotate(${camera?.bearing ?? 0}deg) scale(${zoomLevel})`
        }}
      >
        <div className="floor-stack">
          <div className="elevator-spine" aria-hidden="true" />
          <div className="elevator-spine secondary" aria-hidden="true" />
          {floors
            .slice()
            .reverse()
            .map((floor, index) => (
              <PreviewFloorPlate
                key={floor}
                mode={mode}
                floor={floor}
                stackIndex={index}
                route={route}
                currentStep={currentStep}
                userPosition={userPosition}
                userHeading={userHeading}
                cameraZoom={camera?.zoom ?? 1}
                isActive={floor === activeFloor}
                isStart={isRouteActive && floor === startFloor}
                isDestination={isRouteActive && floor === destinationFloor}
              />
            ))}
        </div>
        {mode === "idle" && zoomLevel <= 1.05 && (
          <div className="overview-callouts" aria-hidden="true">
            <span className="callout callout-one">Reception · lobby</span>
            <span className="callout callout-two">Client Center</span>
            <span className="callout callout-three">Workplace neighborhoods</span>
            <span className="callout callout-four">Amenities and focus rooms</span>
          </div>
        )}
      </div>
    </div>
  );
}
