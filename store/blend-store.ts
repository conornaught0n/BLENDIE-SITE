import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Coffee = {
  id: string;
  name: string;
  origin: string;
  price_250g: number;
  aroma: number;
  body: number;
  acidity: number;
  sweetness: number;
  aftertaste: number;
};

type BlendItem = Coffee & { percentage: number };

interface BlendState {
  currentBlend: BlendItem[];
  cart: {
    items: { type: 'blend' | 'sample', name: string, price: number }[];
    total: number;
  };
  
  addCoffee: (coffee: Coffee) => void;
  removeCoffee: (id: string) => void;
  updatePercentage: (id: string, pct: number) => void;
  clearBlend: () => void;
  
  addSamplePack: () => void;
  
  getTotalPercentage: () => number;
}

export const useBlendStore = create<BlendState>()(
  persist(
    (set, get) => ({
      currentBlend: [],
      cart: { items: [], total: 0 },

      addCoffee: (coffee) => set((state) => {
        if (state.currentBlend.find(c => c.id === coffee.id)) return state;
        
        // Add new coffee with 0% initially to avoid breaking existing math
        return { currentBlend: [...state.currentBlend, { ...coffee, percentage: 0 }] };
      }),

      removeCoffee: (id) => set((state) => ({
        currentBlend: state.currentBlend.filter((c) => c.id !== id),
      })),

      updatePercentage: (id, newPct) => set((state) => {
        // Auto-Balance Logic
        // When one slider moves UP, others must move DOWN proportionally to keep total <= 100
        // When one slider moves DOWN, others stay put (total decreases)
        
        const currentTotal = state.currentBlend.reduce((acc, c) => acc + c.percentage, 0);
        const oldPct = state.currentBlend.find(c => c.id === id)?.percentage || 0;
        const diff = newPct - oldPct;

        if (diff === 0) return state;

        let newBlend = state.currentBlend.map(c => 
            c.id === id ? { ...c, percentage: newPct } : c
        );

        const newTotal = newBlend.reduce((acc, c) => acc + c.percentage, 0);

        // If we exceed 100%, we must reduce other components
        if (newTotal > 100) {
            const overflow = newTotal - 100;
            // Distribute overflow removal across OTHER items that have > 0 value
            const others = newBlend.filter(c => c.id !== id && c.percentage > 0);
            
            if (others.length > 0) {
                let remainingOverflow = overflow;
                
                newBlend = newBlend.map(c => {
                    if (c.id === id) return c; // Don't touch the one we just moved
                    if (c.percentage <= 0) return c;

                    // Calculate proportional reduction or simple subtraction?
                    // Simple subtraction is less jumpy for UI
                    const reduction = Math.min(c.percentage, remainingOverflow);
                    remainingOverflow -= reduction;
                    return { ...c, percentage: c.percentage - reduction };
                });
            }
        }

        return { currentBlend: newBlend };
      }),

      clearBlend: () => set({ currentBlend: [] }),

      addSamplePack: () => set((state) => ({
        cart: {
            items: [...state.cart.items, { type: 'sample', name: 'Master Blending Kit (8x50g)', price: 35 }],
            total: state.cart.total + 35
        }
      })),

      getTotalPercentage: () => {
        return get().currentBlend.reduce((acc, c) => acc + c.percentage, 0);
      }
    }),
    {
      name: 'blendie-storage',
    }
  )
);
