import React from 'react';
import { Hero } from "@/components/Hero";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-fruit-citrus selection:text-black font-sans">
      
      {/* 1. HERO */}
      <Hero />

      {/* 2. THE PROCESS (Continuous Flow) */}
      <section className="py-24 max-w-4xl mx-auto px-8 relative">
        <div className="absolute left-8 top-0 bottom-0 w-px bg-fruit-plum/10 md:left-1/2 md:-translate-x-px" />
        
        {/* Step 1 */}
        <TimelineStep 
          number="01" 
          title="Curate & Blend" 
          description="Browse single origins, manage your portfolio, and craft your perfect roast profile."
          link="/portfolio"
          cta="Open Ledger"
          side="left"
        />

        {/* Step 2 */}
        <TimelineStep 
          number="02" 
          title="Design Packaging" 
          description="Choose your bag style, upload custom labels, or let AI design a gift label for you."
          link="/configurator"
          cta="Start Designing"
          side="right"
        />

        {/* Step 3 */}
        <TimelineStep 
          number="03" 
          title="Review & Ship" 
          description="Volume discounts unlock at 5kg+. Order samples or subscribe for monthly savings."
          link="/checkout"
          cta="View Pricing"
          side="left"
        />
      </section>

      {/* 3. EDUCATION (Below the Flow) */}
      <section className="py-24 bg-fruit-peach/5 border-y border-fruit-plum/5">
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <EducationCard 
                title="For Commercial Partners"
                content="Why settle for a wholesale account? Create your own house blend. We provide the green coffee, the roasting precision, and the white-label packaging. You own the brand."
                icon="🏢"
            />
            <EducationCard 
                title="For Home Baristas"
                content="Buying single origins in 250g bags adds up. By blending and buying in bulk (1kg+), you save up to 40% while drinking coffee tailored exactly to your palate."
                icon="🏠"
            />
        </div>
      </section>

      {/* 4. SAMPLE PACK CTA */}
      <section className="py-24 px-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-fruit-plum mb-4">Not ready to commit?</h2>
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

function TimelineStep({ number, title, description, link, cta, side }: any) {
  return (
    <div className={`relative py-12 ${side === 'left' ? 'md:pr-16 md:text-right md:items-end' : 'md:pl-16 md:ml-auto'} flex flex-col`}>
      {/* Dot */}
      <div className={`absolute top-16 w-4 h-4 rounded-full bg-white border-4 border-fruit-plum z-10 left-6 md:left-1/2 md:-translate-x-1/2`} />
      
      {/* Content - No Box */}
      <div className={`pl-16 md:pl-0 ${side === 'right' ? 'md:max-w-sm' : 'md:max-w-sm md:ml-auto'}`}>
        <span className="text-fruit-citrus font-bold text-xs uppercase tracking-widest mb-2 block">Step {number}</span>
        <h3 className="text-4xl font-serif font-bold text-fruit-plum mb-4">{title}</h3>
        <p className="opacity-60 mb-6 leading-relaxed">{description}</p>
        <Link href={link} className="text-fruit-berry font-bold text-sm uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
          {cta} →
        </Link>
      </div>
    </div>
  );
}

function EducationCard({ title, content, icon }: any) {
    return (
        <div className="flex gap-6 items-start p-8 rounded-3xl hover:bg-white transition-colors border border-transparent hover:border-fruit-plum/10 hover:shadow-sm">
            <span className="text-4xl">{icon}</span>
            <div>
                <h4 className="font-serif text-2xl font-bold text-fruit-plum mb-3">{title}</h4>
                <p className="opacity-70 leading-relaxed text-sm">{content}</p>
            </div>
        </div>
    )
}
