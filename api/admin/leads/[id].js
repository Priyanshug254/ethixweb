import { createClient } from '@supabase/supabase-js';

const ALLOWED_STATUSES = ['new', 'contacted', 'qualified', 'closed', 'archived'];

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Extract ID from query (Vercel assigns dynamic param to req.query.id)
  const leadId = req.query.id;
  if (!leadId) {
    return res.status(400).json({ error: 'Missing lead ID parameter.' });
  }

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

  if (supabaseUrl && serviceKey && !supabaseUrl.includes('your-project-ref')) {
    const supabaseAuth = createClient(supabaseUrl, process.env.VITE_SUPABASE_ANON_KEY || serviceKey);
    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser(token);

    if (authError || !user) {
      return res.status(401).json({ 
        error: 'Unauthorized: Invalid or expired administrator session. Please log in again.' 
      });
    }
  } else if (token !== 'demo-admin-token') {
    return res.status(401).json({ error: 'Unauthorized: Admin session verification failed.' });
  }

  const supabase = (supabaseUrl && serviceKey && !supabaseUrl.includes('your-project-ref'))
    ? createClient(supabaseUrl, serviceKey)
    : null;

  // 2. PATCH: Update status
  if (req.method === 'PATCH') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
      const { status } = body;

      if (!status || !ALLOWED_STATUSES.includes(status)) {
        return res.status(400).json({ 
          error: `Invalid status. Allowed values are: ${ALLOWED_STATUSES.join(', ')}` 
        });
      }

      if (supabase) {
        const { data, error } = await supabase
          .from('leads')
          .update({ 
            status,
            updated_at: new Date().toISOString()
          })
          .eq('id', leadId)
          .select()
          .single();

        if (error) {
          console.error('Update lead error:', error.message);
          return res.status(500).json({ error: 'Failed to update lead status in database.' });
        }

        if (!data) {
          return res.status(404).json({ error: 'Lead not found.' });
        }

        return res.status(200).json({
          success: true,
          lead: data,
          message: `Lead status successfully updated to "${status}".`
        });
      }

      // Offline mock response
      return res.status(200).json({
        success: true,
        lead: { id: leadId, status, updated_at: new Date().toISOString() },
        message: `Lead status updated to "${status}" (local mock).`
      });
    } catch (err) {
      console.error('PATCH handler error:', err);
      return res.status(500).json({ error: 'Internal server error while updating lead.' });
    }
  }

  // 3. DELETE: Delete lead
  if (req.method === 'DELETE') {
    try {
      if (supabase) {
        const { error } = await supabase
          .from('leads')
          .delete()
          .eq('id', leadId);

        if (error) {
          console.error('Delete lead error:', error.message);
          return res.status(500).json({ error: 'Failed to delete lead from database.' });
        }

        return res.status(200).json({
          success: true,
          message: 'Lead permanently removed.'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lead permanently removed (local mock).'
      });
    } catch (err) {
      console.error('DELETE handler error:', err);
      return res.status(500).json({ error: 'Internal server error while deleting lead.' });
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed. Use PATCH or DELETE.' });
}
