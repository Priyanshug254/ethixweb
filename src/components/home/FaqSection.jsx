import React, { useState } from 'react';
import SectionHeading from '../common/SectionHeading';
import { ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: 'What types of businesses do you typically partner with?',
      answer: 'We partner with growing Indian SMEs, B2B industrial suppliers, D2C brands, and professional services firms that have outgrown basic website templates and need robust digital operations, AI workflow automation, or bespoke web portals.',
    },
    {
      question: 'How fast can a redesign or custom web system be delivered?',
      answer: 'Most high-impact web redesigns and digital systems are delivered in 2 to 4 weeks depending on scope, database complexity, and API integrations. We work in disciplined two-week sprints with functional staging demos at every milestone.',
    },
    {
      question: 'How do you price your engagements?',
      answer: 'We operate on transparent milestone-based project scopes (typically starting from ₹75,000 to ₹3,50,000+ depending on architectural requirements) and ongoing digital operations retainers for continuous maintenance and optimization. We provide itemized quotes with zero hidden extras.',
    },
    {
      question: 'Who actually writes the code for our project?',
      answer: 'Your project is handled directly by senior developers and product designers. We do not use account executives to relay messages, nor do we pass client work down to junior apprentices.',
    },
    {
      question: 'Do we own the source code and digital assets after launch?',
      answer: 'Yes, 100%. Upon completion and final settlement, all intellectual property, source code repositories, database schemas, and design assets are fully transferred to your company. You are never locked into proprietary agency hosts.',
    },
    {
      question: 'How do your AI receptionists and chatbots work?',
      answer: 'We deploy secure conversational agents connected to your website and WhatsApp business endpoints. They are trained on your company knowledge base to qualify inbound buyer requirements, answer technical inquiries, and book consultation calls directly on your team calendars.',
    },
  ];

  return (
    <section className="py-24 sm:py-32 relative bg-surface-950/60 border-t border-white/[0.06]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          badge="Frequently Asked Questions"
          title="Direct answers to common"
          highlight="scoping inquiries."
          description="Everything you need to know about our collaboration model, delivery cadence, and technical standards."
          align="center"
        />

        <div className="mt-16 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/[0.08] bg-surface-900/80 backdrop-blur-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-2xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="font-display text-base sm:text-lg font-bold text-white pr-4">
                    {faq.question}
                  </span>
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.04] text-gray-400 border border-white/[0.08] transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-400 border-brand-500/40' : ''}`}>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${idx}`}
                    className="px-6 pb-6 pt-1 text-sm sm:text-base text-gray-400 leading-relaxed border-t border-white/[0.04]"
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
