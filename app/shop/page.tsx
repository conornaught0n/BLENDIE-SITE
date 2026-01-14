"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import Link from 'next/link';
import { useBlendStore } from '@/store/blend-store';

export default function Shop() {
  const { addCoffee, removeCoffee, currentBlend } = useBlendStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleHeart = (e: React.MouseEvent, coffee: any) => {
    e.stopPropagation();
    e.preventDefault();
    
    const isSelected = currentBlend.some(c => c.id === coffee.id);
    if (isSelected) {
      removeCoffee(coffee.id);
    } else {
      addCoffee(coffee);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16">
      
      {/* Header */}
      <header className="mb-16 flex flex-col md:flex-row justify-between items-end border-b border-border-color pb-8">
        <div className="max-w-xl">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-4 font-serif">The Collection</h1>
          <p className="opacity-60 font-sans tracking-wide text-sm uppercase">Single Origin • Limited Release • Micro-Lot</p>
        </div>
        <Link href="/portfolio" className="btn-paris flex items-center gap-3">
          <span>View Portfolio</span>
          <span className="bg-accent-gold text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-sans">
            {currentBlend.length}
          </span>
        </Link>
      </header>

      {/* Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-border-color border border-border-color">
        {COFFEE_DATA.map(coffee => {
          const isSelected = currentBlend.some(c => c.id === coffee.id);
          
          return (
            <div 
              key={coffee.id}
              onMouseEnter={() => setHoveredId(coffee.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative bg-card-bg aspect-[3/4] overflow-hidden cursor-pointer hover:z-10"
            >
              {/* Image Placeholder */}
              <div className="h-[65%] bg-[#F9F9F9] relative flex items-center justify-center overflow-hidden">
                 <span className="text-[8vw] font-serif opacity-5 text-foreground group-hover:scale-110 transition-transform duration-700 ease-out">
                    {coffee.origin.substring(0,3).toUpperCase()}
                 </span>
                 
                 {/* Heart Button */}
                 <button 
                   onClick={(e) => toggleHeart(e, coffee)}
                   className={`absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center transition-colors ${isSelected ? 'text-accent-gold' : 'text-foreground/20 hover:text-foreground'}`}
                 >
                   {isSelected ? '♥' : '♡'}
                 </button>
  
                 {/* Hover Overlay */}
                 <div className={`absolute inset-0 bg-foreground/90 p-8 flex flex-col justify-center text-background transition-opacity duration-300 ${hoveredId === coffee.id ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="space-y-4 font-sans text-xs tracking-widest uppercase">
                      <div className="flex justify-between border-b border-white/20 pb-2">
                        <span>Process</span>
                        <span>{coffee.process}</span>
                      </div>
                      <div className="flex justify-between border-b border-white/20 pb-2">
                        <span>Altitude</span>
                        <span>{coffee.altitude}</span>
                      </div>
                      <div className="pt-2 text-center text-accent-gold">
                        {isSelected ? 'Added to Portfolio' : 'Add to Portfolio'}
                      </div>
                    </div>
                 </div>
              </div>
  
              {/* Content */}
              <div className="h-[35%] p-6 flex flex-col justify-between border-t border-border-color group-hover:border-transparent transition-colors">
                 <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-accent-gold mb-2">{coffee.origin}</p>
                    <h3 className="font-serif text-2xl leading-none mb-1">{coffee.name}</h3>
                 </div>
                 <div className="flex justify-between items-baseline font-sans">
                    <span className="text-lg">€{coffee.price_250g.toFixed(2)}</span>
                    <span className="text-[10px] opacity-40 uppercase tracking-widest">250g</span>
                 </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
