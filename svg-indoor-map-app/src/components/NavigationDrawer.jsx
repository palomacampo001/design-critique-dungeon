import { useRef, useState } from 'react';
import { ChevronDown, ChevronUp, LocateFixed, Navigation, Volume2, VolumeX, X } from 'lucide-react';
import { floorAccents } from './IndoorMapViewer.jsx';

// Derive an ordered list of unique floors the route passes through, with colors.
function routeFloorJourney(route) {
  if (!route?.legs) return [];
  const seen = new Set();
  const stops = [];
  route.legs.forEach((leg) => {
    if (leg.type === 'walk' && leg.floorId && !seen.has(leg.floorId)) {
      seen.add(leg.floorId);
      stops.push({ floorId: leg.floorId, floorName: leg.floorName, type: 'walk' });
    }
    if (leg.type === 'transfer') {
      if (!seen.has(leg.toFloorId)) {
        seen.add(leg.toFloorId);
        stops.push({ floorId: leg.toFloorId, floorName: leg.toFloorName, type: 'transfer', via: leg.connectorType });
      }
    }
  });
  return stops;
}

function floorColor(floorId) {
  return floorAccents[floorId] || '#6b7280';
}

export default function NavigationDrawer({
  route,
  activeFloorId,
  voiceGuidance = false,
  onSelectFloor,
  onClearRoute,
  onToggleLocate,
  onToggleVoiceGuidance,
  onRepeatInstruction,
}) {
  const [expanded, setExpanded] = useState(false);
  const dragStart = useRef(null);
  if (!route) return null;

  function floorForStep(index) {
    const leg = route.legs?.[index];
    if (leg?.type === 'walk' && leg.floorId) return leg.floorId;
    if (leg?.type === 'transfer') return leg.toFloorId;
    if (index === 0) return route.originFloorId || route.floorId;
    return route.destinationFloorId || route.transfer?.toFloorId;
  }

  function showStep(index) {
    const floorId = floorForStep(index);
    if (floorId) {
      onSelectFloor(floorId);
      setExpanded(true);
    }
  }

  return (
    <section className={['navigation-drawer route-panel-enter', expanded ? 'expanded' : 'collapsed', ['approximateGuidance', 'previewGuidance'].includes(route.quality) ? 'approximate-guidance' : ''].filter(Boolean).join(' ')}>
      <button
        className="drawer-handle"
        onClick={() => setExpanded((value) => !value)}
        onPointerDown={(event) => { dragStart.current = event.clientY; }}
        onPointerUp={(event) => {
          if (dragStart.current == null) return;
          const delta = event.clientY - dragStart.current;
          if (delta > 24) setExpanded(false);
          if (delta < -24) setExpanded(true);
          dragStart.current = null;
        }}
        aria-label="Show or hide directions"
      >
        {expanded ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
      </button>
      <button className="drawer-collapsed" onClick={() => setExpanded(true)}>
        <Navigation size={19} />
        <strong>{route.routeAvailable === false ? 'Walking route unavailable' : route.instructions?.[0]?.text || `Go to ${route.destinationName}`}</strong>
      </button>
      <div className="drawer-content">
        <div className="drawer-head">
          <div>
            <span>{route.routeAvailable === false ? 'Route not ready' : 'Walking to'}</span>
            <h2>{route.destinationName}</h2>
          </div>
          <button className="icon-button" onClick={onClearRoute} title="End route" aria-label="End route">
            <X size={18} />
          </button>
        </div>
        <div className="drawer-summary">
          <div className="drawer-compass" style={{ transform: `rotate(${route.heading || 0}deg)` }}>
            <Navigation size={24} />
          </div>
          <div>
            <strong>{route.routeAvailable === false ? 'No walkable route yet' : `${Math.round(route.distance)} map units`}</strong>
            <span>
              {route.routeAvailable === false
                ? route.unavailableReason
                : ['approximateGuidance', 'previewGuidance'].includes(route.quality)
                  ? 'Preview guidance. Follow visible hallways.'
                  : 'Hallway route shown.'}
            </span>
          </div>
        </div>
        {/* ── Floor journey strip ── */}
        {(() => {
          const journey = routeFloorJourney(route);
          if (journey.length < 2) return null;
          return (
            <div style={{ margin: '10px 0 4px', padding: '10px 14px', background: '#f7f8fa', borderRadius: 10, border: '1px solid #e5e7eb' }}>
              <p style={{ margin: '0 0 8px', fontSize: 11, fontWeight: 600, color: '#57606a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Your journey · {journey.length} floor{journey.length !== 1 ? 's' : ''}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 0, overflowX: 'auto' }}>
                {journey.map((stop, i) => {
                  const color = floorColor(stop.floorId);
                  const isActive = stop.floorId === activeFloorId;
                  const isLast = i === journey.length - 1;
                  return (
                    <div key={stop.floorId} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <button
                        onClick={() => onSelectFloor(stop.floorId)}
                        title={`Go to ${stop.floorName}`}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                          background: 'none', border: 'none', cursor: 'pointer', padding: '2px 4px',
                        }}
                      >
                        <div style={{
                          width: isActive ? 34 : 28,
                          height: isActive ? 34 : 28,
                          borderRadius: '50%',
                          background: color,
                          border: isActive ? '3px solid #1f2328' : '2px solid rgba(0,0,0,0.12)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s',
                          boxShadow: isActive ? `0 0 0 3px ${color}44` : 'none',
                        }}>
                          {i === 0 && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <circle cx="5" cy="5" r="3" fill="white" />
                            </svg>
                          )}
                          {isLast && (
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                              <path d="M5 2L7 7H3L5 2Z" fill="white" />
                            </svg>
                          )}
                        </div>
                        <span style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: isActive ? '#1f2328' : '#57606a', whiteSpace: 'nowrap' }}>
                          {stop.floorName}
                        </span>
                        {stop.via && (
                          <span style={{ fontSize: 9, color: '#57606a', fontStyle: 'italic' }}>{stop.via}</span>
                        )}
                      </button>
                      {!isLast && (
                        <div style={{ display: 'flex', alignItems: 'center', margin: '0 2px', paddingBottom: 18 }}>
                          <div style={{ width: 18, height: 2, background: `linear-gradient(to right, ${color}, ${floorColor(journey[i + 1].floorId)})`, borderRadius: 1 }} />
                          <svg width="8" height="8" viewBox="0 0 8 8" style={{ marginLeft: -1, marginBottom: 0 }}>
                            <path d="M2 1L6 4L2 7" stroke={floorColor(journey[i + 1].floorId)} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })()}
        <ol className="direction-list">
          {route.instructions?.map((step, index) => (
            <li
              key={step.id}
              className={index === 0 ? 'active-step-pulse' : ''}
            >
              <button type="button" onClick={() => showStep(index)} title="Show this step on the map" aria-label={`Show route step ${index + 1}: ${step.text}`}>
                {index === 0 && <Navigation size={14} />}
                <span>{step.text}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="route-voice-actions">
          <button className={voiceGuidance ? 'secondary-button active' : 'secondary-button'} onClick={onToggleVoiceGuidance} aria-pressed={voiceGuidance}>
            {voiceGuidance ? <Volume2 size={16} /> : <VolumeX size={16} />}
            {voiceGuidance ? 'Voice on' : 'Voice off'}
          </button>
          <button className="secondary-button" onClick={onRepeatInstruction} disabled={!voiceGuidance}>
            <Volume2 size={16} />
            Repeat step
          </button>
        </div>
        {route.legs?.length > 1 && (
          <div className="route-step-buttons">
            <button className="secondary-button" onClick={() => showStep(0)}>Show current floor leg</button>
            <button className="secondary-button" onClick={() => showStep(route.legs.length - 1)}>Show destination floor</button>
          </div>
        )}
        {route.transfer && activeFloorId !== route.transfer.toFloorId && (
          <button className="primary-button" onClick={() => onSelectFloor(route.transfer.toFloorId)}>
            Show {route.transfer.toFloorName}
          </button>
        )}
        {route.transfer && activeFloorId === route.transfer.toFloorId && (
          <button className="secondary-button" onClick={() => onSelectFloor(route.transfer.fromFloorId)}>
            Back to {route.transfer.fromFloorName}
          </button>
        )}
        <button className="secondary-button" onClick={onToggleLocate}>
          <LocateFixed size={16} />
          Update my location
        </button>
      </div>
    </section>
  );
}
