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
  // Current Active Blend
  currentBlend: BlendItem[];
  
  // Actions
  addCoffee: (coffee: Coffee) => void;
  removeCoffee: (id: string) => void;
  updatePercentage: (id: string, pct: number) => void;
  clearBlend: () => void;
  
  // Computed (Helper)
  getTotalPercentage: () => number;
}

export const useBlendStore = create<BlendState>()(
  persist(
    (set, get) => ({
      currentBlend: [],

      addCoffee: (coffee) => set((state) => {
        // Prevent duplicates
        if (state.currentBlend.find(c => c.id === coffee.id)) return state;
        
        // Add new coffee with 0% initially, or split remaining?
        // Let's add with 0% and let user adjust, or auto-balance later.
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

      getTotalPercentage: () => {
        return get().currentBlend.reduce((acc, c) => acc + c.percentage, 0);
      }
    }),
    {
      name: 'blendie-storage', // Persistence key
    }
  )
);
