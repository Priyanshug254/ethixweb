import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Target, 
  Zap, 
  Users, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Globe2 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import SectionHeading from '../components/common/SectionHeading';
import CtaBanner from '../components/home/CtaBanner';

export default function About() {
  const principles = [
    {
      icon: Target,
      title: 'Revenue Obsessed',
      description: 'Every interface, database query, and automated trigger we deploy is judged by one metric: does it measurably reduce operational friction and drive qualified customer revenue?',
    },
    {
      icon: Users,
      title: 'Senior Team Only',
      description: 'You talk directly with the people doing the work. No account executives passing telephone messages, and no juniors learning the craft on your production budget.',
    },
    {
      icon: Zap,
      title: 'Move Fast, Ship Clean',
      description: 'We reject 6-month monolithic agency cycles. We ship functional milestones in two-week sprints, test on real devices, and iterate based on verified user behavior.',
    },
    {
      icon: FileCheck,
      title: '100% Client Code Ownership',
      description: 'Zero proprietary lock-in. All Git repositories, cloud configurations, API credentials, and database schemas are handed over cleanly upon project completion.',
    },
  ];

  const deliveryMilestones = [
    {
      week: 'Week 1',
      phase: 'Audit & Systems Blueprint',
      details: 'Analyze drop-offs, define user journeys, and establish database schemas.',
    },
    {
      week: 'Week 2',
      phase: 'Core Engine & Prototype',
      details: 'Build interactive front-end screens and test integration webhooks.',
    },
    {
      week: 'Week 3',
      phase: 'Integration & Stress Testing',
      details: 'Connect CRM, AI receptionists, and test form submissions on 4G networks.',
    },
    {
      week: 'Week 4',
      phase: 'Production Launch & Handover',
      details: 'Domain cutover, DNS validation, analytics verification, and source code transfer.',
    },
  ];

  return (
    <div className="flex-1 pt-32 pb-24">
      {/* 1. About Hero */}
      <section className="relative pb-20">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="primary">Our Story & Approach</Badge>
              <span className="font-mono text-xs text-gray-400">Since 2020 · Senior-Led</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Built for businesses tired of{' '}
              <span className="text-gradient-red">agency theater.</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              We started Ethixweb because we saw too many ambitious businesses get mediocre results from traditional agencies that overpromise in pitch meetings and underdeliver in code.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Authentic Narrative & India Positioning */}
      <section className="py-16 border-t border-white/[0.08] bg-surface-950/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 text-gray-300 leading-relaxed text-base sm:text-lg">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                A tight-knit senior team focused on measurable engineering.
              </h2>
              
              <p>
                When you partner with Ethixweb, you work directly with experienced software engineers and product designers who understand how modern digital operations function. There are no project coordinators acting as intermediaries and no junior apprentices figuring out basics on your company dime.
              </p>

              <p>
                We build fast websites, autonomous AI receptionists, and synchronized CRM pipelines that pay for themselves by capturing lost leads and accelerating deal velocity.
              </p>

              {/* Verified Corporate Integrity Disclosure */}
              <div className="rounded-2xl border border-brand-500/20 bg-brand-950/20 p-6 space-y-3 text-sm">
                <div className="flex items-center gap-2 text-brand-400 font-semibold">
                  <ShieldCheck className="h-5 w-5" />
                  <span>Verified Corporate Structure & Transparency</span>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Ethixweb operates in the United States through <strong>Ethixweb USA LLC</strong>, a Wyoming-registered business entity established in 2020.
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  Our India-specific website represents our dedicated regional service offering — engineered to provide Indian businesses, D2C brands, and modern enterprises with international-grade digital architecture, transparent INR pricing, and responsive IST working hour collaboration.
                </p>
              </div>
            </div>

            {/* Right Highlights Cards */}
            <div className="lg:col-span-5 space-y-5">
              <div className="premium-card rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-gray-400">Launch Velocity</span>
                  <span className="font-mono text-xs font-bold text-brand-400">2–4 Weeks</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Typical time to production launch across web redesigns and workflow integrations.
                </p>
              </div>

              <div className="premium-card rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-gray-400">Craftsmanship</span>
                  <span className="font-mono text-xs font-bold text-emerald-400">100% Senior</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  All design, architecture, and code execution handled exclusively by senior practitioners.
                </p>
              </div>

              <div className="premium-card rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="font-mono text-xs text-gray-400">Operational Alignment</span>
                  <span className="font-mono text-xs font-bold text-gray-200">IST Windows</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Dedicated availability during standard Indian business hours with direct developer access.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Operating Principles */}
      <section className="py-24 border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Core Philosophy"
            title="Four principles that guide"
            highlight="every project we build."
            description="Our operating philosophy ensures high accountability and lasting engineering quality."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div
                  key={idx}
                  className="premium-card rounded-2xl p-7 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 border border-brand-500/30 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-all">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                      {principle.title}
                    </h3>

                    <p className="text-sm text-gray-400 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Delivery Model Timeline */}
      <section className="py-24 border-t border-white/[0.08] bg-surface-950/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Project Cadence"
            title="How we work together,"
            highlight="week by week."
            description="From the first scoping call to launch day, you always know what is being built, why it was prioritized, and what metric it influences."
          />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deliveryMilestones.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-surface-900/80 p-6 space-y-3"
              >
                <span className="font-mono text-xs font-bold text-brand-400 uppercase tracking-wider bg-brand-500/10 px-2.5 py-1 rounded-md border border-brand-500/20">
                  {item.week}
                </span>

                <h3 className="font-display text-base font-bold text-white pt-2">
                  {item.phase}
                </h3>

                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.details}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <CtaBanner />
    </div>
  );
}
