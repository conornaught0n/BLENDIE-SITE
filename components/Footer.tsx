"use client";

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16 px-8 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        
        {/* Brand */}
        <div className="col-span-1 md:col-span-2">
          <h2 className="font-serif text-3xl font-bold mb-4">blend.ie</h2>
          <p className="opacity-60 max-w-sm mb-8">
            The boutique coffee platform for creators, cafes, and connoisseurs. 
            Precision roasted in Dublin.
          </p>
          <div className="flex gap-4">
            <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">IG</span>
            <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">TW</span>
            <span className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">LN</span>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Platform</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/shop" className="hover:text-fruit-citrus transition-colors">Shop Coffees</Link></li>
            <li><Link href="/portfolio" className="hover:text-fruit-citrus transition-colors">Portfolio Ledger</Link></li>
            <li><Link href="/blend" className="hover:text-fruit-citrus transition-colors">Blend Builder</Link></li>
            <li><Link href="/configurator" className="hover:text-fruit-citrus transition-colors">Packaging Design</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold uppercase tracking-widest text-xs mb-6 opacity-40">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/about" className="hover:text-fruit-citrus transition-colors">About Us</Link></li>
            <li><Link href="/wholesale" className="hover:text-fruit-citrus transition-colors">Wholesale</Link></li>
            <li><Link href="/contact" className="hover:text-fruit-citrus transition-colors">Contact</Link></li>
            <li><Link href="/login" className="hover:text-fruit-citrus transition-colors">Log In</Link></li>
          </ul>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between text-xs opacity-40">
        <p>© 2026 Blendie. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};
