"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';

export default function Portfolio() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list'); // Default to List per request
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const toggleHeart = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleDoubleClick = (id: string) => {
    console.log("Navigate to detail for", id);
    window.location.href = `/product/${id}`;
  };

  const filteredCoffees = filter === 'All' 
    ? COFFEE_DATA 
    : COFFEE_DATA.filter(c => c.origin === filter || c.type === (filter === 'Single Origin' ? 'Single Origin' : 'Blend Component'));

  const origins = Array.from(new Set(COFFEE_DATA.map(c => c.origin)));

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8 transition-colors duration-500">
      
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4 border-b border-black/5 pb-8">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">The Portfolio</h1>
          <p className="opacity-60 max-w-xl">Curate your collection. Double-click for details.</p>
        </div>
        
        {/* View Toggle */}
        <div className="flex bg-white border border-black/10 rounded-full p-1 shadow-sm">
          <button 
            onClick={() => setViewMode('list')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'list' ? 'bg-foreground text-background shadow-md' : 'opacity-50 hover:opacity-100'}`}
          >
            List
          </button>
          <button 
            onClick={() => setViewMode('grid')}
            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${viewMode === 'grid' ? 'bg-foreground text-background shadow-md' : 'opacity-50 hover:opacity-100'}`}
          >
            Grid
          </button>
        </div>
      </header>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'Single Origin', 'Blend Component', ...origins].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all ${
              filter === f 
                ? 'bg-foreground text-background shadow-md' 
                : 'bg-white border border-black/5 hover:border-black/20'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      {viewMode === 'grid' ? (
        // GRID VIEW (Estrid Style Cards)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCoffees.map(coffee => (
            <div 
              key={coffee.id}
              onMouseEnter={() => setHoveredId(coffee.id)}
              onMouseLeave={() => setHoveredId(null)}
              onDoubleClick={() => handleDoubleClick(coffee.id)}
              className="estrid-card group relative aspect-[3/4] flex flex-col cursor-pointer bg-white"
            >
              {/* Image Area */}
              <div className="relative h-2/3 w-full bg-[#F5F5F4] overflow-hidden">
                 <div className={`absolute inset-0 transition-transform duration-700 ease-out ${hoveredId === coffee.id ? 'scale-110' : 'scale-100'}`}>
                    <div className="w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <span className="text-9xl opacity-5 font-black tracking-tighter rotate-[-10deg] select-none">
                          {coffee.origin.substring(0, 3).toUpperCase()}
                       </span>
                    </div>
                 </div>
                 <button 
                   onClick={(e) => toggleHeart(e, coffee.id)}
                   className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
                 >
                   {favorites.includes(coffee.id) ? '❤️' : '🤍'}
                 </button>
              </div>
              {/* Content */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                 <div>
                    <h3 className="text-xl font-bold mb-1 leading-tight">{coffee.name}</h3>
                    <p className="text-sm opacity-60">{coffee.process}</p>
                 </div>
                 <div className="flex justify-between items-end">
                    <span className="text-2xl font-bold tracking-tight">€{coffee.price_250g.toFixed(2)}</span>
                    <span className="text-xs opacity-40 mb-1">/ 250g</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // LIST VIEW (Clean Ledger Table)
        <div className="bg-white rounded-[32px] shadow-sm border border-black/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#F9F9F9] border-b border-black/5 text-xs uppercase tracking-wider text-black/40 font-bold">
              <tr>
                <th className="py-6 pl-8 w-16">Fav</th>
                <th className="py-6">Coffee</th>
                <th className="py-6 hidden md:table-cell">Origin</th>
                <th className="py-6 hidden sm:table-cell">Process</th>
                <th className="py-6 text-right">Score</th>
                <th className="py-6 text-right pr-8">Price (250g)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {filteredCoffees.map(coffee => (
                <tr 
                  key={coffee.id}
                  onDoubleClick={() => handleDoubleClick(coffee.id)}
                  className="group hover:bg-[#F5F5F4] transition-colors cursor-pointer"
                >
                  <td className="py-4 pl-8">
                    <button 
                      onClick={(e) => toggleHeart(e, coffee.id)}
                      className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                    >
                      {favorites.includes(coffee.id) ? '❤️' : '🤍'}
                    </button>
                  </td>
                  <td className="py-4 font-bold text-lg text-foreground group-hover:text-[#D4AF37] transition-colors">
                    {coffee.name}
                    <span className="block md:hidden text-xs font-normal opacity-50 mt-1">{coffee.origin} • {coffee.process}</span>
                  </td>
                  <td className="py-4 hidden md:table-cell opacity-60">{coffee.origin}</td>
                  <td className="py-4 hidden sm:table-cell opacity-60">
                    <span className="bg-black/5 px-3 py-1 rounded-full text-xs font-bold">{coffee.process}</span>
                  </td>
                  <td className="py-4 text-right font-mono font-bold text-[#D4AF37]">
                    {((coffee.aroma + coffee.body + coffee.acidity + coffee.sweetness) / 4).toFixed(1)}
                  </td>
                  <td className="py-4 text-right pr-8 font-bold text-lg">€{coffee.price_250g.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Floating Action Button */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${favorites.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
         <button className="estrid-btn shadow-2xl flex items-center gap-3 px-10 py-4 text-lg hover:scale-105 active:scale-95">
            <span>Blend {favorites.length} Coffees</span>
            <span className="bg-white text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
               {favorites.length}
            </span>
         </button>
      </div>

    </div>
  );
}
