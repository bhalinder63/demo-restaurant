"use client";

import Link from "next/link";
import DishPhoto from "@/components/DishPhoto";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";
import { formatCurrency } from "@/lib/currency";

export default function CartView() {
  const { items, setQuantity, removeItem, subtotal } = useCart();
  const { showToast } = useToast();

  if (items.length === 0) {
    return (
      <div className="rounded-2xl bg-surface p-10 text-center shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <p className="text-brand-navy/60">Your cart is empty.</p>
        <Link
          href="/menu"
          className="mt-4 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
        >
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.menuItemId}
            className="flex items-center gap-4 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
          >
            <DishPhoto
              name={item.name}
              emoji={item.emoji}
              gradient={item.gradient}
              imageUrl={item.imageUrl}
              className="h-16 w-16 shrink-0 border-4 border-brand-cream"
              emojiClassName="text-2xl"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold text-brand-navy">{item.name}</p>
              <p className="text-sm text-brand-orange">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-brand-orange/40 px-1 py-1">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQuantity(item.menuItemId, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-brand-orange transition-colors hover:bg-brand-cream"
              >
                −
              </button>
              <span className="w-4 text-center text-sm font-semibold text-brand-navy">
                {item.quantity}
              </span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQuantity(item.menuItemId, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full text-brand-orange transition-colors hover:bg-brand-cream"
              >
                +
              </button>
            </div>
            <p className="w-16 text-right text-sm font-bold text-brand-navy">
              {formatCurrency(item.price * item.quantity)}
            </p>
            <button
              aria-label="Remove item"
              onClick={() => {
                removeItem(item.menuItemId);
                showToast(`Removed ${item.name} from cart`);
              }}
              className="text-brand-navy/40 transition-colors hover:text-red-500"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
        <div>
          <p className="text-sm text-brand-navy/60">Subtotal</p>
          <p className="text-2xl font-bold text-brand-navy">{formatCurrency(subtotal)}</p>
        </div>
        <Link
          href="/checkout"
          className="rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
        >
          Proceed to Checkout
        </Link>
      </div>
    </>
  );
}
