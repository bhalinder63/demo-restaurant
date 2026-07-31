import Link from "next/link";
import { Search, Heart } from "lucide-react";
import CartLink from "./CartLink";
import { auth, signOut } from "@/auth";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
];

export default async function Header() {
  const session = await auth();
  const user = session?.user;

  return (
    <header className="relative z-20 w-full">
      <div className="mx-auto flex max-w-page items-center justify-between px-6 py-6">
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
          {user?.role === "OWNER" && (
            <Link href="/admin" className="transition-colors hover:text-brand-orange">
              Admin
            </Link>
          )}
          {user?.role === "CUSTOMER" && (
            <Link href="/orders" className="transition-colors hover:text-brand-orange">
              My Orders
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Search"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-brand-navy/70 transition-colors hover:bg-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:flex"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </button>
          <CartLink />
          <button
            aria-label="Wishlist"
            className="hidden h-11 w-11 items-center justify-center rounded-full text-brand-navy/70 transition-colors hover:bg-brand-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-orange sm:flex"
          >
            <Heart className="h-5 w-5" strokeWidth={2} />
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-brand-navy/70 sm:inline">
                Hi, {user.name?.split(" ")[0]}
              </span>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button
                  type="submit"
                  className="rounded-full border border-brand-navy/20 px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
                >
                  Log out
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="rounded-full bg-brand-orange px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-orange-dark"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
