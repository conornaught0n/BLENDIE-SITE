import React from 'react';
import { Hero } from "@/components/Hero";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-fruit-citrus selection:text-black font-sans">
      
      {/* 1. HERO */}
      <Hero />

      {/* 2. TRUST MARQUEE */}
      <section className="py-8 border-b border-border-color bg-white overflow-hidden">
        <p className="text-center text-[10px] uppercase tracking-widest opacity-40 mb-4 font-bold">Trusted By & Featured In</p>
        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-16 opacity-30 grayscale items-center">
            <span className="font-serif font-bold text-2xl mx-8">ROAST MAGAZINE</span>
            <span className="font-serif font-bold text-2xl mx-8">FALCON SPECIALTY</span>
            <span className="font-serif font-bold text-2xl mx-8">INGENIOUS</span>
            <span className="font-serif font-bold text-2xl mx-8">LORING SMART ROAST</span>
            <span className="font-serif font-bold text-2xl mx-8">ALGRANO</span>
            <span className="font-serif font-bold text-2xl mx-8">PERFECT DAILY GRIND</span>
            <span className="font-serif font-bold text-2xl mx-8">ROAST MAGAZINE</span>
            <span className="font-serif font-bold text-2xl mx-8">FALCON SPECIALTY</span>
            <span className="font-serif font-bold text-2xl mx-8">INGENIOUS</span>
            <span className="font-serif font-bold text-2xl mx-8">LORING SMART ROAST</span>
            <span className="font-serif font-bold text-2xl mx-8">ALGRANO</span>
            <span className="font-serif font-bold text-2xl mx-8">PERFECT DAILY GRIND</span>
          </div>
        </div>
      </section>

      {/* 3. THE PROCESS (Centered 1-2-3) */}
      <section className="py-24 max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-fruit-plum">How It Works</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-fruit-plum/10 -z-10 border-t border-dashed border-fruit-plum/20" />

            <StepCard 
                number="01" 
                title="Build" 
                icon="☕"
                desc="Browse origins, manage your portfolio, and craft your perfect roast profile."
                link="/portfolio/"
            />
            <StepCard 
                number="02" 
                title="Design" 
                icon="🎨"
                desc="Customize your bag, label, and brand identity in 3D."
                link="/configurator/"
            />
            <StepCard 
                number="03" 
                title="Order" 
                icon="📦"
                desc="Unlock volume discounts. We roast, pack, and ship."
                link="/checkout/"
            />
        </div>
      </section>

      {/* 4. WHY? */}
      <section className="py-24 bg-[#FFFCF5] border-y border-border-color">
        <div className="max-w-5xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <WhyCard title="For Business" subtitle="Commercial & Cafe" points={["Your Brand, Your Coffee (White Label).", "Wholesale pricing from 5kg+.", "Consistent precision roasting.", "Automated fulfillment integration."]} />
                <WhyCard title="For Home" subtitle="Barista & Enthusiast" points={["Drink better coffee for less (Bulk savings).", "Create the exact flavor profile you love.", "Freshly roasted to order.", "Learn with our Sample Kits."]} />
            </div>
        </div>
      </section>

      {/* 5. FAQ */}
      <section className="py-24 max-w-3xl mx-auto px-8">
        <h2 className="text-3xl font-serif font-bold text-center mb-12 text-fruit-plum">Common Questions</h2>
        <div className="space-y-4">
            <FAQItem q="What is the minimum order?" a="You can order as little as 250g to sample, but volume discounts kick in at 1kg and 5kg." />
            <FAQItem q="Can I design my own label?" a="Yes! Our 3D configurator lets you upload custom art or use our AI generator." />
            <FAQItem q="How fresh is the roast?" a="We roast on demand. Your coffee is typically shipped within 48 hours of roasting." />
        </div>
      </section>

      {/* 6. SAMPLE PACK CTA */}
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

function StepCard({ number, title, desc, link, icon }: any) {
    return (
        <div className="flex flex-col items-center text-center group">
            <div className="w-24 h-24 rounded-full bg-white border border-border-color flex items-center justify-center text-4xl shadow-sm mb-6 group-hover:scale-110 transition-transform group-hover:border-fruit-citrus relative z-10">
                {icon}
                <div className="absolute -top-2 -right-2 bg-fruit-plum text-white text-[10px] font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {number}
                </div>
            </div>
            <h3 className="text-2xl font-bold font-serif mb-2 text-fruit-plum">{title}</h3>
            <p className="text-sm opacity-60 mb-6 px-4 leading-relaxed">{desc}</p>
            <a href={link} className="btn-primary py-2 px-6 text-xs uppercase tracking-widest shadow-none hover:shadow-md">
                Start {title}
            </a>
        </div>
    )
}

function WhyCard({ title, subtitle, points }: any) {
    return (
        <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm hover:shadow-md transition-shadow text-center md:text-left">
            <h3 className="text-2xl font-serif font-bold mb-1 text-fruit-plum">{title}</h3>
            <p className="text-xs uppercase tracking-widest opacity-50 mb-6">{subtitle}</p>
            <ul className="space-y-3 text-left inline-block">
                {points.map((p: string, i: number) => (
                    <li key={i} className="flex gap-3 text-sm opacity-80">
                        <span className="text-fruit-citrus font-bold">✓</span>
                        {p}
                    </li>
                ))}
            </ul>
        </div>
    )
}

function FAQItem({ q, a }: any) {
    return (
        <div className="border border-border-color rounded-xl p-6 hover:bg-[#F9F9F9] transition-colors cursor-pointer group text-left">
            <h4 className="font-bold text-lg mb-2 flex justify-between items-center">
                {q}
                <span className="text-fruit-plum opacity-50 group-hover:opacity-100 text-2xl font-light">+</span>
            </h4>
            <p className="text-sm opacity-60 leading-relaxed">{a}</p>
        </div>
    )
}
