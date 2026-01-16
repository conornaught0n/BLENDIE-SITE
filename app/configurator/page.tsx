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
  const [showMobileLedger, setShowMobileLedger] = useState(false);
  
  // Label State
  const [labelImage, setLabelImage] = useState<string | null>(null);
  const [labelScale, setLabelScale] = useState(1);
  const [labelY, setLabelY] = useState(0);
  const [activeTab, setActiveTab] = useState<'style' | 'label'>('style');

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
    { hex: '#D97706', name: 'Amber' },
    { hex: '#5D4037', name: 'Roast' }
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
    <div className="h-screen w-screen overflow-hidden relative font-sans text-foreground">
      
      {/* 3D Canvas */}
      <div className={`absolute inset-0 transition-all duration-1000 bg-cover bg-center ${bgImages[bgContext]}`}>
        {bgContext !== 'studio' && <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" />}
        
        <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 45 }} className="z-10">
          <ambientLight intensity={0.8} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
          
          <Suspense fallback={null}>
            <CoffeeBagModel 
                color={bagColor} 
                finish={finish} 
                labelTexture={labelImage}
                labelScale={labelScale}
                labelY={labelY}
            />
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
            <div className="flex gap-4 text-xs font-bold uppercase tracking-widest">
                <button onClick={() => setActiveTab('style')} className={`${activeTab === 'style' ? 'text-fruit-berry underline' : 'opacity-50'}`}>Style</button>
                <button onClick={() => setActiveTab('label')} className={`${activeTab === 'label' ? 'text-fruit-berry underline' : 'opacity-50'}`}>Label</button>
            </div>
        </div>
        
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

      {/* BOTTOM CONTROL HUD */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 w-full max-w-2xl px-4 pointer-events-none z-20">
        
        {/* Control Toolbar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-xl border border-black/5 rounded-xl shadow-xl p-4 w-full">
            
            {activeTab === 'style' ? (
                <div className="flex gap-4 items-center justify-between overflow-x-auto">
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
                    <div className="flex gap-2 items-center shrink-0">
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
            ) : (
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex gap-4 items-center">
                        <label className="flex-1 bg-black/5 hover:bg-black/10 cursor-pointer rounded-lg px-4 py-2 text-center text-xs font-bold uppercase tracking-widest border border-dashed border-black/20">
                            Upload Artwork 📤
                            <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                        </label>
                        <div className="text-[10px] opacity-50 w-1/3 leading-tight">Supported: PNG, JPG.<br/>Rec: 6x4 Ratio.</div>
                    </div>
                    
                    {labelImage && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase w-8">Size</span>
                                <input 
                                    type="range" min="0.5" max="1.5" step="0.1" 
                                    value={labelScale} 
                                    onChange={(e) => setLabelScale(parseFloat(e.target.value))}
                                    className="flex-1 h-1 bg-black/10 rounded-lg accent-fruit-plum" 
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase w-8">Pos Y</span>
                                <input 
                                    type="range" min="-1" max="1" step="0.1" 
                                    value={labelY} 
                                    onChange={(e) => setLabelY(parseFloat(e.target.value))}
                                    className="flex-1 h-1 bg-black/10 rounded-lg accent-fruit-plum" 
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>

        {/* Action Bar */}
        <button className="pointer-events-auto w-full btn-primary py-3 rounded-xl shadow-xl text-xs uppercase tracking-widest">
            Confirm Design & Checkout →
        </button>

      </div>

    </div>
  );
}
