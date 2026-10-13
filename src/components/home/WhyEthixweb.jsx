import React from 'react';
import SectionHeading from '../common/SectionHeading';
import { Check, X, ShieldCheck, Zap, Users, Code } from 'lucide-react';

export default function WhyEthixweb() {
  const comparison = [
    {
      criteria: 'Team Composition',
      ethixweb: '100% Senior engineers & product designers with deep domain mastery.',
      typicalAgency: 'Junior developers learning on your budget overseen by non-technical managers.',
    },
    {
      criteria: 'Communication Channel',
      ethixweb: 'Direct access to engineers building your project via Slack or WhatsApp.',
      typicalAgency: 'Account executives and project coordinators filtering and delaying messages.',
    },
    {
      criteria: 'Speed to Production',
      ethixweb: '2–4 week launch sprint cycles with functional weekly staging reviews.',
      typicalAgency: 'Months of slide decks, wireframe reviews, and scope creep delays.',
    },
    {
      criteria: 'Engineering Integrity',
      ethixweb: 'Clean React code, semantic HTML, sub-second TTFB, and full IP transfer.',
      typicalAgency: 'Bloated page builder templates, plugin dependency traps, and locked code.',
    },
    {
      criteria: 'Commercial Alignment',
      ethixweb: 'Obsessed with conversion yield, pipeline automation, and operational ROI.',
      typicalAgency: 'Focused on billable hours, vanity metrics, and add-on change requests.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-surface-950/70 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="The Ethixweb Difference"
          title="Engineered for business owners tired of"
          highlight="big-agency theater."
          description="We built Ethixweb around direct collaboration, senior craftsmanship, and straight talk — delivering systems that actually compound business value."
        />

        {/* Comparison Table */}
        <div className="mt-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-900/90 shadow-2xl backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th scope="col" className="p-5 font-mono text-xs uppercase text-gray-400 w-1/4">
                    Comparison Dimension
                  </th>
                  <th scope="col" className="p-5 font-display text-sm font-bold text-brand-400 w-3/8 bg-brand-500/[0.04]">
                    Ethixweb Partnership
                  </th>
                  <th scope="col" className="p-5 font-mono text-xs uppercase text-gray-500 w-3/8">
                    Traditional Agency Model
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {comparison.map((item, idx) => (
                  <tr key={idx} className="transition-colors hover:bg-white/[0.01]">
                    <td className="p-5 font-medium text-white text-xs sm:text-sm">
                      {item.criteria}
                    </td>
                    <td className="p-5 text-gray-200 text-xs sm:text-sm bg-brand-500/[0.02]">
                      <div className="flex items-start gap-2.5">
                        <Check className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
                        <span>{item.ethixweb}</span>
                      </div>
                    </td>
                    <td className="p-5 text-gray-400 text-xs sm:text-sm">
                      <div className="flex items-start gap-2.5">
                        <X className="h-4 w-4 text-gray-500 shrink-0 mt-0.5" />
                        <span>{item.typicalAgency}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
