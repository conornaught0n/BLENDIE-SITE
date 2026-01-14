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
  const [showMobileLedger, setShowMobileLedger] = useState(false); // Mobile Drawer State

  const bgImages = {
    studio: 'bg-[#FFFCF5]',
    kitchen: 'bg-[url("https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80")]',
    cafe: 'bg-[url("https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80")]'
  };

  const colors = [
    { hex: '#2C1810', name: 'Bean' },
    { hex: '#FFFFFF', name: 'White' },
    { hex: '#1A1A1A', name: 'Charcoal' },
    { hex: '#E6DCCD', name: 'Kraft' },
    { hex: '#7D4E57', name: 'Berry' },
    { hex: '#5D4037', name: 'Roast' }
  ];

  return (
    <div className="h-screen w-screen overflow-hidden relative font-sans">
      
      {/* 3D Canvas */}
      <div className={`absolute inset-0 transition-all duration-1000 bg-cover bg-center ${bgImages[bgContext]}`}>
        {bgContext !== 'studio' && <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />}
        
        <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 45 }} className="z-10">
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
          
          <Suspense fallback={null}>
            <CoffeeBagModel color={bagColor} finish={finish} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            <Environment preset={bgContext === 'studio' ? 'studio' : 'city'} />
          </Suspense>
          
          <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={true} />
        </Canvas>
      </div>

      {/* HEADER HUD */}
      <div className="absolute top-0 left-0 right-0 p-4 md:p-6 flex justify-between items-start pointer-events-none z-20">
        <div className="pointer-events-auto bg-white/90 backdrop-blur-md px-4 py-3 md:px-6 md:py-4 rounded-xl shadow-sm border border-black/5">
            <h1 className="font-serif text-xl md:text-2xl font-bold text-fruit-plum mb-1">Packaging</h1>
            
            {/* Mobile: Toggle Blend View */}
            <button 
                onClick={() => setShowMobileLedger(!showMobileLedger)}
                className="md:hidden text-[10px] uppercase font-bold tracking-widest text-fruit-berry underline"
            >
                {showMobileLedger ? 'Hide Blend' : 'View Blend'}
            </button>
            
            <p className="hidden md:block text-xs opacity-60 uppercase tracking-widest">{currentBlend.length > 0 ? `${currentBlend.length} Bean Blend` : 'Standard Roast'}</p>
        </div>
        
        {/* Context Switcher */}
        <div className="pointer-events-auto flex gap-1 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm">
            {['studio', 'kitchen', 'cafe'].map((ctx) => (
                <button 
                    key={ctx}
                    onClick={() => setBgContext(ctx as any)}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest transition-all ${bgContext === ctx ? 'bg-fruit-plum text-white shadow-md' : 'text-black/60 hover:bg-black/5'}`}
                >
                    {ctx}
                </button>
            ))}
        </div>
      </div>

      {/* MOBILE MINI-LEDGER (Overlay) */}
      <div className={`absolute top-24 left-4 w-64 bg-white/95 backdrop-blur-xl p-4 rounded-xl shadow-xl border border-black/5 transition-all duration-300 origin-top-left z-30 ${showMobileLedger ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`}>
          <h3 className="font-serif text-sm font-bold mb-2">Blend Composition</h3>
          <ul className="space-y-2">
              {currentBlend.map(c => (
                  <li key={c.id} className="flex justify-between text-xs border-b border-black/5 pb-1">
                      <span>{c.name}</span>
                      <span className="font-mono opacity-50">{c.percentage}%</span>
                  </li>
              ))}
          </ul>
      </div>

      {/* BOTTOM CONTROL HUD */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full max-w-2xl px-4 pointer-events-none z-20">
        
        {/* Control Toolbar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/5 rounded-xl shadow-xl p-2 flex gap-2 w-full justify-between items-center overflow-x-auto">
            
            {/* Left: Style Toggles */}
            <div className="flex gap-2 shrink-0">
                <div className="flex bg-black/5 rounded-lg p-1">
                    <button onClick={() => setBagStyle('box')} className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${bagStyle === 'box' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Box</button>
                    <button onClick={() => setBagStyle('pouch')} className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${bagStyle === 'pouch' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Pouch</button>
                </div>
                <div className="flex bg-black/5 rounded-lg p-1">
                    <button onClick={() => setFinish('matte')} className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${finish === 'matte' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Matte</button>
                    <button onClick={() => setFinish('gloss')} className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${finish === 'gloss' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Gloss</button>
                </div>
            </div>

            {/* Right: Color Picker */}
            <div className="flex gap-2 items-center pr-2 shrink-0">
                {colors.map(color => (
                    <button 
                        key={color.hex}
                        onClick={() => setBagColor(color.hex)}
                        className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${bagColor === color.hex ? 'border-fruit-plum ring-2 ring-offset-1 ring-fruit-plum' : 'border-black/10'}`}
                        style={{ backgroundColor: color.hex }}
                    />
                ))}
            </div>
        </div>

        {/* Action Bar */}
        <div className="pointer-events-auto flex gap-3 w-full">
            <button className="flex-1 bg-white hover:bg-fruit-peach/10 text-fruit-plum font-bold py-3 rounded-xl shadow-lg border border-white/50 backdrop-blur-md transition-all text-xs">
                Upload 📤
            </button>
            <button className="flex-[2] btn-primary py-3 rounded-xl shadow-xl text-xs uppercase tracking-widest">
                Confirm & Checkout →
            </button>
        </div>

      </div>

    </div>
  );
}
