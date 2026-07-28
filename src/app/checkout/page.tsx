"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useCart } from "@/lib/cart-context";
import { placeOrder } from "./actions";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const { orderId } = await placeOrder({
        customerName,
        customerPhone,
        deliveryAddress,
        items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
      });
      clear();
      router.push(`/order/${orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="relative flex-1 bg-background">
        <Header />
        <main className="mx-auto max-w-xl px-6 pb-24 pt-4 text-center">
          <h1 className="mb-4 text-2xl font-bold text-brand-navy">Your cart is empty</h1>
          <Link
            href="/menu"
            className="inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
          >
            Browse the menu
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-4">
        <h1 className="mb-8 text-3xl font-bold text-brand-navy">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="customerName" className="text-sm font-medium text-brand-navy">
              Full name
            </label>
            <input
              id="customerName"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
              placeholder="Jane Doe"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="customerPhone" className="text-sm font-medium text-brand-navy">
              Phone number
            </label>
            <input
              id="customerPhone"
              type="tel"
              required
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
              placeholder="+1 555 123 4567"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="deliveryAddress" className="text-sm font-medium text-brand-navy">
              Delivery address
            </label>
            <textarea
              id="deliveryAddress"
              required
              rows={3}
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
              placeholder="123 Main Street, Apt 4B, Springfield"
            />
          </div>

          <div className="flex flex-col gap-2 border-t border-brand-navy/10 pt-4">
            {items.map((item) => (
              <div key={item.menuItemId} className="flex justify-between text-sm text-brand-navy/70">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="mt-2 flex justify-between text-base font-bold text-brand-navy">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark disabled:opacity-60"
          >
            {submitting ? "Placing order…" : `Pay $${subtotal.toFixed(2)} (simulated)`}
          </button>
          <p className="text-center text-xs text-brand-navy/40">
            This is a demo checkout — no real payment is processed.
          </p>
        </form>
      </main>
    </div>
  );
}
