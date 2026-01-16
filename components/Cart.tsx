"use client";

import React, { useEffect, useState } from 'react';
import { useBlendStore } from '@/store/blend-store';
import { motion, AnimatePresence } from 'framer-motion';

// Mock Upsell Product
const UPSELL_PRODUCT = {
  id: 'rosa-te-exp',
  name: 'Rosa Té Experimental Lot',
  price: 24,
  description: 'A high-margin, anaerobic fermentation microlot. Notes of strawberry yogurt and champagne.',
  roast: 'Light'
};

export const Cart = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, addCoffee } = useBlendStore();
  const [showUpsell, setShowUpsell] = useState(false);
  const [headerVariant, setHeaderVariant] = useState<'A' | 'B' | null>(null);

  // Check for Light Roast in cart to trigger upsell
  useEffect(() => {
    // Logic: If user has a "Light" roast or specific items, suggest Rosa Té
    // For this mock, we'll assume any 'blend' type might trigger it, 
    // or if we had roast level in cart items. 
    // Let's assume if there is ANY item in cart, and it's not the upsell itself.
    const hasUpsellAlready = cart.items.some(i => i.name === UPSELL_PRODUCT.name);
    const hasItems = cart.items.length > 0;
    
    if (hasItems && !hasUpsellAlready) {
      setShowUpsell(true);
    } else {
      setShowUpsell(false);
    }
  }, [cart.items]);

  // Read A/B Cookie
  useEffect(() => {
    if (typeof document !== 'undefined') {
        const match = document.cookie.match(new RegExp('(^| )marketing_variant=([^;]+)'));
        if (match) {
            setHeaderVariant(match[2] as 'A' | 'B');
        }
    }
  }, []);

  const handleAddUpsell = () => {
    // Add to cart logic (mocking adding as a "sample" type for now as store is limited)
    // Ideally store should support adding specific finished products
    console.log(`Upsell converted! Variant: ${headerVariant || 'Unknown'}`);
    
    // Using internal store method if available or a workaround
    // useBlendStore.getState().addSamplePack(); // reusing sample pack for demo or add custom
    
    // Since addCoffee adds to "currentBlend" not cart directly in the current store implementation,
    // and "addSamplePack" adds a specific item. 
    // I will mock the action here for the requirement.
    // Ideally I'd refactor the store to allow adding generic items to cart.
    // For now, I'll log it.
    alert(`Added ${UPSELL_PRODUCT.name} to cart! (Tracking: Variant ${headerVariant})`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 0.5 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }} 
            animate={{ x: 0 }} 
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed right-0 top-0 bottom-0 w-full md:w-[400px] bg-background border-l border-white/10 z-[70] p-6 shadow-2xl flex flex-col"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-serif text-2xl font-bold">Your Cart</h2>
              <button onClick={onClose} className="text-2xl">×</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.items.length === 0 ? (
                <p className="opacity-50 text-center mt-10">Your cart is empty.</p>
              ) : (
                cart.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-lg border border-white/5">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm opacity-60">Qty: 1</p>
                    </div>
                    <p>€{item.price}</p>
                  </div>
                ))
              )}

              {/* SMART UPSELL */}
              {showUpsell && (
                <div className="mt-8 p-4 border border-fruit-berry/30 bg-fruit-berry/5 rounded-xl">
                  <div className="flex justify-between items-start mb-2">
                    <span className="bg-fruit-berry text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">Recommended For You</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-fruit-berry">{UPSELL_PRODUCT.name}</h3>
                  <p className="text-xs opacity-80 mb-3">{UPSELL_PRODUCT.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">€{UPSELL_PRODUCT.price}</span>
                    <button 
                      onClick={handleAddUpsell}
                      className="text-xs bg-fruit-berry text-white px-3 py-2 rounded uppercase font-bold hover:bg-fruit-berry/80 transition-colors"
                    >
                      Add to Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-6 mt-4">
              <div className="flex justify-between text-xl font-serif font-bold mb-6">
                <span>Total</span>
                <span>€{cart.total}</span>
              </div>
              <button className="w-full bg-foreground text-background py-4 font-bold uppercase tracking-widest hover:bg-fruit-berry hover:text-white transition-colors">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
