import React from 'react';
import { HeroAnimation } from "@/components/HeroAnimation";
import Link from 'next/link';

export const Hero = () => {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground pt-20">
      {/* Fun Background Animation */}
      <HeroAnimation />

      <div className="relative z-30 mx-auto max-w-4xl text-center px-4">
        <h1 className="text-6xl font-serif font-black tracking-tight text-fruit-plum sm:text-7xl md:text-9xl mb-6 leading-none drop-shadow-sm">
          COFFEE<br/>FOR YOU
        </h1>
        <p className="text-lg sm:text-xl opacity-70 max-w-2xl mx-auto mb-10 font-sans">
            Your blends. Your packaging. Your price.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a href="/portfolio/" className="btn-primary text-lg px-10 py-4 shadow-xl">
            Create Your Blend
          </a>
          <a href="/shop/" className="px-10 py-4 rounded-full bg-white border border-border-color text-foreground font-bold hover:border-fruit-plum transition-all shadow-sm">
            Browse Market
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce opacity-50">
        <svg className="w-5 h-5 text-fruit-plum" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
