import React from 'react';
import { HeroAnimation } from "@/components/HeroAnimation";

export const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Fun Background Animation */}
      <HeroAnimation />

      <div className="relative z-30 mx-auto max-w-5xl text-center px-4">
        <h1 className="text-5xl font-serif font-black tracking-tight text-fruit-plum sm:text-7xl md:text-8xl mb-8 leading-[1.1] drop-shadow-sm">
          Create your coffee.<br/>
          Design your Packaging.<br/>
          <span className="text-fruit-berry italic font-medium">Choose your price.</span>
        </h1>
        
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button className="btn-primary text-lg px-12 py-4">
            Start Creating
          </button>
          <button className="px-12 py-4 rounded-full border-2 border-fruit-plum text-fruit-plum font-bold hover:bg-fruit-plum/5 transition-colors">
            Browse Portfolio
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-fruit-plum/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
