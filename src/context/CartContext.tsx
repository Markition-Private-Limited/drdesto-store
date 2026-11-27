"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  href: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  addItem: (item: Omit<CartItem, "qty">, qty: number) => void;
  updateQty: (href: string, qty: number) => void;
  removeItem: (href: string) => void;
  drawerOpen: boolean;
  closeDrawer: () => void;
  activeItem: CartItem | null;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "dr-desta-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota / privacy-mode errors
    }
  }, [items, hydrated]);

  const addItem: CartContextValue["addItem"] = (item, qty) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.href === item.href);
      if (existing) {
        return prev.map((i) =>
          i.href === item.href ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setActiveHref(item.href);
    setDrawerOpen(true);
  };

  const updateQty: CartContextValue["updateQty"] = (href, qty) => {
    setItems((prev) =>
      prev.map((i) => (i.href === href ? { ...i, qty: Math.max(1, qty) } : i))
    );
  };

  const removeItem: CartContextValue["removeItem"] = (href) => {
    setItems((prev) => prev.filter((i) => i.href !== href));
  };

  const totalCount = items.reduce((sum, i) => sum + i.qty, 0);
  const activeItem = items.find((i) => i.href === activeHref) ?? null;

  return (
    <CartContext.Provider
      value={{
        items,
        totalCount,
        addItem,
        updateQty,
        removeItem,
        drawerOpen,
        closeDrawer: () => setDrawerOpen(false),
        activeItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
