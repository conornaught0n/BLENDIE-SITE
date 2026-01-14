import React from 'react';
import { Hero } from "@/components/Hero";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-[#D4AF37] selection:text-black">
      
      {/* 1. HERO: The Hook */}
      <Hero />

      {/* 2. THE PROCESS (Vertical Scroll Story) */}
      <div className="relative border-l border-[#D4AF37]/20 ml-8 md:ml-1/2 md:-translate-x-px">
        
        {/* Step 1: Portfolio & Blending */}
        <StepSection 
          number="01" 
          title="Curate & Blend" 
          description="Browse single origins, manage your portfolio, and craft your perfect roast profile."
          link="/portfolio"
          cta="Open Ledger"
          icon="☕"
        />

        {/* Step 2: Design & Package */}
        <StepSection 
          number="02" 
          title="Design Packaging" 
          description="Choose your bag style, upload custom labels, or let AI design a gift label for you."
          link="/configurator"
          cta="Start Designing"
          icon="🎨"
        />

        {/* Step 3: Review & Order */}
        <StepSection 
          number="03" 
          title="Review & Ship" 
          description="Volume discounts unlock at 5kg+. Order samples or subscribe for monthly savings."
          link="/checkout"
          cta="View Pricing"
          icon="📦"
          last
        />

      </div>

      {/* 3. SAMPLE PACK CTA */}
      <section className="py-24 px-4 text-center bg-white/5 border-y border-white/10 mt-12">
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-4">Not ready to commit?</h2>
        <p className="text-white/60 mb-8 max-w-xl mx-auto">
          Order a <strong>Master Blending Kit</strong>. Includes 8x50g single origins, professional cupping bowls, and a guide to finding your flavor.
        </p>
        <button className="glass-btn px-8 py-4 text-lg bg-[#D4AF37] text-black border-[#D4AF37] hover:bg-white hover:text-black">
          Order Sample Pack (€35)
        </button>
      </section>

    </main>
  );
}

function StepSection({ number, title, description, link, cta, icon, last }: any) {
  return (
    <div className="relative pl-8 md:pl-16 py-16 group">
      {/* Timeline Dot */}
      <div className="absolute left-[-5px] top-16 h-2.5 w-2.5 rounded-full bg-[#D4AF37] ring-4 ring-black group-hover:scale-150 transition-transform" />
      
      <div className="md:w-1/2 glass-card p-8 relative overflow-hidden">
        <span className="absolute top-0 right-0 p-4 text-6xl opacity-10 grayscale group-hover:grayscale-0 transition-all duration-500">{icon}</span>
        
        <p className="text-[#D4AF37] font-mono text-sm tracking-widest mb-2">STEP {number}</p>
        <h3 className="text-3xl font-bold mb-4">{title}</h3>
        <p className="text-white/60 mb-8 leading-relaxed">{description}</p>
        
        <Link href={link} className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-white font-bold transition-colors">
          {cta} <span>→</span>
        </Link>
      </div>
    </div>
  );
}
