"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { useBlendStore } from '@/store/blend-store';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { StockGraph } from '@/components/StockGraph';

export default function Portfolio() {
  const router = useRouter();
  const { currentBlend, addCoffee, removeCoffee, updatePercentage } = useBlendStore();
  
  // View State
  const [activeTab, setActiveTab] = useState<'favorites' | 'stock' | 'blends'>('stock');
  const [isWorkbenchOpen, setWorkbenchOpen] = useState(false);

  // Configuration State
  const [weight, setWeight] = useState<'250g' | '1kg'>('250g');
  const [grind, setGrind] = useState<'bean' | 'ground'>('bean');

  // Filter State
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');

  // Helpers
  const isSelected = (id: string) => currentBlend.some(c => c.id === id);
  const toggleSelection = (coffee: any) => {
    if (isSelected(coffee.id)) {
      removeCoffee(coffee.id);
    } else {
      addCoffee(coffee);
      if (!isWorkbenchOpen) setWorkbenchOpen(true);
    }
  };

  const filteredData = COFFEE_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = filterRegion === 'All' || c.origin === filterRegion;
    return matchesSearch && matchesRegion;
  });

  // Workbench Math
  const totalPercentage = currentBlend.reduce((acc, c) => acc + c.percentage, 0);
  
  // Price Calc
  const basePrice250 = currentBlend.reduce((acc, c) => acc + (c.price_250g * (c.percentage / 100 || 1/currentBlend.length)), 0);
  const basePrice1kg = basePrice250 * 3.8; // Bulk discount logic (approx 4x minus discount)
  
  let finalPrice = weight === '250g' ? basePrice250 : basePrice1kg;
  
  // Grind Surcharge (€0.75 per kg)
  if (grind === 'ground') {
      const surcharge = weight === '1kg' ? 0.75 : 0.75 / 4;
      finalPrice += surcharge;
  }

  const aggregateFlavor = {
    aroma: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aroma * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    body: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.body * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    acidity: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.acidity * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    sweetness: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.sweetness * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    aftertaste: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aftertaste * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-20">
      
      {/* Ledger Section */}
      <div className={`flex-1 p-8 transition-all duration-500 ${isWorkbenchOpen ? 'pb-96' : ''}`}>
        
        <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h1 className="text-4xl font-serif mb-2">My Portfolio</h1>
                <p className="opacity-50 text-sm uppercase tracking-wide">Marketplace & Holdings</p>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
                <input 
                    type="text" 
                    placeholder="Search beans..." 
                    className="bg-black/5 rounded-sm px-4 py-2 text-sm focus:outline-none flex-1 md:w-64 border border-transparent focus:border-coffee-brown"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="bg-black/5 rounded-sm px-4 py-2 text-sm focus:outline-none cursor-pointer border border-transparent focus:border-coffee-brown"
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                >
                    <option value="All">Region: All</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Colombia">Colombia</option>
                </select>
            </div>
        </header>

        <div className="flex gap-8 border-b border-black/5 pb-4 mb-6 text-sm uppercase tracking-widest">
            <button onClick={() => setActiveTab('stock')} className={`${activeTab === 'stock' ? 'font-bold border-b-2 border-coffee-brown pb-4 -mb-4.5 text-coffee-brown' : 'opacity-40 hover:opacity-100'}`}>Market (Stock)</button>
            <button onClick={() => setActiveTab('favorites')} className={`${activeTab === 'favorites' ? 'font-bold border-b-2 border-coffee-brown pb-4 -mb-4.5 text-coffee-brown' : 'opacity-40 hover:opacity-100'}`}>Favorites (8)</button>
            <button onClick={() => setActiveTab('blends')} className={`${activeTab === 'blends' ? 'font-bold border-b-2 border-coffee-brown pb-4 -mb-4.5 text-coffee-brown' : 'opacity-40 hover:opacity-100'}`}>My Blends</button>
        </div>

        <table className="w-full text-left border-collapse">
            <thead className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-black/5">
                <tr>
                    <th className="pb-4 pl-4 w-12">Action</th>
                    <th className="pb-4">Asset Name</th>
                    <th className="pb-4 hidden md:table-cell">Origin</th>
                    <th className="pb-4 text-right">Score</th>
                    <th className="pb-4 text-right pr-4">Value (250g)</th>
                </tr>
            </thead>
            <tbody className="text-sm font-light">
                {filteredData.map((coffee) => (
                    <tr 
                        key={coffee.id} 
                        className={`group border-b border-black/5 hover:bg-coffee-yellow/5 transition-colors ${isSelected(coffee.id) ? 'bg-coffee-brown/5' : ''}`}
                    >
                        <td className="py-4 pl-4 align-middle">
                            <button 
                                onClick={() => toggleSelection(coffee)}
                                className={`w-6 h-6 flex items-center justify-center rounded-sm border transition-all ${isSelected(coffee.id) ? 'bg-coffee-brown border-coffee-brown text-white' : 'border-black/20 hover:border-coffee-brown text-coffee-brown'}`}
                            >
                                {isSelected(coffee.id) ? '-' : '+'}
                            </button>
                        </td>
                        <td className="py-4 align-middle">
                            <span className="block font-serif text-lg leading-tight group-hover:text-coffee-brown transition-colors">{coffee.name}</span>
                            <span className="text-xs opacity-50 uppercase tracking-wide">{coffee.process}</span>
                        </td>
                        <td className="py-4 align-middle opacity-60 text-xs uppercase tracking-widest hidden md:table-cell">{coffee.origin}</td>
                        <td className="py-4 text-right font-mono font-bold text-coffee-yellow align-middle">
                            {((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}
                        </td>
                        <td className="py-4 text-right pr-4 font-mono align-middle">€{coffee.price_250g.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* WORKBENCH (Bottom Sheet) */}
      <AnimatePresence>
        {isWorkbenchOpen && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 h-[500px] md:h-96 bg-white border-t border-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 flex flex-col md:flex-row"
            >
                <button 
                    onClick={() => setWorkbenchOpen(false)}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-1 rounded-t-lg border-t border-x border-black/10 text-[10px] font-bold uppercase tracking-widest hover:pb-2 transition-all"
                >
                    Close Workbench ▼
                </button>

                {/* Left: Controls & Graph */}
                <div className="flex-1 p-8 overflow-y-auto border-r border-black/5 flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-serif text-2xl text-coffee-brown">Active Blend Mix</h3>
                        <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                            <span className={totalPercentage === 100 ? 'text-green-600' : 'text-red-500'}>
                                Total: {totalPercentage}%
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {currentBlend.length === 0 ? (
                            <p className="opacity-40 text-center py-8 text-sm">Select assets from the ledger to begin blending.</p>
                        ) : (
                            currentBlend.map(item => (
                                <div key={item.id} className="flex items-center gap-4 group">
                                    <button onClick={() => removeCoffee(item.id)} className="text-xs text-red-300 hover:text-red-500 w-4">✕</button>
                                    <div className="w-32">
                                        <p className="font-bold text-sm truncate">{item.name}</p>
                                    </div>
                                    <input 
                                        type="range" min="0" max="100" value={item.percentage} 
                                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                        className="flex-1 h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-coffee-brown"
                                    />
                                    <span className="font-mono w-8 text-right text-sm">{item.percentage}%</span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Stock Graph Integration */}
                    <div className="hidden md:block h-24 mt-auto opacity-80">
                        <StockGraph currentPrice={finalPrice.toFixed(2)} currentScore={8.7} />
                    </div>
                </div>

                {/* Right: Output & Actions */}
                <div className="w-full md:w-80 bg-[#FDFBF7] p-8 flex flex-col relative border-l border-black/5">
                    
                    {/* Visualizer */}
                    <div className="w-32 h-32 mx-auto mb-6">
                        <StarFlower attributes={aggregateFlavor} />
                    </div>
                    
                    {/* Configuration Toggles */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                        <div className="flex bg-white rounded-sm border border-black/10 p-1">
                            <button onClick={() => setWeight('250g')} className={`flex-1 text-[10px] font-bold ${weight === '250g' ? 'bg-coffee-brown text-white shadow-sm' : 'opacity-50'}`}>250g</button>
                            <button onClick={() => setWeight('1kg')} className={`flex-1 text-[10px] font-bold ${weight === '1kg' ? 'bg-coffee-brown text-white shadow-sm' : 'opacity-50'}`}>1kg</button>
                        </div>
                        <div className="flex bg-white rounded-sm border border-black/10 p-1">
                            <button onClick={() => setGrind('bean')} className={`flex-1 text-[10px] font-bold ${grind === 'bean' ? 'bg-coffee-brown text-white shadow-sm' : 'opacity-50'}`}>Bean</button>
                            <button onClick={() => setGrind('ground')} className={`flex-1 text-[10px] font-bold ${grind === 'ground' ? 'bg-coffee-brown text-white shadow-sm' : 'opacity-50'}`}>Gnd</button>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-auto">
                        <div className="flex justify-between items-end mb-4 border-t border-black/5 pt-4">
                            <div className="text-xs opacity-50">
                                <p>Est. Cost</p>
                                {grind === 'ground' && <p className="text-[10px] text-coffee-red">+ €{weight === '1kg' ? '0.75' : '0.19'} Grind</p>}
                            </div>
                            <span className="font-mono text-3xl font-bold text-coffee-brown">€{finalPrice.toFixed(2)}</span>
                        </div>

                        <button 
                            onClick={() => router.push('/configurator')}
                            disabled={totalPercentage !== 100}
                            className="w-full btn-primary py-3 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Design Packaging →
                        </button>
                    </div>
                </div>

            </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle */}
      {!isWorkbenchOpen && currentBlend.length > 0 && (
          <button 
            onClick={() => setWorkbenchOpen(true)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-coffee-brown text-white px-6 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform z-20 flex items-center gap-3 border border-white/20"
          >
            <span className="font-serif font-bold">Open Workbench</span>
            <span className="bg-white text-coffee-brown w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono">{currentBlend.length}</span>
          </button>
      )}

    </div>
  );
}
