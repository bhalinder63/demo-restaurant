import DishPhoto from "./DishPhoto";
import { popularDishes } from "@/lib/menu-data";

export default function PopularDishes() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="text-3xl font-bold text-brand-navy">
          Our Popular{" "}
          <span className="relative inline-block text-brand-orange">
            Dishes
          </span>
        </h2>
        <div className="hidden gap-3 sm:flex">
          <button
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-navy/15 text-brand-navy/60 transition-colors hover:border-brand-orange hover:text-brand-orange"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange text-white shadow-md transition-colors hover:bg-brand-orange-dark"
          >
            ›
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popularDishes.map((dish) => (
          <article
            key={dish.slug}
            className="group rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-lg"
          >
            <div className="relative mx-auto mb-4 h-28 w-28">
              <DishPhoto
                emoji={dish.emoji}
                gradient={dish.gradient}
                className="h-28 w-28 border-4 border-brand-cream"
                emojiClassName="text-4xl"
              />
              <span className="absolute -top-1 right-0 rounded-full bg-brand-cream px-2 py-0.5 text-[11px] font-semibold text-brand-navy">
                ({dish.rating}) ★
              </span>
            </div>
            <h3 className="font-semibold text-brand-navy">{dish.name}</h3>
            <p className="mt-1 text-sm font-bold text-brand-orange">
              ${dish.price.toFixed(2)}
            </p>
            <p className="mt-2 line-clamp-2 text-xs text-brand-navy/50">
              {dish.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
