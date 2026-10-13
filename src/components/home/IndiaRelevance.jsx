import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Smartphone, Zap, MessageSquare, CreditCard, Shield, Clock } from 'lucide-react';

export default function IndiaRelevance() {
  const pillars = [
    {
      icon: MessageSquare,
      title: 'WhatsApp-First Enquiries',
      description: 'Indian prospects convert faster via WhatsApp than cold email forms. We build dual-pathway funnels that capture verified WhatsApp contacts and auto-sync with your CRM.',
    },
    {
      icon: Smartphone,
      title: 'Mobile-First Edge Performance',
      description: 'Over 82% of Indian business visitors browse via mobile. We engineer lightweight bundles and asset caching that load instantaneously even on fluctuating 4G/5G connections.',
    },
    {
      icon: CreditCard,
      title: 'INR Pricing & GST Transparency',
      description: 'Transparent rupee engagement tiers with clean GST invoicing. No unpredictable currency fluctuation surprises or international wire friction.',
    },
    {
      icon: Clock,
      title: 'Aligned IST Working Windows',
      description: 'Direct collaboration during standard Indian business hours (9:00 AM – 6:00 PM IST). Fast same-day turnaround on mission-critical digital updates.',
    },
    {
      icon: Zap,
      title: 'D2C & B2B Pipeline Alignment',
      description: 'Whether scaling a direct-to-consumer brand or streamlining enterprise B2B RFP proposals, our systems are tailored to Indian commercial realities.',
    },
    {
      icon: Shield,
      title: 'Enterprise Data Governance',
      description: 'Zero third-party tracking bloat. Strict privacy hygiene adhering to emerging Digital Personal Data Protection (DPDP) standards.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="India-Specific Positioning"
          title="Digital engineering tuned for"
          highlight="Indian business dynamics."
          description="We combine international engineering standards with the specific operational, communication, and conversion realities of modern Indian companies."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="premium-card rounded-2xl p-7 relative group"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-400 border border-brand-500/30 mb-6 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-brand-300 transition-colors">
                  {pillar.title}
                </h3>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
