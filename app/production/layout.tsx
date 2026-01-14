"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProductionAuth from '@/components/ProductionAuth';

export default function ProductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const links = [
    { href: '/production', label: 'Home' },
    { href: '/production/owner', label: 'Owner Dashboard' },
    { href: '/production/floor', label: 'Production Floor' },
    { href: '/production/orders', label: 'Orders' },
    { href: '/production/cupping', label: 'Cupping' },
  ];

  return (
    <ProductionAuth>
        <div className="flex min-h-screen flex-col md:flex-row text-white bg-black">
        {/* Mobile-First Sidebar / Navigation */}
        <nav className="glass-panel sticky top-0 z-50 flex h-16 w-full items-center justify-between px-6 md:h-screen md:w-64 md:flex-col md:justify-start md:border-r md:border-b-0 md:pt-8 bg-black/40 border-white/10">
            <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-green-500 to-emerald-800" />
            <span className="font-bold tracking-wider text-lg font-mono">OS 2026</span>
            </div>

            <div className="hidden md:mt-10 md:flex md:w-full md:flex-col md:gap-2">
                {links.map(link => (
                    <NavLink key={link.href} href={link.href} label={link.label} active={pathname === link.href} />
                ))}
            </div>

            {/* Mobile Menu Icon (Placeholder) */}
            <button className="md:hidden glass-btn p-2 border-white/20">
            <span className="block h-0.5 w-6 bg-white mb-1"></span>
            <span className="block h-0.5 w-6 bg-white mb-1"></span>
            <span className="block h-0.5 w-6 bg-white"></span>
            </button>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
            {children}
        </main>
        </div>
    </ProductionAuth>
  );
}

function NavLink({ href, label, active }: { href: string; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
        active 
          ? 'bg-white/10 text-white shadow-lg border border-white/5' 
          : 'text-white/60 hover:bg-white/5 hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
