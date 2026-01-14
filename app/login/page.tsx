"use client";

import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/portfolio`,
      },
    });
    if (error) console.error('Error logging in:', error.message);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-border-color text-center">
        <h1 className="font-serif text-4xl mb-2 text-fruit-plum">Welcome Back</h1>
        <p className="opacity-60 mb-8 text-sm">Sign in to save your blends & portfolio.</p>
        
        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-border-color hover:bg-gray-50 text-foreground font-bold py-3 rounded-lg transition-all shadow-sm"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          Continue with Google
        </button>

        <div className="mt-6 pt-6 border-t border-border-color text-xs opacity-40">
          By continuing, you agree to Blendie's Terms & Privacy Policy.
        </div>
      </div>
    </div>
  );
}
