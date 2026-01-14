"use client";

import React, { useEffect, useState } from 'react';
import { useBlendStore } from '@/store/blend-store';
import { supabase } from '@/lib/supabase';

export default function QADashboard() {
  const { currentBlend, cart } = useBlendStore();
  const [authStatus, setAuthStatus] = useState('Checking...');
  const [themeVars, setThemeVars] = useState<any>({});

  useEffect(() => {
    // Check Auth
    const checkUser = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        setAuthStatus(data.session ? 'Authenticated' : 'Guest (Mock Mode Active)');
      } catch (e) {
        setAuthStatus('Error connecting to Supabase');
      }
    };
    checkUser();

    // Check Theme
    const computed = getComputedStyle(document.documentElement);
    setThemeVars({
      fontSerif: computed.getPropertyValue('--font-serif'),
      bg: computed.getPropertyValue('--background'),
      primary: computed.getPropertyValue('--accent-berry'),
    });
  }, []);

  return (
    <div className="min-h-screen p-12 bg-white text-black font-mono">
      <h1 className="text-2xl font-bold mb-8 border-b pb-4">QA Diagnostic Panel</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1. STORE STATE */}
        <div className="p-6 bg-gray-100 rounded-xl">
          <h2 className="font-bold mb-4 text-blue-600">Zustand Store State</h2>
          <pre className="text-xs overflow-auto max-h-60 bg-white p-4 rounded border">
            {JSON.stringify({ currentBlend, cart }, null, 2)}
          </pre>
          <div className="mt-4 text-xs opacity-60">
            {currentBlend.length === 0 ? "⚠️ Blend is Empty. Go to Shop to add items." : "✅ Blend Data Detected."}
          </div>
        </div>

        {/* 2. AUTH STATUS */}
        <div className="p-6 bg-gray-100 rounded-xl">
          <h2 className="font-bold mb-4 text-green-600">Auth & Infrastructure</h2>
          <p className="mb-2"><strong>Supabase Status:</strong> {authStatus}</p>
          <p className="mb-2"><strong>PHP Upload API:</strong> <a href="/api/upload.php" target="_blank" className="underline text-blue-500">Check Endpoint</a></p>
        </div>

        {/* 3. THEME CHECK */}
        <div className="p-6 bg-gray-100 rounded-xl">
          <h2 className="font-bold mb-4 text-purple-600">Theme Variables (Computed)</h2>
          <ul className="text-xs space-y-2">
            <li><strong>Font Serif:</strong> {themeVars.fontSerif}</li>
            <li><strong>Background:</strong> {themeVars.bg} <span className="inline-block w-4 h-4 border" style={{background: themeVars.bg}}></span></li>
            <li><strong>Primary Color:</strong> {themeVars.primary} <span className="inline-block w-4 h-4" style={{background: themeVars.primary}}></span></li>
          </ul>
        </div>

        {/* 4. NAVIGATION MAP */}
        <div className="p-6 bg-gray-100 rounded-xl">
          <h2 className="font-bold mb-4 text-orange-600">Sitemap (Direct Links)</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm underline text-blue-500">
            <li><a href="/">Home (/)</a></li>
            <li><a href="/shop/">Shop (/shop/)</a></li>
            <li><a href="/portfolio/">Portfolio (/portfolio/)</a></li>
            <li><a href="/blend/">Blend (/blend/)</a></li>
            <li><a href="/configurator/">Configurator (/configurator/)</a></li>
            <li><a href="/checkout/">Checkout (/checkout/)</a></li>
            <li><a href="/production/">Production (/production/)</a></li>
            <li><a href="/login/">Login (/login/)</a></li>
          </ul>
        </div>

      </div>
    </div>
  );
}
