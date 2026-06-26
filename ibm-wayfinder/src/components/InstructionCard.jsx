import React from "react";
import { ArrowUp, X } from "lucide-react";

export default function InstructionCard({ step, onExit }) {
  return (
    <div className="instruction-card">
      <span className="turn-icon">
        <ArrowUp size={19} />
      </span>
      <div>
        <strong>{step?.instruction ?? "Start route"}</strong>
        <small>{step?.detail ?? "Follow the highlighted path."}</small>
      </div>
      <button type="button" onClick={onExit} aria-label="Exit navigation">
        <X size={18} />
      </button>
    </div>
  );
}
