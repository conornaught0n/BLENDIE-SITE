import React from 'react';

export const Hero = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Background Image (Coffee Roasting / Farm) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}
        {/* Placeholder for a high-res roasting image. In production, use next/image */}
        <img 
          src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=2000" 
          alt="Coffee Roasting" 
          className="h-full w-full object-cover opacity-80"
        />
      </div>

      <div className="relative z-20 mx-auto max-w-5xl text-center px-4">
        <h1 className="text-6xl font-bold tracking-tight text-white sm:text-8xl md:text-9xl mb-6 drop-shadow-2xl">
          MASTER<br/>THE ROAST
        </h1>
        <p className="mt-4 text-xl tracking-wide text-white/90 sm:text-2xl max-w-3xl mx-auto font-light drop-shadow-md">
          A professional platform for blending, roasting, and designing your own coffee brand.
        </p>
        
        <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
          <button className="group relative rounded-full bg-[#D4AF37] px-10 py-4 text-black text-lg font-bold transition-all hover:bg-white hover:scale-105 shadow-xl shadow-black/50">
            Start Blending
          </button>
          <button className="rounded-full border border-white/30 bg-black/30 backdrop-blur-md px-10 py-4 text-white font-medium transition-colors hover:bg-white/10 hover:border-white">
            View Ledger
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};
