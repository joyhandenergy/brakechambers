import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BrakeChamber, BrakeAccessory } from '../types';

export type CartProductCategory = 'spring-brake-chambers' | 'service-brake-chambers' | 'air-disc-brake-actuators' | 'parts-and-kits' | string;

export interface CartItem {
  id: string;
  type: CartProductCategory;
  product: BrakeChamber | BrakeAccessory;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: BrakeChamber | BrakeAccessory, type: CartProductCategory, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, type, quantity = 1) => {
        const { items } = get();
        const existingItem = items.find(item => item.id === product.slug);
        
        if (existingItem) {
          set({
            items: items.map(item => 
              item.id === product.slug 
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({ items: [...items, { id: product.slug, type, product, quantity }] });
        }
      },
      removeItem: (id) => set(state => ({ items: state.items.filter(item => item.id !== id) })),
      updateQuantity: (id, quantity) => set(state => ({
        items: state.items.map(item => item.id === id ? { ...item, quantity } : item)
      })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'brc-cart-storage',
    }
  )
);
