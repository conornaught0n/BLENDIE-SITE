"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Link wrapper to ensure menu closes and handles .html logic
  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    // Active check handles both /path and /path/
    const isActive = pathname?.startsWith(href.replace(/\/$/, '')) || pathname?.startsWith(href.replace('.html', ''));
    
    const baseClass = mobile 
      ? "text-3xl font-serif font-bold text-foreground hover:text-fruit-berry transition-colors py-2 block" 
      : `text-sm uppercase tracking-widest font-bold font-sans transition-colors hover:text-fruit-berry ${isActive ? 'text-fruit-berry underline underline-offset-4' : 'text-foreground/60'}`;

    return (
      <a 
        href={href} 
        onClick={() => setIsOpen(false)} // CRITICAL: Close menu on click
        className={baseClass}
      >
        {label}
      </a>
    );
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-black/5 transition-all">
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center w-1/3">
          <NavLink href="/shop/" label="Shop" />
          <NavLink href="/portfolio/" label="Portfolio" />
        </nav>

        {/* Logo */}
        <div className="w-1/3 flex justify-start md:justify-center">
          <a href="/" className="group relative h-12 flex items-center">
            <span className="font-serif text-3xl font-bold tracking-tight text-fruit-plum group-hover:text-fruit-berry transition-colors">
              blend.ie
            </span>
          </a>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-6 items-center justify-end w-1/3">
           <NavLink href="/production/" label="OS" />
           <button className="text-sm uppercase tracking-widest font-bold font-sans text-foreground hover:text-fruit-berry">
             Cart (0)
           </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-foreground w-10 h-10 flex items-center justify-end z-50"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <span className="font-serif text-2xl">✕</span>
          ) : (
            <div className="space-y-1.5">
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-6 h-0.5 bg-current"></span>
                <span className="block w-4 h-0.5 bg-current ml-auto"></span>
            </div>
          )}
        </button>
      </header>

      {/* Mobile Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}`}
      >
        <nav className="flex flex-col gap-6 text-center">
          <NavLink href="/" label="Home" mobile />
          <NavLink href="/shop/" label="Shop Coffees" mobile />
          <NavLink href="/portfolio/" label="My Portfolio" mobile />
          <NavLink href="/blend/" label="Blend Builder" mobile />
          <NavLink href="/configurator/" label="Design Bag" mobile />
          <NavLink href="/production/" label="Production OS" mobile />
        </nav>

        <div className="absolute bottom-12 text-center opacity-40 text-xs uppercase tracking-widest font-sans">
          <p>Dublin, Ireland</p>
          <p>© 2026 Blendie</p>
        </div>
      </div>
    </>
  );
};
