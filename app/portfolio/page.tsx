"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { FlavorTerrainCanvas } from '@/components/canvas/FlavorTerrain';
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
  const [vis3D, setVis3D] = useState(false);

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
  
  const basePrice250 = currentBlend.reduce((acc, c) => acc + (c.price_250g * (c.percentage / 100 || 1/currentBlend.length)), 0);
  const basePrice1kg = basePrice250 * 3.8;
  
  let finalPrice = weight === '250g' ? basePrice250 : basePrice1kg;
  if (grind === 'ground') {
      const surcharge = weight === '1kg' ? 0.75 : 0.75 / 4;
      finalPrice += surcharge;
  }

  // Flavor Profile
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
      <div className={`flex-1 px-8 md:px-12 py-8 transition-all duration-500 ${isWorkbenchOpen ? 'pb-96' : ''}`}>
        
        <header className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h1 className="text-3xl font-serif font-bold text-fruit-plum">Portfolio</h1>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
                <input 
                    type="text" 
                    placeholder="Search beans..." 
                    className="bg-black/5 rounded-sm px-3 py-1.5 text-xs focus:outline-none flex-1 md:w-64 border border-transparent focus:border-fruit-berry transition-colors"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="bg-black/5 rounded-sm px-3 py-1.5 text-xs focus:outline-none cursor-pointer border border-transparent focus:border-fruit-berry transition-colors"
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

        <div className="flex gap-6 border-b border-black/5 pb-2 mb-4 text-xs uppercase tracking-widest font-bold">
            <button onClick={() => setActiveTab('stock')} className={`${activeTab === 'stock' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Market</button>
            <button onClick={() => setActiveTab('favorites')} className={`${activeTab === 'favorites' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Favorites (8)</button>
            <button onClick={() => setActiveTab('blends')} className={`${activeTab === 'blends' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>My Blends</button>
        </div>

        {/* High Density Table */}
        <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
                <thead className="text-[10px] uppercase tracking-[0.1em] opacity-40 border-b border-black/5">
                    <tr>
                        <th className="pb-2 pl-2 w-10">Add</th>
                        <th className="pb-2 w-[30%]">Coffee</th>
                        <th className="pb-2 w-[15%]">Origin</th>
                        <th className="pb-2 w-[15%]">Process</th>
                        <th className="pb-2 w-[10%] text-right">Score</th>
                        <th className="pb-2 w-[10%] text-right">Price (250g)</th>
                        <th className="pb-2 w-[20%] pl-8">Tags</th>
                    </tr>
                </thead>
                <tbody className="text-xs font-medium">
                    {filteredData.map((coffee) => (
                        <tr 
                            key={coffee.id} 
                            onClick={() => toggleSelection(coffee)}
                            className={`group border-b border-black/5 hover:bg-fruit-citrus/5 transition-colors cursor-pointer ${isSelected(coffee.id) ? 'bg-fruit-plum/5' : ''}`}
                        >
                            <td className="py-2.5 pl-2 align-middle">
                                <button className={`w-4 h-4 flex items-center justify-center rounded-sm border transition-all ${isSelected(coffee.id) ? 'bg-fruit-plum border-fruit-plum text-white' : 'border-black/20 hover:border-fruit-plum text-fruit-plum'}`}>
                                    {isSelected(coffee.id) ? '✓' : '+'}
                                </button>
                            </td>
                            <td className="py-2.5 align-middle font-serif text-sm group-hover:text-fruit-plum transition-colors truncate pr-4">
                                {coffee.name}
                            </td>
                            <td className="py-2.5 align-middle opacity-60 uppercase tracking-wide text-[10px]">{coffee.origin}</td>
                            <td className="py-2.5 align-middle opacity-60 text-[10px]">{coffee.process}</td>
                            <td className="py-2.5 text-right font-mono font-bold text-fruit-citrus align-middle">
                                {((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}
                            </td>
                            <td className="py-2.5 text-right font-mono align-middle pr-4 opacity-70">€{coffee.price_250g.toFixed(2)}</td>
                            <td className="py-2.5 pl-8 align-middle">
                                <div className="flex gap-1 overflow-hidden">
                                    {coffee.tags.slice(0, 3).map(tag => (
                                        <span key={tag} className="text-[9px] bg-black/5 px-1.5 py-0.5 rounded text-black/50 whitespace-nowrap">{tag}</span>
                                    ))}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
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
                className="fixed bottom-0 left-0 right-0 h-[600px] md:h-96 bg-white border-t border-black/10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-30 flex flex-col md:flex-row font-sans"
            >
                <button 
                    onClick={() => setWorkbenchOpen(false)}
                    className="absolute -top-6 left-1/2 -translate-x-1/2 bg-white px-6 py-1 rounded-t-lg border-t border-x border-black/10 text-[9px] font-bold uppercase tracking-widest hover:pb-2 transition-all shadow-sm"
                >
                    Close Workbench ▼
                </button>

                {/* Left: Controls & Graph */}
                <div className="flex-1 p-6 overflow-y-auto border-r border-black/5 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <h3 className="font-serif text-xl text-fruit-plum font-bold">Active Mix</h3>
                        <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                            <span className={totalPercentage === 100 ? 'text-fruit-green' : 'text-fruit-berry'}>
                                Total: {totalPercentage}%
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                        {currentBlend.length === 0 ? (
                            <p className="opacity-40 text-center py-8 text-xs">Select assets from the ledger to begin blending.</p>
                        ) : (
                            currentBlend.map(item => (
                                <div key={item.id} className="flex items-center gap-4 group text-sm">
                                    <button onClick={() => removeCoffee(item.id)} className="text-xs text-fruit-berry/50 hover:text-fruit-berry w-4">✕</button>
                                    <div className="w-32">
                                        <p className="font-bold truncate">{item.name}</p>
                                    </div>
                                    <input 
                                        type="range" min="0" max="100" value={item.percentage} 
                                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                        className="flex-1 h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-fruit-plum"
                                    />
                                    <span className="font-mono w-8 text-right text-xs">{item.percentage}%</span>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Stock Graph Integration */}
                    <div className="hidden md:block h-20 mt-auto opacity-80">
                        <StockGraph currentPrice={finalPrice.toFixed(2)} currentScore={8.7} />
                    </div>
                </div>

                {/* Right: Visualizer & Actions */}
                <div className="w-full md:w-80 bg-[#FFFCF5] p-6 flex flex-col relative border-l border-black/5">
                    
                    {/* Visualizer Toggle */}
                    <button 
                        onClick={() => setVis3D(!vis3D)}
                        className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest opacity-50 hover:opacity-100 border border-black/10 px-2 py-0.5 rounded-full"
                    >
                        {vis3D ? '2D' : '3D'}
                    </button>

                    {/* Visualizer Container */}
                    <div className="w-full h-32 mb-4 flex items-center justify-center">
                        {vis3D ? (
                            <FlavorTerrainCanvas attributes={aggregateFlavor} />
                        ) : (
                            <div className="scale-75">
                                <StarFlower attributes={aggregateFlavor} />
                            </div>
                        )}
                    </div>
                    
                    {/* Configuration Toggles */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="flex bg-white rounded-md border border-black/10 p-0.5">
                            <button onClick={() => setWeight('250g')} className={`flex-1 text-[9px] font-bold rounded-sm transition-all ${weight === '250g' ? 'bg-fruit-plum text-white shadow-sm' : 'opacity-50'}`}>250g</button>
                            <button onClick={() => setWeight('1kg')} className={`flex-1 text-[9px] font-bold rounded-sm transition-all ${weight === '1kg' ? 'bg-fruit-plum text-white shadow-sm' : 'opacity-50'}`}>1kg</button>
                        </div>
                        <div className="flex bg-white rounded-md border border-black/10 p-0.5">
                            <button onClick={() => setGrind('bean')} className={`flex-1 text-[9px] font-bold rounded-sm transition-all ${grind === 'bean' ? 'bg-fruit-plum text-white shadow-sm' : 'opacity-50'}`}>Bean</button>
                            <button onClick={() => setGrind('ground')} className={`flex-1 text-[9px] font-bold rounded-sm transition-all ${grind === 'ground' ? 'bg-fruit-plum text-white shadow-sm' : 'opacity-50'}`}>Gnd</button>
                        </div>
                    </div>

                    {/* Price & Action */}
                    <div className="mt-auto">
                        <div className="flex justify-between items-end mb-3 border-t border-black/5 pt-3">
                            <div className="text-[10px] opacity-50">
                                <p>Est. Cost</p>
                                {grind === 'ground' && <p className="text-[9px] text-fruit-berry">+ €{weight === '1kg' ? '0.75' : '0.19'} Grind</p>}
                            </div>
                            <span className="font-mono text-2xl font-bold text-fruit-plum">€{finalPrice.toFixed(2)}</span>
                        </div>

                        <button 
                            onClick={() => router.push('/configurator')}
                            disabled={totalPercentage !== 100}
                            className="w-full btn-primary py-2.5 text-[10px] uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
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
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-fruit-plum text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 transition-transform z-20 flex items-center gap-3 border border-white/20"
          >
            <span className="font-serif font-bold">Open Workbench</span>
            <span className="bg-white text-fruit-plum w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold font-mono">{currentBlend.length}</span>
          </button>
      )}

    </div>
  );
}
