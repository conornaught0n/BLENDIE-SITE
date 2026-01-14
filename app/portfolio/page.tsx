"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';

export default function Portfolio() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');

  const toggleHeart = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredCoffees = filter === 'All' 
    ? COFFEE_DATA 
    : COFFEE_DATA.filter(c => c.origin === filter || c.type === (filter === 'Single Origin' ? 'Single Origin' : 'Blend Component'));

  // Extract unique origins for filter
  const origins = Array.from(new Set(COFFEE_DATA.map(c => c.origin)));

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Your Coffee Portfolio</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Manage your favorites, explore origins, and select beans for your custom blend.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        <FilterBtn label="All" active={filter === 'All'} onClick={() => setFilter('All')} />
        <FilterBtn label="Single Origins" active={filter === 'Single Origin'} onClick={() => setFilter('Single Origin')} />
        <FilterBtn label="Blend Components" active={filter === 'Blend Component'} onClick={() => setFilter('Blend Component')} />
        <div className="w-full md:w-auto h-px md:h-8 bg-white/10 mx-2" />
        {origins.map(origin => (
          <FilterBtn 
            key={origin} 
            label={origin} 
            active={filter === origin} 
            onClick={() => setFilter(origin)} 
          />
        ))}
      </div>

      {/* Ledger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredCoffees.map(coffee => (
          <div key={coffee.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300">
            
            {/* Card Header */}
            <div className="p-6 pb-4 border-b border-white/5 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{coffee.name}</h3>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{coffee.origin} • {coffee.process}</span>
                <p className="text-xs text-white/30 mt-1">{coffee.producer}</p>
              </div>
              <button 
                onClick={() => toggleHeart(coffee.id)}
                className="text-2xl transition-transform active:scale-90"
              >
                {favorites.includes(coffee.id) ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Flavor Profile (Mini Bars) */}
            <div className="p-6 space-y-3">
              <TraitBar label="Aroma" value={coffee.aroma} />
              <TraitBar label="Body" value={coffee.body} />
              <TraitBar label="Acidity" value={coffee.acidity} />
              <TraitBar label="Sweetness" value={coffee.sweetness} />
            </div>

            {/* Tags & Price */}
            <div className="p-6 pt-4 bg-white/5 flex items-center justify-between">
              <div className="flex gap-2 flex-wrap max-w-[70%]">
                {coffee.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] bg-black border border-white/10 px-2 py-1 rounded text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-right">
                <p className="text-[#D4AF37] font-bold">€{coffee.price_250g.toFixed(2)}</p>
                <p className="text-[10px] text-white/40">per 250g</p>
              </div>
            </div>

            {/* Hover Overlay for "Add to Blend" */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <button className="bg-[#D4AF37] text-black font-bold px-8 py-3 rounded-full mb-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                 Add to Blend
               </button>
               <button className="text-white/80 hover:text-white underline text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                 View Full Profile
               </button>
            </div>

          </div>
        ))}
      </div>

      {/* Bottom Action Bar (Fixed) */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-[#D4AF37]/20 p-4 transform translate-y-full animate-in slide-in-from-bottom-full duration-500 fill-mode-forwards" style={{ transform: favorites.length > 0 ? 'translateY(0)' : 'translateY(100%)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-[#D4AF37] font-bold text-xl">{favorites.length}</span>
            <span className="text-white/60">Coffees Selected</span>
          </div>
          <button className="bg-[#D4AF37] hover:bg-[#E5C158] text-black px-8 py-3 rounded-full font-bold shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition-all">
            Start Blending &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

const FilterBtn = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full border text-sm transition-all ${
      active 
        ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold' 
        : 'bg-transparent border-white/20 text-white hover:border-[#D4AF37]/50'
    }`}
  >
    {label}
  </button>
);

const TraitBar = ({ label, value }: { label: string, value: number }) => (
  <div className="flex items-center gap-3 text-sm">
    <span className="w-16 text-white/50 text-xs uppercase tracking-wide">{label}</span>
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37]" 
        style={{ width: `${value * 10}%` }} 
      />
    </div>
    <span className="w-4 text-right text-xs text-[#D4AF37]">{value}</span>
  </div>
);
