"use client";

import Link from "next/link";
import Header from "@/components/Header";
import DishPhoto from "@/components/DishPhoto";
import { useCart } from "@/lib/cart-context";

export default function CartPage() {
  const { items, setQuantity, removeItem, subtotal } = useCart();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-4">
        <h1 className="mb-8 text-3xl font-bold text-brand-navy">Your Cart</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <p className="text-brand-navy/60">Your cart is empty.</p>
            <Link
              href="/menu"
              className="mt-4 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.menuItemId}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5"
                >
                  <DishPhoto
                    emoji={item.emoji}
                    gradient={item.gradient}
                    className="h-16 w-16 shrink-0 border-4 border-brand-cream"
                    emojiClassName="text-2xl"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-brand-navy">{item.name}</p>
                    <p className="text-sm text-brand-orange">${item.price.toFixed(2)}</p>
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
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    aria-label="Remove item"
                    onClick={() => removeItem(item.menuItemId)}
                    className="text-brand-navy/40 transition-colors hover:text-red-500"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
              <div>
                <p className="text-sm text-brand-navy/60">Subtotal</p>
                <p className="text-2xl font-bold text-brand-navy">${subtotal.toFixed(2)}</p>
              </div>
              <Link
                href="/checkout"
                className="rounded-full bg-brand-orange px-8 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
