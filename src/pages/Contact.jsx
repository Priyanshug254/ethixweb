import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Mail, 
  ShieldCheck, 
  PhoneCall, 
  Sparkles, 
  Loader2,
  Lock
} from 'lucide-react';
import Badge from '../components/common/Badge';
import { submitLead } from '../lib/api';
import { validateLeadForm } from '../lib/validation';

export default function Contact() {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    company: '',
    service: preselectedService || 'Website Redesign',
    budget: '',
    message: '',
    consent: false,
    // Honeypot fields for anti-spam
    _hp_title: '',
    website_url_hp: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedLeadId, setSubmittedLeadId] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Update selected service if query param changes
  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError(null);

    // 1. Client-side validation
    const validation = validateLeadForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 2. Submit to backend API endpoint /api/leads
      const result = await submitLead(formData);
      setSubmitSuccess(true);
      setSubmittedLeadId(result.lead_id);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setApiError(err.message || 'An unexpected error occurred while saving your enquiry.');
      if (err.errors) {
        setErrors(err.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      full_name: '',
      email: '',
      phone: '',
      company: '',
      service: 'Website Redesign',
      budget: '',
      message: '',
      consent: false,
      _hp_title: '',
      website_url_hp: '',
    });
    setErrors({});
    setSubmitSuccess(false);
    setSubmittedLeadId(null);
    setApiError(null);
  };

  return (
    <div className="flex-1 pt-32 pb-24">
      {/* Background ambience */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Context, Process & Guarantees */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <Badge variant="primary">Start a Project</Badge>
              <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Let's build something{' '}
                <span className="text-gradient-red">worth building.</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                Share your requirements. We inspect your existing website and stack before we speak, so our first scoping conversation addresses exactly what is costing you revenue.
              </p>
            </div>

            {/* 3 Step What Happens Next Box */}
            <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-surface-900/80 p-6 backdrop-blur-sm">
              <h2 className="font-display text-xs font-bold uppercase tracking-wider text-white">
                What Happens After You Submit:
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 font-mono font-bold text-xs border border-brand-500/30">
                    1
                  </span>
                  <div>
                    <strong className="text-white block">We study your current presence</strong>
                    <span className="text-gray-400">How your site ranks, mobile speed scores, and where prospects drop off.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 font-mono font-bold text-xs border border-brand-500/30">
                    2
                  </span>
                  <div>
                    <strong className="text-white block">A focused scoping conversation</strong>
                    <span className="text-gray-400">Directly with a senior engineer to confirm technical fit and deliverables.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-brand-400 font-mono font-bold text-xs border border-brand-500/30">
                    3
                  </span>
                  <div>
                    <strong className="text-white block">Transparent technical proposal</strong>
                    <span className="text-gray-400">Clear milestones, fixed costs, and 2–4 week deployment schedule.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] text-xs text-brand-300 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 shrink-0 text-brand-400" />
                <span>One direct call. Zero marketing drip sequences or spam.</span>
              </div>
            </div>

            {/* Direct Contact Backup */}
            <div className="space-y-3 pt-2 text-xs text-gray-400">
              <p className="font-semibold text-gray-300">Alternative Direct Channel:</p>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-brand-400" />
                <a href="mailto:info@ethixweb.com" className="hover:text-white transition-colors underline">
                  info@ethixweb.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-brand-400" />
                <span>Mon – Fri · 9:00 AM – 5:00 PM (IST / Pacific)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Enquiry Form or Success State */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl border border-white/10 bg-surface-900/95 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
              
              {submitSuccess ? (
                /* Success Confirmation State */
                <div className="py-12 text-center space-y-6">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      Enquiry Registered Successfully
                    </h2>
                    <p className="text-sm text-gray-300 max-w-md mx-auto">
                      Thank you! Your project brief has been securely persisted to our database. A senior Ethixweb engineer will review your details and reach out within 24 business hours.
                    </p>
                  </div>

                  {submittedLeadId && (
                    <div className="inline-block rounded-lg bg-surface-850 px-4 py-2 border border-white/[0.08] text-xs font-mono text-gray-400">
                      Tracking Reference ID: <span className="text-brand-300">{submittedLeadId}</span>
                    </div>
                  )}

                  <div className="pt-4 flex flex-wrap justify-center gap-4">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn-secondary text-xs"
                    >
                      Submit Another Enquiry
                    </button>
                    <Link to="/" className="btn-primary text-xs">
                      Return to Home
                    </Link>
                  </div>
                </div>
              ) : (
                /* Active Project Enquiry Form */
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="pb-3 border-b border-white/[0.08]">
                    <h2 className="font-display text-xl font-bold text-white">
                      Project Scoping Brief
                    </h2>
                    <p className="text-xs text-gray-400">
                      Fill out the fields below. Required fields are clearly marked.
                    </p>
                  </div>

                  {apiError && (
                    <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs sm:text-sm text-rose-300 flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 shrink-0 text-rose-400 mt-0.5" />
                      <span>{apiError}</span>
                    </div>
                  )}

                  {/* Honeypot Spam Traps (hidden) */}
                  <div className="hidden" aria-hidden="true">
                    <label htmlFor="_hp_title">Leave this field blank</label>
                    <input
                      type="text"
                      id="_hp_title"
                      name="_hp_title"
                      value={formData._hp_title}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <input
                      type="text"
                      id="website_url_hp"
                      name="website_url_hp"
                      value={formData.website_url_hp}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {/* Row 1: Full Name & Business Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="full_name" className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Full Name <span className="text-brand-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        placeholder="e.g. Rohan Sharma"
                        required
                        disabled={isSubmitting}
                        className={`w-full rounded-xl border bg-surface-850 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
                          errors.full_name ? 'border-rose-500 focus:border-rose-500' : 'border-white/[0.1] focus:border-brand-500'
                        }`}
                      />
                      {errors.full_name && (
                        <p className="mt-1 text-xs text-rose-400">{errors.full_name}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Business Email <span className="text-brand-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="rohan@company.in"
                        required
                        disabled={isSubmitting}
                        className={`w-full rounded-xl border bg-surface-850 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
                          errors.email ? 'border-rose-500 focus:border-rose-500' : 'border-white/[0.1] focus:border-brand-500'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-400">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Phone & Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Phone Number <span className="text-gray-500 font-normal">(optional, for WhatsApp / Call)</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        disabled={isSubmitting}
                        className={`w-full rounded-xl border bg-surface-850 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
                          errors.phone ? 'border-rose-500 focus:border-rose-500' : 'border-white/[0.1] focus:border-brand-500'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-400">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="company" className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Company / Organization <span className="text-gray-500 font-normal">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Zenith Enterprises"
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-white/[0.1] bg-surface-850 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                      />
                    </div>
                  </div>

                  {/* Row 3: Service of Interest & Estimated Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="service" className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Primary Service Needed <span className="text-brand-400">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-white/[0.1] bg-surface-850 px-4 py-3 text-sm text-white transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                      >
                        <option value="Website Redesign">Website Redesign & Headless Architecture</option>
                        <option value="AI Automation & Chatbots">AI Receptionists & Autonomous Chatbots</option>
                        <option value="Custom Web Applications">Custom Web Applications & Portals</option>
                        <option value="CRM Integrations">CRM & Workflow Automation</option>
                        <option value="SEO & Search Architecture">Performance SEO & Digital Visibility</option>
                        <option value="Digital Operations & Maintenance">24/7 Digital Operations & Maintenance</option>
                        <option value="Other Comprehensive Solution">Other / End-to-End Modernization</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Estimated Budget Tier <span className="text-gray-500 font-normal">(INR / USD)</span>
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full rounded-xl border border-white/[0.1] bg-surface-850 px-4 py-3 text-sm text-white transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                      >
                        <option value="">Select an estimated budget range</option>
                        <option value="₹75,000 – ₹1,50,000">₹75,000 – ₹1,50,000 (Targeted Project)</option>
                        <option value="₹1,50,000 – ₹3,50,000">₹1,50,000 – ₹3,50,000 (Full Redesign / AI)</option>
                        <option value="₹3,50,000+">₹3,50,000+ (Custom Enterprise Portal)</option>
                        <option value="Monthly Retainer (₹40,000+/mo)">Monthly Retainer (₹40,000+/mo)</option>
                        <option value="Undecided / Flexible">Undecided / Discussion Required</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Description */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-300 mb-1.5">
                      Project Description & Current Bottlenecks <span className="text-brand-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share details on your current site, tech stack, key problems, or upcoming project objectives..."
                      required
                      disabled={isSubmitting}
                      className={`w-full rounded-xl border bg-surface-850 px-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-500/50 ${
                        errors.message ? 'border-rose-500 focus:border-rose-500' : 'border-white/[0.1] focus:border-brand-500'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-400">{errors.message}</p>
                    )}
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-surface-850 text-brand-500 focus:ring-brand-500/40"
                      />
                      <span className="text-xs text-gray-400 leading-normal">
                        I agree to have Ethixweb process my submitted information solely for the purpose of reviewing my enquiry and responding with a technical scoping assessment.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="mt-1 text-xs text-rose-400">{errors.consent}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full justify-center py-4 text-base shadow-glow-sm"
                      id="submit-enquiry-button"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Validating & Registering Brief...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
                          <Send className="h-4 w-4 ml-1" />
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-center text-[11px] text-gray-500 flex items-center justify-center gap-1.5 pt-1">
                    <Lock className="w-3 h-3 text-brand-400" />
                    <span>Protected by server-side validation, rate limiting, and encrypted storage.</span>
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
