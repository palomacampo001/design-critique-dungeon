import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { places, searchablePlaces, commonDestinations } from "../data/places.js";
import { buildRoute } from "../data/mockRoute.js";
import SearchBar from "./SearchBar.jsx";
import SearchSuggestions from "./SearchSuggestions.jsx";
import RoutePreviewStack from "./RoutePreviewStack.jsx";
import NavigationMap from "./NavigationMap.jsx";
import InstructionCard from "./InstructionCard.jsx";
import FloorRail from "./FloorRail.jsx";
import MapControls from "./MapControls.jsx";
import BottomSheet from "./BottomSheet.jsx";

const initialCamera = { zoom: 0.92, x: 0, y: 0, isDragging: false };
const navigationCamera = { zoom: 1.2, x: 0, y: 0, isDragging: false };

function getHeading(path = []) {
  if (path.length < 2) return 0;
  const [fromX, fromY] = path[0];
  const [toX, toY] = path[1];
  return Math.atan2(toY - fromY, toX - fromX) * (180 / Math.PI) + 90;
}

export default function OfficeWayfinder() {
  const [mode, setMode] = useState("idle");
  const [query, setQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [activeFloor, setActiveFloor] = useState(1);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [camera, setCamera] = useState(initialCamera);
  const [isPannedAway, setIsPannedAway] = useState(false);

  const route = useMemo(
    () => (selectedDestination ? buildRoute(selectedDestination) : null),
    [selectedDestination]
  );

  const routeSteps = route?.steps ?? [];
  const currentStep = routeSteps[currentStepIndex] ?? routeSteps[0];
  const userPosition = currentStep?.path?.[0] ?? route?.start;
  const routeHeading = getHeading(currentStep?.path);

  const suggestions = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return [];

    return searchablePlaces
      .filter((place) => {
      const haystack = [place.label, place.type, `floor ${place.floor}`, ...place.aliases]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
      })
      .sort((first, second) => {
        const firstLabel = first.label.toLowerCase();
        const secondLabel = second.label.toLowerCase();
        const firstStarts = firstLabel.startsWith(needle) ? 0 : 1;
        const secondStarts = secondLabel.startsWith(needle) ? 0 : 1;
        return firstStarts - secondStarts || first.floor - second.floor || firstLabel.localeCompare(secondLabel);
      })
      .slice(0, 12);
  }, [query]);

  function selectDestination(place) {
    setSelectedDestination(place);
    setQuery(place.label);
    setActiveFloor(1);
    setCurrentStepIndex(0);
    setCamera(initialCamera);
    setIsPannedAway(false);
    setMode("preview");
  }

  function startNavigation() {
    const firstStep = routeSteps[0];
    setActiveFloor(firstStep?.floor ?? 1);
    setCurrentStepIndex(0);
    setCamera(navigationCamera);
    setIsPannedAway(false);
    setMode("navigating");
  }

  function exitRoute() {
    setMode("idle");
    setQuery("");
    setSelectedDestination(null);
    setActiveFloor(1);
    setCurrentStepIndex(0);
    setCamera(initialCamera);
    setIsPannedAway(false);
  }

  function updateZoom(delta) {
    setCamera((current) => ({
      ...current,
      zoom: Math.min(3.2, Math.max(0.82, Number((current.zoom + delta).toFixed(2))))
    }));
  }

  function moveCamera(deltaX, deltaY) {
    setIsPannedAway(true);
    setCamera((current) => ({
      ...current,
      x: Math.max(-140, Math.min(140, current.x + deltaX)),
      y: Math.max(-160, Math.min(120, current.y + deltaY)),
      isDragging: true
    }));
  }

  function recenter() {
    setIsPannedAway(false);
    setCamera((current) => ({
      ...current,
      x: 0,
      y: 0,
      zoom: Math.max(current.zoom, navigationCamera.zoom),
      isDragging: false
    }));
    if (currentStep?.floor) setActiveFloor(currentStep.floor);
  }

  function settleCamera() {
    setCamera((current) => ({ ...current, isDragging: false }));
  }

  function chooseFloor(floor) {
    setActiveFloor(floor);
    setCurrentStepIndex((index) => {
      const nextIndex = routeSteps.findIndex((step) => step.floor === floor);
      return nextIndex >= 0 ? nextIndex : index;
    });
  }

  function selectStep(stepIndex) {
    const nextStep = routeSteps[stepIndex];
    if (!nextStep) return;

    setCurrentStepIndex(stepIndex);
    setActiveFloor(nextStep.floor);
    setIsPannedAway(false);
    setCamera((current) => ({
      ...current,
      x: 0,
      y: 0,
      zoom: Math.max(current.zoom, navigationCamera.zoom),
      isDragging: false
    }));
  }

  return (
    <main className={`wayfinder mode-${mode}`}>
      <section className="map-zone" aria-label="Office map">
        {mode === "navigating" ? (
          <NavigationMap
            activeFloor={activeFloor}
            route={route}
            currentStep={currentStep}
            destination={selectedDestination}
            camera={camera}
            heading={routeHeading}
            isPannedAway={isPannedAway}
            onPan={moveCamera}
            onPanEnd={settleCamera}
            onZoom={updateZoom}
          />
        ) : (
          <RoutePreviewStack
            mode={mode}
            route={route}
            activeFloor={activeFloor}
            destination={selectedDestination}
            currentStep={currentStep}
            userPosition={userPosition}
            camera={camera}
            onPan={moveCamera}
            onPanEnd={settleCamera}
          />
        )}
      </section>

      <section className="top-zone">
        {mode === "navigating" ? (
          <InstructionCard step={currentStep} onExit={exitRoute} />
        ) : mode === "preview" && selectedDestination ? (
          <div className="preview-route-card">
            <div className="route-field">
              <span className="route-dot start" />
              <strong>Reception</strong>
            </div>
            <div className="route-field">
              <span className="route-dot destination" />
              <strong>{selectedDestination.label}</strong>
            </div>
            <button type="button" onClick={exitRoute} aria-label="Cancel route">
              <X size={18} />
            </button>
          </div>
        ) : (
          <div className="search-cluster">
            <SearchBar query={query} onQueryChange={setQuery} onClear={() => setQuery("")} />
            <SearchSuggestions suggestions={suggestions} onSelect={selectDestination} />
          </div>
        )}
      </section>

      {mode === "navigating" && (
        <aside className="right-control-zone" aria-label="Map controls">
          <FloorRail activeFloor={activeFloor} routeFloors={route?.floors ?? []} onSelect={chooseFloor} />
          <MapControls
            isPannedAway={isPannedAway}
            isFollowing={!isPannedAway}
            heading={routeHeading}
            onZoomIn={() => updateZoom(0.32)}
            onZoomOut={() => updateZoom(-0.32)}
            onRecenter={recenter}
          />
        </aside>
      )}

      {mode === "idle" && query && (
        <button className="query-cancel" type="button" onClick={exitRoute} aria-label="Cancel destination">
          <X size={18} />
        </button>
      )}

      <BottomSheet
        mode={mode}
        route={route}
        destination={selectedDestination}
        currentStepIndex={currentStepIndex}
        routeSteps={routeSteps}
        commonDestinations={commonDestinations}
        places={places}
        onSelect={selectDestination}
        onGo={startNavigation}
        onCancel={exitRoute}
        onSelectStep={selectStep}
      />
    </main>
  );
}
