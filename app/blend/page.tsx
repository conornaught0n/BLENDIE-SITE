"use client";

import React, { useState, useEffect } from 'react';
import { StarFlower } from '@/components/StarFlower';
import { useBlendStore } from '@/store/blend-store';
import Link from 'next/link';

export default function BlendBuilder() {
  const { currentBlend, updatePercentage } = useBlendStore();
  const [visMode, setVisMode] = useState<'petal' | 'bar' | '3d'>('petal');

  // Auto-Balance percentages on first load if they are all 0
  useEffect(() => {
    const totalCurrent = currentBlend.reduce((acc, c) => acc + c.percentage, 0);
    if (totalCurrent === 0 && currentBlend.length > 0) {
      const evenSplit = Math.floor(100 / currentBlend.length);
      currentBlend.forEach((c, i) => {
        // Handle remainder for last item
        const pct = i === currentBlend.length - 1 ? 100 - (evenSplit * (currentBlend.length - 1)) : evenSplit;
        updatePercentage(c.id, pct);
      });
    }
  }, [currentBlend.length]); // Only run if count changes (fresh selection)

  const totalPercentage = currentBlend.reduce((acc, curr) => acc + curr.percentage, 0);
  
  // Dynamic Pricing
  const totalPrice = currentBlend.reduce((acc, curr) => acc + (curr.price_250g * (curr.percentage / 100)), 0).toFixed(2);

  // UPDATED: Mapped to Body, Dark, Bright, Fruity, Sweet
  const flavorProfile = {
    body: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.body * (c.percentage / 100)), 0)) : 0,
    dark: 5, // Mock value
    bright: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.acidity * (c.percentage / 100)), 0)) : 0,
    fruity: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aroma * (c.percentage / 100)), 0)) : 0,
    sweet: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.sweetness * (c.percentage / 100)), 0)) : 0,
  };

  if (currentBlend.length === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8 text-center">
            <h1 className="text-4xl font-serif mb-4">No Coffees Selected</h1>
            <p className="opacity-60 mb-8">Go back to the Portfolio to select beans for your blend.</p>
            <Link href="/portfolio" className="btn-primary">Return to Portfolio</Link>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16 flex flex-col md:flex-row gap-16 font-sans">
      
      {/* LEFT: Controls */}
      <div className="w-full md:w-1/2 space-y-12">
        <header>
          <div className="flex items-center gap-3 mb-4">
             <span className="bg-foreground text-background w-8 h-8 flex items-center justify-center text-sm font-bold border border-foreground">02</span>
             <h1 className="text-4xl font-serif">Master Your Blend</h1>
          </div>
          <p className="opacity-60 text-sm tracking-wide uppercase">Adjust ratios to achieve target profile</p>
        </header>

        {/* Coffee List with Sliders */}
        <div className="space-y-8">
          {currentBlend.map((item) => (
            <div key={item.id} className="card-soft bg-card-bg p-6 group">
              <div className="flex justify-between mb-4">
                <span className="font-serif text-xl">{item.name}</span>
                <span className="font-mono text-fruit-berry">€{item.price_250g}/250g</span>
              </div>
              
              <div className="flex items-center gap-6">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={item.percentage} 
                  onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                  className="w-full h-1 bg-border-color rounded-lg appearance-none cursor-pointer accent-fruit-plum"
                />
                <div className="relative w-20">
                    <input 
                        type="number" 
                        value={item.percentage}
                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                        className="w-full bg-background border border-border-color rounded-sm px-2 py-1 text-right focus:border-fruit-berry focus:outline-none font-mono"
                    />
                    <span className="absolute right-6 top-1 opacity-40">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Validation */}
        <div className={`p-6 border ${totalPercentage === 100 ? 'border-fruit-green bg-fruit-green/5' : 'border-fruit-berry/30 bg-fruit-berry/5'} flex justify-between items-center transition-colors rounded-xl`}>
          <span className="uppercase tracking-widest text-xs font-bold">Total Composition</span>
          <span className={`font-mono text-xl font-bold ${totalPercentage === 100 ? 'text-fruit-green' : 'text-fruit-berry'}`}>{totalPercentage}%</span>
        </div>

        {/* AI Advisor "The Legend" (Static for now) */}
        <div className="bg-fruit-plum text-white p-8 relative overflow-hidden rounded-xl">
            <h3 className="font-serif font-bold mb-2 flex items-center gap-2">
                The Legend Says...
            </h3>
            <p className="opacity-80 text-sm italic font-serif leading-relaxed">
                "You're heavy on the Brazil (Nutty). Consider bumping the Ethiopia to 40% if you want more floral high notes to cut through the body. It would also drop the price by €0.50!"
            </p>
        </div>

      </div>

      {/* RIGHT: Visualizer & Summary */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
         
         {/* Vis Mode Toggle */}
         <div className="flex border border-border-color mb-12 rounded-full overflow-hidden">
            {['petal', 'bar', '3d'].map(m => (
                <button 
                    key={m}
                    onClick={() => setVisMode(m as any)}
                    className={`px-6 py-2 text-xs uppercase tracking-widest transition-all ${visMode === m ? 'bg-fruit-plum text-white' : 'hover:bg-black/5'}`}
                >
                    {m === '3d' ? 'Heatmap' : m}
                </button>
            ))}
         </div>

         {/* Visualization Container */}
         <div className="relative w-full aspect-square max-w-md bg-card-bg border border-border-color flex items-center justify-center mb-12 p-8 rounded-2xl shadow-sm">
             {visMode === 'petal' && (
                 <StarFlower attributes={flavorProfile} />
             )}
             
             {visMode === 'bar' && (
                 <div className="w-full h-full flex flex-col justify-center gap-4">
                     {currentBlend.map(b => (
                         <div key={b.id}>
                             <div className="flex justify-between text-xs mb-1 uppercase tracking-widest">
                                 <span>{b.name}</span>
                                 <span>{b.percentage}%</span>
                             </div>
                             <div className="h-2 bg-border-color overflow-hidden rounded-full">
                                 <div className="h-full bg-fruit-plum" style={{ width: `${b.percentage}%` }} />
                             </div>
                         </div>
                     ))}
                 </div>
             )}

             {visMode === '3d' && (
                 <div className="text-center opacity-40">
                     <p className="mb-2 uppercase tracking-widest text-xs">3D Heatmap Visualization</p>
                     <div className="w-32 h-32 mx-auto bg-gradient-to-tr from-fruit-plum to-fruit-citrus opacity-20 rounded-full animate-pulse blur-xl" />
                 </div>
             )}
         </div>

         {/* Price Summary */}
         <div className="text-center w-full max-w-md">
             <div className="flex justify-between items-end border-b border-border-color pb-4 mb-8">
                <span className="uppercase tracking-widest text-xs opacity-50">Estimated Price (250g)</span>
                <span className="font-mono text-4xl font-bold text-fruit-plum">€{totalPrice}</span>
             </div>
             
             <Link href="/configurator" onClick={(e) => totalPercentage !== 100 && e.preventDefault()}>
                <button 
                    disabled={totalPercentage !== 100}
                    className="btn-primary w-full disabled:opacity-20 disabled:cursor-not-allowed group"
                >
                    {totalPercentage === 100 ? 'Design Packaging →' : `Adjust Blend to 100%`}
                </button>
             </Link>
         </div>

      </div>

    </div>
  );
}
