"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
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
  const [isWorkbenchOpen, setWorkbenchOpen] = useState(false);

  // Configuration State
  const [weight, setWeight] = useState<'250g' | '1kg'>('250g');
  const [grind, setGrind] = useState<'bean' | 'ground'>('bean');

  // Helpers
  const isSelected = (id: string) => currentBlend.some(c => c.id === id);
  const toggleSelection = (e: React.MouseEvent, coffee: any) => {
    e.stopPropagation();
    if (isSelected(coffee.id)) {
      removeCoffee(coffee.id);
    } else {
      addCoffee(coffee);
      if (!isWorkbenchOpen) setWorkbenchOpen(true);
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

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-20">
      
      {/* Ledger Section */}
      <div className={`flex-1 px-4 md:px-8 py-8 transition-all duration-500 ${isWorkbenchOpen ? 'pb-96' : ''}`}>
        
        <header className="mb-6 flex justify-between items-end">
            <div>
                <h1 className="text-3xl font-serif font-bold text-fruit-plum">Portfolio</h1>
                <p className="opacity-50 text-xs uppercase tracking-wide">Available Coffees</p>
            </div>
            
            {/* Simple Sort (Placeholder) */}
            <select className="bg-transparent text-xs font-bold uppercase tracking-widest border-b border-black/10 pb-1 focus:outline-none">
                <option>Sort: Price (Low to High)</option>
                <option>Sort: Score (High to Low)</option>
            </select>
        </header>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-black/5 pb-2 mb-4 text-xs uppercase tracking-widest font-bold overflow-x-auto">
            <button onClick={() => setActiveTab('stock')} className={`${activeTab === 'stock' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40'}`}>Available</button>
            <button onClick={() => setActiveTab('favorites')} className={`${activeTab === 'favorites' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40'}`}>Favorites</button>
            <button onClick={() => setActiveTab('blends')} className={`${activeTab === 'blends' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40'}`}>Templates</button>
        </div>

        {/* High Density Table */}
        <div className="w-full">
            <div className="grid grid-cols-[40px_1fr_1fr_80px_80px_40px] text-[10px] uppercase tracking-[0.1em] opacity-40 border-b border-black/5 pb-2 px-2 hidden md:grid">
                <span>Add</span>
                <span>Coffee / Origin</span>
                <span>Process / Farm</span>
                <span className="text-right">Score</span>
                <span className="text-right">Price/kg</span>
                <span className="text-center">Info</span>
            </div>

            <div className="divide-y divide-black/5">
                {COFFEE_DATA.map((coffee) => {
                    const pricePerKg = coffee.price_250g * 4;
                    const score = ((coffee.aroma + coffee.body + coffee.acidity)/3 * 10).toFixed(0); // Mock 80-90 score

                    return (
                        <div key={coffee.id} className={`group hover:bg-fruit-citrus/5 transition-colors ${isSelected(coffee.id) ? 'bg-fruit-plum/5' : ''}`}>
                            {/* Main Row */}
                            <div 
                                onClick={() => toggleExpand(coffee.id)}
                                className="grid grid-cols-[40px_1fr_80px] md:grid-cols-[40px_1fr_1fr_80px_80px_40px] py-3 px-2 items-center cursor-pointer"
                            >
                                {/* Add Button */}
                                <div onClick={(e) => toggleSelection(e, coffee)} className="flex items-center justify-center">
                                    <div className={`w-5 h-5 flex items-center justify-center rounded-sm border transition-all ${isSelected(coffee.id) ? 'bg-fruit-plum border-fruit-plum text-white' : 'border-black/20 hover:border-fruit-plum text-fruit-plum'}`}>
                                        {isSelected(coffee.id) ? '✓' : '+'}
                                    </div>
                                </div>

                                {/* Coffee Name & Origin */}
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-lg">{getFlag(coffee.origin)}</span>
                                        <span className="font-serif font-bold text-sm text-fruit-plum">{coffee.name}</span>
                                    </div>
                                    <div className="text-[10px] opacity-50 ml-7 md:hidden">{coffee.process} • €{pricePerKg}/kg</div>
                                </div>

                                {/* Process (Desktop) */}
                                <div className="hidden md:block text-xs opacity-70">
                                    <span className="block">{coffee.process}</span>
                                    <span className="text-[10px] opacity-60">{coffee.producer}</span>
                                </div>

                                {/* Score */}
                                <div className="text-right font-mono font-bold text-fruit-citrus text-sm">
                                    {score}
                                </div>

                                {/* Price (Desktop) */}
                                <div className="hidden md:block text-right font-mono opacity-80 text-sm">
                                    €{pricePerKg}
                                </div>

                                {/* Expand Icon */}
                                <div className="text-center opacity-30 text-xs">
                                    {expandedId === coffee.id ? '▲' : '▼'}
                                </div>
                            </div>

                            {/* Expanded Details */}
                            <AnimatePresence>
                                {expandedId === coffee.id && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-white/50 border-t border-black/5"
                                    >
                                        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {/* Left: Blurb & Image */}
                                            <div className="col-span-2">
                                                <h4 className="font-bold text-fruit-plum mb-2">The Story</h4>
                                                <p className="text-sm opacity-70 leading-relaxed mb-4">
                                                    Grown at {coffee.altitude} by {coffee.producer}. This {coffee.process} lot offers a complex profile typical of the {coffee.origin} region. Perfect for filter or light espresso.
                                                </p>
                                                <div className="flex gap-2">
                                                    {coffee.tags.map(tag => (
                                                        <span key={tag} className="text-[10px] bg-black/5 px-2 py-1 rounded text-black/60">{tag}</span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Right: Visualizer */}
                                            <div className="flex flex-col items-center justify-center border-l border-black/5 pl-8">
                                                <div className="w-24 h-24 mb-2">
                                                    <StarFlower attributes={{
                                                        body: coffee.body,
                                                        dark: 5,
                                                        bright: coffee.acidity,
                                                        fruity: coffee.aroma,
                                                        sweet: coffee.sweetness
                                                    }} />
                                                </div>
                                                <span className="text-[10px] uppercase tracking-widest opacity-50">Flavor Profile</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </div>
        </div>

      </div>

      {/* WORKBENCH (Bottom Sheet) */}
      <AnimatePresence>
        {isWorkbenchOpen && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 h-[500px] md:h-80 bg-white border-t border-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 flex flex-col md:flex-row font-sans"
            >
                <button 
                    onClick={() => setWorkbenchOpen(false)}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-1 rounded-t-lg border-t border-x border-black/10 text-[9px] font-bold uppercase tracking-widest hover:pb-2 transition-all shadow-sm"
                >
                    Close Workbench ▼
                </button>

                {/* Left: Controls */}
                <div className="flex-1 p-6 overflow-y-auto border-r border-black/5 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-serif text-lg text-fruit-plum font-bold">Active Mix</h3>
                        <span className={`text-xs font-bold uppercase tracking-widest ${totalPercentage === 100 ? 'text-fruit-green' : 'text-fruit-berry'}`}>
                            {totalPercentage}%
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                        {currentBlend.map(item => (
                            <div key={item.id} className="flex items-center gap-3 text-sm">
                                <button onClick={() => removeCoffee(item.id)} className="text-xs text-fruit-berry/50 hover:text-fruit-berry">✕</button>
                                <div className="w-24 truncate font-bold text-xs">{item.name}</div>
                                <input 
                                    type="range" min="0" max="100" value={item.percentage} 
                                    onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                    className="flex-1 h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-fruit-plum"
                                />
                                <span className="font-mono w-8 text-right text-xs">{item.percentage}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Output & Actions */}
                <div className="w-full md:w-72 bg-[#FFFCF5] p-6 flex flex-col justify-between border-l border-black/5">
                    
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs opacity-60">
                            <span>Est. Cost (per kg)</span>
                            <span className="font-mono">€{(finalPrice * (weight === '250g' ? 4 : 1)).toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="flex gap-1">
                                <button onClick={() => setWeight('250g')} className={`px-2 py-1 text-[10px] border rounded ${weight === '250g' ? 'bg-fruit-plum text-white border-fruit-plum' : 'border-black/10'}`}>250g</button>
                                <button onClick={() => setWeight('1kg')} className={`px-2 py-1 text-[10px] border rounded ${weight === '1kg' ? 'bg-fruit-plum text-white border-fruit-plum' : 'border-black/10'}`}>1kg</button>
                            </div>
                            <span className="font-mono text-2xl font-bold text-fruit-plum">€{finalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <button 
                        onClick={() => router.push('/configurator')}
                        disabled={totalPercentage !== 100}
                        className="w-full btn-primary py-3 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
                    >
                        Design Packaging →
                    </button>
                </div>

            </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle */}
      {!isWorkbenchOpen && currentBlend.length > 0 && (
          <button 
            onClick={() => setWorkbenchOpen(true)}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-fruit-plum text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform z-20 flex items-center gap-3 border border-white/20"
          >
            <span className="font-serif font-bold">Resume Mixing</span>
            <span className="bg-white text-fruit-plum w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono">{currentBlend.length}</span>
          </button>
      )}

    </div>
  );
}
