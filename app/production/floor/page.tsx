"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import to avoid SSR issues with DOM-dependent library
const QRScanner = dynamic(() => import('@/components/QRScanner'), { ssr: false });

export default function ProductionFloor() {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Mock Data for Dashboard
  const orders = [
    { id: '#1042', status: 'Pending', items: '2x Ethiopia', time: '10 min ago' },
    { id: '#1041', status: 'In Roast', items: 'Custom Blend A', time: '45 min ago' },
    { id: '#1040', status: 'Ready', items: 'Brazil Santos', time: '2h ago' },
  ];

  const roastQueue = [
    { batch: 'A17-004', coffee: 'Ethiopia Yirgacheffe', weight: '12kg', profile: 'Filter Light' },
    { batch: 'A17-005', coffee: 'Brazil Santos', weight: '20kg', profile: 'Espresso Medium' },
  ];

  const handleScanSuccess = (decodedText: string) => {
    setScanResult(decodedText);
    setShowScanner(false);
    alert(`Batch Scanned: ${decodedText}\nProcessing status updated to: 'In Production'`);
    // In real app: Call API to update status
  };

  const handlePrint = (orderId: string) => {
    // Mock Print
    const confirm = window.confirm(`Send print job for Order ${orderId} to Printer A?`);
    if (confirm) {
        // Here we would call the upload API with a 'print job' JSON
        alert(`Label sent to Printer A for ${orderId}`);
    }
  };

  return (
    <div className="font-sans text-foreground h-full relative">
      
      {/* Scanner Overlay */}
      {showScanner && (
        <div className="fixed inset-0 z-[60] bg-black/90 flex flex-col items-center justify-center p-4">
            <h2 className="text-xl font-bold mb-4 text-white">Scan Batch QR Code</h2>
            <QRScanner 
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={handleScanSuccess}
            />
            <button 
                onClick={() => setShowScanner(false)}
                className="mt-6 bg-white/10 px-6 py-3 rounded-full text-white font-bold"
            >
                Cancel Scan
            </button>
        </div>
      )}

      <header className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-3xl font-serif font-bold mb-1 text-fruit-plum">Production Floor</h1>
            <p className="opacity-50 text-xs uppercase tracking-widest text-foreground">Tuesday, Jan 14 • Shift A</p>
        </div>
        <button 
            onClick={() => setShowScanner(true)}
            className="bg-fruit-green text-white font-bold px-6 py-3 rounded-full hover:bg-fruit-green/80 transition-colors flex items-center gap-2 shadow-lg shadow-fruit-green/20"
        >
            <span>📷</span> Scan Batch QR
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Orders In */}
        <div className="card-soft">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-fruit-green">Orders In (3)</h3>
            <div className="space-y-3">
                {orders.map(order => (
                    <div key={order.id} className="bg-fruit-plum/5 p-4 rounded-lg border border-fruit-plum/10 hover:border-fruit-plum/30 transition-colors cursor-pointer">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-foreground">{order.id}</span>
                            <span className="text-xs opacity-50 text-foreground">{order.time}</span>
                        </div>
                        <p className="text-sm opacity-80 text-foreground">{order.items}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-[10px] bg-white px-2 py-0.5 rounded text-foreground/60 border border-border-color">{order.status}</span>
                            <button 
                                onClick={(e) => { e.stopPropagation(); handlePrint(order.id); }}
                                className="text-[10px] text-fruit-plum hover:underline font-bold"
                            >
                                Print Label →
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Column 2: Roast Queue */}
        <div className="card-soft">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-fruit-berry">Roast Queue</h3>
            <div className="space-y-3">
                {roastQueue.map(item => (
                    <div key={item.batch} className="bg-fruit-berry/5 p-4 rounded-lg border border-fruit-berry/10 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-fruit-berry">{item.batch}</span>
                            <span className="font-bold text-lg text-foreground">{item.weight}</span>
                        </div>
                        <h4 className="font-serif text-lg leading-tight text-foreground">{item.coffee}</h4>
                        <p className="text-xs opacity-50 text-foreground">{item.profile}</p>
                        <button className="w-full mt-2 bg-fruit-berry/10 text-fruit-berry py-2 rounded text-xs font-bold hover:bg-fruit-berry/20">Start Roast</button>
                    </div>
                ))}
            </div>
        </div>

        {/* Column 3: Stats & Logs */}
        <div className="space-y-6">
            <div className="card-soft">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-foreground/70">Daily Output</h3>
                <div className="text-5xl font-mono font-bold mb-1 text-fruit-plum">48.5<span className="text-xl opacity-50">kg</span></div>
                <p className="text-xs opacity-50 text-foreground">Target: 120kg</p>
                <div className="w-full h-2 bg-black/5 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-fruit-green w-[40%]" />
                </div>
            </div>

            <div className="card-soft border-red-200 bg-red-50">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-red-800">Inventory Alert</h3>
                <div className="flex items-center gap-3 text-red-600 bg-white p-3 rounded-lg border border-red-100 shadow-sm">
                    <span className="text-xl">⚠️</span>
                    <div className="text-sm">
                        <span className="font-bold block">Colombia Supremo</span>
                        <span className="opacity-80">Low Stock (12kg remaining)</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
