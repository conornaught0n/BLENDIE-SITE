"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';

export default function Portfolio() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [step, setStep] = useState(1); // 1: Select, 2: Blend, 3: Review

  // Toggle selection logic
  const toggleSelection = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Aggregate Data
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
    <div className="min-h-screen bg-[#F5F5F4] text-foreground flex flex-col md:flex-row overflow-hidden">
      
      {/* LEFT: Ledger (Step 1) */}
      <div className={`w-full md:w-2/3 h-screen overflow-y-auto p-8 border-r border-black/5 transition-transform duration-500 ease-in-out ${step === 1 ? 'translate-x-0' : '-translate-x-full hidden md:block'}`}>
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <h1 className="text-2xl font-bold">Select Components</h1>
          </div>
          
          {/* Advanced Filter Bar (Placeholder) */}
          <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-black/5 text-sm overflow-x-auto">
             <select className="bg-transparent font-medium focus:outline-none"><option>Region: All</option></select>
             <div className="w-px h-4 bg-black/10"/>
             <select className="bg-transparent font-medium focus:outline-none"><option>Process: All</option></select>
             <div className="w-px h-4 bg-black/10"/>
             <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox"/> In Stock Only</label>
          </div>
        </header>

        {/* Saved Blends Separator */}
        <div className="mb-8">
           <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black/5 pb-2">Saved Blends & Templates</h3>
           <div className="p-4 border border-dashed border-black/10 rounded-lg text-center text-sm opacity-50 hover:bg-white hover:opacity-100 cursor-pointer transition-all">
              + Create New Template
           </div>
        </div>

        <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 border-b border-black/5 pb-2">Stock Coffees</h3>
        <table className="w-full text-left">
            <thead className="text-xs uppercase tracking-wider opacity-40">
              <tr>
                <th className="pb-4 pl-4">Add</th>
                <th className="pb-4">Coffee</th>
                <th className="pb-4">Origin</th>
                <th className="pb-4 text-right">Score</th>
                <th className="pb-4 text-right pr-4">Price</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {COFFEE_DATA.map((coffee) => (
                <tr 
                  key={coffee.id} 
                  onClick={() => toggleSelection(coffee.id)}
                  className={`group border-b border-black/5 cursor-pointer transition-all hover:bg-white ${selectedIds.includes(coffee.id) ? 'bg-[#D4AF37]/5' : ''}`}
                >
                  <td className="py-3 pl-4">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${selectedIds.includes(coffee.id) ? 'bg-black border-black text-white' : 'border-black/20'}`}>
                      {selectedIds.includes(coffee.id) && '✓'}
                    </div>
                  </td>
                  <td className="py-3 font-medium">
                    {coffee.name}
                    <span className="ml-2 text-[10px] bg-black/5 px-1.5 rounded text-black/50">{coffee.process}</span>
                  </td>
                  <td className="py-3 opacity-60">{coffee.origin}</td>
                  <td className="py-3 text-right font-mono font-bold text-[#D4AF37]">
                    {((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}
                  </td>
                  <td className="py-3 text-right pr-4 font-mono">€{coffee.price_250g}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>

      {/* RIGHT: Live Preview & Steps (Fixed) */}
      <div className="w-full md:w-1/3 bg-white border-l border-black/5 p-8 flex flex-col relative z-10 shadow-xl">
         
         <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-lg font-bold mb-6">Flavor Profile</h2>
            <div className="w-64 h-64 mb-8">
                {selectedIds.length > 0 ? (
                    <StarFlower attributes={aggregateFlavor} />
                ) : (
                    <div className="w-full h-full rounded-full border-2 border-dashed border-black/10 flex items-center justify-center text-center p-8 text-sm opacity-40">
                        Select coffees from the ledger to see flavor visualization
                    </div>
                )}
            </div>

            <div className="w-full bg-[#F5F5F4] rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="opacity-50">Selected</span>
                    <span className="font-bold">{selectedIds.length} Coffees</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="opacity-50">Est. Price (250g)</span>
                    <span className="font-bold text-[#D4AF37]">€{avgPrice}</span>
                </div>
            </div>
         </div>

         {/* Navigation Actions */}
         <div className="mt-8 space-y-3">
            <button 
                onClick={() => setStep(2)}
                disabled={selectedIds.length === 0}
                className="w-full bg-black text-white py-4 rounded-full font-bold hover:scale-105 transition-transform disabled:opacity-50 disabled:scale-100 shadow-lg"
            >
                Proceed to Blend (Step 2) →
            </button>
            <p className="text-center text-xs opacity-40">Next: Adjust percentages & ratios</p>
         </div>

      </div>

    </div>
  );
}
