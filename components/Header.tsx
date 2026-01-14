"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;
    return (
      <Link 
        href={href} 
        onClick={() => setIsOpen(false)}
        className={`text-3xl md:text-5xl font-serif font-medium tracking-tight transition-colors hover:text-accent-gold ${isActive ? 'text-foreground' : 'text-gray-400'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Fixed Header Bar - Minimalist & Non-Intrusive */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-start pointer-events-none">
        
        {/* Logo - Boutique Style */}
        <Link href="/" className="pointer-events-auto group">
          <div className="bg-background/90 backdrop-blur-sm px-4 py-2 border border-border-color shadow-sm transition-all group-hover:border-accent-gold">
            <span className="font-serif text-2xl tracking-widest text-foreground font-medium group-hover:text-accent-gold transition-colors">
              B L E N D I E
            </span>
            <span className="block text-[8px] uppercase tracking-[0.3em] text-center opacity-60 mt-1">
              EST. 2026
            </span>
          </div>
        </Link>

        {/* Menu Trigger - Clean */}
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto bg-background text-foreground border border-border-color w-12 h-12 flex items-center justify-center hover:bg-foreground hover:text-background transition-colors shadow-sm"
        >
          {isOpen ? (
            <span className="font-serif text-xl">✕</span>
          ) : (
            <div className="space-y-1.5 w-6">
              <span className="block w-full h-px bg-current"></span>
              <span className="block w-full h-px bg-current"></span>
            </div>
          )}
        </button>
      </header>

      {/* Full Screen Overlay Menu */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible pointer-events-none'}`}>
        
        <nav className="flex flex-col gap-8 text-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/shop" label="Shop Coffees" />
          <NavLink href="/portfolio" label="My Portfolio" />
          <NavLink href="/blend" label="Blend Builder" />
          <div className="w-12 h-px bg-border-color mx-auto my-4" />
          <NavLink href="/production" label="Production OS" />
        </nav>

        <div className="absolute bottom-12 text-center opacity-40 text-xs uppercase tracking-widest font-sans">
          <p>Dublin, Ireland</p>
          <p>© 2026 Blendie</p>
        </div>

      </div>
    </>
  );
};
