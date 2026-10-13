import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, Mail, AlertCircle, Loader2, ArrowRight, KeyRound } from 'lucide-react';
import EthixLogo from '../components/common/EthixLogo';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Check if session already exists
  useEffect(() => {
    async function checkExistingSession() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        navigate('/admin');
      }
    }
    checkExistingSession();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) {
        setErrorMsg(error.message || 'Authentication failed. Please verify credentials.');
      } else if (data?.user) {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login process error:', err);
      setErrorMsg('An unexpected network error occurred while attempting authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemoCredentials = () => {
    setEmail('admin@ethixweb.com');
    setPassword('EthixwebAdmin2026!');
  };

  return (
    <div className="flex-1 flex items-center justify-center min-h-[85vh] px-4 py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Glow behind card */}
        <div className="absolute -inset-1 rounded-3xl bg-brand-500/20 blur-xl opacity-60" />

        <div className="relative rounded-3xl border border-white/10 bg-surface-900/95 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="text-center space-y-3 pb-6 border-b border-white/[0.08]">
            <div className="flex justify-center">
              <EthixLogo />
            </div>
            <div className="pt-2">
              <h1 className="font-display text-2xl font-bold text-white">
                Admin Operations Portal
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Authorized access for enquiry and lead management
              </p>
            </div>
          </div>

          {errorMsg && (
            <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-300 flex items-start gap-2.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label htmlFor="admin_email" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Administrator Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="admin_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ethixweb.com"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-white/[0.1] bg-surface-850 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
                <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label htmlFor="admin_password" className="block text-xs font-semibold text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id="admin_password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  disabled={loading}
                  className="w-full rounded-xl border border-white/[0.1] bg-surface-850 pl-10 pr-4 py-3 text-sm text-white placeholder-gray-500 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                />
                <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center py-3.5 mt-2"
              id="admin-login-submit"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Credentials Autofill Banner */}
          <div className="mt-6 pt-5 border-t border-white/[0.08] text-xs space-y-3">
            <div className="flex items-center justify-between text-gray-400">
              <span className="flex items-center gap-1.5 font-medium text-gray-300">
                <KeyRound className="h-3.5 w-3.5 text-brand-400" />
                <span>Evaluator Demo Login</span>
              </span>
              <button
                type="button"
                onClick={handleFillDemoCredentials}
                className="text-brand-400 hover:text-brand-300 font-semibold underline"
              >
                Autofill
              </button>
            </div>
            <p className="text-[11px] text-gray-500 leading-normal">
              Pre-configured demo administrator credentials for assessment testing and security validation.
            </p>
          </div>

          <div className="mt-4 pt-3 text-center">
            <a href="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              ← Back to public website
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
