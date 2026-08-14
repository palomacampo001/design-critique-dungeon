import React from "react";
import { floors } from "../data/mockFloors.js";

export default function FloorRail({ activeFloor, routeFloors, onSelect }) {
  return (
    <div className="floor-rail" aria-label="Floors">
      {floors
        .slice()
        .reverse()
        .map((floor) => (
          <button
            key={floor}
            type="button"
            className={`${floor === activeFloor ? "active" : ""} ${routeFloors.includes(floor) ? "on-route" : ""}`}
            onClick={() => onSelect(floor)}
            aria-label={`Floor ${floor}`}
          >
            {floor}
          </button>
        ))}
    </div>
  );
}
