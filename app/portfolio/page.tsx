"use client";

import React, { useState } from 'react';

// Mock Data matching our new Schema
const MOCK_COFFEES = [
  { id: '1', name: 'Ethiopia Yirgacheffe', type: 'Single Origin', origin: 'Ethiopia', process: 'Washed', price_250g: 15, price_1kg: 45, aroma: 9, body: 4, acidity: 8, sweetness: 7, aftertaste: 8, tags: ['Floral', 'Citrus'] },
  { id: '2', name: 'Brazil Santos', type: 'Single Origin', origin: 'Brazil', process: 'Natural', price_250g: 12, price_1kg: 38, aroma: 5, body: 8, acidity: 4, sweetness: 9, aftertaste: 6, tags: ['Nutty', 'Chocolate'] },
  { id: '3', name: 'Colombia Supremo', type: 'Single Origin', origin: 'Colombia', process: 'Washed', price_250g: 14, price_1kg: 42, aroma: 7, body: 6, acidity: 6, sweetness: 8, aftertaste: 7, tags: ['Caramel', 'Balanced'] },
  { id: '4', name: 'Sumatra Mandheling', type: 'Single Origin', origin: 'Indonesia', process: 'Wet Hull', price_250g: 16, price_1kg: 48, aroma: 6, body: 10, acidity: 3, sweetness: 6, aftertaste: 9, tags: ['Earth', 'Spice'] },
  { id: '5', name: 'Kenya AA', type: 'Single Origin', origin: 'Kenya', process: 'Washed', price_250g: 18, price_1kg: 55, aroma: 9, body: 7, acidity: 9, sweetness: 8, aftertaste: 9, tags: ['Berry', 'Wine'] },
];

export default function Portfolio() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');

  const toggleHeart = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredCoffees = filter === 'All' 
    ? MOCK_COFFEES 
    : MOCK_COFFEES.filter(c => c.origin === filter);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#D4AF37] mb-4">Your Coffee Portfolio</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Manage your favorites, explore origins, and select beans for your custom blend.
        </p>
      </header>

      {/* Filter Bar */}
      <div className="flex justify-center gap-4 mb-12">
        {['All', 'Ethiopia', 'Brazil', 'Colombia', 'Indonesia', 'Kenya'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-2 rounded-full border transition-all ${
              filter === f 
                ? 'bg-[#D4AF37] border-[#D4AF37] text-black font-bold' 
                : 'bg-transparent border-white/20 text-white hover:border-[#D4AF37]/50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Ledger Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {filteredCoffees.map(coffee => (
          <div key={coffee.id} className="group relative bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition-all duration-300">
            
            {/* Card Header (Origin & Process) */}
            <div className="p-6 pb-4 border-b border-white/5 flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">{coffee.name}</h3>
                <span className="text-xs font-mono text-white/40 uppercase tracking-widest">{coffee.origin} • {coffee.process}</span>
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
              <div className="flex gap-2">
                {coffee.tags.map(tag => (
                  <span key={tag} className="text-xs bg-black border border-white/10 px-2 py-1 rounded text-white/60">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-right">
                <p className="text-[#D4AF37] font-bold">€{coffee.price_250g}</p>
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
