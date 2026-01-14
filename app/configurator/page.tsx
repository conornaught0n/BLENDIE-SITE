"use client";

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { CoffeeBagModel } from '@/components/canvas/CoffeeBagModel';

export default function Configurator() {
  const [bagColor, setBagColor] = useState('#1a1a1a');
  const [bgContext, setBgContext] = useState<'studio' | 'kitchen' | 'cafe'>('studio');
  const [finish, setFinish] = useState<'matte' | 'gloss'>('matte');

  const bgImages = {
    studio: 'bg-white',
    kitchen: 'bg-[url("https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80")]',
    cafe: 'bg-[url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80")]'
  };

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      
      {/* 3D Canvas Area */}
      <div className={`relative w-full md:w-2/3 h-[60vh] md:h-screen transition-all duration-700 bg-cover bg-center ${bgImages[bgContext]}`}>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
        
        <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }} className="z-10">
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
          
          <Suspense fallback={null}>
            <CoffeeBagModel color={bagColor} finish={finish} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            <Environment preset={bgContext === 'studio' ? 'studio' : 'city'} />
          </Suspense>
          
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} />
        </Canvas>

        {/* Context Switcher (Floating) */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20 bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/20">
            {['studio', 'kitchen', 'cafe'].map((ctx) => (
                <button 
                    key={ctx}
                    onClick={() => setBgContext(ctx as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${bgContext === ctx ? 'bg-white text-black shadow-lg' : 'text-white hover:bg-white/20'}`}
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
         </header>

         {/* Bag Color */}
         <div className="mb-10">
            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Bag Color</label>
            <div className="flex gap-4">
                {['#1a1a1a', '#ffffff', '#C6A87C', '#2C3E50', '#8B4513'].map(color => (
                    <button 
                        key={color}
                        onClick={() => setBagColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${bagColor === color ? 'border-foreground ring-2 ring-offset-2 ring-foreground' : 'border-transparent'}`}
                        style={{ backgroundColor: color }}
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
                    className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${finish === 'matte' ? 'bg-white shadow-sm' : 'opacity-50'}`}
                >
                    Matte
                </button>
                <button 
                    onClick={() => setFinish('gloss')}
                    className={`flex-1 py-3 rounded-md text-sm font-bold transition-all ${finish === 'gloss' ? 'bg-white shadow-sm' : 'opacity-50'}`}
                >
                    Gloss
                </button>
            </div>
         </div>

         {/* Label Upload (Mock) */}
         <div className="mb-12">
            <label className="block text-xs font-bold uppercase tracking-widest opacity-60 mb-4">Label Design</label>
            <div className="border-2 border-dashed border-black/10 rounded-xl p-8 text-center hover:border-accent-gold/50 cursor-pointer transition-colors bg-black/5">
                <span className="text-2xl block mb-2">📤</span>
                <p className="text-sm font-bold">Upload Custom Label</p>
                <p className="text-xs opacity-50 mt-1">PNG or JPG (Max 5MB)</p>
            </div>
            <div className="mt-4 text-center text-xs opacity-40 uppercase tracking-widest">- OR -</div>
            <button className="w-full mt-4 py-3 border border-black/10 rounded-xl text-sm font-bold hover:bg-black/5">
                Use AI Label Generator ✨
            </button>
         </div>

         {/* Action */}
         <button className="btn-paris w-full">
            Save Design & Review →
         </button>

      </div>

    </div>
  );
}
