"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Cart${itemCount > 0 ? `, ${itemCount} item${itemCount !== 1 ? "s" : ""}` : ""}`}
      className="relative hidden h-11 w-11 items-center justify-center rounded-full text-brand-navy/70 transition-colors hover:bg-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:flex"
    >
      <ShoppingCart className="h-5 w-5" strokeWidth={2} />
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-semibold text-white">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
