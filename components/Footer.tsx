"use client";

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-8 border-t border-white/10 font-sans text-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-12">
        
        {/* Brand */}
        <div className="flex flex-col items-center">
          <h2 className="font-serif text-4xl font-bold mb-4 tracking-tight">blend.ie</h2>
          <p className="opacity-60 max-w-sm mb-8 text-sm leading-relaxed">
            The boutique coffee platform for creators, cafes, and connoisseurs. <br/>
            Precision roasted in Dublin.
          </p>
          <div className="flex gap-6 justify-center">
            <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">IG</span>
            <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">TW</span>
            <span className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-colors">LN</span>
          </div>
        </div>

        {/* Links (Centered) */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold uppercase tracking-widest">
            <Link href="/shop" className="hover:text-fruit-citrus transition-colors">Shop</Link>
            <Link href="/portfolio" className="hover:text-fruit-citrus transition-colors">Portfolio</Link>
            <Link href="/blend" className="hover:text-fruit-citrus transition-colors">Builder</Link>
            <Link href="/configurator" className="hover:text-fruit-citrus transition-colors">Design</Link>
            <Link href="/about" className="hover:text-fruit-citrus transition-colors opacity-60 hover:opacity-100">About</Link>
            <Link href="/wholesale" className="hover:text-fruit-citrus transition-colors opacity-60 hover:opacity-100">Wholesale</Link>
        </div>

      </div>
      
      <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-4 text-xs opacity-40">
        <p>© 2026 Blendie. All rights reserved.</p>
        <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
