import React from "react";
import { Building2, MapPin } from "lucide-react";

export default function SearchSuggestions({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <div className="search-suggestions" role="listbox" aria-label="Search suggestions">
      {suggestions.map((place) => (
        <button key={place.id} type="button" onClick={() => onSelect(place)} role="option">
          <span className="suggestion-icon">
            {place.type === "Office" ? <Building2 size={17} /> : <MapPin size={17} />}
          </span>
          <span className="suggestion-copy">
            <strong>{place.label}</strong>
            <small>
              Floor {place.floor} · {place.type}
            </small>
          </span>
          <span className="floor-tag">F{place.floor}</span>
        </button>
      ))}
    </div>
  );
}
