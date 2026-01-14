"use client";

import React from 'react';
import { StarFlower } from '@/components/StarFlower';

export default function BrandIdentity() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16 font-sans">
      
      <header className="mb-16 border-b border-border-color pb-8">
        <h1 className="text-6xl font-serif mb-4 font-bold text-fruit-plum">Brand Identity</h1>
        <p className="opacity-60 text-lg">Visual System 2026 • Natural Fruit</p>
      </header>

      {/* 1. LOGO & TYPOGRAPHY */}
      <section className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Logomark</h2>
          <div className="bg-white border border-border-color p-12 flex items-center justify-center rounded-2xl shadow-sm">
            <span className="font-serif text-5xl tracking-tight font-bold text-fruit-plum lowercase">
              blend.ie
            </span>
          </div>
          <div className="bg-fruit-plum p-12 flex items-center justify-center mt-4 rounded-2xl">
            <span className="font-serif text-5xl tracking-tight font-bold text-white lowercase">
              blend.ie
            </span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Typography</h2>
          <div className="space-y-8">
            <div>
              <p className="font-serif text-6xl leading-none mb-2 text-fruit-plum font-bold">Cormorant Garamond</p>
              <p className="font-serif text-3xl italic opacity-60">Bold, Elegant, but Playful.</p>
            </div>
            <div>
              <p className="font-sans text-4xl font-bold mb-2">Mulish Bold</p>
              <p className="font-sans text-xl opacity-60">Mulish Regular - Friendly, geometric, highly readable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. COLOR PALETTE */}
      <section className="mb-20">
        <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">Natural Fruit Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <ColorSwatch name="Plum Deep" hex="#540D6E" className="bg-[#540D6E] text-white" />
          <ColorSwatch name="Berry Pop" hex="#FF4D6D" className="bg-[#FF4D6D] text-white" />
          <ColorSwatch name="Citrus Zest" hex="#FFB703" className="bg-[#FFB703] text-black" />
          <ColorSwatch name="Fresh Green" hex="#8CB369" className="bg-[#8CB369] text-black" />
          <ColorSwatch name="Soft Peach" hex="#F28482" className="bg-[#F28482] text-black" />
        </div>
      </section>

      {/* 3. UI COMPONENTS */}
      <section className="mb-20">
        <h2 className="text-xs font-bold uppercase tracking-widest opacity-40 mb-6">UI Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Buttons */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Buttons</h3>
            <button className="btn-primary w-full">Start Blending</button>
            <button className="px-8 py-3 rounded-full border border-fruit-plum text-fruit-plum font-bold w-full hover:bg-fruit-plum/5">Secondary</button>
            <button className="px-8 py-3 rounded-full bg-fruit-citrus text-black font-bold w-full hover:opacity-90">Accent</button>
          </div>

          {/* Cards */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Cards</h3>
            <div className="card-soft">
              <h4 className="font-serif text-lg mb-2 font-bold text-fruit-plum">Soft Card</h4>
              <p className="opacity-60 text-sm">Rounded corners (16px), subtle border, fun hover state.</p>
            </div>
          </div>

          {/* Visualizer */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold">Visualizer</h3>
            <div className="bg-white border border-border-color rounded-2xl p-8 flex items-center justify-center shadow-sm">
               <StarFlower />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

const ColorSwatch = ({ name, hex, className }: any) => (
  <div className={`aspect-square rounded-2xl flex flex-col justify-end p-4 shadow-sm ${className}`}>
    <span className="font-bold text-sm">{name}</span>
    <span className="text-xs opacity-60 uppercase">{hex}</span>
  </div>
);
