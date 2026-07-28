"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { DishCard } from "@/lib/data";

export default function AddToCartButton({ dish }: { dish: DishCard }) {
  const { addItem, items, setQuantity } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const inCart = items.find((i) => i.menuItemId === dish.id);
  const outOfStock = dish.stockQty <= 0;

  function handleAdd() {
    addItem({
      menuItemId: dish.id,
      name: dish.name,
      price: dish.price,
      emoji: dish.emoji,
      gradient: dish.gradient,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  }

  if (outOfStock) {
    return (
      <button
        disabled
        className="w-full cursor-not-allowed rounded-full bg-brand-navy/10 px-4 py-2 text-sm font-semibold text-brand-navy/40"
      >
        Out of stock
      </button>
    );
  }

  if (inCart) {
    return (
      <div className="flex w-full items-center justify-between rounded-full border border-brand-orange/40 px-1 py-1">
        <button
          aria-label="Decrease quantity"
          onClick={() => setQuantity(dish.id, inCart.quantity - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-full text-brand-orange transition-colors hover:bg-brand-cream"
        >
          −
        </button>
        <span className="text-sm font-semibold text-brand-navy">{inCart.quantity}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => setQuantity(dish.id, inCart.quantity + 1)}
          disabled={inCart.quantity >= dish.stockQty}
          className="flex h-7 w-7 items-center justify-center rounded-full text-brand-orange transition-colors hover:bg-brand-cream disabled:opacity-30"
        >
          +
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full rounded-full bg-brand-orange px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange-dark"
    >
      {justAdded ? "Added ✓" : "Add to cart"}
    </button>
  );
}
