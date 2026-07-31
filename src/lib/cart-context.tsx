"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export type CartItem = {
  menuItemId: string;
  name: string;
  price: number;
  emoji: string;
  gradient: string;
  imageUrl: string | null;
  quantity: number;
};

type CartState = { items: CartItem[] };

type CartAction =
  | { type: "ADD"; item: Omit<CartItem, "quantity">; quantity: number }
  | { type: "REMOVE"; menuItemId: string }
  | { type: "SET_QUANTITY"; menuItemId: string; quantity: number }
  | { type: "CLEAR" }
  | { type: "HYDRATE"; items: CartItem[] };

const STORAGE_KEY = "foodie-cart";

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { items: action.items };
    case "ADD": {
      const existing = state.items.find(
        (i) => i.menuItemId === action.item.menuItemId
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.menuItemId === action.item.menuItemId
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return {
        items: [...state.items, { ...action.item, quantity: action.quantity }],
      };
    }
    case "REMOVE":
      return { items: state.items.filter((i) => i.menuItemId !== action.menuItemId) };
    case "SET_QUANTITY":
      if (action.quantity <= 0) {
        return { items: state.items.filter((i) => i.menuItemId !== action.menuItemId) };
      }
      return {
        items: state.items.map((i) =>
          i.menuItemId === action.menuItemId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (menuItemId: string) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        dispatch({ type: "HYDRATE", items: JSON.parse(raw) });
      } catch {
        // ignore corrupt cart data
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    return {
      items: state.items,
      itemCount,
      subtotal,
      addItem: (item, quantity = 1) => dispatch({ type: "ADD", item, quantity }),
      removeItem: (menuItemId) => dispatch({ type: "REMOVE", menuItemId }),
      setQuantity: (menuItemId, quantity) =>
        dispatch({ type: "SET_QUANTITY", menuItemId, quantity }),
      clear: () => dispatch({ type: "CLEAR" }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
