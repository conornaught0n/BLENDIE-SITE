"use client";

import React from 'react';
import { StarFlower } from '@/components/StarFlower';

export default function BrandIdentity() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16">
      
      <header className="mb-16 border-b border-border-color pb-8">
        <h1 className="text-6xl font-serif mb-4">Brand Identity</h1>
        <p className="opacity-60 text-lg">Visual System 2026 • Coffee Spectrum</p>
      </header>

      {/* 1. LOGO & TYPOGRAPHY */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-6">Logomark</h2>
          <div className="bg-white border border-border-color p-12 flex items-center justify-center">
            <span className="font-serif text-5xl tracking-widest font-bold text-foreground">
              B L E N D I E
            </span>
          </div>
          <div className="bg-foreground p-12 flex items-center justify-center mt-4">
            <span className="font-serif text-5xl tracking-widest font-bold text-white">
              B L E N D I E
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-6">Typography</h2>
          <div className="space-y-8">
            <div>
              <p className="font-serif text-6xl leading-none mb-2">Cormorant Garamond</p>
              <p className="font-serif text-3xl italic opacity-60">The Elegant Headline</p>
            </div>
            <div>
              <p className="font-sans text-4xl font-bold mb-2">Mulish Bold</p>
              <p className="font-sans text-xl opacity-60">Mulish Regular - The clean, approachable body copy for UI elements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COLOR PALETTE */}
      <section className="mb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-6">The Coffee Spectrum</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          <ColorSwatch name="Coffee Bean" hex="#2C1810" className="bg-[#2C1810] text-white" />
          <ColorSwatch name="Cream Paper" hex="#FFFCF5" className="bg-[#FFFCF5] text-black border border-black/10" />
          <ColorSwatch name="Dried Fruit" hex="#7D4E57" className="bg-[#7D4E57] text-white" />
          <ColorSwatch name="Cherry Red" hex="#C04E3F" className="bg-[#C04E3F] text-white" />
          <ColorSwatch name="Honey Gold" hex="#E6AA68" className="bg-[#E6AA68] text-black" />
          <ColorSwatch name="Roast Brown" hex="#5D4037" className="bg-[#5D4037] text-white" />
        </div>
      </section>

      {/* 3. UI COMPONENTS */}
      <section className="mb-20">
        <h2 className="text-sm font-bold uppercase tracking-widest opacity-40 mb-6">UI Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Buttons</h3>
            <button className="btn-primary w-full">Primary Action</button>
            <button className="px-8 py-3 rounded-full border border-foreground font-bold w-full hover:bg-black/5">Secondary</button>
            <button className="px-8 py-3 rounded-full bg-[#E6AA68] text-black font-bold w-full hover:opacity-90">Accent</button>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Cards</h3>
            <div className="card-soft">
              <h4 className="font-serif text-lg mb-2">Soft Card</h4>
              <p className="opacity-60 text-sm">Rounded corners, subtle border, hover shadow.</p>
            </div>
          </div>

          {/* Visualizer */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl">Visualizer</h3>
            <div className="bg-white border border-border-color rounded-2xl p-8 flex items-center justify-center">
               <StarFlower />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

const ColorSwatch = ({ name, hex, className }: any) => (
  <div className={`aspect-square rounded-2xl flex flex-col justify-end p-4 ${className}`}>
    <span className="font-bold text-sm">{name}</span>
    <span className="text-xs opacity-60 uppercase">{hex}</span>
  </div>
);
