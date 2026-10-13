import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, ExternalLink, Sparkles } from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function FeaturedWork() {
  const projects = [
    {
      type: 'Concept Architecture Pattern',
      title: 'BharatLogix — B2B Logistics Dispatch & Billing Portal',
      clientType: 'Supply Chain & Freight Enterprise',
      problem: 'Manual dispatch calls, slow PDF invoice processing, and missing field status updates costing 30+ operational hours weekly.',
      solution: 'Custom React dashboard with automated WhatsApp status dispatches, OCR consignment ingestion, and PostgreSQL audit logging.',
      stack: ['React', 'Supabase Postgres', 'WhatsApp Cloud API', 'Tailwind CSS'],
      metrics: 'Designed for sub-2s query response and 0 manual spreadsheets',
    },
    {
      type: 'Concept Architecture Pattern',
      title: 'Aura Ayurveda — Headless D2C Brand Experience',
      clientType: 'Premium Indian D2C Wellness',
      problem: 'Bloated Shopify theme causing 4.8s mobile load times and high drop-offs on Indian tier-2 cellular networks.',
      solution: 'Headless storefront with Next.js edge caching, razor-sharp typographic layout, UPI one-click checkout, and Core Web Vitals score of 96+.',
      stack: ['Next.js / React', 'Edge Caching', 'Razorpay / UPI Integration', 'Tailwind'],
      metrics: 'Architected for sub-800ms Time to First Byte on mobile',
    },
    {
      type: 'Concept Architecture Pattern',
      title: 'FinEdge Advisory — High-Intent Client Qualification Engine',
      clientType: 'Wealth & Corporate Tax Practice',
      problem: 'Unqualified leads overwhelming partners; slow contact turnaround leading to lost prospective retainers.',
      solution: 'Interactive 3-step digital qualification funnel paired with an autonomous conversational booking bot and instant CRM routing.',
      stack: ['React', 'Serverless Functions', 'Zoho CRM Webhook', 'Tailwind'],
      metrics: 'Configured for 100% automated prospect tiering before consultation',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-surface-950/60 border-y border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-16">
          <SectionHeading
            badge="Engineering Patterns"
            title="Systems built for high throughput and"
            highlight="frictionless conversion."
            description="Reference implementation architectures illustrating how we solve complex data, speed, and qualification challenges for modern businesses."
          />

          <div className="rounded-xl border border-brand-500/30 bg-brand-500/10 px-4 py-2 text-xs text-brand-300 flex items-center gap-2">
            <Sparkles className="h-4 w-4 shrink-0 text-brand-400" />
            <span>Clearly labeled conceptual architectures & benchmarks</span>
          </div>
        </div>

        {/* 3 Large Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="premium-card rounded-2xl p-7 flex flex-col justify-between group hover:border-brand-500/40"
            >
              <div className="space-y-5">
                {/* Tag */}
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] font-semibold text-brand-400 uppercase tracking-wider bg-brand-500/10 px-2.5 py-1 rounded-full border border-brand-500/20">
                    {project.type}
                  </span>
                  <span className="text-gray-500">{project.clientType}</span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-bold text-white group-hover:text-brand-300 transition-colors">
                  {project.title}
                </h3>

                {/* Problem & Solution block */}
                <div className="space-y-3 pt-2 text-xs leading-relaxed">
                  <div className="rounded-lg bg-surface-900/80 p-3 border border-white/[0.04]">
                    <span className="font-semibold text-rose-400 block mb-1">Challenge:</span>
                    <p className="text-gray-400">{project.problem}</p>
                  </div>

                  <div className="rounded-lg bg-surface-900/80 p-3 border border-white/[0.04]">
                    <span className="font-semibold text-emerald-400 block mb-1">Architecture:</span>
                    <p className="text-gray-300">{project.solution}</p>
                  </div>
                </div>

                {/* Tech stack pills */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[11px] font-mono text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="pt-6 mt-6 border-t border-white/[0.06] flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-400">
                  {project.metrics}
                </span>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-400 hover:text-white transition-colors"
                >
                  <span>Discuss similar</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
