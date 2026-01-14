"use client";

import React, { useState, useEffect } from 'react';
import { StarFlower } from '@/components/StarFlower';

// Re-using Mock Data (In a real app, this comes from Context/DB)
const MOCK_COFFEES = [
  { id: '1', name: 'Ethiopia Yirgacheffe', type: 'Single Origin', origin: 'Ethiopia', price_250g: 15, aroma: 9, body: 4, acidity: 8, sweetness: 7, aftertaste: 8 },
  { id: '2', name: 'Brazil Santos', type: 'Single Origin', origin: 'Brazil', price_250g: 12, aroma: 5, body: 8, acidity: 4, sweetness: 9, aftertaste: 6 },
  { id: '3', name: 'Colombia Supremo', type: 'Single Origin', origin: 'Colombia', price_250g: 14, aroma: 7, body: 6, acidity: 6, sweetness: 8, aftertaste: 7 },
];

export default function BlendBuilder() {
  // State: Selected Coffees & Their Percentages
  // Default to 3 equal parts for demo if no selection passed
  const [blend, setBlend] = useState([
    { ...MOCK_COFFEES[0], percentage: 33 },
    { ...MOCK_COFFEES[1], percentage: 33 },
    { ...MOCK_COFFEES[2], percentage: 34 },
  ]);

  const [visMode, setVisMode] = useState<'petal' | 'bar' | '3d'>('petal');

  // Persistence: Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem('currentBlend', JSON.stringify(blend));
  }, [blend]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('currentBlend');
    if (saved) {
      try {
        setBlend(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved blend");
      }
    }
  }, []);

  const totalPercentage = blend.reduce((acc, curr) => acc + curr.percentage, 0);
  
  // Dynamic Pricing: Weighted Average based on 250g price
  const totalPrice = blend.reduce((acc, curr) => acc + (curr.price_250g * (curr.percentage / 100)), 0).toFixed(2);

  // Dynamic Flavor Profile: Weighted Average
  const flavorProfile = {
    aroma: Math.round(blend.reduce((acc, c) => acc + (c.aroma * (c.percentage / 100)), 0)),
    body: Math.round(blend.reduce((acc, c) => acc + (c.body * (c.percentage / 100)), 0)),
    acidity: Math.round(blend.reduce((acc, c) => acc + (c.acidity * (c.percentage / 100)), 0)),
    sweetness: Math.round(blend.reduce((acc, c) => acc + (c.sweetness * (c.percentage / 100)), 0)),
    aftertaste: Math.round(blend.reduce((acc, c) => acc + (c.aftertaste * (c.percentage / 100)), 0)),
  };

  const updatePercentage = (index: number, newVal: number) => {
    const newBlend = [...blend];
    newBlend[index].percentage = newVal;
    setBlend(newBlend);
  };

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8 flex flex-col md:flex-row gap-8">
      
      {/* LEFT: Controls */}
      <div className="w-full md:w-1/2 space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-[#D4AF37]">Blend Builder</h1>
          <p className="text-white/60">Fine-tune your custom roast.</p>
        </header>

        {/* Coffee List with Sliders */}
        <div className="space-y-6">
          {blend.map((item, idx) => (
            <div key={item.id} className="bg-white/5 border border-white/10 rounded-xl p-4 transition-all hover:border-[#D4AF37]/30">
              <div className="flex justify-between mb-2">
                <span className="font-bold">{item.name}</span>
                <span className="text-[#D4AF37]">€{item.price_250g}/250g</span>
              </div>
              
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={item.percentage} 
                  onChange={(e) => updatePercentage(idx, parseInt(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />
                <div className="relative w-20">
                    <input 
                        type="number" 
                        value={item.percentage}
                        onChange={(e) => updatePercentage(idx, parseInt(e.target.value))}
                        className="w-full bg-black border border-white/20 rounded px-2 py-1 text-right text-white focus:border-[#D4AF37] focus:outline-none"
                    />
                    <span className="absolute right-6 top-1 text-white/40">%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total & Validation */}
        <div className={`p-4 rounded-xl border ${totalPercentage === 100 ? 'bg-green-900/20 border-green-500/30' : 'bg-red-900/20 border-red-500/30'} flex justify-between items-center`}>
          <span>Total Composition</span>
          <span className={`font-bold ${totalPercentage === 100 ? 'text-green-400' : 'text-red-400'}`}>{totalPercentage}%</span>
        </div>

        {/* AI Advisor "The Legend" */}
        <div className="bg-[#1a1a1a] border border-[#D4AF37]/20 rounded-xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <svg className="w-24 h-24 text-[#D4AF37]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
            </div>
            <h3 className="text-[#D4AF37] font-bold mb-2 flex items-center gap-2">
                <span className="text-xl">🧙‍♂️</span> The Legend Says...
            </h3>
            <p className="text-white/80 text-sm italic">
                "You're heavy on the Brazil (Nutty). Consider bumping the Ethiopia to 40% if you want more floral high notes to cut through the body. It would also drop the price by €0.50!"
            </p>
            <div className="mt-4 flex gap-2">
                <button className="text-xs bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37] px-3 py-1 rounded-full hover:bg-[#D4AF37] hover:text-black transition-colors">
                    Apply Suggestion
                </button>
            </div>
        </div>

      </div>

      {/* RIGHT: Visualizer & Summary */}
      <div className="w-full md:w-1/2 flex flex-col items-center">
         
         {/* Vis Mode Toggle */}
         <div className="flex bg-white/5 rounded-lg p-1 mb-8">
            {['petal', 'bar', '3d'].map(m => (
                <button 
                    key={m}
                    onClick={() => setVisMode(m as any)}
                    className={`px-4 py-2 rounded-md capitalize text-sm transition-all ${visMode === m ? 'bg-[#D4AF37] text-black font-bold' : 'text-white/60 hover:text-white'}`}
                >
                    {m === '3d' ? '3D Heatmap' : m}
                </button>
            ))}
         </div>

         {/* Visualization Container */}
         <div className="relative w-full aspect-square max-w-md bg-white/5 rounded-full flex items-center justify-center mb-8 border border-white/5">
             {visMode === 'petal' && (
                 <StarFlower attributes={flavorProfile} />
             )}
             
             {visMode === 'bar' && (
                 <div className="w-full h-full p-8 flex flex-col justify-center gap-4">
                     {blend.map(b => (
                         <div key={b.id}>
                             <div className="flex justify-between text-xs mb-1">
                                 <span>{b.name}</span>
                                 <span>{b.percentage}%</span>
                             </div>
                             <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                                 <div className="h-full bg-[#D4AF37]" style={{ width: `${b.percentage}%`, opacity: b.percentage/100 + 0.3 }} />
                             </div>
                         </div>
                     ))}
                 </div>
             )}

             {visMode === '3d' && (
                 <div className="text-center text-white/40">
                     <p className="mb-2">3D Heatmap Visualization</p>
                     <div className="w-48 h-48 mx-auto bg-gradient-to-tr from-green-900 to-[#D4AF37] opacity-50 rounded-lg animate-pulse" />
                     <p className="text-xs mt-2">(WebGL Context Loading...)</p>
                 </div>
             )}
         </div>

         {/* Price Summary */}
         <div className="text-center">
             <p className="text-white/50 text-sm">Estimated Price (250g)</p>
             <p className="text-5xl font-bold text-[#D4AF37]">€{totalPrice}</p>
             
             <button 
                disabled={totalPercentage !== 100}
                className="mt-8 w-full max-w-xs bg-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E5C158] text-black text-lg font-bold py-4 rounded-full shadow-lg transition-all"
             >
                {totalPercentage === 100 ? 'Review & Bag Design →' : `Adjust Blend (${totalPercentage}%)`}
             </button>
         </div>

      </div>

    </div>
  );
}
