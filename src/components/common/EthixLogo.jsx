import React from 'react';

export default function EthixLogo({ className = "h-8", showLocation = true }) {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Authentic Connected Emblem */}
      <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-900/60 to-surface-850 p-1.5 border border-brand-500/30 shadow-[0_0_15px_rgba(229,29,37,0.25)]">
        <svg viewBox="0 0 32 32" fill="none" className="h-full w-full">
          {/* Outer web nodes & links */}
          <circle cx="16" cy="16" r="12" stroke="#E51D25" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="16" cy="16" r="7" stroke="#E51D25" strokeOpacity="0.45" strokeWidth="1" />
          
          <path d="M16 4L16 28M4 16L28 16M7.5 7.5L24.5 24.5M7.5 24.5L24.5 7.5" stroke="#E51D25" strokeOpacity="0.3" strokeWidth="0.8" />
          
          {/* Nodes */}
          <circle cx="16" cy="16" r="2.8" fill="#E51D25" />
          <circle cx="16" cy="9" r="1.5" fill="#E51D25" />
          <circle cx="16" cy="23" r="1.5" fill="#E51D25" />
          <circle cx="9" cy="16" r="1.5" fill="#E51D25" />
          <circle cx="23" cy="16" r="1.5" fill="#E51D25" />
          
          <circle cx="11" cy="11" r="1.2" fill="#E51D25" fillOpacity="0.8" />
          <circle cx="21" cy="21" r="1.2" fill="#E51D25" fillOpacity="0.8" />
          <circle cx="11" cy="21" r="1.2" fill="#E51D25" fillOpacity="0.8" />
          <circle cx="21" cy="11" r="1.2" fill="#E51D25" fillOpacity="0.8" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-xl font-extrabold tracking-tight text-white">
          ETHIX<span className="text-brand-500">WEB</span>
        </span>
        {showLocation && (
          <span className="rounded bg-brand-500/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-400 border border-brand-500/20">
            IN
          </span>
        )}
      </div>
    </div>
  );
}
