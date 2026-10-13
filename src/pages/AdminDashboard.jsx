import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Search, 
  Filter, 
  Trash2, 
  Eye, 
  LogOut, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  AlertCircle, 
  X, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Building, 
  DollarSign, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import EthixLogo from '../components/common/EthixLogo';
import { supabase } from '../lib/supabase';
import { fetchAdminLeads, updateLeadStatus, deleteLeadRecord } from '../lib/api';

const STATUS_CONFIG = {
  new: { label: 'New Enquiry', bg: 'bg-rose-500/15', text: 'text-rose-400', border: 'border-rose-500/30' },
  contacted: { label: 'Contacted', bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  qualified: { label: 'Qualified', bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30' },
  closed: { label: 'Closed / Won', bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  archived: { label: 'Archived', bg: 'bg-gray-500/15', text: 'text-gray-400', border: 'border-gray-500/30' },
};

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Authentication State
  const [sessionToken, setSessionToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [authChecking, setAuthChecking] = useState(true);

  // Data State
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, closed: 0 });
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter & Search
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  // Modals
  const [selectedLead, setSelectedLead] = useState(null);
  const [leadToDelete, setLeadToDelete] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Check authentication session on mount
  useEffect(() => {
    async function initAuth() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          // Check fallback local session
          const rawLocal = localStorage.getItem('ethix_demo_session');
          if (rawLocal) {
            const parsed = JSON.parse(rawLocal);
            setSessionToken(parsed.access_token);
            setAdminUser(parsed.user);
          } else {
            navigate('/admin/login');
            return;
          }
        } else {
          setSessionToken(session.access_token);
          setAdminUser(session.user);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
        navigate('/admin/login');
      } finally {
        setAuthChecking(false);
      }
    }
    initAuth();
  }, [navigate]);

  // Toast timer
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Load leads function
  const loadLeads = useCallback(async (page = 1) => {
    if (!sessionToken) return;
    setLoading(true);
    setApiError(null);

    try {
      const res = await fetchAdminLeads(
        {
          page,
          limit: 10,
          status: statusFilter,
          search: activeSearch,
        },
        sessionToken
      );

      setLeads(res.leads || []);
      setStats(res.stats || { total: 0, new: 0, contacted: 0, qualified: 0, closed: 0 });
      setPagination(res.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (err) {
      console.error('Failed to load admin leads:', err);
      setApiError(err.message || 'Could not load leads from the server.');
    } finally {
      setLoading(false);
    }
  }, [sessionToken, statusFilter, activeSearch]);

  // Fetch when token or filters change
  useEffect(() => {
    if (sessionToken) {
      loadLeads(1);
    }
  }, [sessionToken, statusFilter, activeSearch, loadLeads]);

  // Handle Search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setActiveSearch(searchQuery.trim());
  };

  // Status transition handler
  const handleStatusChange = async (leadId, newStatus) => {
    setActionLoading(true);
    try {
      await updateLeadStatus(leadId, newStatus, sessionToken);
      setToastMessage(`Lead status updated to "${newStatus}".`);
      // Update locally
      setLeads((prev) =>
        prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
      );
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
      // Refresh stats
      loadLeads(pagination.page);
    } catch (err) {
      setApiError(err.message || 'Failed to update lead status.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete lead handler
  const confirmDeleteLead = async () => {
    if (!leadToDelete) return;
    setActionLoading(true);

    try {
      await deleteLeadRecord(leadToDelete.id, sessionToken);
      setToastMessage('Lead enquiry successfully deleted.');
      setLeadToDelete(null);
      if (selectedLead && selectedLead.id === leadToDelete.id) {
        setSelectedLead(null);
      }
      loadLeads(pagination.page);
    } catch (err) {
      setApiError(err.message || 'Failed to delete lead.');
    } finally {
      setActionLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('ethix_demo_session');
    navigate('/admin/login');
  };

  if (authChecking) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-gray-400">
          <RefreshCw className="h-5 w-5 animate-spin text-brand-500" />
          <span>Verifying administrator authorization...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-surface-950 pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Bar / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                Enquiry Management Portal
              </h1>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-mono font-semibold text-emerald-400 border border-emerald-500/20">
                Connected
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Logged in as <strong className="text-gray-300">{adminUser?.email || 'admin@ethixweb.com'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => loadLeads(pagination.page)}
              disabled={loading}
              className="btn-secondary text-xs py-2 px-3.5 flex items-center gap-2"
              title="Refresh Leads Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-2 text-xs font-semibold text-gray-300 hover:bg-rose-500/10 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-xs sm:text-sm text-emerald-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>{toastMessage}</span>
            </div>
            <button onClick={() => setToastMessage(null)} className="text-emerald-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* API Error Banner */}
        {apiError && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs sm:text-sm text-rose-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-rose-400" />
              <span>{apiError}</span>
            </div>
            <button onClick={() => setApiError(null)} className="text-rose-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* 1. Overview Dynamic Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-2xl border border-white/[0.08] bg-surface-900/90 p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Total Enquiries</span>
              <Users className="h-4 w-4 text-gray-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {stats.total}
            </p>
            <span className="text-[11px] text-gray-500">Live database rows</span>
          </div>

          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-rose-300">
              <span>New / Unread</span>
              <Sparkles className="h-4 w-4 text-rose-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-rose-400">
              {stats.new}
            </p>
            <span className="text-[11px] text-rose-400/70">Awaiting contact</span>
          </div>

          <div className="rounded-2xl border border-amber-500/20 bg-amber-950/10 p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300">
              <span>In-Progress</span>
              <Clock className="h-4 w-4 text-amber-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-amber-400">
              {stats.contacted}
            </p>
            <span className="text-[11px] text-amber-400/70">First call completed</span>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-950/10 p-5 space-y-2">
            <div className="flex items-center justify-between text-xs text-blue-300">
              <span>Qualified</span>
              <ShieldCheck className="h-4 w-4 text-blue-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-blue-400">
              {stats.qualified}
            </p>
            <span className="text-[11px] text-blue-400/70">Proposal pending</span>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-5 space-y-2 col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-xs text-emerald-300">
              <span>Closed / Won</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="font-display text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {stats.closed}
            </p>
            <span className="text-[11px] text-emerald-400/70">Project active</span>
          </div>
        </div>

        {/* 2. Filters & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-surface-900/60 p-4">
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'new', 'contacted', 'qualified', 'closed'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all ${
                  statusFilter === status
                    ? 'bg-brand-500 text-white shadow-glow-sm'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, email, company..."
                className="w-full rounded-xl border border-white/[0.1] bg-surface-850 pl-9 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-500"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-gray-400" />
            </div>

            <button
              type="submit"
              className="btn-secondary text-xs py-2 px-3 whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>

        {/* 3. Main Leads Table */}
        <div className="rounded-2xl border border-white/[0.08] bg-surface-900/90 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th scope="col" className="p-4 font-mono text-xs uppercase text-gray-400">
                    Lead / Client
                  </th>
                  <th scope="col" className="p-4 font-mono text-xs uppercase text-gray-400">
                    Service of Interest
                  </th>
                  <th scope="col" className="p-4 font-mono text-xs uppercase text-gray-400">
                    Budget Tier
                  </th>
                  <th scope="col" className="p-4 font-mono text-xs uppercase text-gray-400">
                    Submitted
                  </th>
                  <th scope="col" className="p-4 font-mono text-xs uppercase text-gray-400">
                    Status
                  </th>
                  <th scope="col" className="p-4 font-mono text-xs uppercase text-gray-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/[0.06]">
                {loading ? (
                  // Loading Skeletons
                  Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="p-4">
                        <div className="h-4 w-32 bg-white/[0.05] rounded mb-1.5" />
                        <div className="h-3 w-44 bg-white/[0.03] rounded" />
                      </td>
                      <td className="p-4"><div className="h-4 w-28 bg-white/[0.05] rounded" /></td>
                      <td className="p-4"><div className="h-4 w-20 bg-white/[0.05] rounded" /></td>
                      <td className="p-4"><div className="h-4 w-24 bg-white/[0.05] rounded" /></td>
                      <td className="p-4"><div className="h-6 w-20 bg-white/[0.05] rounded-full" /></td>
                      <td className="p-4 text-right"><div className="h-6 w-16 bg-white/[0.05] rounded ml-auto" /></td>
                    </tr>
                  ))
                ) : leads.length === 0 ? (
                  // Empty State
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-gray-400">
                      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.04] text-gray-500 mb-3">
                        <Users className="h-6 w-6" />
                      </div>
                      <p className="font-semibold text-white">No enquiries found</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activeSearch || statusFilter !== 'all'
                          ? 'Try clearing your search query or status filter.'
                          : 'No submissions yet. Submit a test enquiry on the Contact page to verify persistence.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  // Live Leads Data
                  leads.map((lead) => {
                    const statusConf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.new;
                    const formattedDate = new Date(lead.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    });

                    return (
                      <tr key={lead.id} className="transition-colors hover:bg-white/[0.02]">
                        <td className="p-4">
                          <strong className="text-white block font-medium">
                            {lead.full_name}
                          </strong>
                          <span className="text-xs text-gray-400 block">{lead.email}</span>
                          {lead.company && (
                            <span className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                              <Building className="h-3 w-3" /> {lead.company}
                            </span>
                          )}
                        </td>

                        <td className="p-4 text-gray-300">
                          <span className="rounded bg-white/[0.04] px-2 py-1 text-xs border border-white/[0.06]">
                            {lead.service}
                          </span>
                        </td>

                        <td className="p-4 text-xs font-mono text-gray-400">
                          {lead.budget || '—'}
                        </td>

                        <td className="p-4 text-xs font-mono text-gray-400">
                          {formattedDate}
                        </td>

                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            disabled={actionLoading}
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold border ${statusConf.bg} ${statusConf.text} ${statusConf.border} bg-surface-900 focus:outline-none focus:ring-1 focus:ring-brand-500`}
                          >
                            <option value="new">New Enquiry</option>
                            <option value="contacted">Contacted</option>
                            <option value="qualified">Qualified</option>
                            <option value="closed">Closed / Won</option>
                            <option value="archived">Archived</option>
                          </select>
                        </td>

                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setSelectedLead(lead)}
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/[0.06] hover:text-white transition-colors"
                              title="View Full Enquiry Details"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              type="button"
                              onClick={() => setLeadToDelete(lead)}
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                              title="Delete Lead"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Pagination */}
          <div className="flex items-center justify-between p-4 border-t border-white/[0.08] text-xs text-gray-400 bg-white/[0.01]">
            <span>
              Showing {leads.length} of {pagination.total} enquiries (Page {pagination.page} of {pagination.totalPages})
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => loadLeads(pagination.page - 1)}
                disabled={pagination.page <= 1 || loading}
                className="rounded-lg border border-white/[0.08] p-1.5 text-gray-400 hover:text-white hover:bg-white/[0.04] disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => loadLeads(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages || loading}
                className="rounded-lg border border-white/[0.08] p-1.5 text-gray-400 hover:text-white hover:bg-white/[0.04] disabled:opacity-30 disabled:pointer-events-none"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Lead Details Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl rounded-3xl border border-white/10 bg-surface-900 p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
              <div>
                <span className="font-mono text-xs text-brand-400 uppercase tracking-wider">
                  Enquiry Dossier
                </span>
                <h3 className="font-display text-2xl font-bold text-white mt-1">
                  {selectedLead.full_name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-full p-2 text-gray-400 hover:bg-white/[0.06] hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 space-y-1">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-brand-400" /> Business Email
                </span>
                <a href={`mailto:${selectedLead.email}`} className="text-white font-medium hover:underline block">
                  {selectedLead.email}
                </a>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 space-y-1">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-brand-400" /> Phone / WhatsApp
                </span>
                <span className="text-white font-medium block">
                  {selectedLead.phone || 'Not provided'}
                </span>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 space-y-1">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <Building className="h-3.5 w-3.5 text-brand-400" /> Company Name
                </span>
                <span className="text-white font-medium block">
                  {selectedLead.company || 'Not provided'}
                </span>
              </div>

              <div className="rounded-xl border border-white/[0.06] bg-surface-850 p-3.5 space-y-1">
                <span className="text-gray-400 flex items-center gap-1.5">
                  <DollarSign className="h-3.5 w-3.5 text-brand-400" /> Budget Range
                </span>
                <span className="text-white font-medium block">
                  {selectedLead.budget || 'Undecided / Flexible'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-300 block">
                Selected Service:
              </span>
              <span className="inline-block rounded-lg bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-300 border border-brand-500/20">
                {selectedLead.service}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold text-gray-300 block">
                Project Description & Bottlenecks:
              </span>
              <div className="rounded-xl border border-white/[0.06] bg-surface-850 p-4 text-xs sm:text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">
                {selectedLead.message}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/[0.08] text-xs">
              <div className="text-gray-500">
                Created: {new Date(selectedLead.created_at).toLocaleString('en-IN')}
              </div>

              <div className="flex items-center gap-3">
                <label className="text-gray-400">Update Status:</label>
                <select
                  value={selectedLead.status}
                  onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                  disabled={actionLoading}
                  className="rounded-lg border border-white/[0.1] bg-surface-850 px-3 py-1.5 text-xs text-white"
                >
                  <option value="new">New Enquiry</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="closed">Closed / Won</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Delete Confirmation Modal */}
      {leadToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-surface-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <Trash2 className="h-6 w-6" />
              <h3 className="font-display text-lg font-bold text-white">
                Delete Enquiry Permanently?
              </h3>
            </div>

            <p className="text-xs text-gray-300 leading-relaxed">
              Are you sure you want to delete the enquiry from <strong>{leadToDelete.full_name}</strong> ({leadToDelete.email})? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 pt-3 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => setLeadToDelete(null)}
                className="btn-secondary text-xs py-2 px-4"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteLead}
                disabled={actionLoading}
                className="rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
