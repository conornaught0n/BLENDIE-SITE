"use client";

import React, { useState } from 'react';

type ProductType = 'Whole Bean' | 'Ground' | 'Capsule';
type Size = '250g' | '500g' | '1kg';
type Color = 'Black' | 'Gold' | 'Green';

export const Configurator = () => {
  const [type, setType] = useState<ProductType>('Whole Bean');
  const [size, setSize] = useState<Size>('250g');
  const [color, setColor] = useState<Color>('Black');

  const types: ProductType[] = ['Whole Bean', 'Ground', 'Capsule'];
  const sizes: Size[] = ['250g', '500g', '1kg'];
  const colors: Color[] = ['Black', 'Gold', 'Green'];

  const getPrice = () => {
    let base = 15;
    if (size === '500g') base += 10;
    if (size === '1kg') base += 25;
    if (type === 'Capsule') base += 5;
    return base;
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-[#D4AF37]/20 bg-black/40 p-8 backdrop-blur-md">
      <h3 className="mb-6 text-2xl font-bold text-[#D4AF37]">Configure Your Blend</h3>
      
      {/* Type Selection */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-white/80">Type</label>
        <div className="grid grid-cols-3 gap-2">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                type === t 
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold' 
                  : 'border-white/10 bg-transparent text-white hover:border-[#D4AF37]/50'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-white/80">Size</label>
        <div className="flex gap-4">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`flex-1 rounded-lg border px-4 py-2 text-sm transition-all ${
                size === s 
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-black font-semibold' 
                  : 'border-white/10 bg-transparent text-white hover:border-[#D4AF37]/50'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection (Bag/Accents) */}
      <div className="mb-8">
        <label className="mb-2 block text-sm font-medium text-white/80">Bag Color</label>
        <div className="flex gap-4">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`group relative h-10 w-10 rounded-full border-2 transition-all ${
                color === c ? 'border-[#D4AF37] scale-110' : 'border-transparent'
              }`}
              title={c}
            >
              <span 
                className="absolute inset-1 rounded-full shadow-inner" 
                style={{ 
                  backgroundColor: c === 'Gold' ? '#D4AF37' : c === 'Green' ? '#002B1B' : '#000000',
                  border: c === 'Black' ? '1px solid #333' : 'none'
                }} 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Summary & Action */}
      <div className="flex items-center justify-between border-t border-white/10 pt-6">
        <div>
          <p className="text-sm text-white/60">Total</p>
          <p className="text-3xl font-bold text-[#D4AF37]">€{getPrice()}.00</p>
        </div>
        <button className="rounded-full bg-[#D4AF37] px-8 py-3 font-bold text-[#002B1B] transition-all hover:bg-[#E5C158] hover:shadow-lg hover:shadow-[#D4AF37]/20">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
