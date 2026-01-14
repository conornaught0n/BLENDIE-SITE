import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Return a dummy client if keys are missing (prevents build crash)
// In production, this would ensure keys exist.
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        signInWithOAuth: async () => {
            console.warn("Supabase not configured - Mocking Login");
            return { error: null };
        }
      }
    } as any;
