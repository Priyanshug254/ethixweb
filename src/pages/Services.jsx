import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Bot, 
  Code2, 
  Workflow, 
  Search, 
  ShieldCheck, 
  ArrowUpRight, 
  Check, 
  Layers, 
  Clock, 
  Zap, 
  Sparkles 
} from 'lucide-react';
import Badge from '../components/common/Badge';
import SectionHeading from '../components/common/SectionHeading';
import CtaBanner from '../components/home/CtaBanner';

export default function Services() {
  const serviceCategories = [
    {
      id: 'web-development',
      icon: Globe,
      number: '01',
      title: 'Website & Headless Architecture',
      subtitle: 'Engineered for conversion, readability, and sub-second page delivery.',
      problem: 'Most agency sites are bloated WordPress or builder themes that take 4+ seconds to load, bleed paid ad spend, and look identical to competitors.',
      benefits: [
        'Lightning-fast page loads optimized for Indian mobile cellular bandwidth',
        'Modern Swiss-inspired editorial typography that commands market authority',
        'Clean semantic HTML and accessible UI components (WCAG compliant)',
        'Built with React, Next.js, and modern headless CMS platforms',
      ],
      offerings: [
        'Enterprise Website Redesign',
        'Headless Commerce & Catalog Architecture',
        'High-Intent Campaign Landing Pages',
        'Core Web Vitals & Speed Optimization',
      ],
      defaultServiceParam: 'Website Redesign',
    },
    {
      id: 'ai-automation',
      icon: Bot,
      number: '02',
      title: 'AI Receptionists & Autonomous Triage',
      subtitle: 'Capture, qualify, and book inbound customer enquiries around the clock.',
      problem: 'Leads submitted after business hours or on weekends go cold before sales teams respond, slashing acquisition ROI.',
      benefits: [
        'Instant 24/7 prospect qualification via WhatsApp and Web chat',
        'Trained strictly on your verified services, pricing guidelines, and business rules',
        'Frictionless automated scheduling directly onto Google Calendar or Outlook',
        'Seamless human-agent handoff when high-priority custom deals appear',
      ],
      offerings: [
        'AI Voice & Chat Receptionists',
        'WhatsApp Business Cloud Chatbots',
        'Internal Knowledge Retrieval Copilots',
        'Automated Lead Qualification & Tiering',
      ],
      defaultServiceParam: 'AI Automation & Chatbots',
    },
    {
      id: 'web-apps',
      icon: Code2,
      number: '03',
      title: 'Custom Web Applications & Portals',
      subtitle: 'Operational software built to replace fragile spreadsheets and manual workflows.',
      problem: 'Growing businesses hit a ceiling when managing customer onboarding, dispatch schedules, and internal approvals through email threads and spreadsheets.',
      benefits: [
        'Tailored role-based portals for customers, partners, and internal staff',
        'Relational database architecture backed by PostgreSQL and Supabase',
        'Serverless micro-APIs with end-to-end data validation and audit logging',
        'Clean, accessible administrative dashboards designed for rapid daily operations',
      ],
      offerings: [
        'Customer Self-Service Portals',
        'Internal Operations Dashboards',
        'Online Booking & Dispatch Systems',
        'Secure Multi-Tenant SaaS MVP Builds',
      ],
      defaultServiceParam: 'Custom Web Applications',
    },
    {
      id: 'crm-integrations',
      icon: Workflow,
      number: '04',
      title: 'CRM Workflows & Data Pipelines',
      subtitle: 'Connect your website, ads, WhatsApp, and CRM into one dependable engine.',
      problem: 'Enquiries get lost across WhatsApp chats, shared inboxes, and disconnected forms with zero end-to-end pipeline visibility.',
      benefits: [
        'Zero manual data re-entry: forms push directly into your CRM of choice',
        'Support for Zoho CRM, HubSpot, GoHighLevel, LeadSquared, and Zapier',
        'Instant multi-channel notifications to sales executives on enquiry arrival',
        'Closed-loop conversion tracking from first ad impression to final deal closure',
      ],
      offerings: [
        'Zoho & HubSpot API Integrations',
        'WhatsApp Cloud Webhook Routing',
        'Automated Email & SMS Follow-ups',
        'Custom Webhook & Pipeline Automation',
      ],
      defaultServiceParam: 'CRM Integrations',
    },
    {
      id: 'seo-growth',
      icon: Search,
      number: '05',
      title: 'Technical SEO & Search Visibility',
      subtitle: 'Clean technical foundations that turn search into a compounding inbound asset.',
      problem: 'Websites plagued with crawl errors, missing JSON-LD schema, slow server responses, and thin content that search engines penalize.',
      benefits: [
        'Search-engine indexable static and server-rendered architecture',
        'Structured schema markup for local business authority and rich snippets',
        'Intent-focused landing page hierarchies built around customer search terminology',
        'Zero black-hat techniques; pure, durable technical search compliance',
      ],
      offerings: [
        'Technical Site Audits & Remediations',
        'Local SEO & Multi-City Architecture',
        'Schema & Rich Snippet Implementation',
        'Speed & Performance Remediation',
      ],
      defaultServiceParam: 'SEO & Search Architecture',
    },
    {
      id: 'operations-support',
      icon: ShieldCheck,
      number: '06',
      title: '24/7 Digital Operations & Maintenance',
      subtitle: 'Senior engineering vigilance to keep your digital storefront secure and fast.',
      problem: 'Agencies abandon clients after launch, leaving security patches ignored and nobody to call when a critical form or API breaks.',
      benefits: [
        'Direct access to senior developers who know your codebase inside and out',
        'Continuous uptime monitoring and proactive incident resolution',
        'Routine security updates, dependency patches, and daily backups',
        'Dedicated monthly development hours for copy updates and new feature iterations',
      ],
      offerings: [
        'Continuous Uptime & Health Monitoring',
        'Emergency Bug Resolution SLA',
        'API & Security Patching',
        'Monthly Iteration & Growth Hours',
      ],
      defaultServiceParam: 'Digital Operations & Maintenance',
    },
  ];

  const engagementModels = [
    {
      title: 'Fixed-Scope Project Sprint',
      idealFor: 'Businesses needing a new website, web app redesign, or defined AI integration.',
      duration: '2 to 4 Weeks',
      deliverables: [
        'Comprehensive audit & architecture blueprint',
        'Bespoke editorial UI/UX design',
        'Full React / Next.js implementation',
        'Database setup & CRM webhooks',
        '100% intellectual property & code handover',
      ],
      link: '/contact?model=project',
    },
    {
      title: 'Dedicated Engineering Retainer',
      idealFor: 'Established businesses that require continuous tech operations and iterative engineering.',
      duration: 'Ongoing Monthly Partnership',
      deliverables: [
        'Dedicated senior engineering capacity',
        'Guaranteed same-day support response',
        'Continuous performance & security monitoring',
        'Monthly conversion & feature enhancements',
        'Direct Slack / WhatsApp channel with engineers',
      ],
      link: '/contact?model=retainer',
    },
  ];

  return (
    <div className="flex-1 pt-32 pb-24">
      {/* 1. Services Hero */}
      <section className="relative pb-20">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl space-y-6">
            <Badge variant="primary">Full Service Catalog</Badge>
            <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Everything your business needs to{' '}
              <span className="text-gradient-red">acquire, convert, and operate.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              We provide six tightly integrated capabilities spanning high-speed frontend engineering, AI automation, and backend data operations — delivered by one accountable senior team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Detailed Service Offerings Grid */}
      <section className="py-12 border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20">
          {serviceCategories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                id={cat.id}
                className="scroll-mt-32 rounded-3xl border border-white/[0.08] bg-surface-900/80 p-8 sm:p-12 backdrop-blur-md transition-all hover:border-brand-500/30"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                  
                  {/* Left Column: Heading & Challenge */}
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-400 border border-brand-500/30">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-sm font-semibold text-gray-500">
                        CATEGORY {cat.number}
                      </span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      {cat.title}
                    </h2>

                    <p className="text-sm sm:text-base font-medium text-brand-300">
                      {cat.subtitle}
                    </p>

                    <div className="rounded-xl border border-rose-500/20 bg-rose-950/10 p-4 text-xs sm:text-sm text-gray-300">
                      <span className="font-semibold text-rose-400 block mb-1">The Problem We Solve:</span>
                      {cat.problem}
                    </div>

                    <Link
                      to={`/contact?service=${encodeURIComponent(cat.defaultServiceParam)}`}
                      className="btn-primary group inline-flex text-xs py-3"
                    >
                      <span>Inquire about this capability</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>

                  {/* Right Column: Key Benefits & Offerings */}
                  <div className="lg:col-span-7 space-y-6 border-t lg:border-t-0 lg:border-l border-white/[0.08] pt-6 lg:pt-0 lg:pl-10">
                    <div>
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">
                        Measurable Business Benefits
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {cat.benefits.map((benefit, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-300">
                            <Check className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/[0.06]">
                      <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-3">
                        Included Deliverables
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.offerings.map((item, oIdx) => (
                          <span
                            key={oIdx}
                            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs text-gray-300"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Engagement Models */}
      <section className="py-24 relative bg-surface-950/70 border-t border-white/[0.08]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            badge="Commercial Collaboration"
            title="Two transparent ways to"
            highlight="partner with Ethixweb."
            description="Clear scope boundaries, straightforward pricing, and zero hidden retainer traps."
          />

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8">
            {engagementModels.map((model, idx) => (
              <div
                key={idx}
                className="premium-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {model.title}
                    </h3>
                    <span className="font-mono text-xs text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
                      {model.duration}
                    </span>
                  </div>

                  <p className="text-sm text-gray-400 leading-relaxed">
                    <strong className="text-gray-300 block mb-1">Ideal For:</strong>
                    {model.idealFor}
                  </p>

                  <div className="space-y-3 pt-2">
                    <span className="font-mono text-xs font-semibold text-gray-300 uppercase tracking-wider block">
                      Scope & Guarantees:
                    </span>
                    <ul className="space-y-2.5">
                      {model.deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-300">
                          <Check className="h-4 w-4 text-brand-400 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-white/[0.08]">
                  <Link
                    to={model.link}
                    className="btn-primary w-full justify-center group"
                  >
                    <span>Discuss this engagement model</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Final CTA */}
      <CtaBanner />
    </div>
  );
}
