import React from 'react';
import { Hero } from "@/components/Hero";
import { StarFlower } from "@/components/StarFlower";
import { Configurator } from "@/components/Configurator";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="bg-background min-h-screen">
      <Hero />
      
      {/* New Launchpad Section */}
      <section className="py-12 bg-black/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-[#D4AF37] mb-8">Platform Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/portfolio" className="glass-card p-8 group hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 block transition-all">
              <span className="text-4xl mb-4 block">☕</span>
              <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37]">Portfolio Ledger</h3>
              <p className="text-sm text-white/50 mt-2">Manage favorites and select beans.</p>
            </Link>
            
            <Link href="/blend" className="glass-card p-8 group hover:bg-[#D4AF37]/10 border border-white/10 hover:border-[#D4AF37]/50 block transition-all">
              <span className="text-4xl mb-4 block">⚖️</span>
              <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37]">Blend Builder</h3>
              <p className="text-sm text-white/50 mt-2">Create custom roasts with precision.</p>
            </Link>

            <Link href="/production" className="glass-card p-8 group hover:bg-green-500/10 border border-white/10 hover:border-green-500/50 block transition-all">
              <span className="text-4xl mb-4 block">🏭</span>
              <h3 className="text-xl font-bold text-white group-hover:text-green-400">Production OS</h3>
              <p className="text-sm text-white/50 mt-2">Internal operator dashboard.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Legacy Content (Keep for now or remove if requested) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-black/20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
        <div className="mx-auto max-w-7xl text-center mb-8">
           <p className="uppercase tracking-widest text-xs text-white/30">Legacy Components Preview</p>
        </div>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col items-center">
              <StarFlower />
            </div>
            <div className="flex flex-col items-center">
               <Configurator />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
