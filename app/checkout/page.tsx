"use client";

import React, { useState } from 'react';
import { useBlendStore } from '@/store/blend-store';
import Link from 'next/link';

// Updated Tier Logic (3% Increments)
const VOLUME_TIERS = [
  { kg: 1, discount: 0, label: 'Standard' },
  { kg: 5, discount: 0.03, label: 'Small Biz' },
  { kg: 10, discount: 0.06, label: 'Office' },
  { kg: 20, discount: 0.09, label: 'Cafe' },
  { kg: 50, discount: 0.12, label: 'Wholesale' },
  { kg: 100, discount: 0.15, label: 'Partner' },
];

export default function Checkout() {
  const { currentBlend, cart } = useBlendStore();
  const [selectedTier, setSelectedTier] = useState(VOLUME_TIERS[0]);
  const [step, setStep] = useState<'review' | 'shipping' | 'payment'>('review');

  // Math
  const basePricePerKg = currentBlend.reduce((acc, c) => acc + (c.price_250g * 4 * (c.percentage / 100)), 0);
  const discountedPricePerKg = basePricePerKg * (1 - selectedTier.discount);
  
  // Cart Items (Blend + Samples)
  const blendTotal = discountedPricePerKg * selectedTier.kg;
  const sampleTotal = cart.total;
  const grandTotal = blendTotal + sampleTotal;

  if (currentBlend.length === 0 && cart.items.length === 0) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center bg-background text-foreground">
            <h1 className="text-4xl font-serif mb-4 text-fruit-plum">Cart Empty</h1>
            <div className="flex gap-4">
                <Link href="/portfolio/" className="btn-primary">Create Blend</Link>
                <Link href="/shop/" className="px-6 py-3 border border-black/10 rounded-full font-bold">Browse Shop</Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8 md:p-16 font-sans pt-24">
      
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* LEFT: Breakdown */}
        <div>
            <header className="mb-8">
                <h1 className="text-5xl font-serif text-fruit-plum mt-2 mb-2">Checkout</h1>
                <Link href="/shop/" className="text-sm font-bold text-fruit-berry hover:underline">← Continue Shopping</Link>
            </header>

            {/* Custom Blend Section */}
            {currentBlend.length > 0 && (
                <div className="bg-white p-8 rounded-2xl border border-border-color shadow-sm mb-8">
                    <h3 className="font-bold text-lg mb-4 text-fruit-plum">Your Custom Blend</h3>
                    
                    {/* Cost Breakdown Bar */}
                    <div className="space-y-4 mb-8">
                        {currentBlend.map(item => {
                            const costContribution = (item.price_250g * 4) * (item.percentage / 100);
                            const widthPct = (costContribution / basePricePerKg) * 100;
                            return (
                                <div key={item.id}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="font-bold">{item.name} ({item.percentage}%)</span>
                                        <span className="font-mono opacity-50">€{costContribution.toFixed(2)}/kg</span>
                                    </div>
                                    <div className="h-2 bg-black/5 rounded-full overflow-hidden flex">
                                        <div className="h-full bg-fruit-plum" style={{ width: `${widthPct}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Volume Tiers */}
                    <h4 className="text-xs uppercase tracking-widest font-bold mb-3 opacity-60">Select Volume</h4>
                    <div className="grid grid-cols-3 gap-2">
                        {VOLUME_TIERS.map(tier => (
                            <button
                                key={tier.kg}
                                onClick={() => setSelectedTier(tier)}
                                className={`p-2 rounded-lg border text-center transition-all ${
                                    selectedTier.kg === tier.kg 
                                        ? 'bg-fruit-plum text-white border-fruit-plum shadow-md' 
                                        : 'bg-white border-black/10 hover:border-fruit-plum'
                                }`}
                            >
                                <div className="text-lg font-bold font-serif">{tier.kg}kg</div>
                                {tier.discount > 0 && <div className="text-[9px] font-bold opacity-80">Save {tier.discount * 100}%</div>}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Cart Items (Samples) */}
            {cart.items.length > 0 && (
                <div className="bg-white p-6 rounded-2xl border border-border-color shadow-sm mb-8">
                    <h3 className="font-bold text-sm uppercase tracking-widest mb-4 opacity-50">Additional Items</h3>
                    {cart.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                            <span>{item.name}</span>
                            <span className="font-mono font-bold">€{item.price}</span>
                        </div>
                    ))}
                </div>
            )}

        </div>

        {/* RIGHT: Payment Flow */}
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-border-color h-fit sticky top-24">
            <h2 className="text-2xl font-serif font-bold mb-8 flex justify-between items-center">
                <span>Total</span>
                <span className="text-4xl text-fruit-plum">€{grandTotal.toFixed(2)}</span>
            </h2>

            {/* Savings Badge */}
            {selectedTier.discount > 0 && (
                <div className="mb-8 bg-green-50 text-green-700 px-4 py-2 rounded-lg text-sm font-bold flex justify-between">
                    <span>Volume Discount Applied</span>
                    <span>-€{((basePricePerKg - discountedPricePerKg) * selectedTier.kg).toFixed(2)}</span>
                </div>
            )}

            {/* Step Content */}
            {step === 'review' && (
                <div className="space-y-4">
                    <button onClick={() => setStep('shipping')} className="btn-primary w-full py-4 text-lg shadow-xl">
                        Secure Checkout
                    </button>
                    <p className="text-center text-xs opacity-40 mt-4">Free Shipping on orders over 20kg</p>
                </div>
            )}

            {/* ... Shipping & Payment Steps (Same as before but styled) ... */}
            {step === 'shipping' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    {/* Mock Form */}
                    <input type="email" placeholder="Email" className="w-full border rounded-lg px-4 py-3" />
                    <button onClick={() => setStep('payment')} className="btn-primary w-full py-4 mt-4">Continue to Payment</button>
                </div>
            )}

            {step === 'payment' && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                    <div className="bg-gray-100 p-4 rounded-lg text-center text-sm font-mono border border-dashed border-gray-300">
                        STRIPE_ELEMENT_PLACEHOLDER
                    </div>
                    <button className="btn-primary w-full py-4 mt-4">Pay €{grandTotal.toFixed(2)}</button>
                </div>
            )}

        </div>

      </div>
    </div>
  );
}
