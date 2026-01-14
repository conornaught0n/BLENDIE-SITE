import { create } from 'zustand';
import { User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  isAdmin: boolean;
  setUser: (user: User | null) => void;
  checkAdmin: (email?: string) => boolean;
}

// Hardcoded Admin List for now (can be moved to DB later)
const ADMIN_EMAILS = [
  'conor@blend.ie', 
  'admin@blend.ie',
  // Add other operators here
];

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAdmin: false,
  setUser: (user) => {
    const isAdmin = user?.email ? (user.email.endsWith('@blend.ie') || ADMIN_EMAILS.includes(user.email)) : false;
    set({ user, isAdmin });
  },
  checkAdmin: (email) => {
    if (!email) return false;
    return email.endsWith('@blend.ie') || ADMIN_EMAILS.includes(email);
  }
}));
