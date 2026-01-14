"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { useBlendStore } from '@/store/blend-store';
import { useRouter } from 'next/navigation';

export default function Portfolio() {
  const router = useRouter();
  const { currentBlend, addCoffee, removeCoffee } = useBlendStore();
  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Helper to check if a coffee ID is in the store
  const isSelected = (id: string) => currentBlend.some(c => c.id === id);

  const toggleSelection = (coffee: any) => {
    if (isSelected(coffee.id)) {
      removeCoffee(coffee.id);
    } else {
      addCoffee(coffee);
    }
  };

  // Aggregate Data from Store
  const avgPrice = currentBlend.length > 0 
    ? (currentBlend.reduce((acc, c) => acc + c.price_250g, 0) / currentBlend.length).toFixed(2)
    : '0.00';
  
  const aggregateFlavor = {
    aroma: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + c.aroma, 0) / currentBlend.length) : 0,
    body: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + c.body, 0) / currentBlend.length) : 0,
    acidity: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + c.acidity, 0) / currentBlend.length) : 0,
    sweetness: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + c.sweetness, 0) / currentBlend.length) : 0,
    aftertaste: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + c.aftertaste, 0) / currentBlend.length) : 0,
  };

  const handleProceed = () => {
    router.push('/blend');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* LEFT: Ledger (Step 1) */}
      <div className={`w-full md:w-2/3 h-screen overflow-y-auto p-8 md:p-12 border-r border-border-color transition-transform duration-500 ease-in-out ${step === 1 ? 'translate-x-0' : '-translate-x-full hidden md:block'}`}>
        <header className="mb-12 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-foreground text-background w-8 h-8 flex items-center justify-center text-sm font-bold border border-foreground">01</span>
              <h1 className="text-4xl font-serif">Curate Portfolio</h1>
            </div>
            <p className="opacity-60 text-sm tracking-wide uppercase">Select components from inventory</p>
          </div>
          
          <div className="flex border border-border-color">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${viewMode === 'list' ? 'bg-foreground text-background' : 'hover:bg-black/5'}`}
            >
              List
            </button>
            <div className="w-px bg-border-color"></div>
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${viewMode === 'grid' ? 'bg-foreground text-background' : 'hover:bg-black/5'}`}
            >
              Grid
            </button>
          </div>
        </header>

        {/* Filter Bar */}
        <div className="flex gap-8 border-b border-border-color pb-4 mb-8 text-sm uppercase tracking-widest overflow-x-auto">
           <button className="font-bold border-b-2 border-foreground pb-4 -mb-4.5">All Stock</button>
           <button className="opacity-40 hover:opacity-100 transition-opacity">Saved Blends</button>
           <button className="opacity-40 hover:opacity-100 transition-opacity">Templates</button>
        </div>

        {viewMode === 'list' ? (
          <table className="w-full text-left border-collapse">
              <thead className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-border-color">
                <tr>
                  <th className="pb-4 pl-4 w-12">Add</th>
                  <th className="pb-4">Coffee Profile</th>
                  <th className="pb-4 hidden md:table-cell">Origin</th>
                  <th className="pb-4 text-right">Score</th>
                  <th className="pb-4 text-right pr-4">Price / 250g</th>
                </tr>
              </thead>
              <tbody className="text-sm font-light">
                {COFFEE_DATA.map((coffee) => (
                  <tr 
                    key={coffee.id} 
                    onClick={() => toggleSelection(coffee)}
                    className={`group border-b border-border-color cursor-pointer transition-colors hover:bg-black/5 ${isSelected(coffee.id) ? 'bg-accent-gold/10' : ''}`}
                  >
                    <td className="py-6 pl-4 align-middle">
                      <div className={`w-4 h-4 border transition-all ${isSelected(coffee.id) ? 'bg-foreground border-foreground' : 'border-border-color group-hover:border-foreground'}`} />
                    </td>
                    <td className="py-6 align-middle">
                      <span className="block font-serif text-lg leading-tight mb-1">{coffee.name}</span>
                      <span className="text-xs opacity-50 uppercase tracking-wide">{coffee.process}</span>
                    </td>
                    <td className="py-6 hidden md:table-cell align-middle opacity-60 uppercase tracking-widest text-xs">{coffee.origin}</td>
                    <td className="py-6 text-right font-mono text-accent-gold align-middle">
                      {((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}
                    </td>
                    <td className="py-6 text-right pr-4 font-mono text-lg align-middle">€{coffee.price_250g.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border-color border border-border-color">
             {COFFEE_DATA.map((coffee) => (
                <div 
                  key={coffee.id}
                  onClick={() => toggleSelection(coffee)}
                  className={`bg-card-bg aspect-square p-6 flex flex-col justify-between cursor-pointer group hover:bg-black/5 transition-colors ${isSelected(coffee.id) ? 'ring-1 ring-inset ring-accent-gold' : ''}`}
                >
                   <div className="flex justify-between items-start">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-gold">{coffee.origin}</span>
                      <div className={`w-3 h-3 border ${isSelected(coffee.id) ? 'bg-foreground border-foreground' : 'border-border-color'}`} />
                   </div>
                   <div>
                      <h3 className="font-serif text-xl leading-none mb-2">{coffee.name}</h3>
                      <p className="font-mono text-sm">€{coffee.price_250g}</p>
                   </div>
                </div>
             ))}
          </div>
        )}
      </div>

      {/* RIGHT: Live Preview (Fixed Panel) */}
      <div className="w-full md:w-1/3 bg-card-bg border-l border-border-color p-12 flex flex-col relative z-10">
         
         <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="font-serif text-2xl mb-8">Flavor Analysis</h2>
            <div className="w-full aspect-square max-w-[280px] mb-12 relative">
                <div className="absolute inset-0 border border-border-color rounded-full opacity-20" />
                <div className="absolute inset-4 border border-border-color rounded-full opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    {currentBlend.length > 0 ? (
                        <StarFlower attributes={aggregateFlavor} />
                    ) : (
                        <span className="text-xs uppercase tracking-widest opacity-30 text-center">Select To<br/>Visualize</span>
                    )}
                </div>
            </div>

            <div className="w-full border-t border-b border-border-color py-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest opacity-50">Composition</span>
                    <span className="font-serif text-xl">{currentBlend.length} <span className="text-sm font-sans opacity-40">Beans</span></span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest opacity-50">Base Estimate</span>
                    <span className="font-serif text-xl text-accent-gold">€{avgPrice}</span>
                </div>
            </div>
         </div>

         {/* Navigation Actions */}
         <div className="mt-12">
            <button 
                onClick={handleProceed}
                disabled={currentBlend.length === 0}
                className="btn-paris w-full disabled:opacity-20 disabled:cursor-not-allowed group relative overflow-hidden"
            >
                <span className="relative z-10 group-hover:text-background transition-colors">Proceed to Mixing</span>
            </button>
         </div>

      </div>

    </div>
  );
}
