"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamic import to avoid SSR issues with DOM-dependent library
const QRScanner = dynamic(() => import('@/components/QRScanner'), { ssr: false });

export default function ProductionLanding() {
  const [showScanner, setShowScanner] = useState(false);
  const [scannedData, setScannedData] = useState<any>(null);

  const modules = [
    {
      title: 'Owner Dashboard',
      description: 'Business overview, sales analytics, and inventory value.',
      href: '/production/owner',
      icon: '📊',
      color: 'bg-blue-500/5 text-blue-500 border-blue-500/20'
    },
    {
      title: 'Production Floor',
      description: 'Roast schedule, batch tracking, and printing station.',
      href: '/production/floor',
      icon: '🔥',
      color: 'bg-fruit-berry-light text-fruit-berry border-fruit-berry/20'
    },
    {
      title: 'Order Management',
      description: 'Track orders, shipping labels, and fulfillment.',
      href: '/production/orders',
      icon: '📦',
      color: 'bg-fruit-green-light text-fruit-green border-fruit-green/20'
    },
    {
      title: 'SCA Cupping',
      description: 'Quality control, tasting forms, and score tracking.',
      href: '/production/cupping',
      icon: '☕',
      color: 'bg-fruit-plum-light text-fruit-plum border-fruit-plum/20'
    }
  ];

  const handleScanSuccess = (decodedText: string) => {
    // Mock logic to "lookup" the scanned code
    // In reality, this would query your Supabase DB or API
    let mockResult = {
        code: decodedText,
        name: 'Unknown Item',
        client: 'Blend.ie',
        logo: '/globe.svg',
        details: 'No details found for this code.'
    };

    if (decodedText.toLowerCase().includes('star')) {
        mockResult = {
            code: decodedText,
            name: 'Holiday Blend 2026',
            client: 'Starbucks Reserve',
            logo: '/file.svg', // Placeholder for Starbucks Logo
            details: 'Roast Profile: Dark | Origin: Sumatra/Colombia | Notes: Cedar, Spice'
        };
    } else if (decodedText.toLowerCase().includes('blend')) {
        mockResult = {
            code: decodedText,
            name: 'House Espresso',
            client: 'Blend.ie',
            logo: '/globe.svg',
            details: 'Roast Profile: Medium | Origin: Brazil/Eth | Notes: Chocolate, Berry'
        };
    }

    setScannedData(mockResult);
    setShowScanner(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center max-w-5xl mx-auto relative px-4 py-8">
      
      {/* Scanner Overlay */}
      {showScanner && (
        <div className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col items-center justify-center p-6 animate-in fade-in">
            <h2 className="text-2xl font-serif font-bold mb-6 text-fruit-plum">Align QR Code</h2>
            <div className="w-full max-w-sm border-2 border-fruit-plum/30 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 border-[30px] border-black/20 z-10 pointer-events-none"></div>
                <QRScanner 
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={handleScanSuccess}
                />
            </div>
            <button 
                onClick={() => setShowScanner(false)}
                className="mt-8 bg-foreground/10 px-8 py-3 rounded-full text-foreground font-bold hover:bg-foreground/20 transition-colors"
            >
                Cancel
            </button>
        </div>
      )}

      {/* Scanned Result Modal */}
      {scannedData && (
          <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in zoom-in-95">
              <div className="bg-card w-full max-w-md rounded-[var(--radius-lg)] shadow-2xl overflow-hidden border border-fruit-peach/50">
                  {/* Dynamic Header */}
                  <div className={`p-6 flex items-center gap-4 ${scannedData.client === 'Blend.ie' ? 'bg-fruit-plum text-white' : 'bg-green-800 text-white'}`}>
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center p-2 backdrop-blur-sm">
                          {/* Use mock logos or client logos */}
                          <Image src={scannedData.logo} width={24} height={24} alt="Client Logo" className="invert brightness-0" />
                      </div>
                      <div>
                          <h3 className="text-sm uppercase tracking-widest opacity-80">{scannedData.client}</h3>
                          <h2 className="text-xl font-bold font-serif">{scannedData.name}</h2>
                      </div>
                  </div>
                  
                  <div className="p-8">
                      <div className="flex justify-between items-center mb-6 border-b border-border pb-4">
                          <span className="text-xs uppercase tracking-widest text-foreground/50">Batch Code</span>
                          <span className="font-mono text-lg font-bold text-fruit-berry">{scannedData.code}</span>
                      </div>
                      
                      <div className="bg-fruit-green-light/30 p-4 rounded-xl mb-6 border border-fruit-green/10">
                          <h4 className="font-bold mb-2 text-fruit-plum">Product Details</h4>
                          <p className="text-foreground/80">{scannedData.details}</p>
                      </div>

                      <div className="flex gap-3">
                        <button 
                            onClick={() => setScannedData(null)} 
                            className="flex-1 py-3 rounded-xl border border-border hover:bg-black/5 font-bold transition-colors"
                        >
                            Close
                        </button>
                        <button 
                            onClick={() => { alert('Opening production details...'); setScannedData(null); }}
                            className="flex-1 py-3 rounded-xl bg-fruit-plum text-white font-bold hover:bg-fruit-berry transition-colors shadow-lg shadow-fruit-plum/20"
                        >
                            View Production
                        </button>
                      </div>
                  </div>
              </div>
          </div>
      )}

      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-fruit-plum">Roastery OS</h1>
        <p className="text-lg text-foreground/60 mb-8">Select your workspace module or scan a product.</p>
        
        {/* Main Scanner Button */}
        <button 
            onClick={() => setShowScanner(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-fruit-plum text-white rounded-full font-bold text-lg shadow-xl shadow-fruit-plum/30 transition-all hover:scale-105 hover:bg-fruit-berry active:scale-95"
        >
            <span className="text-2xl">📷</span>
            <span>Scan Coffee / Batch</span>
            <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:scale-110 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {modules.map((mod) => (
          <Link 
            key={mod.href} 
            href={mod.href}
            className={`group p-8 rounded-2xl border transition-all hover:scale-[1.02] ${mod.color} bg-white shadow-sm hover:shadow-lg hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl filter drop-shadow-sm">{mod.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold uppercase tracking-widest text-foreground/50">Enter →</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-foreground font-serif">{mod.title}</h2>
            <p className="text-foreground/70">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
