"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import Link from 'next/link';
import { useBlendStore } from '@/store/blend-store';

export default function Shop() {
  const { addCoffee, removeCoffee, currentBlend } = useBlendStore();
  const [activeCard, setActiveCard] = useState<string | null>(null); // For Mobile Flip Logic

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

  const handleMobileFlip = (id: string) => {
    setActiveCard(activeCard === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 font-sans">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-fruit-plum">Market</h1>
          <p className="opacity-60 text-xs uppercase tracking-widest">Browse 30+ Single Origins</p>
        </div>
        <Link href="/portfolio" className="bg-fruit-plum text-white px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-fruit-berry transition-colors flex items-center gap-2">
          Portfolio <span className="bg-white text-fruit-plum w-4 h-4 flex items-center justify-center rounded-full text-[9px]">{currentBlend.length}</span>
        </Link>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {COFFEE_DATA.map(coffee => {
          const isSelected = currentBlend.some(c => c.id === coffee.id);
          const isActive = activeCard === coffee.id;
          
          return (
            <div 
              key={coffee.id}
              onClick={() => handleMobileFlip(coffee.id)}
              className="group relative aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-sm border border-border-color cursor-pointer"
            >
              {/* Front Face (Image) */}
              <div className={`absolute inset-0 bg-[#F5F5F4] transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100 group-hover:opacity-0'}`}>
                 <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-6xl font-black rotate-[-15deg]">{coffee.origin.substring(0,3).toUpperCase()}</span>
                 </div>
                 
                 {/* Quality Marker (New) */}
                 <div className="absolute top-3 left-3 bg-white/50 backdrop-blur-md px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide text-fruit-plum border border-white/20">
                    {coffee.quality || 'Premium'}
                 </div>

                 <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-bold text-sm leading-tight mb-1">{coffee.name}</h3>
                    <p className="text-[10px] opacity-50 uppercase tracking-wide">{coffee.origin}</p>
                 </div>
              </div>

              {/* Back Face (Details - Visible on Hover or Click) */}
              <div className={`absolute inset-0 bg-fruit-plum/95 p-6 flex flex-col justify-center text-white transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between border-b border-white/20 pb-1">
                      <span className="opacity-60">Process</span>
                      <span>{coffee.process}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/20 pb-1">
                      <span className="opacity-60">Score</span>
                      <span className="text-fruit-citrus font-bold">{((coffee.aroma + coffee.body + coffee.acidity)/3).toFixed(1)}</span>
                    </div>
                    <div className="pt-2 text-center text-xs opacity-60 italic">
                      "Notes of {coffee.tags.slice(0,2).join(', ')}"
                    </div>
                  </div>
                  
                  {/* Highlighted Add Button */}
                  <button 
                    onClick={(e) => toggleHeart(e, coffee)}
                    className={`mt-4 w-full py-2 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all ${isSelected ? 'bg-white text-fruit-plum' : 'bg-fruit-berry text-white hover:bg-white hover:text-fruit-berry'}`}
                  >
                    {isSelected ? 'In Portfolio' : 'Add to Blend'}
                  </button>
              </div>

              {/* Persistent Heart (Top Right) */}
              <button 
                 onClick={(e) => toggleHeart(e, coffee)}
                 className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isSelected ? 'text-fruit-berry bg-white shadow-sm' : 'text-black/20 hover:text-fruit-berry'}`}
              >
                 {isSelected ? '♥' : '♡'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
