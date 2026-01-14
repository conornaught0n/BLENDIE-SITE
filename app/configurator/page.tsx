"use client";

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { CoffeeBagModel } from '@/components/canvas/CoffeeBagModel';
import { useBlendStore } from '@/store/blend-store';

export default function Configurator() {
  const { currentBlend } = useBlendStore();
  
  const [bagColor, setBagColor] = useState('#2C1810');
  const [bgContext, setBgContext] = useState<'studio' | 'kitchen' | 'cafe'>('studio');
  const [finish, setFinish] = useState<'matte' | 'gloss'>('matte');
  const [bagStyle, setBagStyle] = useState<'pouch' | 'box'>('box');

  const bgImages = {
    studio: 'bg-[#FFFCF5]',
    kitchen: 'bg-[url("https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80")]',
    cafe: 'bg-[url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80")]'
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row font-sans">
      
      {/* 3D Canvas Area */}
      <div className={`relative w-full md:w-2/3 h-[60vh] md:h-screen transition-all duration-700 bg-cover bg-center ${bgImages[bgContext]}`}>
        {bgContext !== 'studio' && <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />}
        
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }} className="z-10">
          <ambientLight intensity={0.7} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
          
          <Suspense fallback={null}>
            <CoffeeBagModel color={bagColor} finish={finish} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            <Environment preset={bgContext === 'studio' ? 'studio' : 'city'} />
          </Suspense>
          
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} />
        </Canvas>

        {/* Context Switcher (Floating) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-white/80 backdrop-blur-md p-2 rounded-full border border-border-color shadow-lg">
            {['studio', 'kitchen', 'cafe'].map((ctx) => (
                <button 
                    key={ctx}
                    onClick={() => setBgContext(ctx as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${bgContext === ctx ? 'bg-foreground text-white shadow-md' : 'text-foreground/60 hover:bg-black/5'}`}
                >
                    {ctx}
                </button>
            ))}
        </div>
      </div>

      {/* Controls Sidebar */}
      <div className="w-full md:w-1/3 bg-background border-l border-border-color p-8 overflow-y-auto z-20">
         <header className="mb-12">
            <span className="text-xs font-bold uppercase tracking-widest opacity-40">Step 02</span>
            <h1 className="text-4xl font-serif mt-2">Design Packaging</h1>
            <p className="text-sm opacity-60 mt-2">Customize your {currentBlend.length > 0 ? 'Custom Blend' : 'Coffee'} bag.</p>
         </header>

         {/* Bag Style */}
         <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Bag Style</label>
            <div className="flex bg-black/5 rounded-lg p-1">
                <button 
                    onClick={() => setBagStyle('box')}
                    className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${bagStyle === 'box' ? 'bg-white shadow-sm text-foreground' : 'opacity-50'}`}
                >
                    Box Bottom
                </button>
                <button 
                    onClick={() => setBagStyle('pouch')}
                    className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${bagStyle === 'pouch' ? 'bg-white shadow-sm text-foreground' : 'opacity-50'}`}
                >
                    Stand-up Pouch
                </button>
            </div>
         </div>

         {/* Bag Color */}
         <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Bag Color</label>
            <div className="flex gap-4 flex-wrap">
                {[
                    { hex: '#2C1810', name: 'Coffee Bean' },
                    { hex: '#FFFFFF', name: 'White' },
                    { hex: '#1A1A1A', name: 'Charcoal' },
                    { hex: '#E6DCCD', name: 'Kraft' },
                    { hex: '#7D4E57', name: 'Berry' },
                    { hex: '#5D4037', name: 'Roast' }
                ].map(color => (
                    <button 
                        key={color.hex}
                        onClick={() => setBagColor(color.hex)}
                        title={color.name}
                        className={`w-10 h-10 rounded-full border transition-transform hover:scale-110 ${bagColor === color.hex ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-border-color'}`}
                        style={{ backgroundColor: color.hex }}
                    />
                ))}
            </div>
         </div>

         {/* Finish */}
         <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Finish</label>
            <div className="flex bg-black/5 rounded-lg p-1">
                <button 
                    onClick={() => setFinish('matte')}
                    className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${finish === 'matte' ? 'bg-white shadow-sm text-foreground' : 'opacity-50'}`}
                >
                    Matte
                </button>
                <button 
                    onClick={() => setFinish('gloss')}
                    className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${finish === 'gloss' ? 'bg-white shadow-sm text-foreground' : 'opacity-50'}`}
                >
                    Gloss
                </button>
            </div>
         </div>

         {/* Label Upload (Mock) */}
         <div className="mb-12">
            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Label Design</label>
            <div className="border-2 border-dashed border-border-color rounded-xl p-8 text-center hover:border-coffee-brown cursor-pointer transition-colors bg-white hover:bg-coffee-yellow/5">
                <span className="text-2xl block mb-2 opacity-50">📤</span>
                <p className="text-sm font-bold">Upload Custom Label</p>
                <p className="text-xs opacity-50 mt-1">PNG or JPG (Max 5MB)</p>
            </div>
            
            <div className="mt-6 p-4 bg-coffee-yellow/10 rounded-xl border border-coffee-yellow/20">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">✨</span>
                    <h4 className="font-bold text-sm text-coffee-brown">AI Label Generator</h4>
                </div>
                <p className="text-xs opacity-70 mb-3">Create a "Birthday Blend" or unique art in seconds.</p>
                <button className="w-full py-2 bg-white border border-coffee-brown/20 rounded-lg text-xs font-bold text-coffee-brown hover:bg-coffee-brown hover:text-white transition-colors">
                    Launch Generator
                </button>
            </div>
         </div>

         {/* Action */}
         <button className="btn-primary w-full shadow-xl">
            Review Order & Checkout →
         </button>

      </div>

    </div>
  );
}
