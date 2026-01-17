"use client";

import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { CoffeeBagModel } from '@/components/canvas/CoffeeBagModel';
import { useBlendStore } from '@/store/blend-store';

export default function Configurator() {
  const { currentBlend } = useBlendStore();
  
  // -- 3D STATE --
  const [bagColor, setBagColor] = useState('#2C1810');
  const [bgContext, setBgContext] = useState<'studio' | 'kitchen' | 'cafe'>('studio');
  const [finish, setFinish] = useState<'matte' | 'gloss'>('matte');
  
  // -- PRODUCT SPECS --
  const [size, setSize] = useState<'250g' | '500g' | '1kg'>('250g');
  const [style, setStyle] = useState<'box' | 'pouch'>('box');
  const [grind, setGrind] = useState<'bean' | 'ground'>('bean');
  
  // -- LABEL STATE --
  const [labelImage, setLabelImage] = useState<string | null>(null);
  const [labelScale, setLabelScale] = useState(1);
  const [labelY, setLabelY] = useState(0);

  // -- CALCULATED PRICE --
  const getPrice = () => {
    let base = 15;
    if (size === '500g') base += 12;
    if (size === '1kg') base += 25;
    if (grind === 'ground') base += 1;
    // Add Blend Cost if available
    if (currentBlend.length > 0) {
        // Mock calculation based on blend quality
        base += currentBlend.length * 2; 
    }
    return base;
  };

  const bgImages = {
    studio: 'bg-[#F2F0E9]', // Soft cream
    kitchen: 'bg-[url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80")]',
    cafe: 'bg-[url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80")]'
  };

  const colors = [
    { hex: '#2C1810', name: 'Espresso' },
    { hex: '#FFFFFF', name: 'White' },
    { hex: '#1A1A1A', name: 'Charcoal' },
    { hex: '#E6DCCD', name: 'Kraft' },
    { hex: '#D97706', name: 'Amber' },
    { hex: '#540D6E', name: 'Plum' },
    { hex: '#8CB369', name: 'Sage' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setLabelImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-[72px] flex flex-col lg:flex-row font-sans text-foreground overflow-hidden">
      
      {/* LEFT PANEL: 3D VISUALIZATION (60% width on Desktop) */}
      <div className={`relative h-[50vh] lg:h-[calc(100vh-72px)] lg:w-[60%] transition-all duration-1000 bg-cover bg-center ${bgImages[bgContext]}`}>
        {bgContext !== 'studio' && <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />}
        
        {/* Context Switcher (Floating Top Center) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-md p-1.5 rounded-full border border-black/5 shadow-sm flex gap-1">
            {['studio', 'kitchen', 'cafe'].map((ctx) => (
                <button 
                    key={ctx}
                    onClick={() => setBgContext(ctx as any)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${bgContext === ctx ? 'bg-fruit-plum text-white shadow-md' : 'text-black/60 hover:bg-black/5'}`}
                >
                    {ctx}
                </button>
            ))}
        </div>

        <Canvas shadows camera={{ position: [0, 0, 6], fov: 40 }} className="z-10">
          <ambientLight intensity={0.9} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow intensity={1.5} />
          <Environment preset={bgContext === 'studio' ? 'studio' : 'city'} />
          
          <Suspense fallback={null}>
            <CoffeeBagModel 
                color={bagColor} 
                finish={finish} 
                labelTexture={labelImage}
                labelScale={labelScale}
                labelY={labelY}
                rotation={[0, -0.2, 0]} // Slight angle for better view
            />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </Suspense>
          
          <OrbitControls 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 2} 
            enableZoom={true} 
            minDistance={4} 
            maxDistance={8} 
          />
        </Canvas>
      </div>

      {/* RIGHT PANEL: DESIGN CONTROLS (40% width on Desktop, Scrollable) */}
      <div className="relative h-[50vh] lg:h-[calc(100vh-72px)] lg:w-[40%] bg-white border-l border-black/5 overflow-y-auto custom-scrollbar">
        <div className="p-8 max-w-xl mx-auto space-y-10 pb-24">
            
            {/* Header */}
            <div>
                <h1 className="font-serif text-4xl font-bold text-fruit-plum mb-2">Design Your Bag</h1>
                <p className="opacity-60 text-sm">Customize every detail of your packaging.</p>
            </div>

            {/* 1. BAG SPECS */}
            <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">1. Bag Specs</h3>
                
                {/* Size */}
                <div className="space-y-2">
                    <label className="text-sm font-bold">Size</label>
                    <div className="flex gap-2">
                        {['250g', '500g', '1kg'].map((s) => (
                            <button 
                                key={s} 
                                onClick={() => setSize(s as any)}
                                className={`flex-1 py-3 rounded-lg text-sm font-bold border transition-all ${size === s ? 'border-fruit-plum bg-fruit-plum/5 text-fruit-plum' : 'border-black/10 hover:border-black/20'}`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Style & Grind */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Style</label>
                        <div className="flex bg-black/5 p-1 rounded-lg">
                            <button onClick={() => setStyle('box')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${style === 'box' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Box Bottom</button>
                            <button onClick={() => setStyle('pouch')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${style === 'pouch' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Stand Up</button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold">Finish</label>
                        <div className="flex bg-black/5 p-1 rounded-lg">
                            <button onClick={() => setFinish('matte')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${finish === 'matte' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Matte</button>
                            <button onClick={() => setFinish('gloss')} className={`flex-1 py-2 rounded-md text-xs font-bold transition-all ${finish === 'gloss' ? 'bg-white shadow-sm' : 'opacity-50'}`}>Gloss</button>
                        </div>
                    </div>
                </div>

                {/* Colors */}
                <div className="space-y-2">
                    <label className="text-sm font-bold">Color</label>
                    <div className="flex flex-wrap gap-3">
                        {colors.map(color => (
                            <button 
                                key={color.hex}
                                onClick={() => setBagColor(color.hex)}
                                className={`w-8 h-8 rounded-full border transition-transform hover:scale-110 ${bagColor === color.hex ? 'border-fruit-plum ring-2 ring-offset-2 ring-fruit-plum' : 'border-black/10'}`}
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* 2. LABEL & ARTWORK */}
            <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">2. Label & Artwork</h3>
                
                <div className="bg-fruit-plum/5 rounded-xl p-4 border border-dashed border-fruit-plum/20">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h4 className="font-bold text-sm text-fruit-plum">Upload Label</h4>
                            <p className="text-[10px] opacity-60 max-w-[200px] mt-1">Recommended size: 1200x1800px (Portrait). PNG or JPG.</p>
                        </div>
                        <a href="/templates/blendie-label-template.pdf" target="_blank" className="text-[10px] underline text-fruit-plum font-bold hover:text-fruit-berry">
                            Download Template ↓
                        </a>
                    </div>
                    
                    <label className="block w-full cursor-pointer">
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        <div className="w-full bg-white border border-black/10 hover:border-fruit-plum transition-colors rounded-lg py-3 text-center text-xs font-bold uppercase tracking-widest shadow-sm">
                            {labelImage ? 'Change Image' : 'Choose File'}
                        </div>
                    </label>

                    {labelImage && (
                        <div className="mt-4 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase">Scale</label>
                                <input 
                                    type="range" min="0.5" max="1.5" step="0.05" 
                                    value={labelScale} 
                                    onChange={(e) => setLabelScale(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-black/10 rounded-lg accent-fruit-plum" 
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase">Vertical Pos</label>
                                <input 
                                    type="range" min="-0.5" max="0.5" step="0.05" 
                                    value={labelY} 
                                    onChange={(e) => setLabelY(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-black/10 rounded-lg accent-fruit-plum" 
                                />
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* 3. COFFEE SPEC */}
            <section className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest opacity-40 border-b border-black/5 pb-2">3. Coffee Contents</h3>
                {currentBlend.length > 0 ? (
                    <div className="bg-white border border-black/10 rounded-xl p-4">
                        <h4 className="font-bold text-sm mb-2">Selected Blend</h4>
                        <div className="flex -space-x-2 mb-3">
                            {currentBlend.map((coffee, i) => (
                                <div key={i} className="w-6 h-6 rounded-full bg-fruit-plum border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">
                                    {coffee.origin.substring(0,2)}
                                </div>
                            ))}
                        </div>
                        <p className="text-xs opacity-60">{currentBlend.map(c => c.name).join(' + ')}</p>
                    </div>
                ) : (
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex justify-between items-center">
                        <span className="text-xs font-bold text-orange-800">No coffee selected yet.</span>
                        <a href="/shop/" className="text-[10px] font-bold uppercase tracking-widest bg-orange-100 text-orange-900 px-3 py-1.5 rounded-full hover:bg-orange-200">
                            Browse Beans
                        </a>
                    </div>
                )}
            </section>

        </div>

        {/* STICKY FOOTER ACTION */}
        <div className="sticky bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-black/5 p-6 shadow-2xl">
            <div className="flex justify-between items-center max-w-xl mx-auto">
                <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-50">Total Price</p>
                    <p className="text-3xl font-serif font-bold text-fruit-plum">€{getPrice()}</p>
                </div>
                <button className="btn-primary">
                    Order Now →
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
