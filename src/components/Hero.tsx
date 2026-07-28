import Link from "next/link";
import DishPhoto from "./DishPhoto";
import { featuredDish } from "@/lib/menu-data";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-8 lg:grid-cols-2">
        <div className="relative z-10">
          <p className="mb-3 text-sm font-semibold tracking-wide text-brand-orange">
            Welcome to
          </p>
          <h1 className="text-4xl font-bold leading-tight text-brand-navy sm:text-5xl">
            Foodie Restaurant
            <br />
            and Enjoy{" "}
            <span className="relative inline-block text-brand-orange">
              The Food
              <svg
                className="absolute -bottom-1 left-0 w-full text-brand-orange"
                viewBox="0 0 200 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 14C40 4 160 4 198 14"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-brand-navy/60">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            convallis ante ante, ut tempor neque bibendum non. Ut enim lacus,
            auctor nec convallis sed, vehicula ut eros.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/reservation"
              className="rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
            >
              Reserve a Table
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-brand-navy/20 px-6 py-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
            >
              Online Order
            </Link>
          </div>
          <p className="mt-8 flex items-center gap-2 text-sm text-brand-navy/60">
            <span aria-hidden="true">🕐</span> Open: 11:00am–11:00pm
          </p>
        </div>

        <div className="relative mx-auto flex h-80 w-80 items-center justify-center sm:h-96 sm:w-96">
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-orange/50" />
          <DishPhoto
            emoji={featuredDish.emoji}
            gradient={featuredDish.gradient}
            className="h-64 w-64 border-8 border-white shadow-xl sm:h-72 sm:w-72"
            emojiClassName="text-7xl"
          />

          <span className="absolute right-2 top-6 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-navy shadow-md">
            Best Food 🍳
          </span>

          <div className="absolute -bottom-6 left-1/2 w-56 -translate-x-1/2 rounded-2xl bg-white p-3 shadow-xl sm:left-auto sm:right-0 sm:translate-x-0">
            <div className="flex items-center gap-3">
              <DishPhoto
                emoji={featuredDish.emoji}
                gradient={featuredDish.gradient}
                className="h-12 w-12 shrink-0"
                emojiClassName="text-xl"
              />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-brand-navy">
                  {featuredDish.name}
                </p>
                <p className="text-xs text-brand-orange" aria-label="rating">
                  ★★★★★
                </p>
              </div>
            </div>
            <p className="mt-2 line-clamp-2 text-xs text-brand-navy/50">
              {featuredDish.description}
            </p>
            <p className="mt-2 text-sm font-bold text-brand-orange">
              ${featuredDish.price}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
