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
        className={`text-3xl md:text-5xl font-serif font-medium tracking-tight transition-colors hover:text-accent-gold ${isActive ? 'text-black' : 'text-gray-400'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Fixed Header Bar - Clean White Background */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center pointer-events-none bg-white/90 backdrop-blur-sm border-b border-black/5">
        
        {/* Logo - Simple Serif */}
        <Link href="/" className="pointer-events-auto">
          <span className="font-serif text-3xl tracking-tight text-black font-bold">
            Blendie.
          </span>
        </Link>

        {/* Menu Trigger */}
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto text-black w-12 h-12 flex items-center justify-center hover:bg-black/5 rounded-full transition-colors"
        >
          {isOpen ? (
            <span className="font-serif text-xl">✕</span>
          ) : (
            <span className="font-serif text-sm uppercase tracking-widest">Menu</span>
          )}
        </button>
      </header>

      {/* Full Screen Overlay Menu */}
      <div className={`fixed inset-0 bg-white z-40 flex flex-col justify-center items-center transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${isOpen ? 'translate-y-0 opacity-100 visible' : '-translate-y-full opacity-0 invisible pointer-events-none'}`}>
        
        <nav className="flex flex-col gap-8 text-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/shop" label="Shop Coffees" />
          <NavLink href="/portfolio" label="My Portfolio" />
          <div className="w-12 h-px bg-black/10 mx-auto my-4" />
          <NavLink href="/production" label="Production OS" />
        </nav>

        <div className="absolute bottom-12 text-center opacity-40 text-xs uppercase tracking-widest font-sans">
          <p>© 2026 Blendie</p>
        </div>

      </div>
    </>
  );
};
