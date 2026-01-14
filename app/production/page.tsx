import React from 'react';

export default function ProductionDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Production Overview</h1>
          <p className="text-white/50 text-sm">Tuesday, Jan 13 • Shift A</p>
        </div>
        <button className="glass-btn text-sm">+ Scan Batch</button>
      </header>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <KPICard title="Total Orders" value="42" change="+12%" />
        <KPICard title="To Roast (kg)" value="128.5" change="High" highlight />
        <KPICard title="Pending QC" value="8" change="-2" />
        <KPICard title="Shipped" value="34" change="+5" />
      </div>

      {/* Live Production Queue */}
      <div className="glass-panel rounded-2xl p-6">
        <h2 className="mb-4 text-lg font-semibold">Live Roast Queue</h2>
        <div className="space-y-3">
          <QueueItem batch="A17-001" blend="Signature House" weight="12kg" status="Roasting" time="04:20" />
          <QueueItem batch="A17-002" blend="Ethiopia Single" weight="8kg" status="Queued" />
          <QueueItem batch="A17-003" blend="Espresso Dark" weight="15kg" status="Queued" />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inventory Alert */}
        <div className="glass-panel rounded-2xl p-6">
           <h2 className="mb-4 text-lg font-semibold text-red-300">Inventory Alerts</h2>
           <div className="space-y-2">
             <div className="flex justify-between items-center text-sm p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
               <span>Green Bean: Colombia Supremo</span>
               <span className="font-bold text-red-400">Low (15kg)</span>
             </div>
           </div>
        </div>

         {/* Scanner Shortcut */}
         <div className="glass-panel rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/10 transition-colors border-dashed border-2 border-white/20">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="font-bold">Open Scanner</h3>
            <p className="text-xs text-white/50">Traceability & QC Entry</p>
         </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, highlight }: any) {
  return (
    <div className={`glass-card p-4 ${highlight ? 'bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/30' : ''}`}>
      <p className="text-xs font-medium text-white/60 uppercase tracking-wide">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={`text-xs ${change.includes('+') ? 'text-green-400' : change.includes('-') ? 'text-red-400' : 'text-white/40'}`}>
          {change}
        </span>
      </div>
    </div>
  );
}

function QueueItem({ batch, blend, weight, status, time }: any) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-white/5 p-3 hover:bg-white/10 transition-colors border border-white/5">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold font-mono">
          {batch.split('-')[1]}
        </div>
        <div>
          <h4 className="font-medium text-white">{blend}</h4>
          <p className="text-xs text-white/50">{batch} • {weight}</p>
        </div>
      </div>
      <div className="text-right">
        <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase ${
          status === 'Roasting' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse' : 'bg-white/10 text-white/60'
        }`}>
          {status}
        </span>
        {time && <p className="text-xs text-white/40 mt-1 font-mono">{time} rem</p>}
      </div>
    </div>
  );
}
