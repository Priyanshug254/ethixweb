import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-ref') && 
  supabaseAnonKey.length > 20
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: async ({ email, password }) => {
          if (email === 'admin@ethixweb.com' && password === 'EthixwebAdmin2026!') {
            const mockSession = {
              access_token: 'demo-admin-token',
              user: { id: 'usr_mock_admin', email: 'admin@ethixweb.com', role: 'authenticated' },
              expires_at: Math.floor(Date.now() / 1000) + 3600
            };
            localStorage.setItem('ethix_demo_session', JSON.stringify(mockSession));
            return { data: { user: mockSession.user, session: mockSession }, error: null };
          }
          return { data: null, error: { message: 'Invalid credentials. For live database, configure Supabase Auth credentials.' } };
        },
        signOut: async () => {
          localStorage.removeItem('ethix_demo_session');
          return { error: null };
        },
        getUser: async () => {
          const raw = localStorage.getItem('ethix_demo_session');
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              return { data: { user: parsed.user }, error: null };
            } catch {
              return { data: { user: null }, error: null };
            }
          }
          return { data: { user: null }, error: null };
        }
      }
    };
