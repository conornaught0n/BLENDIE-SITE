"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';

export default function Portfolio() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Toggle selection logic
  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculate Aggregate Stats for Selection
  const selectedCoffees = COFFEE_DATA.filter(c => selectedIds.includes(c.id));
  const avgPrice = selectedCoffees.length > 0 
    ? (selectedCoffees.reduce((acc, c) => acc + c.price_250g, 0) / selectedCoffees.length).toFixed(2)
    : '0.00';
  
  const aggregateFlavor = {
    aroma: selectedCoffees.length > 0 ? Math.round(selectedCoffees.reduce((acc, c) => acc + c.aroma, 0) / selectedCoffees.length) : 0,
    body: selectedCoffees.length > 0 ? Math.round(selectedCoffees.reduce((acc, c) => acc + c.body, 0) / selectedCoffees.length) : 0,
    acidity: selectedCoffees.length > 0 ? Math.round(selectedCoffees.reduce((acc, c) => acc + c.acidity, 0) / selectedCoffees.length) : 0,
    sweetness: selectedCoffees.length > 0 ? Math.round(selectedCoffees.reduce((acc, c) => acc + c.sweetness, 0) / selectedCoffees.length) : 0,
    aftertaste: selectedCoffees.length > 0 ? Math.round(selectedCoffees.reduce((acc, c) => acc + c.aftertaste, 0) / selectedCoffees.length) : 0,
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      
      {/* LEFT: The Ledger (Data Table) */}
      <div className="w-full md:w-2/3 p-8 overflow-y-auto h-screen border-r border-white/10">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-[#D4AF37]">Coffee Ledger</h1>
          <p className="text-white/50 text-sm">Select coffees to analyze and blend.</p>
        </header>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-xs text-white/40 uppercase tracking-widest border-b border-white/10">
                <th className="py-4 pl-4">Select</th>
                <th className="py-4">Coffee Name</th>
                <th className="py-4">Origin</th>
                <th className="py-4">Process</th>
                <th className="py-4 text-right">Score</th>
                <th className="py-4 text-right pr-4">Price (250g)</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {COFFEE_DATA.map((coffee) => (
                <tr 
                  key={coffee.id} 
                  onClick={() => toggleSelection(coffee.id)}
                  className={`border-b border-white/5 cursor-pointer transition-colors hover:bg-white/5 ${selectedIds.includes(coffee.id) ? 'bg-[#D4AF37]/10' : ''}`}
                >
                  <td className="py-4 pl-4">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${selectedIds.includes(coffee.id) ? 'bg-[#D4AF37] border-[#D4AF37] text-black' : 'border-white/20'}`}>
                      {selectedIds.includes(coffee.id) && '✓'}
                    </div>
                  </td>
                  <td className="py-4 font-medium text-white">
                    {coffee.name}
                    <div className="text-xs text-white/30 hidden sm:block">{coffee.tags.slice(0, 2).join(', ')}</div>
                  </td>
                  <td className="py-4 text-white/70">{coffee.origin}</td>
                  <td className="py-4 text-white/70">{coffee.process}</td>
                  <td className="py-4 text-right font-mono text-[#D4AF37]">
                    {((coffee.aroma + coffee.body + coffee.acidity + coffee.sweetness) / 4).toFixed(1)}
                  </td>
                  <td className="py-4 text-right pr-4 font-mono">€{coffee.price_250g.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT: The Preview (Fixed Panel) */}
      <div className="w-full md:w-1/3 bg-[#0a0a0a] p-8 flex flex-col items-center justify-center border-l border-white/10 relative">
        <div className="sticky top-8 w-full flex flex-col items-center">
            
            <h2 className="text-xl font-bold text-white mb-6">Blend Preview</h2>
            
            {/* The Flower Visualizer */}
            <div className="w-full aspect-square max-w-[300px] mb-8 bg-black/20 rounded-full border border-white/5 flex items-center justify-center">
                {selectedIds.length > 0 ? (
                    <StarFlower attributes={aggregateFlavor} />
                ) : (
                    <div className="text-white/30 text-center text-sm">
                        Select coffees from the ledger<br/>to visualize flavor.
                    </div>
                )}
            </div>

            {/* Selection Summary */}
            <div className="w-full space-y-4">
                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                    <span className="text-white/50">Selected Count</span>
                    <span className="text-white font-mono">{selectedIds.length}</span>
                </div>
                <div className="flex justify-between text-sm border-b border-white/10 pb-2">
                    <span className="text-white/50">Est. Avg Price</span>
                    <span className="text-[#D4AF37] font-mono font-bold">€{avgPrice}</span>
                </div>
            </div>

            {/* Actions */}
            <button 
                disabled={selectedIds.length === 0}
                className="mt-8 w-full bg-[#D4AF37] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E5C158] text-black font-bold py-4 rounded-full shadow-lg transition-all"
            >
                Proceed to Mix ({selectedIds.length}) &rarr;
            </button>

        </div>
      </div>

    </div>
  );
}
