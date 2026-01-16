"use client";

import React, { useState } from 'react';
import { COFFEE_DATA } from '@/lib/coffee-data';
import { StarFlower } from '@/components/StarFlower';
import { useBlendStore } from '@/store/blend-store';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetail() {
  const params = useParams();
  const { addCoffee, currentBlend } = useBlendStore();
  const [selectedWeight, setSelectedWeight] = useState<'250g' | '1kg'>('250g');

  const slug = params.slug;
  const coffee = COFFEE_DATA.find(c => c.id === slug);

  if (!coffee) return <div className="p-20 text-center">Coffee not found.</div>;

  const price = selectedWeight === '250g' ? coffee.price_250g : coffee.price_250g * 3.8;

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 font-sans">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Left: Image & Visualizer */}
        <div>
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative mb-8">
                {/* Mock Image */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                    <span className="text-9xl font-black rotate-[-15deg]">{coffee.origin.substring(0,3).toUpperCase()}</span>
                </div>
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-fruit-plum">
                    {coffee.quality}
                </div>
            </div>
            
            <div className="bg-[#FFFCF5] border border-border-color rounded-2xl p-8 flex flex-col items-center">
                <h3 className="font-serif text-xl font-bold mb-4">Flavor Profile</h3>
                <div className="w-48 h-48">
                    <StarFlower attributes={{ body: coffee.body, dark: 5, bright: coffee.acidity, fruity: coffee.aroma, sweet: coffee.sweetness }} />
                </div>
            </div>
        </div>

        {/* Right: Info & Actions */}
        <div>
            <div className="mb-8">
                <span className="text-fruit-berry font-bold uppercase tracking-widest text-xs mb-2 block">{coffee.region}, {coffee.origin}</span>
                <h1 className="text-5xl font-serif font-bold text-fruit-plum mb-4">{coffee.name}</h1>
                <p className="text-lg opacity-60 leading-relaxed">{coffee.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8 text-sm">
                <div>
                    <span className="opacity-40 uppercase tracking-widest block mb-1">Producer</span>
                    <span className="font-bold">{coffee.producer}</span>
                </div>
                <div>
                    <span className="opacity-40 uppercase tracking-widest block mb-1">Altitude</span>
                    <span className="font-bold">{coffee.altitude}</span>
                </div>
                <div>
                    <span className="opacity-40 uppercase tracking-widest block mb-1">Process</span>
                    <span className="font-bold">{coffee.process}</span>
                </div>
                <div>
                    <span className="opacity-40 uppercase tracking-widest block mb-1">Tags</span>
                    <span className="font-bold">{coffee.tags.join(', ')}</span>
                </div>
            </div>

            {/* Actions */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex bg-[#F5F5F4] rounded p-1">
                        <button onClick={() => setSelectedWeight('250g')} className={`px-4 py-2 text-xs font-bold rounded-sm transition-all ${selectedWeight === '250g' ? 'bg-white shadow-sm text-fruit-plum' : 'opacity-50'}`}>250g</button>
                        <button onClick={() => setSelectedWeight('1kg')} className={`px-4 py-2 text-xs font-bold rounded-sm transition-all ${selectedWeight === '1kg' ? 'bg-white shadow-sm text-fruit-plum' : 'opacity-50'}`}>1kg</button>
                    </div>
                    <span className="font-mono text-3xl font-bold text-fruit-plum">€{price.toFixed(2)}</span>
                </div>

                <div className="flex flex-col gap-3">
                    <button 
                        onClick={() => addCoffee(coffee)}
                        className="w-full btn-primary py-4 text-sm uppercase tracking-widest"
                    >
                        Add to Portfolio
                    </button>
                    <button className="w-full py-4 border border-black/10 rounded-full font-bold hover:bg-black/5 transition-colors">
                        Order Sample (50g)
                    </button>
                </div>
            </div>

            {/* Pairings */}
            <div className="mt-12">
                <h3 className="font-bold text-sm uppercase tracking-widest opacity-40 mb-4">Recommended Pairings</h3>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {coffee.pairings?.map((pairId: string) => (
                        <Link key={pairId} href={`/shop/${pairId}`} className="flex-shrink-0 w-40 bg-white p-4 rounded-xl border border-border-color hover:border-fruit-berry transition-colors">
                            <div className="font-bold text-sm truncate">{pairId.replace(/-/g, ' ')}</div>
                            <div className="text-xs opacity-50 mt-1">View →</div>
                        </Link>
                    ))}
                </div>
            </div>

        </div>

      </div>
    </div>
  );
}
