import React from 'react';

export const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Image (Coffee Roasting / Farm) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white/10 z-10 mix-blend-overlay" /> 
        <img 
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2000" 
          alt="Coffee Aesthetic" 
          className="h-full w-full object-cover opacity-90 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-white/40 z-20" /> {/* Light Fade for text readability */}
      </div>

      <div className="relative z-30 mx-auto max-w-5xl text-center px-4">
        <h1 className="text-5xl font-serif font-medium tracking-tight text-black sm:text-7xl md:text-8xl mb-8 leading-[1.1]">
          Create your coffee.<br/>
          Design your Packaging.<br/>
          <span className="text-accent-gold italic">Choose your price.</span>
        </h1>
        
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button className="btn-paris bg-black text-white hover:bg-accent-gold hover:text-white border-black hover:border-accent-gold shadow-xl">
            Start Creating
          </button>
          <button className="btn-paris bg-transparent text-black border-black hover:bg-black hover:text-white backdrop-blur-sm">
            Browse Portfolio
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-black/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
