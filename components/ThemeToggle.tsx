"use client";

import React, { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check local storage or system preference on mount
    const saved = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.classList.add(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(next);
    localStorage.setItem('theme', next);
  };

  return (
    <button 
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-card border border-border shadow-lg hover:border-gold transition-all text-2xl"
      title={`Switch to ${theme === 'dark' ? 'Day' : 'Night'} Mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};
