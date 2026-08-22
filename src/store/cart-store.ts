import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  menuItemId: string;
  name: string;
  priceCents: number;
  imageUrl: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  increment: (menuItemId: string) => void;
  decrement: (menuItemId: string) => void;
  removeItem: (menuItemId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        const existing = get().items.find(
          (i) => i.menuItemId === item.menuItemId,
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.menuItemId === item.menuItemId
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity }] });
        }
      },
      increment: (menuItemId) => {
        set({
          items: get().items.map((i) =>
            i.menuItemId === menuItemId
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        });
      },
      decrement: (menuItemId) => {
        const items = get()
          .items.map((i) =>
            i.menuItemId === menuItemId
              ? { ...i, quantity: i.quantity - 1 }
              : i,
          )
          .filter((i) => i.quantity > 0);
        set({ items });
      },
      removeItem: (menuItemId) => {
        set({ items: get().items.filter((i) => i.menuItemId !== menuItemId) });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "foodie-cart" },
  ),
);

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity * i.priceCents, 0);
}
