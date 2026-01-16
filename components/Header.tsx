"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Cart } from './Cart';
import { useBlendStore } from '@/store/blend-store';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useBlendStore();
  
  // Marketing A/B Logic
  useEffect(() => {
     // Fetch marketing data (mocking the fetch for now as the API endpoint is not set up)
     // Ideally this calls /api/marketing which uses lib/google-sheets
     // For this task, we assume the API exists or we mock the cookie setting here for verification
     const checkMarketing = async () => {
        try {
             // In a real scenario:
             // const res = await fetch('/api/marketing');
             // const data = await res.json();
             // But since we just created lib/google-sheets and haven't hooked it to an API route yet...
             // Let's create the API route after this.
             
             // Placeholder for now:
             if (!document.cookie.includes('marketing_variant')) {
                 // Randomly assign A or B if not present (simulating server assignment)
                 const variant = Math.random() > 0.5 ? 'A' : 'B';
                 document.cookie = `marketing_variant=${variant}; path=/; max-age=86400`;
             }
        } catch (e) {
            console.error(e);
        }
     };
     checkMarketing();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const NavLink = ({ href, label, mobile = false }: { href: string; label: string; mobile?: boolean }) => {
    const isActive = pathname?.startsWith(href.replace(/\/$/, ''));
    const linkHref = href;
    
    const baseClass = mobile 
      ? "text-3xl font-serif font-bold text-foreground hover:text-fruit-berry transition-colors py-4 block w-full" 
      : `text-sm uppercase tracking-widest font-bold font-sans transition-colors hover:text-fruit-berry ${isActive ? 'text-fruit-berry underline underline-offset-4' : 'text-foreground/60'}`;

    return (
      <Link 
        href={linkHref}
        onClick={(e) => {
            setIsOpen(false);
        }}
        className={baseClass}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-black/5 transition-all">
        
        {/* Logo */}
        <div className="flex-1 md:flex-none md:w-1/3 flex justify-start md:justify-center">
          <Link href="/" className="group relative h-12 flex items-center">
            <span className="font-serif text-3xl font-bold tracking-tight text-fruit-plum group-hover:text-fruit-berry transition-colors">
              blend.ie
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center justify-center w-1/3">
          <NavLink href="/shop/" label="Shop" />
          <NavLink href="/portfolio/" label="Portfolio" />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-6 items-center justify-end w-1/3">
           <NavLink href="/production/" label="OS" />
           <button 
             onClick={() => setIsCartOpen(true)}
             className="text-sm uppercase tracking-widest font-bold font-sans text-foreground hover:text-fruit-berry"
           >
             Cart ({cart.items.length})
           </button>
        </div>

        {/* Mobile Menu Trigger */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-foreground w-10 h-10 flex items-center justify-end z-50 p-2"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <span className="font-serif text-2xl">✕</span>
          ) : (
            <div className="space-y-1.5 w-6">
              <span className="block w-full h-0.5 bg-current"></span>
              <span className="block w-full h-0.5 bg-current"></span>
              <span className="block w-2/3 h-0.5 bg-current ml-auto"></span>
            </div>
          )}
        </button>
      </header>

      {/* Mobile Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-background z-40 flex flex-col justify-center items-center transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'}`}
      >
        <nav className="flex flex-col gap-2 text-center w-full px-8">
          <NavLink href="/" label="Home" mobile />
          <NavLink href="/shop/" label="Shop Coffees" mobile />
          <NavLink href="/portfolio/" label="My Portfolio" mobile />
          <NavLink href="/configurator/" label="Design Bag" mobile />
          <NavLink href="/production/" label="Production OS" mobile />
          <button 
            onClick={() => { setIsOpen(false); setIsCartOpen(true); }}
            className="text-3xl font-serif font-bold text-foreground hover:text-fruit-berry transition-colors py-4 block w-full"
          >
            Cart ({cart.items.length})
          </button>
        </nav>

        <div className="absolute bottom-12 text-center opacity-40 text-xs uppercase tracking-widest font-sans">
          <p>Dublin, Ireland</p>
          <p>© 2026 Blendie</p>
        </div>
      </div>
    </>
  );
};
