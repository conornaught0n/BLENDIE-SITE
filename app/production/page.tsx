import React from 'react';
import Link from 'next/link';

export default function ProductionLanding() {
  const modules = [
    {
      title: 'Owner Dashboard',
      description: 'Business overview, sales analytics, and inventory value.',
      href: '/production/owner',
      icon: '📊',
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Production Floor',
      description: 'Roast schedule, batch tracking, and printing station.',
      href: '/production/floor',
      icon: '🔥',
      color: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
    },
    {
      title: 'Order Management',
      description: 'Track orders, shipping labels, and fulfillment.',
      href: '/production/orders',
      icon: '📦',
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    },
    {
      title: 'SCA Cupping',
      description: 'Quality control, tasting forms, and score tracking.',
      href: '/production/cupping',
      icon: '☕',
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
  ];

  return (
    <div className="h-full flex flex-col justify-center max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-fruit-plum">Roastery OS</h1>
        <p className="text-lg text-foreground/60">Select your workspace module.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modules.map((mod) => (
          <Link 
            key={mod.href} 
            href={mod.href}
            className={`group p-8 rounded-2xl border transition-all hover:scale-[1.02] ${mod.color} border-opacity-50 hover:bg-opacity-30 bg-white shadow-sm hover:shadow-md`}
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-4xl">{mod.icon}</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-bold uppercase tracking-widest text-fruit-plum">Enter →</span>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-foreground">{mod.title}</h2>
            <p className="text-foreground/70">{mod.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
