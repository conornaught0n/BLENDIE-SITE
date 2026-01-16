"use client";

import React, { useState } from 'react';
import { COFFEE_DATA, BLEND_TEMPLATES } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { FlavorTerrainCanvas } from '@/components/canvas/FlavorTerrain';
import { useBlendStore } from '@/store/blend-store';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { StockGraph } from '@/components/StockGraph';

// Helper for Flag Emojis
const getFlag = (origin: string) => {
  const flags: Record<string, string> = {
    'Ethiopia': '🇪🇹', 'Brazil': '🇧🇷', 'Colombia': '🇨🇴', 'Guatemala': '🇬🇹', 'El Salvador': '🇸🇻', 'Nicaragua': '🇳🇮', 'Kenya': '🇰🇪', 'Indonesia': '🇮🇩', 'Costa Rica': '🇨🇷', 'Honduras': '🇭🇳', 'Peru': '🇵🇪', 'Vietnam': '🇻🇳', 'Papua New Guinea': '🇵🇬', 'India': '🇮🇳'
  };
  return flags[origin] || '🌍';
};

const COMPONENT_COLORS = [
    '#D97706', // Amber
    '#540D6E', // Plum
    '#8CB369', // Green
    '#FFB703', // Yellow
    '#FF4D6D', // Red
    '#5D4037', // Brown
];

