"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="relative hidden h-9 w-9 items-center justify-center rounded-full text-brand-navy/70 transition-colors hover:bg-brand-cream sm:flex"
    >
      🛒
      {itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-semibold text-white">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
