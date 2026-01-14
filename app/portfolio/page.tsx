"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { FlavorTerrainCanvas } from '@/components/canvas/FlavorTerrain';
import { useBlendStore } from '@/store/blend-store';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { StockGraph } from '@/components/StockGraph';

// Helper for Flag Emojis
const getFlag = (origin: string) => {
  const flags: Record<string, string> = {
    'Ethiopia': '🇪🇹', 'Brazil': '🇧🇷', 'Colombia': '🇨🇴', 'Guatemala': '🇬🇹', 'El Salvador': '🇸🇻', 'Nicaragua': '🇳🇮', 'Kenya': '🇰🇪', 'Indonesia': '🇮🇩'
  };
  return flags[origin] || '🌍';
};

export default function Portfolio() {
  const router = useRouter();
  const { currentBlend, addCoffee, removeCoffee, updatePercentage } = useBlendStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // View State
  const [activeTab, setActiveTab] = useState<'favorites' | 'stock' | 'blends'>('stock');
  // Workbench is now always visible if items exist, docked to the right
  
  // Configuration State
  const [weight, setWeight] = useState<'250g' | '1kg'>('250g');
  const [grind, setGrind] = useState<'bean' | 'ground'>('bean');
  const [vis3D, setVis3D] = useState(false);

  // Filter State
  const [search, setSearch] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');

  // Helpers
  const isSelected = (id: string) => currentBlend.some(c => c.id === id);
  const toggleSelection = (e: React.MouseEvent, coffee: any) => {
    e.stopPropagation();
    if (isSelected(coffee.id)) {
      removeCoffee(coffee.id);
    } else {
      addCoffee(coffee);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Workbench Math
  const totalPercentage = currentBlend.reduce((acc, c) => acc + c.percentage, 0);
  const basePrice250 = currentBlend.reduce((acc, c) => acc + (c.price_250g * (c.percentage / 100 || 1/currentBlend.length)), 0);
  const basePrice1kg = basePrice250 * 3.8;
  
  let finalPrice = weight === '250g' ? basePrice250 : basePrice1kg;
  if (grind === 'ground') {
      const surcharge = weight === '1kg' ? 0.75 : 0.75 / 4;
      finalPrice += surcharge;
  }

  const aggregateFlavor = {
    body: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.body * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    dark: 5,
    bright: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.acidity * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    fruity: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.aroma * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
    sweet: currentBlend.length > 0 ? Math.round(currentBlend.reduce((acc, c) => acc + (c.sweetness * (c.percentage / 100 || 1/currentBlend.length)), 0)) : 0,
  };

  const filteredData = COFFEE_DATA.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = filterRegion === 'All' || c.origin === filterRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row font-sans pt-20 overflow-hidden">
      
      {/* LEFT: The Ledger (Scrollable List) */}
      <div className={`flex-1 flex flex-col h-[calc(100vh-80px)] border-r border-border-color transition-all duration-300 ${currentBlend.length > 0 ? 'md:w-3/5' : 'w-full'}`}>
        
        {/* Sticky Header */}
        <div className="p-6 md:p-8 bg-background border-b border-border-color z-10">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-fruit-plum">Portfolio</h1>
                    <p className="opacity-50 text-xs uppercase tracking-wide">Available Stock</p>
                </div>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="bg-black/5 rounded-sm px-3 py-1.5 text-xs focus:outline-none w-32 md:w-48"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-6 text-xs uppercase tracking-widest font-bold">
                <button onClick={() => setActiveTab('stock')} className={`${activeTab === 'stock' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Market</button>
                <button onClick={() => setActiveTab('favorites')} className={`${activeTab === 'favorites' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Favorites</button>
            </div>
        </div>

        {/* Scrollable Table */}
        <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left border-collapse">
                <thead className="text-[10px] uppercase tracking-[0.1em] opacity-40 border-b border-border-color sticky top-0 bg-background z-10">
                    <tr>
                        <th className="py-2 pl-4 w-10"></th>
                        <th className="py-2">Coffee</th>
                        <th className="py-2 hidden md:table-cell">Details</th>
                        <th className="py-2 text-right pr-4">Price</th>
                    </tr>
                </thead>
                <tbody className="text-xs font-medium">
                    {filteredData.map((coffee) => (
                        <tr 
                            key={coffee.id} 
                            onClick={() => toggleExpand(coffee.id)}
                            className={`group border-b border-border-color hover:bg-fruit-citrus/5 transition-colors cursor-pointer ${isSelected(coffee.id) ? 'bg-fruit-plum/5' : ''}`}
                        >
                            <td className="py-3 pl-4 align-top pt-4">
                                <button 
                                    onClick={(e) => toggleSelection(e, coffee)}
                                    className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-all ${isSelected(coffee.id) ? 'bg-fruit-plum border-fruit-plum text-white' : 'border-black/20 hover:border-fruit-plum text-fruit-plum'}`}
                                >
                                    {isSelected(coffee.id) ? '✓' : '+'}
                                </button>
                            </td>
                            <td className="py-3 align-top pt-4">
                                <div className="flex items-center gap-2 mb-1">
                                    <span>{getFlag(coffee.origin)}</span>
                                    <span className="font-serif font-bold text-sm text-fruit-plum">{coffee.name}</span>
                                </div>
                                <div className="flex gap-1 flex-wrap opacity-60">
                                    {coffee.tags.slice(0, 2).map(tag => (
                                        <span key={tag} className="text-[9px] bg-black/5 px-1.5 py-0.5 rounded">{tag}</span>
                                    ))}
                                </div>
                                {/* Expandable Details */}
                                <AnimatePresence>
                                    {expandedId === coffee.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden mt-3 text-[10px] opacity-70 leading-relaxed max-w-sm"
                                        >
                                            {coffee.process} process from {coffee.origin}. Produced by {coffee.producer}.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </td>
                            <td className="py-3 hidden md:table-cell align-top pt-4 opacity-60 text-[10px]">
                                {coffee.origin} • {coffee.process}
                            </td>
                            <td className="py-3 text-right pr-4 align-top pt-4 font-mono opacity-80">
                                €{(coffee.price_250g * 4).toFixed(2)}/kg
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>

      {/* RIGHT: The Workbench (Persistent Sidebar) */}
      <AnimatePresence>
        {currentBlend.length > 0 && (
            <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                className="w-full md:w-[400px] bg-[#FFFCF5] border-l border-border-color shadow-[-5px_0_20px_rgba(0,0,0,0.02)] flex flex-col h-[calc(100vh-80px)] z-20"
            >
                {/* Header */}
                <div className="p-6 border-b border-black/5 bg-[#FFFCF5]">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="font-serif text-xl font-bold text-fruit-plum">Active Blend</h2>
                        <span className={`text-xs font-bold uppercase tracking-widest ${totalPercentage === 100 ? 'text-fruit-green' : 'text-fruit-berry'}`}>
                            {totalPercentage}%
                        </span>
                    </div>
                    <p className="text-[10px] opacity-50 uppercase tracking-wide">Adjust ratios below</p>
                </div>

                {/* List of Components (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {currentBlend.map(item => (
                        <div key={item.id} className="bg-white p-3 rounded-lg border border-black/5 shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-xs truncate w-32">{item.name}</span>
                                <button onClick={() => removeCoffee(item.id)} className="text-[10px] text-fruit-berry hover:underline">Remove</button>
                            </div>
                            <div className="flex items-center gap-3">
                                <input 
                                    type="range" min="0" max="100" value={item.percentage} 
                                    onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                    className="flex-1 h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-fruit-plum"
                                />
                                <span className="font-mono text-xs w-8 text-right">{item.percentage}%</span>
                            </div>
                        </div>
                    ))}
                    
                    {/* Add Coffee Hint */}
                    <div className="text-center p-4 border border-dashed border-black/10 rounded-lg text-xs opacity-40 hover:opacity-100 cursor-pointer transition-opacity" onClick={() => {}}>
                        Select more coffees from the ledger ←
                    </div>
                </div>

                {/* Visualizer & Stats (Fixed Bottom) */}
                <div className="p-6 bg-white border-t border-black/5">
                    
                    {/* Tiny Visualizer */}
                    <div className="flex justify-center mb-4 relative">
                        <div className="w-24 h-24">
                            {vis3D ? <FlavorTerrainCanvas attributes={aggregateFlavor} /> : <StarFlower attributes={aggregateFlavor} />}
                        </div>
                        <button onClick={() => setVis3D(!vis3D)} className="absolute top-0 right-0 text-[9px] opacity-40 hover:opacity-100 border border-black/10 px-1 rounded">3D</button>
                    </div>

                    {/* Controls */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex bg-[#F5F5F4] rounded p-0.5">
                            <button onClick={() => setWeight('250g')} className={`flex-1 text-[9px] font-bold rounded-sm ${weight === '250g' ? 'bg-white shadow-sm' : 'opacity-50'}`}>250g</button>
                            <button onClick={() => setWeight('1kg')} className={`flex-1 text-[9px] font-bold rounded-sm ${weight === '1kg' ? 'bg-white shadow-sm' : 'opacity-50'}`}>1kg</button>
                        </div>
                        <div className="flex bg-[#F5F5F4] rounded p-0.5">
                            <button onClick={() => setGrind('bean')} className={`flex-1 text-[9px] font-bold rounded-sm ${grind === 'bean' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Bean</button>
                            <button onClick={() => setGrind('ground')} className={`flex-1 text-[9px] font-bold rounded-sm ${grind === 'ground' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Gnd</button>
                        </div>
                    </div>

                    {/* Price & Checkout */}
                    <div className="flex justify-between items-end mb-3">
                        <div className="text-[10px] opacity-50">Total Est.</div>
                        <span className="font-mono text-2xl font-bold text-fruit-plum">€{finalPrice.toFixed(2)}</span>
                    </div>
                    
                    <button 
                        onClick={() => router.push('/configurator')}
                        disabled={totalPercentage !== 100}
                        className="w-full btn-primary py-3 text-[10px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
                    >
                        Design Packaging →
                    </button>
                </div>

            </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
