"use client";

import React, { useState } from 'react';
import { useBlendStore } from '@/store/blend-store';
import Link from 'next/link';

// Mock Volume Discount Logic
const VOLUME_TIERS = [
  { kg: 1, discount: 0, label: 'Standard' },
  { kg: 5, discount: 0.15, label: 'Commercial' },
  { kg: 20, discount: 0.25, label: 'Wholesale' },
  { kg: 50, discount: 0.35, label: 'Partner' },
];

export default function Checkout() {
  const { currentBlend } = useBlendStore();
  const [selectedTier, setSelectedTier] = useState(VOLUME_TIERS[0]);
  const [step, setStep] = useState<'review' | 'shipping' | 'payment'>('review');

  // Calculation Logic
  const basePricePerKg = currentBlend.reduce((acc, c) => acc + (c.price_250g * 4 * (c.percentage / 100)), 0);
  const discountedPricePerKg = basePricePerKg * (1 - selectedTier.discount);
  const totalOrderValue = discountedPricePerKg * selectedTier.kg;

  if (currentBlend.length === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background text-foreground">
            <h1 className="text-4xl font-serif mb-4 text-fruit-plum">Cart Empty</h1>
            <Link href="/portfolio" className="btn-primary">Create a Blend</Link>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16 font-sans">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: Order Summary & Transparency */}
        <div>
            <header className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Step 03</span>
                <h1 className="text-5xl font-serif text-fruit-plum mt-2 mb-2">Review & Value</h1>
                <p className="opacity-60">Transparent pricing based on your custom recipe.</p>
            </header>

            {/* Cost Breakdown Chart */}
            <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm mb-8">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-6 opacity-50">Cost Breakdown (per kg)</h3>
                <div className="space-y-4">
                    {currentBlend.map(item => {
                        const costContribution = (item.price_250g * 4) * (item.percentage / 100);
                        const widthPct = (costContribution / basePricePerKg) * 100;
                        
                        return (
                            <div key={item.id}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-bold">{item.name} ({item.percentage}%)</span>
                                    <span className="font-mono">€{costContribution.toFixed(2)}</span>
                                </div>
                                <div className="h-3 bg-black/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-fruit-plum" style={{ width: `${widthPct}%` }} />
                                </div>
                                <p className="text-[10px] opacity-40 mt-1">Based on base rate of €{(item.price_250g * 4).toFixed(2)}/kg</p>
                            </div>
                        );
                    })}
                </div>
                <div className="mt-6 pt-6 border-t border-dashed border-black/10 flex justify-between items-end">
                    <span className="text-sm font-bold">Base Market Rate</span>
                    <span className="font-mono text-xl font-bold">€{basePricePerKg.toFixed(2)} / kg</span>
                </div>
            </div>

            {/* Volume Tier Selector */}
            <div className="bg-fruit-citrus/10 p-8 rounded-2xl border border-fruit-citrus/20">
                <h3 className="font-bold text-sm uppercase tracking-widest mb-4 text-fruit-brown">Volume Savings</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {VOLUME_TIERS.map(tier => (
                        <button
                            key={tier.kg}
                            onClick={() => setSelectedTier(tier)}
                            className={`p-3 rounded-lg border text-center transition-all ${
                                selectedTier.kg === tier.kg 
                                    ? 'bg-white border-fruit-citrus shadow-md scale-105 ring-1 ring-fruit-citrus' 
                                    : 'bg-white/50 border-transparent hover:bg-white hover:border-black/5'
                            }`}
                        >
                            <div className="text-xl font-serif font-bold text-fruit-plum">{tier.kg}kg</div>
                            <div className="text-[10px] uppercase font-bold tracking-wider opacity-60">{tier.label}</div>
                            {tier.discount > 0 && (
                                <div className="text-[10px] text-green-600 font-bold mt-1">-{tier.discount * 100}%</div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

        </div>

        {/* RIGHT: Checkout Flow */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-border-color h-fit sticky top-8">
            <h2 className="text-2xl font-serif font-bold mb-8 flex justify-between items-center">
                <span>Total</span>
                <span className="text-4xl text-fruit-plum">€{totalOrderValue.toFixed(2)}</span>
            </h2>

            {/* Order Details */}
            <div className="space-y-2 text-sm opacity-70 mb-8 border-b border-border-color pb-8">
                <div className="flex justify-between">
                    <span>Blend Volume</span>
                    <span className="font-bold">{selectedTier.kg} kg</span>
                </div>
                <div className="flex justify-between">
                    <span>Price per kg</span>
                    <span className="font-bold">
                        {selectedTier.discount > 0 && <span className="line-through mr-2 opacity-50">€{basePricePerKg.toFixed(2)}</span>}
                        €{discountedPricePerKg.toFixed(2)}
                    </span>
                </div>
                <div className="flex justify-between text-green-600 font-bold">
                    <span>You Save</span>
                    <span>€{((basePricePerKg - discountedPricePerKg) * selectedTier.kg).toFixed(2)}</span>
                </div>
            </div>

            {/* Step Content */}
            {step === 'review' && (
                <div className="space-y-4">
                    <button onClick={() => setStep('shipping')} className="btn-primary w-full py-4 text-lg">
                        Continue to Shipping
                    </button>
                    <button className="w-full py-4 rounded-full border border-black/10 font-bold hover:bg-black/5">
                        Save Quote as PDF
                    </button>
                </div>
            )}

            {step === 'shipping' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <input type="email" placeholder="Email Address" className="w-full bg-background border border-border-color rounded-lg px-4 py-3" />
                    <div className="grid grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="w-full bg-background border border-border-color rounded-lg px-4 py-3" />
                        <input type="text" placeholder="Last Name" className="w-full bg-background border border-border-color rounded-lg px-4 py-3" />
                    </div>
                    <input type="text" placeholder="Address" className="w-full bg-background border border-border-color rounded-lg px-4 py-3" />
                    
                    <button onClick={() => setStep('payment')} className="btn-primary w-full py-4 text-lg mt-4">
                        Continue to Payment
                    </button>
                    <button onClick={() => setStep('review')} className="text-xs text-center w-full hover:underline opacity-50">Back</button>
                </div>
            )}

            {step === 'payment' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">💳</div>
                    <h3 className="font-bold text-lg">Payment Gateway</h3>
                    <p className="opacity-50 text-sm mb-6">Stripe Secure Checkout would load here.</p>
                    <button className="btn-primary w-full py-4 text-lg">
                        Pay €{totalOrderValue.toFixed(2)}
                    </button>
                    <button onClick={() => setStep('shipping')} className="text-xs text-center w-full hover:underline opacity-50">Back</button>
                </div>
            )}

        </div>

      </div>
    </div>
  );
}
