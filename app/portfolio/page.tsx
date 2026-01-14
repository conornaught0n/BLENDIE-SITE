"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { useBlendStore } from '@/store/blend-store';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export default function Portfolio() {
  const router = useRouter();
  const { currentBlend, addCoffee, removeCoffee, updatePercentage } = useBlendStore();
  
  // View State
  const [activeTab, setActiveTab] = useState<'favorites' | 'stock' | 'blends'>('stock');
  const [isWorkbenchOpen, setWorkbenchOpen] = useState(false); // Controls the "Blending Mode"

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
      if (!isWorkbenchOpen) setWorkbenchOpen(true); // Auto-open workbench on add
    }
  };

  // Data Filtering Logic
  const filteredData = COFFEE_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = filterRegion === 'All' || c.origin === filterRegion;
    // In a real app, 'favorites' would filter against a user's saved list
    return matchesSearch && matchesRegion;
  });

  // Workbench Logic (Active Blend Stats)
  const totalPercentage = currentBlend.reduce((acc, c) => acc + c.percentage, 0);
  const avgPrice = currentBlend.length > 0 
    ? (currentBlend.reduce((acc, c) => acc + (c.price_250g * (c.percentage / 100 || 1/currentBlend.length)), 0)).toFixed(2)
    : '0.00';

  const aggregateFlavor = {
    aroma: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aroma * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    body: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.body * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    acidity: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.acidity * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    sweetness: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.sweetness * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    aftertaste: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aftertaste * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-20">
      
      {/* TOP: The Ledger (Browse & Select) */}
      <div className={`flex-1 p-8 transition-all duration-500 ${isWorkbenchOpen ? 'pb-96' : ''}`}>
        
        <header className="mb-8 flex justify-between items-end">
            <div>
                <h1 className="text-4xl font-serif mb-2">My Portfolio</h1>
                <p className="opacity-50 text-sm uppercase tracking-wide">Marketplace & Holdings</p>
            </div>
            
            {/* Search & Filter */}
            <div className="flex gap-4">
                <input 
                    type="text" 
                    placeholder="Search beans..." 
                    className="bg-black/5 rounded-full px-4 py-2 text-sm focus:outline-none w-64"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="bg-black/5 rounded-full px-4 py-2 text-sm focus:outline-none cursor-pointer"
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

        {/* Tabs */}
        <div className="flex gap-8 border-b border-black/5 pb-4 mb-6 text-sm uppercase tracking-widest">
            <button onClick={() => setActiveTab('stock')} className={`${activeTab === 'stock' ? 'font-bold border-b-2 border-black pb-4 -mb-4.5' : 'opacity-40'}`}>Market (Stock)</button>
            <button onClick={() => setActiveTab('favorites')} className={`${activeTab === 'favorites' ? 'font-bold border-b-2 border-black pb-4 -mb-4.5' : 'opacity-40'}`}>Favorites (8)</button>
            <button onClick={() => setActiveTab('blends')} className={`${activeTab === 'blends' ? 'font-bold border-b-2 border-black pb-4 -mb-4.5' : 'opacity-40'}`}>My Blends</button>
        </div>

        {/* Ledger Table */}
        <table className="w-full text-left border-collapse">
            <thead className="text-[10px] uppercase tracking-[0.2em] opacity-40 border-b border-black/5">
                <tr>
                    <th className="pb-4 pl-4 w-12">Action</th>
                    <th className="pb-4">Asset Name</th>
                    <th className="pb-4">Origin</th>
                    <th className="pb-4 text-right">Score</th>
                    <th className="pb-4 text-right pr-4">Value (250g)</th>
                </tr>
            </thead>
            <tbody className="text-sm font-light">
                {filteredData.map((coffee) => (
                    <tr 
                        key={coffee.id} 
                        className={`group border-b border-black/5 hover:bg-black/[0.02] transition-colors ${isSelected(coffee.id) ? 'bg-[#C6A87C]/10' : ''}`}
                    >
                        <td className="py-4 pl-4 align-middle">
                            <button 
                                onClick={() => toggleSelection(coffee)}
                                className={`w-6 h-6 flex items-center justify-center rounded-full border transition-all ${isSelected(coffee.id) ? 'bg-black border-black text-white' : 'border-black/20 hover:border-black'}`}
                            >
                                {isSelected(coffee.id) ? '-' : '+'}
                            </button>
                        </td>
                        <td className="py-4 align-middle">
                            <span className="block font-serif text-lg leading-tight">{coffee.name}</span>
                            <span className="text-xs opacity-50 uppercase tracking-wide">{coffee.process}</span>
                        </td>
                        <td className="py-4 align-middle opacity-60 text-xs uppercase tracking-widest">{coffee.origin}</td>
                        <td className="py-4 text-right font-mono font-bold text-[#C6A87C] align-middle">
                            {((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}
                        </td>
                        <td className="py-4 text-right pr-4 font-mono align-middle">€{coffee.price_250g.toFixed(2)}</td>
                    </tr>
                ))}
            </tbody>
        </table>

      </div>

      {/* BOTTOM: The Workbench (Sandbox) - Always available or toggleable */}
      <AnimatePresence>
        {isWorkbenchOpen && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 h-96 bg-white border-t border-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 flex flex-col md:flex-row"
            >
                {/* Close Handle */}
                <button 
                    onClick={() => setWorkbenchOpen(false)}
                    className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-6 py-1 rounded-t-xl border-t border-x border-black/10 text-xs font-bold uppercase tracking-widest hover:pb-2 transition-all"
                >
                    Close Workbench ▼
                </button>

                {/* Left: Sliders & Controls */}
                <div className="flex-1 p-8 overflow-y-auto border-r border-black/5">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-serif text-2xl">Active Blend Mix</h3>
                        <span className={`font-mono text-xl ${totalPercentage === 100 ? 'text-black' : 'text-red-500'}`}>{totalPercentage}%</span>
                    </div>
                    
                    {currentBlend.length === 0 ? (
                        <p className="opacity-40 text-center py-12">Select assets from the ledger to begin blending.</p>
                    ) : (
                        <div className="space-y-6">
                            {currentBlend.map(item => (
                                <div key={item.id} className="flex items-center gap-4 group">
                                    <button onClick={() => removeCoffee(item.id)} className="text-xs text-red-300 hover:text-red-500">✕</button>
                                    <div className="w-32">
                                        <p className="font-bold text-sm truncate">{item.name}</p>
                                        <p className="text-xs opacity-50">€{item.price_250g}</p>
                                    </div>
                                    <input 
                                        type="range" min="0" max="100" value={item.percentage} 
                                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                        className="flex-1 h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-black"
                                    />
                                    <span className="font-mono w-12 text-right">{item.percentage}%</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right: Visualizer & Actions */}
                <div className="w-full md:w-96 bg-[#F9F9F9] p-8 flex flex-col items-center justify-center relative">
                    <div className="w-40 h-40 mb-6">
                        <StarFlower attributes={aggregateFlavor} />
                    </div>
                    
                    <div className="w-full space-y-2 mb-6 text-sm">
                        <div className="flex justify-between">
                            <span className="opacity-50">Est. Price</span>
                            <span className="font-bold font-mono">€{avgPrice}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="opacity-50">Score</span>
                            <span className="font-bold font-mono text-[#C6A87C]">8.7</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => router.push('/configurator')}
                        disabled={totalPercentage !== 100}
                        className="w-full bg-black text-white py-3 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#C6A87C] transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                    >
                        Package Design →
                    </button>
                </div>

            </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle if closed */}
      {!isWorkbenchOpen && currentBlend.length > 0 && (
          <button 
            onClick={() => setWorkbenchOpen(true)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-3 rounded-full shadow-2xl hover:scale-105 transition-transform z-20 flex items-center gap-2"
          >
            <span>Open Workbench</span>
            <span className="bg-white text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{currentBlend.length}</span>
          </button>
      )}

    </div>
  );
}
