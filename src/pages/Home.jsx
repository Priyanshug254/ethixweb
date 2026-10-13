import React from 'react';
import Hero from '../components/home/Hero';
import CredibilityStrip from '../components/home/CredibilityStrip';
import ServicesGrid from '../components/home/ServicesGrid';
import FeaturedWork from '../components/home/FeaturedWork';
import ProcessSection from '../components/home/ProcessSection';
import WhyEthixweb from '../components/home/WhyEthixweb';
import IndiaRelevance from '../components/home/IndiaRelevance';
import FaqSection from '../components/home/FaqSection';
import CtaBanner from '../components/home/CtaBanner';

export default function Home() {
  return (
    <div className="flex-1">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Credibility Marquee */}
      <CredibilityStrip />

      {/* 3. Services Grid */}
      <ServicesGrid />

      {/* 4. Featured Work (Labeled Concept Architectures) */}
      <FeaturedWork />

      {/* 5. Process Methodology */}
      <ProcessSection />

      {/* 6. Why Ethixweb vs. Typical Agency */}
      <WhyEthixweb />

      {/* 7. India Business Specific Relevance */}
      <IndiaRelevance />

      {/* 8. FAQ Accordion */}
      <FaqSection />

      {/* 9. Final CTA Banner */}
      <CtaBanner />
    </div>
  );
}
