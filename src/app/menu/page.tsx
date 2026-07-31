import Header from "@/components/Header";
import DishPhoto from "@/components/DishPhoto";
import AddToCartButton from "@/components/AddToCartButton";
import { getMenuByCategory } from "@/lib/data";
import { formatCurrency } from "@/lib/currency";

export default async function MenuPage() {
  const categories = await getMenuByCategory();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-page px-6 pb-24 pt-4">
        <h1 className="mb-2 font-display text-3xl font-bold text-brand-navy">Our Menu</h1>
        <p className="mb-6 text-sm text-brand-navy/60">
          Fresh dishes, made to order. Add what you like to your cart.
        </p>

        {categories.length === 0 && (
          <p className="text-brand-navy/60">No items available right now — check back soon.</p>
        )}

        {categories.length > 1 && (
          <nav className="sticky top-0 z-10 mb-8 flex gap-2 overflow-x-auto bg-background/95 py-3 backdrop-blur">
            {categories.map((category) => (
              <a
                key={category.id}
                href={`#${category.id}`}
                className="shrink-0 rounded-full border border-brand-navy/15 px-4 py-2 text-sm font-medium text-brand-navy/70 transition-colors hover:border-brand-orange hover:text-brand-orange"
              >
                {category.name}
              </a>
            ))}
          </nav>
        )}

        {categories.map((category) => (
          <section key={category.id} id={category.id} className="mb-12 scroll-mt-20">
            <h2 className="mb-6 font-display text-xl font-bold text-brand-navy">{category.name}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.items.map((dish) => (
                <article
                  key={dish.id}
                  className="group flex flex-col rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <DishPhoto
                      name={dish.name}
                      emoji={dish.emoji}
                      gradient={dish.gradient}
                      imageUrl={dish.imageUrl}
                      className="h-28 w-28 shrink-0 border-4 border-brand-cream"
                      emojiClassName="text-4xl"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-semibold text-brand-navy">{dish.name}</h3>
                      <p className="mt-1 text-xs text-brand-orange">★ {dish.rating}</p>
                      <p className="mt-2 line-clamp-2 text-xs text-brand-navy/50">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-brand-orange">
                      {formatCurrency(dish.price)}
                    </p>
                    <div className="w-32">
                      <AddToCartButton dish={dish} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
