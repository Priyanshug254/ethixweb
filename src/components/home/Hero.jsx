import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Zap, Activity, Cpu, ArrowRight } from 'lucide-react';
import Badge from '../common/Badge';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Subtle Ambience & Grid */}
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 h-[450px] w-[650px] rounded-full bg-brand-500/15 blur-[140px] opacity-70" 
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">
                Senior Digital Operations Team
              </Badge>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-gray-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                Accepting Q4 Client Deployments
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.05]">
                We run the <span className="text-white">tech.</span>
                <br />
                You run the{' '}
                <span className="text-gradient-red">
                  business.
                </span>
              </h1>
              
              <p className="max-w-2xl text-lg sm:text-xl text-gray-300 font-normal leading-relaxed pt-2">
                We manage your digital operation — from AI booking agents and CRM integrations to bespoke web applications and high-conversion redesigns. Tailored for ambitious Indian enterprises and modern brands seeking measurable growth.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link 
                to="/contact" 
                className="btn-primary group text-base px-8 py-3.5"
                id="hero-primary-cta"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              <Link 
                to="/services" 
                className="btn-secondary text-base px-7 py-3.5"
                id="hero-secondary-cta"
              >
                <span>Explore Services</span>
              </Link>
            </div>

            {/* Value Guarantees / Operating Principles */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/[0.08]">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-brand-500" />
                  <span>Senior-Led Only</span>
                </div>
                <p className="text-[11px] text-gray-400">Direct engineer access</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-brand-500" />
                  <span>2–4 Wk Velocity</span>
                </div>
                <p className="text-[11px] text-gray-400">Fast sprint deployments</p>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white">
                  <CheckCircle2 className="h-4 w-4 text-brand-500" />
                  <span>Full Ownership</span>
                </div>
                <p className="text-[11px] text-gray-400">100% client-owned code</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Digital Systems Architecture Visual */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-brand-600/30 to-surface-700/50 opacity-60 blur-xl" />

              {/* Main Architecture Console Card */}
              <div className="relative rounded-2xl border border-white/10 bg-surface-900/90 p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Console header */}
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80"></span>
                    </div>
                    <span className="font-mono text-xs font-medium text-gray-400">ethix.engine.v2</span>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    LIVE IST
                  </span>
                </div>

                {/* System Architecture Interactive Nodes */}
                <div className="space-y-3.5 py-5">
                  
                  {/* Node 1: AI Lead Acquisition */}
                  <div className="group rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 transition-all hover:border-brand-500/40 hover:bg-surface-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400 border border-brand-500/30">
                          <Cpu className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">AI Receptionist & Booking Bot</p>
                          <p className="text-[11px] text-gray-400">Auto-qualifies WhatsApp & Web enquiries</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">0.8s avg</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-1 text-brand-500/50">
                    <span className="h-4 w-[1px] bg-brand-500/30"></span>
                  </div>

                  {/* Node 2: CRM & Pipeline Automation */}
                  <div className="group rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 transition-all hover:border-brand-500/40 hover:bg-surface-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-gray-200 border border-white/10">
                          <Zap className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">CRM & Multi-Channel Sync</p>
                          <p className="text-[11px] text-gray-400">HubSpot · Zoho · Sheets · WhatsApp Webhook</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">Instant</span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center -my-1 text-brand-500/50">
                    <span className="h-4 w-[1px] bg-brand-500/30"></span>
                  </div>

                  {/* Node 3: High-Speed Web Infrastructure */}
                  <div className="group rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 transition-all hover:border-brand-500/40 hover:bg-surface-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400 border border-brand-500/30">
                          <Activity className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white">Performance Edge Storefront</p>
                          <p className="text-[11px] text-gray-400">Sub-second LCP · Zero layout shift</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-brand-400 bg-brand-500/10 px-1.5 py-0.5 rounded">98 Core CWV</span>
                    </div>
                  </div>
                </div>

                {/* Console Footer stats */}
                <div className="rounded-xl border border-brand-500/20 bg-brand-950/20 p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gray-300">
                    <ShieldCheck className="h-4 w-4 text-brand-400" />
                    <span>Real-Time SLA Operations</span>
                  </div>
                  <Link 
                    to="/contact" 
                    className="flex items-center gap-1 font-semibold text-brand-300 hover:text-white transition-colors"
                  >
                    <span>Deploy Stack</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
