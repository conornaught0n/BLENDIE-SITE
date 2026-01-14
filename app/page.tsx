import React from 'react';
import { Hero } from "@/components/Hero";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-fruit-citrus selection:text-black font-sans">
      
      {/* 1. HERO */}
      <Hero />

      {/* 2. COMPACT PROCESS (Timeline) */}
      <section className="py-16 max-w-5xl mx-auto px-4 relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-fruit-plum/10 -translate-x-px hidden md:block" />
        
        {/* Step 1 */}
        <CompactStep 
          number="01" 
          title="Curate" 
          description="Browse single origins & manage portfolio."
          link="/portfolio"
          side="left"
        />

        {/* Pro Tip Break 1 */}
        <ProTip 
            tip="Use the 'Rao Spin' logic in your blend: Pair a soluble washed coffee with a dense natural for balanced extraction."
            author="Blendie OS"
        />

        {/* Step 2 */}
        <CompactStep 
          number="02" 
          title="Design" 
          description="Customize packaging & visualize in 3D."
          link="/configurator"
          side="right"
        />

        {/* Pro Tip Break 2 */}
        <ProTip 
            tip="Did you know? Our 'Natural Fruit' palette matches the actual flavor compounds found in high-altitude fermentation."
            author="Science Dept"
        />

        {/* Step 3 */}
        <CompactStep 
          number="03" 
          title="Order" 
          description="Volume discounts & automated shipping."
          link="/checkout"
          side="left"
        />
      </section>

      {/* 3. CONSOLIDATED EDUCATION (Grid) */}
      <section className="py-16 bg-fruit-peach/10 border-y border-fruit-plum/5">
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-center font-serif font-bold text-2xl mb-8 text-fruit-plum">Why Build Your Own?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <EduCard 
                    icon="🏢" 
                    title="Commercial Identity" 
                    text="Stop serving someone else's brand. Create a House Blend that is uniquely yours. We handle the roasting; you handle the glory."
                />
                <EduCard 
                    icon="💰" 
                    title="Volume Savings" 
                    text="Buying single origins in 250g bags is for amateurs. Blending in bulk (5kg+) unlocks wholesale rates usually reserved for cafes."
                />
                <EduCard 
                    icon="🔬" 
                    title="Precision Quality" 
                    text="We use Loring Smart Roasters and verify every batch with ColorTrack. Your custom blend isn't a guess; it's science."
                />
            </div>
        </div>
      </section>

      {/* 4. SAMPLE PACK CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-serif font-bold text-fruit-plum mb-2">Master Blending Kit</h2>
        <p className="opacity-60 mb-6 text-sm">8x50g Origins + Cupping Guide</p>
        <button className="btn-primary py-3 px-8 text-sm">
          Order Sample Pack (€35)
        </button>
      </section>

    </main>
  );
}

function CompactStep({ number, title, description, link, side }: any) {
  return (
    <div className={`relative py-8 flex flex-col md:flex-row ${side === 'left' ? 'md:justify-end md:text-right' : 'md:justify-start'}`}>
      
      {/* Dot */}
      <div className="hidden md:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-fruit-plum z-10" />
      
      <div className={`md:w-5/12 ${side === 'left' ? 'md:pr-12' : 'md:pl-12'}`}>
        <span className="text-fruit-citrus font-bold text-[10px] uppercase tracking-widest mb-1 block">Step {number}</span>
        <h3 className="text-2xl font-serif font-bold text-fruit-plum mb-2 hover:text-fruit-berry transition-colors">
            <Link href={link}>{title} →</Link>
        </h3>
        <p className="opacity-60 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ProTip({ tip, author }: any) {
    return (
        <div className="max-w-md mx-auto my-8 bg-white border border-fruit-citrus/20 rounded-lg p-4 text-center shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-fruit-citrus" />
            <p className="text-xs font-serif italic opacity-80 mb-2">"{tip}"</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-fruit-plum opacity-50">— {author}</p>
        </div>
    )
}

function EduCard({ title, text, icon }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-border-color hover:border-fruit-plum/20 transition-colors shadow-sm">
            <span className="text-2xl block mb-3">{icon}</span>
            <h4 className="font-serif font-bold text-lg mb-2 text-fruit-plum">{title}</h4>
            <p className="text-xs opacity-70 leading-relaxed">{text}</p>
        </div>
    )
}
