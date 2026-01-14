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
        className={`text-3xl md:text-5xl font-bold tracking-tight transition-colors hover:text-[#D4AF37] ${isActive ? 'text-black' : 'text-gray-400'}`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Floating Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        {/* Logo */}
        <Link href="/" className="pointer-events-auto bg-white/80 backdrop-blur-md rounded-full px-6 py-2 shadow-sm border border-black/5 hover:scale-105 transition-transform">
          <span className="font-black tracking-tighter text-xl">BLENDIE</span>
        </Link>

        {/* Menu Trigger */}
        <button 
          onClick={toggleMenu}
          className="pointer-events-auto bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 z-50"
        >
          {isOpen ? (
            <span className="text-xl">✕</span>
          ) : (
            <div className="space-y-1">
              <span className="block w-5 h-0.5 bg-white"></span>
              <span className="block w-5 h-0.5 bg-white"></span>
            </div>
          )}
        </button>
      </header>

      {/* Full Screen Overlay Menu */}
      <div className={`fixed inset-0 bg-[#F5F5F4] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        
        {/* Navigation Links */}
        <nav className="flex flex-col gap-8 text-center">
          <NavLink href="/" label="Home" />
          <NavLink href="/shop" label="Shop Coffees" />
          <NavLink href="/portfolio" label="My Portfolio" />
          <NavLink href="/blend" label="Blend Builder" />
          <div className="w-12 h-px bg-black/10 mx-auto my-4" />
          <NavLink href="/production" label="Production OS" />
        </nav>

        {/* Footer Info in Menu */}
        <div className="absolute bottom-12 text-center opacity-40 text-sm">
          <p>Dublin, Ireland</p>
          <p>© 2026 Blendie</p>
        </div>

      </div>
    </>
  );
};
