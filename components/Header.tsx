"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Cart } from './Cart';
import { useBlendStore } from '@/store/blend-store';

interface NavLinkProps {
  href: string;
  label: string;
  mobile?: boolean;
  pathname: string | null;
  onClick: () => void;
}

const NavLink = ({ href, label, mobile = false, pathname, onClick }: NavLinkProps) => {
  const isActive = pathname?.startsWith(href.replace(/\/$/, ''));
  const linkHref = href;
  
  const baseClass = mobile 
    ? "text-3xl font-serif font-bold text-foreground hover:text-fruit-berry transition-colors py-4 block w-full" 
    : `text-sm uppercase tracking-widest font-bold font-sans transition-colors hover:text-fruit-berry ${isActive ? 'text-fruit-berry underline underline-offset-4' : 'text-foreground/60'}`;

  return (
    <Link 
      href={linkHref}
      onClick={onClick}
      className={baseClass}
    >
      {label}
    </Link>
  );
};

export const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useBlendStore();
  
  // Marketing A/B Logic
  useEffect(() => {
     const checkMarketing = async () => {
        try {
             if (typeof document !== 'undefined' && !document.cookie.includes('marketing_variant')) {
                 const variant = Math.random() > 0.5 ? 'A' : 'B';
                 document.cookie = `marketing_variant=${variant}; path=/; max-age=86400`;
             }
        } catch (e) {
            console.error(e);
        }
     };
     checkMarketing();
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      
      {/* Fixed Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-4 flex justify-between items-center bg-background/90 backdrop-blur-md border-b border-black/5 transition-all">
        
        {/* Logo */}
        <div className="flex-1 md:flex-none md:w-1/3 flex justify-start md:justify-center">
          <Link href="/" className="group relative h-12 flex items-center" onClick={closeMenu}>
            <span className="font-serif text-3xl font-bold tracking-tight text-fruit-plum group-hover:text-fruit-berry transition-colors">
              blend.ie
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center justify-center w-1/3">
          <NavLink href="/shop/" label="Shop" pathname={pathname} onClick={closeMenu} />
          <NavLink href="/portfolio/" label="Portfolio" pathname={pathname} onClick={closeMenu} />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex gap-6 items-center justify-end w-1/3">
           <NavLink href="/production/" label="OS" pathname={pathname} onClick={closeMenu} />
           <button 
             onClick={() => setIsCartOpen(true)}
             className="text-sm uppercase tracking-widest font-bold font-sans text-foreground hover:text-fruit-berry"
           >
             Cart ({cart.items.length})
           </button>
        </div>

        {/* Mobile Menu Trigger (Radix Dialog) */}
        <div className="md:hidden">
          <Dialog.Root open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <Dialog.Trigger asChild>
              <button 
                className="text-foreground w-10 h-10 flex items-center justify-end z-50 p-2"
                aria-label="Toggle Menu"
              >
                <div className="space-y-1.5 w-6">
                  <span className="block w-full h-0.5 bg-current"></span>
                  <span className="block w-full h-0.5 bg-current"></span>
                  <span className="block w-2/3 h-0.5 bg-current ml-auto"></span>
                </div>
              </button>
            </Dialog.Trigger>
            
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
              <Dialog.Content className="fixed inset-0 z-[70] bg-background flex flex-col justify-center items-center data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top duration-300">
                <Dialog.Title className="sr-only">Mobile Menu</Dialog.Title>
                
                <Dialog.Close asChild>
                  <button 
                    className="absolute top-4 right-6 w-10 h-10 flex items-center justify-center p-2 text-foreground"
                    aria-label="Close Menu"
                  >
                    <span className="font-serif text-2xl">✕</span>
                  </button>
                </Dialog.Close>

                <nav className="flex flex-col gap-2 text-center w-full px-8">
                  <NavLink href="/" label="Home" mobile pathname={pathname} onClick={closeMenu} />
                  <NavLink href="/shop/" label="Shop Coffees" mobile pathname={pathname} onClick={closeMenu} />
                  <NavLink href="/portfolio/" label="My Portfolio" mobile pathname={pathname} onClick={closeMenu} />
                  <NavLink href="/configurator/" label="Design Bag" mobile pathname={pathname} onClick={closeMenu} />
                  <NavLink href="/production/" label="Production OS" mobile pathname={pathname} onClick={closeMenu} />
                  <button 
                    onClick={() => { closeMenu(); setIsCartOpen(true); }}
                    className="text-3xl font-serif font-bold text-foreground hover:text-fruit-berry transition-colors py-4 block w-full"
                  >
                    Cart ({cart.items.length})
                  </button>
                </nav>

                <div className="absolute bottom-12 text-center opacity-40 text-xs uppercase tracking-widest font-sans">
                  <p>Dublin, Ireland</p>
                  <p>© 2026 Blendie</p>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </header>
    </>
  );
};
