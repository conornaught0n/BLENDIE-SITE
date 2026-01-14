import React from 'react';
import { Hero } from "@/components/Hero";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-accent-gold selection:text-white font-sans">
      
      {/* 1. HERO: The Hook */}
      <Hero />

      {/* 2. THE PROCESS (Vertical Scroll Story) */}
      <div className="relative border-l border-border-color ml-8 md:ml-1/2 md:-translate-x-px">
        
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
      <section className="py-24 px-4 text-center bg-black/5 border-y border-border-color mt-12">
        <h2 className="text-3xl font-serif mb-4">Not ready to commit?</h2>
        <p className="opacity-60 mb-8 max-w-xl mx-auto">
          Order a <strong>Master Blending Kit</strong>. Includes 8x50g single origins, professional cupping bowls, and a guide to finding your flavor.
        </p>
        <button className="btn-paris bg-foreground text-background hover:bg-accent-gold hover:text-white border-foreground hover:border-accent-gold">
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
      <div className="absolute left-[-5px] top-16 h-2.5 w-2.5 rounded-full bg-accent-gold ring-4 ring-background group-hover:scale-150 transition-transform" />
      
      <div className="md:w-1/2 bg-white border border-border-color p-8 relative overflow-hidden transition-all hover:shadow-xl hover:border-accent-gold">
        <span className="absolute top-0 right-0 p-4 text-6xl opacity-5 grayscale group-hover:grayscale-0 transition-all duration-500">{icon}</span>
        
        <p className="text-accent-gold font-sans text-xs tracking-widest mb-2 font-bold">STEP {number}</p>
        <h3 className="text-3xl font-serif mb-4">{title}</h3>
        <p className="opacity-60 mb-8 leading-relaxed font-light">{description}</p>
        
        <Link href={link} className="inline-flex items-center gap-2 text-accent-gold hover:text-foreground font-bold transition-colors text-sm uppercase tracking-widest">
          {cta} <span>→</span>
        </Link>
      </div>
    </div>
  );
}
