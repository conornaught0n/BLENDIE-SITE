"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { useBlendStore } from '@/store/blend-store';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const router = useRouter();
  const { currentBlend, addCoffee, removeCoffee, updatePercentage } = useBlendStore();
  
  // Steps: 1 = Selection (Ledger), 2 = Mixing (Sliders)
  const [step, setStep] = useState(1);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Step 1 Helpers
  const isSelected = (id: string) => currentBlend.some(c => c.id === id);
  const toggleSelection = (coffee: any) => {
    if (isSelected(coffee.id)) {
      removeCoffee(coffee.id);
    } else {
      addCoffee(coffee);
    }
  };

  // Step 2 Helpers
  const totalPercentage = currentBlend.reduce((acc, curr) => acc + curr.percentage, 0);
  const handleProceedToMixing = () => {
    // Auto-balance if first time entering mixing
    const totalCurrent = currentBlend.reduce((acc, c) => acc + c.percentage, 0);
    if (totalCurrent === 0 && currentBlend.length > 0) {
      const evenSplit = Math.floor(100 / currentBlend.length);
      currentBlend.forEach((c, i) => {
        const pct = i === currentBlend.length - 1 ? 100 - (evenSplit * (currentBlend.length - 1)) : evenSplit;
        updatePercentage(c.id, pct);
      });
    }
    setStep(2);
  };

  // Shared Data
  const avgPrice = currentBlend.length > 0 
    ? (currentBlend.reduce((acc, c) => acc + (c.price_250g * (step === 2 ? c.percentage/100 : 1/currentBlend.length)), 0)).toFixed(2)
    : '0.00';
  
  const aggregateFlavor = {
    aroma: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aroma * (step === 2 ? c.percentage/100 : 1/currentBlend.length)), 0)) : 0,
    body: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.body * (step === 2 ? c.percentage/100 : 1/currentBlend.length)), 0)) : 0,
    acidity: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.acidity * (step === 2 ? c.percentage/100 : 1/currentBlend.length)), 0)) : 0,
    sweetness: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.sweetness * (step === 2 ? c.percentage/100 : 1/currentBlend.length)), 0)) : 0,
    aftertaste: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aftertaste * (step === 2 ? c.percentage/100 : 1/currentBlend.length)), 0)) : 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row overflow-hidden font-sans">
      
      {/* LEFT PANEL: The Content Area (Swaps between Ledger and Sliders) */}
      <div className="w-full md:w-2/3 h-screen overflow-y-auto p-8 md:p-12 border-r border-border-color relative">
        <AnimatePresence mode="wait">
            
            {/* STEP 1: LEDGER */}
            {step === 1 && (
                <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                >
                    <header className="mb-12 flex justify-between items-end">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                        <span className="bg-foreground text-background w-8 h-8 flex items-center justify-center text-sm font-bold border border-foreground">01</span>
                        <h1 className="text-4xl font-serif">Curate Portfolio</h1>
                        </div>
                        <p className="opacity-60 text-sm tracking-wide uppercase">Select components from inventory</p>
                    </div>
                    
                    <div className="flex border border-border-color">
                        <button onClick={() => setViewMode('list')} className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${viewMode === 'list' ? 'bg-foreground text-background' : 'hover:bg-black/5'}`}>List</button>
                        <div className="w-px bg-border-color"></div>
                        <button onClick={() => setViewMode('grid')} className={`px-4 py-2 text-xs uppercase tracking-widest transition-colors ${viewMode === 'grid' ? 'bg-foreground text-background' : 'hover:bg-black/5'}`}>Grid</button>
                    </div>
                    </header>

                    {/* Filter Bar Placeholder */}
                    <div className="flex gap-8 border-b border-border-color pb-4 mb-8 text-sm uppercase tracking-widest overflow-x-auto">
                        <button className="font-bold border-b-2 border-foreground pb-4 -mb-4.5">All Stock</button>
                    </div>

                    {/* Table View */}
                    {viewMode === 'list' ? (
                        <table className="w-full text-left border-collapse">
                            <thead className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-border-color">
                                <tr>
                                <th className="pb-4 pl-4 w-12">Add</th>
                                <th className="pb-4">Coffee Profile</th>
                                <th className="pb-4 hidden md:table-cell">Origin</th>
                                <th className="pb-4 text-right">Score</th>
                                <th className="pb-4 text-right pr-4">Price</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-light">
                                {COFFEE_DATA.map((coffee) => (
                                <tr key={coffee.id} onClick={() => toggleSelection(coffee)} className={`group border-b border-border-color cursor-pointer transition-colors hover:bg-black/5 ${isSelected(coffee.id) ? 'bg-accent-gold/10' : ''}`}>
                                    <td className="py-6 pl-4 align-middle"><div className={`w-4 h-4 border transition-all ${isSelected(coffee.id) ? 'bg-foreground border-foreground' : 'border-border-color group-hover:border-foreground'}`} /></td>
                                    <td className="py-6 align-middle"><span className="block font-serif text-lg leading-tight mb-1">{coffee.name}</span><span className="text-xs opacity-50 uppercase tracking-wide">{coffee.process}</span></td>
                                    <td className="py-6 hidden md:table-cell align-middle opacity-60 uppercase tracking-widest text-xs">{coffee.origin}</td>
                                    <td className="py-6 text-right font-mono text-accent-gold align-middle">{((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}</td>
                                    <td className="py-6 text-right pr-4 font-mono text-lg align-middle">€{coffee.price_250g.toFixed(2)}</td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-border-color border border-border-color">
                            {COFFEE_DATA.map((coffee) => (
                                <div key={coffee.id} onClick={() => toggleSelection(coffee)} className={`bg-card-bg aspect-square p-6 flex flex-col justify-between cursor-pointer group hover:bg-black/5 ${isSelected(coffee.id) ? 'ring-1 ring-inset ring-accent-gold' : ''}`}>
                                    <div className="flex justify-between items-start"><span className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-gold">{coffee.origin}</span><div className={`w-3 h-3 border ${isSelected(coffee.id) ? 'bg-foreground border-foreground' : 'border-border-color'}`} /></div>
                                    <div><h3 className="font-serif text-xl leading-none mb-2">{coffee.name}</h3><p className="font-mono text-sm">€{coffee.price_250g}</p></div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            {/* STEP 2: MIXING (Blend Builder) */}
            {step === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.4 }}
                >
                    <header className="mb-12">
                        <button onClick={() => setStep(1)} className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100 mb-6">← Back to Selection</button>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-foreground text-background w-8 h-8 flex items-center justify-center text-sm font-bold border border-foreground">02</span>
                            <h1 className="text-4xl font-serif">Master Your Blend</h1>
                        </div>
                        <p className="opacity-60 text-sm tracking-wide uppercase">Adjust ratios to achieve target profile</p>
                    </header>

                    <div className="space-y-8">
                        {currentBlend.map((item) => (
                            <div key={item.id} className="bg-card-bg border border-border-color p-6 transition-all hover:border-accent-gold">
                                <div className="flex justify-between mb-4">
                                    <span className="font-serif text-xl">{item.name}</span>
                                    <span className="font-mono text-accent-gold">€{item.price_250g}/250g</span>
                                </div>
                                <div className="flex items-center gap-6">
                                    <input 
                                        type="range" min="0" max="100" value={item.percentage} 
                                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                        className="w-full h-1 bg-border-color rounded-lg appearance-none cursor-pointer accent-foreground"
                                    />
                                    <div className="relative w-20">
                                        <input type="number" value={item.percentage} onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))} className="w-full bg-background border border-border-color rounded-sm px-2 py-1 text-right focus:border-accent-gold focus:outline-none font-mono"/>
                                        <span className="absolute right-6 top-1 opacity-40">%</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Validation */}
                    <div className={`mt-8 p-6 border ${totalPercentage === 100 ? 'border-accent-gold bg-accent-gold/5' : 'border-red-500/30 bg-red-500/5'} flex justify-between items-center transition-colors`}>
                        <span className="uppercase tracking-widest text-xs font-bold">Total Composition</span>
                        <span className={`font-mono text-xl font-bold ${totalPercentage === 100 ? 'text-foreground' : 'text-red-500'}`}>{totalPercentage}%</span>
                    </div>
                </motion.div>
            )}

        </AnimatePresence>
      </div>

      {/* RIGHT PANEL: Live Preview (Persistent across Steps) */}
      <div className="w-full md:w-1/3 bg-card-bg border-l border-border-color p-12 flex flex-col relative z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
         
         <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="font-serif text-2xl mb-8">Flavor Analysis</h2>
            
            {/* Flower Visualization */}
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

            {/* Stats */}
            <div className="w-full border-t border-b border-border-color py-6 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest opacity-50">Composition</span>
                    <span className="font-serif text-xl">{currentBlend.length} <span className="text-sm font-sans opacity-40">Beans</span></span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-widest opacity-50">Base Estimate (250g)</span>
                    <span className="font-serif text-xl text-accent-gold">€{avgPrice}</span>
                </div>
            </div>
         </div>

         {/* Navigation Actions - Context Aware */}
         <div className="mt-12">
            {step === 1 ? (
                <button 
                    onClick={handleProceedToMixing}
                    disabled={currentBlend.length === 0}
                    className="btn-paris w-full disabled:opacity-20 disabled:cursor-not-allowed group relative overflow-hidden"
                >
                    <span className="relative z-10 group-hover:text-background transition-colors">Start Mixing →</span>
                </button>
            ) : (
                <button 
                    onClick={() => router.push('/configurator')}
                    disabled={totalPercentage !== 100}
                    className="btn-paris w-full disabled:opacity-20 disabled:cursor-not-allowed group"
                >
                    {totalPercentage === 100 ? 'Design Packaging →' : `Adjust to 100%`}
                </button>
            )}
         </div>

      </div>

    </div>
  );
}
