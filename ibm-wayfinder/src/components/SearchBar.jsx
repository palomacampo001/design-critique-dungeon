import React from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({ query, onQueryChange, onClear }) {
  return (
    <label className="search-bar">
      <Search size={19} aria-hidden="true" />
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search rooms, amenities, floors"
        autoComplete="off"
      />
      {query && (
        <button type="button" onClick={onClear} aria-label="Clear search">
          <X size={17} />
        </button>
      )}
    </label>
  );
}
