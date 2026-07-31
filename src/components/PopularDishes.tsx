import DishPhoto from "./DishPhoto";
import AddToCartButton from "./AddToCartButton";
import type { DishCard } from "@/lib/data";
import { formatCurrency } from "@/lib/currency";

export default function PopularDishes({ dishes }: { dishes: DishCard[] }) {
  return (
    <section className="mx-auto max-w-page px-6 py-16">
      <div className="mb-10 flex items-end justify-between">
        <h2 className="font-display text-3xl font-bold text-brand-navy">
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
        {dishes.map((dish) => (
          <article
            key={dish.id}
            className="group rounded-2xl bg-surface p-5 text-center shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-shadow hover:shadow-lg"
          >
            <div className="relative mx-auto mb-4 h-40 w-40">
              <DishPhoto
                name={dish.name}
                emoji={dish.emoji}
                gradient={dish.gradient}
                imageUrl={dish.imageUrl}
                className="h-40 w-40 border-4 border-brand-cream"
                emojiClassName="text-5xl"
              />
              <span className="absolute -top-1 right-0 rounded-full bg-brand-cream px-2 py-0.5 text-[11px] font-semibold text-brand-navy">
                ★ {dish.rating}
              </span>
            </div>
            <h3 className="font-display font-semibold text-brand-navy">{dish.name}</h3>
            <p className="mt-1 text-sm font-bold text-brand-orange">
              {formatCurrency(dish.price)}
            </p>
            <p className="mt-2 line-clamp-2 text-xs text-brand-navy/50">
              {dish.description}
            </p>
            <div className="mt-4">
              <AddToCartButton dish={dish} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
