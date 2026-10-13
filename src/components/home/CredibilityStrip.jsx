import React from 'react';

export default function CredibilityStrip() {
  const items = [
    'Senior-Led Engineering',
    '2–4 Week Launch Velocity',
    'AI Booking Agents',
    'CRM & WhatsApp Workflows',
    'Zero Agency Hand-off Theater',
    'India & Global Operations',
    '100% Client Code Ownership',
    'Direct Senior Developer Access',
  ];

  return (
    <div className="relative border-y border-white/[0.08] bg-surface-950 py-5 overflow-hidden">
      {/* Background tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-surface-950 via-brand-950/20 to-surface-950 pointer-events-none" />

      <div className="relative flex w-max animate-marquee gap-8 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="font-display text-xs font-bold uppercase tracking-[0.22em] text-gray-400/90 hover:text-white transition-colors">
              {item}
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shadow-[0_0_8px_rgba(229,29,37,0.8)]" />
          </div>
        ))}
      </div>
    </div>
  );
}
