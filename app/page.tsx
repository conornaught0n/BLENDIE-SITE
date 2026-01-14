import React from 'react';
import { Hero } from "@/components/Hero";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-coffee-yellow selection:text-black font-sans">
      
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

        {/* Education Module: Commercial Identity */}
        <EducationModule 
          title="For Commercial Partners"
          content="Why settle for a wholesale account? Create your own house blend. We provide the green coffee, the roasting precision, and the white-label packaging. You own the brand."
          side="right"
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

        {/* Education Module: Home Savings */}
        <EducationModule 
          title="For Home Baristas"
          content="Buying single origins in 250g bags adds up. By blending and buying in bulk (1kg+), you save up to 40% while drinking coffee tailored exactly to your palate."
          side="left"
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
        <button className="btn-primary">
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
      <div className="absolute left-[-5px] top-16 h-2.5 w-2.5 rounded-full bg-coffee-brown ring-4 ring-background group-hover:scale-150 transition-transform" />
      
      <div className="md:w-1/2 card-soft relative overflow-hidden group-hover:border-coffee-yellow">
        <span className="absolute top-0 right-0 p-4 text-6xl opacity-5 grayscale group-hover:grayscale-0 transition-all duration-500">{icon}</span>
        
        <p className="text-coffee-brown font-sans text-xs tracking-widest mb-2 font-bold">STEP {number}</p>
        <h3 className="text-3xl font-serif mb-4">{title}</h3>
        <p className="opacity-60 mb-8 leading-relaxed font-light">{description}</p>
        
        <Link href={link} className="inline-flex items-center gap-2 text-coffee-brown hover:text-foreground font-bold transition-colors text-sm uppercase tracking-widest">
          {cta} <span>→</span>
        </Link>
      </div>
    </div>
  );
}

function EducationModule({ title, content, side }: { title: string, content: string, side: 'left' | 'right' }) {
  return (
    <div className={`relative py-12 px-8 md:px-16 ${side === 'right' ? 'md:ml-auto md:w-1/2 md:pl-24' : 'md:mr-auto md:w-1/2 md:pr-24 md:text-right'}`}>
       <div className="bg-coffee-yellow/10 p-8 rounded-2xl border border-coffee-yellow/20">
          <h4 className="text-coffee-brown font-serif text-lg font-bold mb-2">{title}</h4>
          <p className="text-sm opacity-80 leading-relaxed">{content}</p>
       </div>
       {/* Connector Line Logic would go here for visual flair */}
    </div>
  );
}
