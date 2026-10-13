import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Clock, Shield, Globe, ArrowUpRight } from 'lucide-react';
import EthixLogo from './EthixLogo';

export default function Footer() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-white/[0.08] bg-surface-950 pt-16 pb-12 text-sm text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
          {/* Brand & Positioning statement */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" aria-label="Ethixweb Home">
              <EthixLogo />
            </Link>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              We run the tech. You run the business. Senior full-stack engineering, high-conversion websites, and autonomous AI systems built for ambitious Indian enterprises and modern brands.
            </p>

            <div className="space-y-2.5 pt-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400 shrink-0" />
                <a href="mailto:info@ethixweb.com" className="hover:text-white transition-colors">
                  info@ethixweb.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-400 shrink-0" />
                <span>Mon – Fri · 9:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-brand-400 shrink-0" />
                <span>Serving Indian Enterprises & Global Markets</span>
              </div>
            </div>
          </div>

          {/* Core Services Links */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Core Capabilities
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  High-Performance Web Redesign
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  AI Receptionists & Chatbots
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Workflow & CRM Integrations
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Custom Web Applications & Portals
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Technical SEO & Speed Optimization
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  24/7 Digital Operations & Maintenance
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="font-display text-xs font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Ethixweb
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact & Project Brief
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-brand-400 text-brand-500/80 transition-colors flex items-center gap-1 font-semibold">
                  <Shield className="w-3 h-3" /> Admin Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* India Relevance & Integrity Box */}
          <div className="rounded-2xl border border-white/[0.08] bg-surface-900/60 p-5 backdrop-blur-sm space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-brand-500 shadow-glow-sm"></span>
              <span className="font-display text-xs font-bold text-white tracking-wide">
                Direct Engineering Delivery
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              No junior layers. No account manager telephone games. Speak directly with senior engineers building your conversion architecture.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 pt-1 transition-colors"
            >
              <span>Schedule a scoping discussion</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Legal & Corporate Disclosure Strip */}
        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="text-center md:text-left space-y-1">
            <p>
              © {currentYear} Ethixweb. All rights reserved.
            </p>
            <p className="text-[11px] text-gray-400">
              Ethixweb USA LLC (Wyoming, US entity) · Dedicated engineering delivery tailored for Indian businesses & global operations.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-gray-400 transition-colors">
              Operating Principles
            </Link>
            <Link to="/contact" className="hover:text-gray-400 transition-colors">
              Client Enquiries
            </Link>
            <Link to="/admin" className="hover:text-brand-400 transition-colors">
              Portal Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
