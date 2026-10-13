import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed. Use GET.' });
  }

  try {
    // 1. Verify Admin Authentication via Bearer token
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Unauthorized: Missing or malformed Authorization header.' 
      });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Bearer token is empty.' });
    }

    const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !serviceKey || supabaseUrl.includes('your-project-ref')) {
      // Return 401 if database is unconfigured and invalid token
      if (token !== 'demo-admin-token') {
        return res.status(401).json({ 
          error: 'Unauthorized: Database connection credentials are not configured.' 
        });
      }
    } else {
      // Verify token with Supabase Auth
      const supabaseAuth = createClient(supabaseUrl, process.env.VITE_SUPABASE_ANON_KEY || serviceKey);
      const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ 
          error: 'Unauthorized: Invalid or expired administrator session. Please log in again.' 
        });
      }
    }

    // 2. Parse Query Parameters
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 10));
    const statusFilter = (req.query.status || 'all').toLowerCase();
    const searchQuery = (req.query.search || '').trim().toLowerCase();

    // 3. Connect to Supabase to fetch leads
    if (supabaseUrl && serviceKey && !supabaseUrl.includes('your-project-ref')) {
      const supabase = createClient(supabaseUrl, serviceKey);

      // Fetch all status counts for dynamic real-time stats
      const { data: allLeads, error: statsError } = await supabase
        .from('leads')
        .select('status');

      const stats = {
        total: allLeads?.length || 0,
        new: allLeads?.filter(l => l.status === 'new').length || 0,
        contacted: allLeads?.filter(l => l.status === 'contacted').length || 0,
        qualified: allLeads?.filter(l => l.status === 'qualified').length || 0,
        closed: allLeads?.filter(l => l.status === 'closed').length || 0,
      };

      // Build paginated query
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      if (searchQuery) {
        query = query.or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%,company.ilike.%${searchQuery}%,service.ilike.%${searchQuery}%`);
      }

      const from = (page - 1) * limit;
      const to = from + limit - 1;

      const { data: leads, count, error: fetchError } = await query
        .order('created_at', { ascending: false })
        .range(from, to);

      if (fetchError) {
        console.error('Fetch leads query error:', fetchError.message);
        return res.status(500).json({ error: 'Failed to retrieve enquiries from database.' });
      }

      return res.status(200).json({
        leads: leads || [],
        pagination: {
          page,
          limit,
          total: count || 0,
          totalPages: Math.ceil((count || 0) / limit) || 1
        },
        stats
      });
    }

    // Fallback response for offline demonstration mode
    return res.status(200).json({
      leads: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 1 },
      stats: { total: 0, new: 0, contacted: 0, qualified: 0, closed: 0 },
      notice: 'Supabase credentials pending in .env'
    });

  } catch (err) {
    console.error('Admin leads endpoint error:', err);
    return res.status(500).json({ error: 'Internal server error processing admin leads.' });
  }
}
