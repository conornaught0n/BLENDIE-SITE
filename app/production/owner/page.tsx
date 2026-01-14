"use client";

import React from 'react';

export default function OwnerDashboard() {
  // Mock Data "Scraped" from Backend/Firescope
  const productionStats = {
    weeklyRoastTarget: 1200, // kg
    currentRoast: 850, // kg
    pendingOrders: 14,
    revenueToday: 3450.00,
  };

  const actionItems = [
    { priority: 'High', task: 'Approve Green Coffee Order #402', type: 'Purchasing' },
    { priority: 'Medium', task: 'Review QA Scores for Batch A17-004', type: 'Quality' },
    { priority: 'Low', task: 'Update Pricing for Seasonal Blend', type: 'Admin' },
  ];

  const roastRequirements = [
    { coffee: 'Ethiopia Yirgacheffe', required: 45, onHand: 120, status: 'OK' },
    { coffee: 'Brazil Santos', required: 80, onHand: 60, status: 'Low' },
    { coffee: 'Colombia Supremo', required: 30, onHand: 200, status: 'OK' },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-serif font-bold text-white mb-2">Owner's Command Center</h1>
        <p className="text-white/60 text-sm">Overview of operations, financials, and critical alerts.</p>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Weekly Roast Output" value={`${productionStats.currentRoast}kg`} subtext={`Target: ${productionStats.weeklyRoastTarget}kg`} progress={(productionStats.currentRoast / productionStats.weeklyRoastTarget) * 100} />
        <KPICard title="Revenue (Today)" value={`$${productionStats.revenueToday.toLocaleString()}`} subtext="+12% vs last week" color="text-green-400" />
        <KPICard title="Pending Orders" value={productionStats.pendingOrders} subtext="Requires scheduling" color="text-orange-400" />
        <KPICard title="System Status" value="Online" subtext="Firescope Sync Active" color="text-blue-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Action Items */}
        <div className="glass-panel p-6 rounded-xl border border-white/10">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span>⚡</span> Action Items
          </h3>
          <div className="space-y-4">
            {actionItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/5 hover:border-white/20 transition-all">
                <div>
                  <h4 className="font-bold text-white">{item.task}</h4>
                  <span className="text-xs text-white/50 uppercase tracking-widest">{item.type}</span>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-bold ${
                  item.priority === 'High' ? 'bg-red-500/20 text-red-400' : 
                  item.priority === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Roast Planning (Scraped Info) */}
        <div className="glass-panel p-6 rounded-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span>🔥</span> Roast Requirements
            </h3>
            <span className="text-[10px] bg-green-900/40 text-green-400 px-2 py-1 rounded border border-green-500/20">Synced from Firescope</span>
          </div>
          
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="pb-3 font-normal uppercase tracking-widest text-xs">Coffee</th>
                <th className="pb-3 font-normal uppercase tracking-widest text-xs text-right">Required</th>
                <th className="pb-3 font-normal uppercase tracking-widest text-xs text-right">Stock</th>
                <th className="pb-3 font-normal uppercase tracking-widest text-xs text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {roastRequirements.map((row, idx) => (
                <tr key={idx} className="group hover:bg-white/5">
                  <td className="py-4 font-bold text-white">{row.coffee}</td>
                  <td className="py-4 text-right font-mono text-white/80">{row.required}kg</td>
                  <td className="py-4 text-right font-mono text-white/60">{row.onHand}kg</td>
                  <td className="py-4 text-right">
                    <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold ${
                      row.status === 'Low' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="w-full mt-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold text-white transition-colors">
            Generate Roast Schedule
          </button>
        </div>

      </div>
    </div>
  );
}

function KPICard({ title, value, subtext, progress, color = "text-white" }: any) {
  return (
    <div className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col justify-between h-32 relative overflow-hidden group hover:border-white/20 transition-all">
      <div>
        <h3 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-1">{title}</h3>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
      </div>
      <div className="text-xs text-white/40 font-mono mt-2">{subtext}</div>
      {progress !== undefined && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
          <div className="h-full bg-green-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}
