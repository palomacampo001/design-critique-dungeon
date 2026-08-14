import React, { useState } from "react";
import { ArrowRight, Clock, ListChecks, LogOut, MapPin, Navigation, X } from "lucide-react";

export default function BottomSheet({
  mode,
  route,
  destination,
  currentStepIndex,
  routeSteps,
  commonDestinations,
  places,
  onSelect,
  onGo,
  onCancel,
  onSelectStep
}) {
  const [showSteps, setShowSteps] = useState(false);
  const commonPlaces = commonDestinations
    .map((label) => places.find((place) => place.label === label))
    .filter(Boolean);

  if (mode === "idle") {
    return (
      <section className="bottom-sheet idle-sheet">
        <div className="sheet-handle" />
        <h1>Where are you going?</h1>
        <div className="destination-chips">
          {commonPlaces.map((place) => (
            <button key={place.id} type="button" onClick={() => onSelect(place)}>
              {place.label}
            </button>
          ))}
        </div>
      </section>
    );
  }

  if (mode === "preview") {
    return (
      <section className="bottom-sheet preview-sheet">
        <div className="sheet-handle" />
        <div className="route-copy">
          <span>
            <MapPin size={16} />
            Floor {destination.floor} · {destination.type}
          </span>
          <h1>{destination.label}</h1>
          <p>
            Start at Reception <ArrowRight size={13} /> Elevator A <ArrowRight size={13} /> {destination.label}
          </p>
        </div>
        <div className="route-stats">
          <span>
            <Clock size={15} />
            {route.summary}
          </span>
          <strong>{route.distance}</strong>
        </div>
        <div className="sheet-actions">
          <button type="button" className="secondary-action" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="primary-action" onClick={onGo}>
            <Navigation size={17} />
            Go
          </button>
        </div>
      </section>
    );
  }

  const eta = route.summary.match(/\d+\s*min/)?.[0] ?? route.summary;

  return (
    <section className="bottom-sheet nav-sheet">
      <div className="sheet-handle" />
      <div className="nav-summary">
        <div>
          <span>
            Step {currentStepIndex + 1} of {routeSteps.length}
          </span>
          <strong>{destination.label}</strong>
        </div>
        <small>{route.summary}</small>
      </div>
      <div className="live-route-card">
        <div>
          <strong>{eta}</strong>
          <span>Following you · {route.distance}</span>
        </div>
        <div className="nav-action-row">
          <button type="button" className="steps-action" onClick={() => setShowSteps((value) => !value)}>
            {showSteps ? <X size={17} /> : <ListChecks size={17} />}
            Steps
          </button>
          <button type="button" className="exit-action" onClick={onCancel}>
            <LogOut size={17} />
            Exit
          </button>
        </div>
      </div>
      {showSteps && (
        <ol className="steps-list" aria-label="Route steps">
          {routeSteps.map((step, index) => (
            <li key={step.id} className={index === currentStepIndex ? "active" : ""}>
              <button type="button" onClick={() => onSelectStep(index)}>
                <span>{index + 1}</span>
                <div>
                  <strong>{step.instruction}</strong>
                  <small>Floor {step.floor} · {step.detail}</small>
                </div>
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
