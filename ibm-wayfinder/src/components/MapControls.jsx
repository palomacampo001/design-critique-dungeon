import React from "react";
import { Compass, Minus, Plus } from "lucide-react";

export default function MapControls({ isPannedAway, isFollowing, heading, onZoomIn, onZoomOut, onRecenter }) {
  return (
    <div className="map-controls">
      <button type="button" onClick={onZoomIn} aria-label="Zoom in">
        <Plus size={18} />
      </button>
      <button type="button" onClick={onZoomOut} aria-label="Zoom out">
        <Minus size={18} />
      </button>
      <button
        type="button"
        className={`${isPannedAway ? "needs-center" : ""} ${isFollowing ? "is-following" : ""}`}
        onClick={onRecenter}
        aria-label="Locate me"
        title="Locate me"
      >
        <Compass size={18} style={{ transform: `rotate(${heading ?? 0}deg)` }} />
      </button>
    </div>
  );
}
