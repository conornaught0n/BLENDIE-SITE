"use client";

import React, { useState, useEffect } from 'react';

export default function ProductionAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // Simple Client-Side Gate (In production, use real Auth/Middleware)
  const checkPassword = () => {
    if (password === 'blendie-staff') {
      setIsAuthenticated(true);
      sessionStorage.setItem('os_auth', 'true');
    } else {
      alert('Access Denied');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('os_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 font-mono">
        <div className="w-full max-w-sm p-8 border border-white/20 rounded-xl bg-white/5 backdrop-blur-md">
          <h1 className="text-xl font-bold mb-6 text-green-400">PRODUCTION OS /// SECURE</h1>
          <input 
            type="password" 
            placeholder="OPERATOR KEY" 
            className="w-full bg-black/50 border border-white/20 rounded px-4 py-3 mb-4 text-center tracking-widest focus:border-green-500 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && checkPassword()}
          />
          <button onClick={checkPassword} className="w-full bg-green-600/20 border border-green-500/50 text-green-400 py-3 rounded hover:bg-green-600/40 transition-all font-bold">
            AUTHENTICATE
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