export default function Portfolio() {
  const router = useRouter();
  const { currentBlend, addCoffee, removeCoffee, updatePercentage, clearBlend } = useBlendStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  
  // View State
  const [activeTab, setActiveTab] = useState<'favorites' | 'stock' | 'blends'>('stock');
  const [isWorkbenchOpen, setWorkbenchOpen] = useState(true);
  const [vis3D, setVis3D] = useState(false);

  // Configuration State
  const [weight, setWeight] = useState<'250g' | '1kg'>('250g');
  const [grind, setGrind] = useState<'bean' | 'ground'>('bean');

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

  const loadTemplate = (template: any) => {
      clearBlend();
      // Add all components from template
      template.components.forEach((comp: any) => {
          const coffee = COFFEE_DATA.find(c => c.id === comp.id);
          if (coffee) {
              // We need to add logic to set percentage immediately, 
              // but addCoffee sets 0. We'll need a batched update in store or loop.
              // For now, simple add.
              addCoffee(coffee);
              // Timeout to allow state update before setting pct (hacky but works for mock)
              setTimeout(() => updatePercentage(coffee.id, comp.percentage), 10);
          }
      });
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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans pt-20">
      
      {/* WORKBENCH */}
      <div className="bg-[#FFFCF5] border-b border-border-color shadow-sm sticky top-20 z-30 transition-all duration-300">
        <div className="max-w-7xl mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left: Active Blend Sliders */}
            <div className="flex-1 w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-serif text-xl font-bold text-fruit-plum">Active Blend</h3>
                    <div className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${totalPercentage === 100 ? 'bg-fruit-green text-white' : 'bg-fruit-berry/10 text-fruit-berry'}`}>
                        Total: {totalPercentage}%
                    </div>
                </div>

                {/* Composition Bar */}
                {currentBlend.length > 0 && (
                    <div className="flex h-4 w-full rounded-full overflow-hidden mb-4 bg-black/5">
                        {currentBlend.map((item, idx) => {
                            if (item.percentage === 0) return null;
                            const color = COMPONENT_COLORS[idx % COMPONENT_COLORS.length];
                            return (
                                <div 
                                    key={item.id} 
                                    style={{ width: `${item.percentage}%`, backgroundColor: color }} 
                                    className="h-full transition-all duration-300"
                                    title={`${item.name}: ${item.percentage}%`}
                                />
                            )
                        })}
                    </div>
                )}

                {currentBlend.length === 0 ? (
                    <div className="h-24 flex items-center justify-center border-2 border-dashed border-black/5 rounded-lg text-sm opacity-40">
                        Add coffees from the ledger below ↓
                    </div>
                ) : (
                    <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                        {currentBlend.map((item, idx) => {
                            const color = COMPONENT_COLORS[idx % COMPONENT_COLORS.length];
                            return (
                                <div key={item.id} className="flex items-center gap-3 text-sm bg-white p-2 rounded-lg border border-black/5 shadow-sm" style={{ borderLeft: `4px solid ${color}` }}>
                                    <button onClick={() => removeCoffee(item.id)} className="text-xs text-black/20 hover:text-red-500 font-bold px-2">✕</button>
                                    <div className="w-32 truncate font-bold text-xs">{item.name}</div>
                                    <input 
                                        type="range" min="0" max="100" value={item.percentage} 
                                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                        className="flex-1 h-2 bg-black/5 rounded-lg appearance-none cursor-pointer"
                                        style={{ accentColor: color }}
                                    />
                                    <input 
                                        type="number" 
                                        value={item.percentage}
                                        onChange={(e) => updatePercentage(item.id, parseInt(e.target.value))}
                                        className="w-12 text-right font-mono text-xs border-b border-black/10 focus:outline-none focus:border-black"
                                    />
                                    <span className="text-[10px] opacity-50">%</span>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>

            {/* Right: Visualizer & Actions */}
            <div className="w-full md:w-80 flex flex-col items-center border-l border-black/5 pl-8">
                <div className="relative w-32 h-32 mb-4">
                    {vis3D ? <FlavorTerrainCanvas attributes={aggregateFlavor} /> : <StarFlower attributes={aggregateFlavor} />}
                    <button onClick={() => setVis3D(!vis3D)} className="absolute -top-2 -right-2 text-[9px] border border-black/10 px-1 rounded bg-white hover:bg-black/5">3D</button>
                </div>

                <div className="w-full flex justify-between items-end mb-4">
                    <div className="text-xs opacity-60">
                        <p>Est. Cost / {weight}</p>
                    </div>
                    <span className="font-mono text-2xl font-bold text-fruit-plum">€{finalPrice.toFixed(2)}</span>
                </div>

                <button 
                    onClick={() => router.push('/configurator/')}
                    disabled={totalPercentage !== 100}
                    className="w-full btn-primary py-3 text-xs uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed shadow-none"
                >
                    Design Packaging →
                </button>
            </div>
        </div>
      </div>

      {/* BOTTOM: Ledger (Scrollable) */}
      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        
        <header className="mb-6 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
                <h1 className="text-3xl font-serif font-bold text-foreground opacity-80">Ledger</h1>
            </div>
            
            {/* Filter Bar with Price Toggle */}
            <div className="flex flex-wrap gap-4 items-center">
                
                {/* Weight Toggle */}
                <div className="flex bg-white rounded-lg border border-black/10 p-1 shadow-sm">
                    <button onClick={() => setWeight('250g')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${weight === '250g' ? 'bg-fruit-plum text-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}>250g View</button>
                    <button onClick={() => setWeight('1kg')} className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${weight === '1kg' ? 'bg-fruit-plum text-white shadow-sm' : 'opacity-50 hover:opacity-100'}`}>1kg View</button>
                </div>

                <input 
                    type="text" 
                    placeholder="Search beans..." 
                    className="bg-white rounded-lg px-3 py-1.5 text-xs focus:outline-none w-48 border border-black/10 focus:border-fruit-berry transition-colors shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="bg-white rounded-lg px-3 py-1.5 text-xs focus:outline-none cursor-pointer border border-black/10 focus:border-fruit-berry transition-colors shadow-sm"
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                >
                    <option value="All">Region: All</option>
                    <option value="Africa">Africa</option>
                    <option value="South America">South America</option>
                    <option value="Central America">Central America</option>
                    <option value="Asia">Asia</option>
                </select>
            </div>
        </header>

        {/* Tabs */}
        <div className="flex gap-6 border-b border-black/5 pb-2 mb-4 text-xs uppercase tracking-widest font-bold">
            <button onClick={() => setActiveTab('stock')} className={`${activeTab === 'stock' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Available</button>
            <button onClick={() => setActiveTab('favorites')} className={`${activeTab === 'favorites' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Favorites</button>
            <button onClick={() => setActiveTab('blends')} className={`${activeTab === 'blends' ? 'border-b-2 border-fruit-plum pb-2 -mb-2.5 text-fruit-plum' : 'opacity-40 hover:opacity-100'}`}>Templates</button>
        </div>

        {/* TAB CONTENT */}
        {activeTab === 'blends' ? (
            /* BLEND TEMPLATES */
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLEND_TEMPLATES.map(template => (
                    <div key={template.id} className="bg-white p-6 rounded-2xl border border-black/5 hover:border-fruit-plum/20 hover:shadow-md transition-all cursor-pointer" onClick={() => loadTemplate(template)}>
                        <h3 className="font-serif text-xl font-bold mb-2">{template.name}</h3>
                        <p className="text-xs opacity-60 mb-4 h-10">{template.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="font-mono font-bold">€{template.price}</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-fruit-berry">Load Mix →</span>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            /* STOCK / FAVORITES LEDGER */
            <div className="w-full bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
                <div className="grid grid-cols-[50px_1fr_1fr_80px_100px_40px] text-[10px] uppercase tracking-[0.1em] opacity-40 border-b border-black/5 py-3 px-4 bg-[#F9F9F9] hidden md:grid">
                    <span>Add</span>
                    <span>Coffee</span>
                    <span>Process / Farm</span>
                    <span className="text-right">Score</span>
                    <span className="text-right">Price ({weight})</span>
                    <span className="text-center">Info</span>
                </div>

                <div className="divide-y divide-black/5">
                    {filteredData.map((coffee) => {
                        const displayPrice = weight === '250g' ? coffee.price_250g : coffee.price_250g * 3.8;
                        const isAdded = isSelected(coffee.id);
                        const blendIndex = currentBlend.findIndex(c => c.id === coffee.id);
                        const rowColor = isAdded ? COMPONENT_COLORS[blendIndex % COMPONENT_COLORS.length] : 'transparent';

                        return (
                            <div key={coffee.id} className={`group hover:bg-fruit-citrus/5 transition-colors cursor-pointer ${isAdded ? 'bg-fruit-plum/5' : ''}`}>
                                <div 
                                    onClick={() => toggleExpand(coffee.id)}
                                    className="grid grid-cols-[50px_1fr_80px] md:grid-cols-[50px_1fr_1fr_80px_100px_40px] py-3 px-4 items-center"
                                >
                                    <div onClick={(e) => toggleSelection(e, coffee)} className="flex items-center justify-start pl-1">
                                        <div 
                                            className={`w-5 h-5 flex items-center justify-center rounded-md border transition-all shadow-sm ${isAdded ? 'text-white border-transparent' : 'border-black/20 hover:border-fruit-plum text-fruit-plum'}`}
                                            style={{ backgroundColor: isAdded ? rowColor : 'transparent' }}
                                        >
                                            {isAdded ? '✓' : '+'}
                                        </div>
                                    </div>

                                    <div className="col-span-1 md:col-span-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">{getFlag(coffee.origin)}</span>
                                            <span className="font-serif font-bold text-sm text-foreground group-hover:text-fruit-plum transition-colors">{coffee.name}</span>
                                        </div>
                                        {/* Mobile Metadata */}
                                        <div className="md:hidden text-[10px] opacity-60 mt-1">
                                            €{displayPrice.toFixed(2)} • {coffee.quality}
                                        </div>
                                    </div>

                                    <div className="hidden md:block text-xs opacity-60">
                                        {coffee.process} • {coffee.producer}
                                    </div>

                                    <div className="text-right font-mono font-bold text-fruit-citrus text-sm">
                                        {((coffee.aroma + coffee.body + coffee.acidity)/3 * 10).toFixed(0)}
                                    </div>

                                    <div className="hidden md:block text-right font-mono font-bold text-foreground/80 text-sm">
                                        €{displayPrice.toFixed(2)}
                                    </div>

                                    <div className="text-center opacity-30 text-xs hidden md:block">
                                        {expandedId === coffee.id ? '▲' : '▼'}
                                    </div>
                                </div>

                                {/* Accordion */}
                                <AnimatePresence>
                                    {expandedId === coffee.id && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden bg-[#F5F5F4] border-t border-black/5"
                                        >
                                            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                                                <div className="col-span-2">
                                                    <h4 className="font-bold text-fruit-plum mb-2 flex items-center gap-2">
                                                        {coffee.flavorEmoji} Flavor Notes
                                                    </h4>
                                                    <p className="text-sm opacity-70 leading-relaxed mb-4">
                                                        Grown at {coffee.altitude}. {coffee.tags.join(', ')}.
                                                    </p>
                                                    <div className="inline-block px-3 py-1 bg-white border border-black/10 rounded-full text-[10px] uppercase font-bold tracking-widest text-fruit-green">
                                                        {coffee.quality}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-center justify-center border-l border-black/5 pl-8">
                                                    <div className="w-24 h-24 mb-2">
                                                        <StarFlower attributes={{ body: coffee.body, dark: 5, bright: coffee.acidity, fruity: coffee.aroma, sweet: coffee.sweetness }} />
                                                    </div>
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
        )}

      </div>

    </div>
  );
}
