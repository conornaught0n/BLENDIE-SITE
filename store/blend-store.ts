import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Coffee = {
  id: string;
  name: string;
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
  
  addSamplePack: () => void; // New Action
  
  getTotalPercentage: () => number;
}

export const useBlendStore = create<BlendState>()(
  persist(
    (set, get) => ({
      currentBlend: [],
      cart: { items: [], total: 0 },

      addCoffee: (coffee) => set((state) => {
        if (state.currentBlend.find(c => c.id === coffee.id)) return state;
        return { currentBlend: [...state.currentBlend, { ...coffee, percentage: 0 }] };
      }),

      removeCoffee: (id) => set((state) => ({
        currentBlend: state.currentBlend.filter((c) => c.id !== id),
      })),

      updatePercentage: (id, pct) => set((state) => ({
        currentBlend: state.currentBlend.map((c) => 
          c.id === id ? { ...c, percentage: pct } : c
        ),
      })),

      clearBlend: () => set({ currentBlend: [] }),

      // Sample Pack Logic
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
