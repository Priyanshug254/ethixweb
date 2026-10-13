import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Search, Compass, Cpu, Rocket } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      number: '01',
      icon: Search,
      title: 'Discover & Map',
      tagline: 'We audit reality, not surface symptoms',
      description: 'We analyze your website, traffic sources, conversion drop-offs, and backend workflows. We identify exactly where revenue is leaking before touching code.',
      clientExperience: 'A 45-minute scoping call and a clear technical roadmap with fixed milestones.',
    },
    {
      number: '02',
      icon: Compass,
      title: 'Strategize & Architect',
      tagline: 'Custom blueprints for your business model',
      description: 'We design high-contrast editorial layouts, database schemas, and integration pipelines. Every screen and automation has an explicit business purpose.',
      clientExperience: 'Interactive Figma prototypes and documented architecture ready for sign-off.',
    },
    {
      number: '03',
      icon: Cpu,
      title: 'Design & Build',
      tagline: 'Senior engineering in 2-week sprints',
      description: 'Senior engineers build your system using React, Tailwind, and resilient cloud APIs. Clean code, tested endpoints, and zero junior agency overhead.',
      clientExperience: 'Weekly demo links and direct communication with the engineers building your product.',
    },
    {
      number: '04',
      icon: Rocket,
      title: 'Launch & Optimize',
      tagline: 'Flawless rollout and compounding gains',
      description: 'We execute zero-downtime deployment, verify analytics tracking, stress-test form submissions, and support your daily digital operation.',
      clientExperience: 'Production handover, complete code ownership, and proactive uptime monitoring.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Execution Methodology"
          title="From initial audit to production launch in"
          highlight="weeks, not months."
          description="A disciplined, transparent delivery framework designed to give business owners total clarity at every milestone."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="premium-card rounded-2xl p-7 flex flex-col justify-between relative group"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
                    <span className="font-display text-3xl font-extrabold text-brand-500/80 group-hover:text-brand-400 transition-colors">
                      {step.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04] text-gray-300 border border-white/[0.08] group-hover:border-brand-500/40 group-hover:text-brand-400 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white pt-6">
                    {step.title}
                  </h3>
                  
                  <p className="text-xs font-semibold text-brand-400 mt-1">
                    {step.tagline}
                  </p>

                  <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-white/[0.06] text-xs">
                  <span className="text-gray-500 font-semibold block mb-1">What you experience:</span>
                  <p className="text-gray-300 leading-normal">{step.clientExperience}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
