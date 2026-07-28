import Link from "next/link";
import CartLink from "./CartLink";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
];

export default function Header() {
  return (
    <header className="relative z-20 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold text-brand-orange">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-orange text-white">
            🍕
          </span>
          Foodie
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-brand-navy/80 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-orange"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-brand-navy/70 transition-colors hover:bg-brand-cream sm:flex"
          >
            🔍
          </button>
          <CartLink />
          <button
            aria-label="Wishlist"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-brand-navy/70 transition-colors hover:bg-brand-cream sm:flex"
          >
            ♡
          </button>
          <Link
            href="/login"
            className="rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange-dark"
          >
            Log In
          </Link>
        </div>
      </div>
    </header>
  );
}
