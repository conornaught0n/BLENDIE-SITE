"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';

export default function Portfolio() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleDoubleClick = (id: string) => {
    // Navigate to detail page (Placeholder logic)
    console.log("Navigate to detail for", id);
    window.location.href = `/product/${id}`;
  };

  const filteredCoffees = filter === 'All' 
    ? COFFEE_DATA 
    : COFFEE_DATA.filter(c => c.origin === filter || c.type === (filter === 'Single Origin' ? 'Single Origin' : 'Blend Component'));

  const origins = Array.from(new Set(COFFEE_DATA.map(c => c.origin)));

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      
      {/* Header */}
      <header className="mb-12 text-center py-8">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">The Portfolio</h1>
        <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto font-light">
          Curate your collection. Blend your masterpiece.
        </p>
      </header>

      {/* Filter Chips (Estrid Style: Pills) */}
      <div className="flex justify-center gap-3 mb-16 flex-wrap">
        {['All', 'Single Origin', 'Blend Component', ...origins].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
              filter === f 
                ? 'bg-foreground text-background scale-105 shadow-lg' 
                : 'bg-white border border-black/5 hover:bg-black/5'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid: Estrid-Style Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1600px] mx-auto">
        {filteredCoffees.map(coffee => (
          <div 
            key={coffee.id}
            onMouseEnter={() => setHoveredId(coffee.id)}
            onMouseLeave={() => setHoveredId(null)}
            onDoubleClick={() => handleDoubleClick(coffee.id)}
            className="estrid-card group relative aspect-[3/4] flex flex-col cursor-pointer bg-white"
          >
            {/* Image / Color Block Placeholder */}
            <div className="relative h-2/3 w-full bg-[#F5F5F4] overflow-hidden">
               {/* In production, use next/image here */}
               <div className={`absolute inset-0 transition-transform duration-700 ease-out ${hoveredId === coffee.id ? 'scale-110' : 'scale-100'}`}>
                  {/* Visual Pattern or Image */}
                  <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <span className="text-9xl opacity-5 font-black tracking-tighter rotate-[-10deg] select-none">
                        {coffee.origin.substring(0, 3).toUpperCase()}
                     </span>
                  </div>
               </div>

               {/* Heart Button (Floating) */}
               <button 
                 onClick={(e) => toggleHeart(e, coffee.id)}
                 className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
               >
                 {favorites.includes(coffee.id) ? '❤️' : '🤍'}
               </button>

               {/* Hover Overlay Info */}
               <div className={`absolute inset-0 bg-black/10 backdrop-blur-md p-6 flex flex-col justify-end transition-opacity duration-300 ${hoveredId === coffee.id ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="bg-white rounded-2xl p-4 shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Score</span>
                        <span className="text-lg font-bold text-[#D4AF37]">
                           {((coffee.aroma + coffee.body + coffee.acidity + coffee.sweetness) / 4).toFixed(1)}
                        </span>
                     </div>
                     <div className="flex gap-1 flex-wrap">
                        {coffee.tags.slice(0, 3).map(tag => (
                           <span key={tag} className="text-[10px] bg-gray-100 px-2 py-1 rounded-full">{tag}</span>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Bottom Content */}
            <div className="flex-1 p-6 flex flex-col justify-between">
               <div>
                  <h3 className="text-xl font-bold mb-1 leading-tight">{coffee.name}</h3>
                  <p className="text-sm opacity-60">{coffee.process}</p>
               </div>
               <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold tracking-tight">€{coffee.price_250g}</span>
                  <span className="text-xs opacity-40 mb-1">/ 250g</span>
               </div>
            </div>

          </div>
        ))}
      </div>

      {/* Floating Action Button (Mobile Friendly) */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${favorites.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
         <button className="estrid-btn shadow-2xl flex items-center gap-3 px-10 py-4 text-lg">
            <span>Blend {favorites.length} Coffees</span>
            <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
               {favorites.length}
            </span>
         </button>
      </div>

    </div>
  );
}
