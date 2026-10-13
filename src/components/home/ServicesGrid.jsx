import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Globe, 
  Bot, 
  Workflow, 
  Code2, 
  Search, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import SectionHeading from '../common/SectionHeading';

export default function ServicesGrid() {
  const services = [
    {
      icon: Globe,
      tag: '01 / Web',
      title: 'High-Performance Web Redesign',
      description: 'Transform outdated sites into clean, editorial, sub-second conversion machines. Engineered for fast rendering across Indian cellular networks.',
      features: ['Headless React / Next architecture', 'Core Web Vitals 90+ focus', 'Mobile-first funnel geometry'],
      link: '/services#web-development',
    },
    {
      icon: Bot,
      tag: '02 / AI',
      title: 'AI Receptionists & Lead Triage',
      description: 'Conversational assistants and booking bots that answer queries 24/7, qualify inbound prospect requirements, and book appointments directly on your calendar.',
      features: ['24/7 autonomous enquiry capture', 'WhatsApp & Web chat integration', 'Intelligent human handoff logic'],
      link: '/services#ai-automation',
    },
    {
      icon: Code2,
      tag: '03 / Software',
      title: 'Custom Web Applications & Portals',
      description: 'Tailor-made internal software, client dashboards, onboarding portals, and booking systems built to eliminate manual operational spreadsheets.',
      features: ['Role-based admin dashboards', 'Secure database architecture', 'Serverless API integrations'],
      link: '/services#web-apps',
    },
    {
      icon: Workflow,
      tag: '04 / Pipelines',
      title: 'CRM & Multi-Channel Workflows',
      description: 'Connect disparate tools into one unified pipeline. Synchronize enquiries from ads, WhatsApp, and websites into HubSpot, Zoho, or GoHighLevel automatically.',
      features: ['Bi-directional CRM data sync', 'Automated follow-up sequences', 'Real-time pipeline visibility'],
      link: '/services#crm-integrations',
    },
    {
      icon: Search,
      tag: '05 / Growth',
      title: 'Technical SEO & Search Architecture',
      description: 'Clean semantic structure, localized search schema, high-speed page delivery, and technical crawlability that capture high-intent buyers.',
      features: ['Programmatic landing pages', 'Schema & Rich Snippets', 'Local search authority foundations'],
      link: '/services#seo-growth',
    },
    {
      icon: ShieldCheck,
      tag: '06 / Support',
      title: 'Digital Operations & SLA Support',
      description: 'A dedicated senior tech team for your digital stack. Proactive security updates, performance monitoring, and rapid turnarounds on feature requests.',
      features: ['Guaranteed response windows', 'Zero-downtime deployments', 'Continuous security patching'],
      link: '/services#operations-support',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-16">
          <SectionHeading
            badge="Verified Capabilities"
            title="Senior operators for the systems that"
            highlight="grow the business."
            description="We replace fragmented vendors with one unified, senior-led engineering team managing your entire web and automation stack."
          />

          <Link
            to="/services"
            className="btn-secondary self-start md:self-end whitespace-nowrap group"
          >
            <span>View Full Service Catalog</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Services 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="premium-card rounded-2xl p-7 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 border border-brand-500/30 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-gray-500 group-hover:text-gray-400">
                      {service.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white pt-6 group-hover:text-brand-300 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="mt-5 space-y-2 pt-4 border-t border-white/[0.04]">
                    {service.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-xs text-gray-300">
                        <span className="h-1 w-1 rounded-full bg-brand-500" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.06]">
                  <Link
                    to={service.link}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-white transition-colors"
                  >
                    <span>Explore details</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
