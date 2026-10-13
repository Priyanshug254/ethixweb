import React from 'react';

export default function Badge({ children, variant = 'primary', className = '' }) {
  const variants = {
    primary: 'border-brand-500/25 bg-brand-500/10 text-brand-300',
    neutral: 'border-white/10 bg-white/[0.04] text-gray-300',
    emerald: 'border-emerald-500/25 bg-emerald-500/10 text-emerald-300',
  };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold tracking-wide ${variants[variant] || variants.primary} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_12px_rgba(229,29,37,0.9)] animate-pulse" />
      <span>{children}</span>
    </div>
  );
}
