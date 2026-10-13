import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, ShieldCheck, Clock } from 'lucide-react';
import EthixLogo from './EthixLogo';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [istTime, setIstTime] = useState('');
  const location = useLocation();

  // Update IST time live
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-IN', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  // Detect scroll state for background glass styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-surface-950/85 backdrop-blur-md border-b border-white/[0.07] shadow-lg shadow-black/20' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" aria-label="Main Navigation">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg p-1"
            aria-label="Ethixweb Home"
          >
            <EthixLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 rounded-full border border-white/[0.08] bg-surface-900/60 px-4 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-sm font-medium transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50 ${
                    isActive
                      ? 'text-white bg-white/[0.08] shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Right Header Utilities & CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Live IST Time indicator */}
            <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-surface-850/60 px-3 py-1 text-xs text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-mono text-[11px] text-gray-300">IST {istTime || '--:--'}</span>
            </div>

            {/* Admin portal shortcut */}
            <Link
              to="/admin"
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors py-1.5 px-2.5 rounded-lg border border-transparent hover:border-white/10"
              title="Admin Lead Management Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              <span>Admin</span>
            </Link>

            {/* Primary Action Button */}
            <Link
              to="/contact"
              className="btn-primary group"
              id="nav-cta-desktop"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to="/contact"
              className="rounded-full bg-brand-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-glow-sm"
            >
              Start
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-400 hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
              aria-controls="mobile-nav-dialog"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-dialog"
          className="fixed inset-x-0 top-[65px] bottom-0 z-40 bg-surface-950/95 backdrop-blur-xl border-t border-white/[0.08] p-6 flex flex-col justify-between overflow-y-auto md:hidden"
        >
          <div className="space-y-3 pt-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center justify-between py-3 px-4 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20'
                      : 'text-gray-300 hover:bg-white/[0.04] hover:text-white'
                  }`
                }
              >
                <span>{link.name}</span>
                <ArrowUpRight className="h-4 w-4 opacity-50" />
              </NavLink>
            ))}

            <Link
              to="/admin"
              className="flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/[0.04]"
            >
              <ShieldCheck className="h-4 w-4 text-brand-400" />
              <span>Admin Management Portal</span>
            </Link>
          </div>

          <div className="pt-6 border-t border-white/[0.08] space-y-4">
            <div className="flex items-center justify-between text-xs text-gray-400 px-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-400" /> India Time:
              </span>
              <span className="font-mono text-gray-200">IST {istTime || '--:--'}</span>
            </div>

            <Link
              to="/contact"
              className="btn-primary w-full justify-center py-3.5 text-base"
              id="mobile-nav-cta"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <p className="text-center text-xs text-gray-500 pt-2">
              We run the tech. You run the business.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
