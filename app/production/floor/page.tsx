"use client";

import React, { useState } from 'react';

export default function ProductionFloor() {
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

  return (
    <div className="font-sans text-white h-full">
      <header className="flex justify-between items-end mb-8">
        <div>
            <h1 className="text-3xl font-serif font-bold mb-1">Production Floor</h1>
            <p className="opacity-50 text-xs uppercase tracking-widest">Tuesday, Jan 14 • Shift A</p>
        </div>
        <button className="bg-green-600 text-black font-bold px-6 py-3 rounded-full hover:bg-green-500 transition-colors flex items-center gap-2">
            <span>📷</span> Scan Batch QR
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Orders In */}
        <div className="glass-panel p-6 rounded-xl border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-green-400">Orders In (3)</h3>
            <div className="space-y-3">
                {orders.map(order => (
                    <div key={order.id} className="bg-white/5 p-4 rounded-lg border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold">{order.id}</span>
                            <span className="text-xs opacity-50">{order.time}</span>
                        </div>
                        <p className="text-sm opacity-80">{order.items}</p>
                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/60">{order.status}</span>
                            <button className="text-[10px] text-green-400 hover:underline">Print Label →</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Column 2: Roast Queue */}
        <div className="glass-panel p-6 rounded-xl border border-white/10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-orange-400">Roast Queue</h3>
            <div className="space-y-3">
                {roastQueue.map(item => (
                    <div key={item.batch} className="bg-white/5 p-4 rounded-lg border border-white/5 flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <span className="font-mono text-xs text-orange-400">{item.batch}</span>
                            <span className="font-bold text-lg">{item.weight}</span>
                        </div>
                        <h4 className="font-serif text-lg leading-tight">{item.coffee}</h4>
                        <p className="text-xs opacity-50">{item.profile}</p>
                        <button className="w-full mt-2 bg-orange-500/20 text-orange-300 py-2 rounded text-xs font-bold hover:bg-orange-500/30">Start Roast</button>
                    </div>
                ))}
            </div>
        </div>

        {/* Column 3: Stats & Logs */}
        <div className="space-y-6">
            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Daily Output</h3>
                <div className="text-5xl font-mono font-bold mb-1">48.5<span className="text-xl opacity-50">kg</span></div>
                <p className="text-xs opacity-50">Target: 120kg</p>
                <div className="w-full h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
                    <div className="h-full bg-green-500 w-[40%]" />
                </div>
            </div>

            <div className="glass-panel p-6 rounded-xl border border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Inventory Alert</h3>
                <div className="flex items-center gap-3 text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/20">
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
