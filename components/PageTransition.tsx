"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'; 
import { useContext, useRef } from 'react';

// Animation wrapper for page transitions
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Define transition directions based on route hierarchy
  // Home -> Shop -> Portfolio -> Blend -> Configurator -> Checkout
  const getDepth = (path: string) => {
    if (path === '/') return 0;
    if (path.includes('/shop')) return 1;
    if (path.includes('/portfolio')) return 2;
    if (path.includes('/blend')) return 3;
    if (path.includes('/production')) return 99;
    return 0;
  };

  const depth = getDepth(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
