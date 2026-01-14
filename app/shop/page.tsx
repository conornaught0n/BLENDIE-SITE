"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import Link from 'next/link';

export default function Shop() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Shop Coffees</h1>
          <p className="opacity-60">Browse our single origin collection. Heart your favorites to add to Portfolio.</p>
        </div>
        <Link href="/portfolio" className="estrid-btn flex items-center gap-2">
          Go to Portfolio ({favorites.length}) →
        </Link>
      </header>

      {/* Grid View (30+ Coffees) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {COFFEE_DATA.map(coffee => (
          <div 
            key={coffee.id}
            onMouseEnter={() => setHoveredId(coffee.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative aspect-[3/4] bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer border border-black/5"
          >
            {/* Image Placeholder */}
            <div className="h-3/5 bg-[#F5F5F4] relative overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <span className="text-6xl font-black rotate-[-15deg]">{coffee.origin.substring(0,3).toUpperCase()}</span>
               </div>
               
               {/* Heart Button */}
               <button 
                 onClick={(e) => toggleHeart(e, coffee.id)}
                 className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center transition-all ${favorites.includes(coffee.id) ? 'text-red-500 scale-110' : 'text-gray-300 hover:text-red-300'}`}
               >
                 {favorites.includes(coffee.id) ? '❤️' : '🤍'}
               </button>

               {/* Hover Overlay Details */}
               <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm p-4 flex flex-col justify-center text-white transition-opacity duration-200 ${hoveredId === coffee.id ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-white/20 pb-1">
                      <span>Process</span>
                      <span>{coffee.process}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-1">
                      <span>Altitude</span>
                      <span>{coffee.altitude}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {coffee.tags.slice(0,3).map(t => (
                        <span key={t} className="bg-white/20 px-2 py-0.5 rounded-full text-[10px]">{t}</span>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col justify-between h-2/5">
               <div>
                  <h3 className="font-bold text-sm leading-tight mb-1 line-clamp-2">{coffee.name}</h3>
                  <p className="text-[10px] opacity-50 uppercase tracking-wide">{coffee.origin}</p>
               </div>
               <div className="flex justify-between items-end">
                  <span className="font-mono font-bold">€{coffee.price_250g.toFixed(2)}</span>
                  <span className="text-[10px] bg-[#D4AF37]/10 text-[#D4AF37] px-2 py-1 rounded-full font-bold">
                    {((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}
                  </span>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
