"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/store/auth-store';

export default function ProductionAuth({ children }: { children: React.ReactNode }) {
  const { user, setUser, isAdmin } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // 1. Check active session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setUser(session.user);
      } else if (process.env.NODE_ENV === 'development' && sessionStorage.getItem('mock_bypass') === 'true') {
        // Dev backdoor if Supabase isn't set up yet
        setUser({ email: 'dev@blend.ie', id: 'mock-id' } as any);
      }
      
      setLoading(false);

      // 2. Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null);
      });

      return () => subscription.unsubscribe();
    };

    checkSession();
  }, [setUser]);

  const handleGoogleLogin = async () => {
    // If Supabase keys are missing, the mock client in lib/supabase.ts will warn but not error.
    // In a real env, this redirects to Google.
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Fallback for demo/dev without keys
        const password = prompt("Supabase keys missing. Enter DEV override password:");
        if (password === 'blendie-staff') {
            sessionStorage.setItem('mock_bypass', 'true');
            setUser({ email: 'admin@blend.ie', id: 'mock-admin' } as any);
        }
        return;
    }

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/production`,
        queryParams: {
            access_type: 'offline',
            prompt: 'consent',
        },
      },
    });
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center font-mono">
            <span className="animate-pulse">Connecting to Neural Link...</span>
        </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-mono">
        <div className="w-full max-w-md p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md text-center">
          <div className="mb-6 flex justify-center">
             <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-green-500 to-emerald-800 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold mb-2 text-green-400">ROASTERY OS</h1>
          <p className="text-white/60 mb-8 text-sm">Restricted Access. Staff Only.</p>
          
          <button 
            onClick={handleGoogleLogin} 
            className="w-full bg-white text-black font-bold py-4 rounded flex items-center justify-center gap-3 hover:bg-gray-200 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26..81-.58z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign in with Google
          </button>
          
          <div className="mt-6 text-xs text-white/30 uppercase tracking-widest">
            Secure Connection /// Blendie Corp
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
     return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 text-center">
            <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
            <p className="text-white/60 mb-6">Your email ({user.email}) is not authorized for the Roastery OS.</p>
            <button 
                onClick={() => supabase.auth.signOut()}
                className="bg-white/10 px-6 py-2 rounded text-sm hover:bg-white/20"
            >
                Sign Out
            </button>
        </div>
     );
  }

  return <>{children}</>;
}
