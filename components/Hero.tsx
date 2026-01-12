import React from 'react';

export const Hero = () => {
  return (
    <section className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden bg-background text-foreground px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-[#D4AF37]/10 blur-[128px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#001f13]/50 blur-[128px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <h1 className="bg-gradient-to-b from-[#D4AF37] to-[#8C7324] bg-clip-text text-transparent text-5xl font-bold tracking-tight sm:text-7xl md:text-8xl">
          BLENDIE
        </h1>
        <h2 className="mt-4 text-2xl font-semibold tracking-wide text-[#E5C158] sm:text-3xl md:text-4xl">
          Precision Roasting. Uncompromising Safety.
        </h2>
        <p className="mt-6 text-lg tracking-wide text-white/80 sm:text-xl md:text-2xl max-w-2xl mx-auto">
          Experience the seamless fusion of design, technology, and flavor.
        </p>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="group relative rounded-full bg-[#D4AF37] px-8 py-3 text-[#002B1B] transition-all hover:bg-[#E5C158] hover:shadow-lg hover:shadow-[#D4AF37]/20">
            <span className="relative z-10 font-bold">Discover More</span>
          </button>
          <button className="rounded-full border border-[#D4AF37] px-8 py-3 text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10">
            View Batches
          </button>
        </div>
      </div>
    </section>
  );
};
