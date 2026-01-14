"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    const isActive = pathname === href;
    const baseClass = mobile 
      ? "text-3xl font-serif font-bold text-foreground" 
      : `text-sm uppercase tracking-widest font-bold font-sans transition-colors hover:text-coffee-brown ${isActive ? 'text-coffee-brown underline underline-offset-4' : 'text-foreground/60'}`;

    return (
      <Link 
        href={href} 
        onClick={() => setIsOpen(false)}
        className={baseClass}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-black/5 transition-all">
        
        {/* Desktop Navigation (Left) */}
        <nav className="hidden md:flex gap-8 items-center w-1/3">
          <NavLink href="/shop" label="Shop" />
          <NavLink href="/portfolio" label="Portfolio" />
        </nav>

        {/* Logo (Center) */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="group relative">
            <span className="font-serif text-4xl tracking-tight text-foreground font-bold lowercase group-hover:text-coffee-brown transition-colors">
              blend.ie
            </span>
          </Link>
        </div>

        {/* Desktop Actions (Right) */}
        <div className="hidden md:flex gap-6 items-center justify-end w-1/3">
           <NavLink href="/production" label="OS" />
           <button className="text-sm uppercase tracking-widest font-bold font-sans text-foreground hover:text-coffee-brown">
             Cart (0)
           </button>
        </div>

        {/* Mobile Menu Trigger (Right) */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-foreground w-10 h-10 flex items-center justify-center"
        >
          {isOpen ? <span className="font-serif text-xl">✕</span> : <span className="font-serif text-xl">☰</span>}
        </button>
      </header>

      {/* Mobile Overlay Menu */}
      <div className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center transition-all duration-500 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <nav className="flex flex-col gap-8 text-center">
          <NavLink href="/" label="Home" mobile />
          <NavLink href="/shop" label="Shop" mobile />
          <NavLink href="/portfolio" label="Portfolio" mobile />
          <NavLink href="/production" label="Production OS" mobile />
        </nav>
      </div>
    </>
  );
};
