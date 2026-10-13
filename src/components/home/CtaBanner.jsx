import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl border border-brand-500/30 bg-gradient-to-b from-surface-850 to-surface-900 p-8 sm:p-14 lg:p-16 shadow-2xl overflow-hidden">
          
          {/* Subtle Ambient Red Glow */}
          <div 
            aria-hidden="true" 
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand-500/20 blur-[120px]" 
          />

          <div className="relative z-10 max-w-3xl space-y-6">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
              Start a Conversation
            </span>

            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
              Ready for a sharper digital operation?
            </h2>

            <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
              Bring us your messy tech stack, missed leads, slow website, or stalled automation. We diagnose your bottlenecks and turn them into a reliable, high-yield system.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/contact" 
                className="btn-primary group text-base px-8 py-3.5"
                id="cta-banner-primary"
              >
                <span>Submit Project Enquiry</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link 
                to="/services" 
                className="btn-secondary text-base px-7 py-3.5"
              >
                <span>Browse Service Offerings</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/[0.08] text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-400" />
                <span>24-Hour Scoping Response</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-brand-400" />
                <span>NDA & Privacy Respected</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-400" />
                <span>Zero Sales Fluff</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
