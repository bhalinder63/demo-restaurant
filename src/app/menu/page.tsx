import Header from "@/components/Header";
import DishPhoto from "@/components/DishPhoto";
import AddToCartButton from "@/components/AddToCartButton";
import { getMenuByCategory } from "@/lib/data";

export default async function MenuPage() {
  const categories = await getMenuByCategory();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-6 pb-24 pt-4">
        <h1 className="mb-2 text-3xl font-bold text-brand-navy">Our Menu</h1>
        <p className="mb-10 text-sm text-brand-navy/60">
          Fresh dishes, made to order. Add what you like to your cart.
        </p>

        {categories.length === 0 && (
          <p className="text-brand-navy/60">No items available right now — check back soon.</p>
        )}

        {categories.map((category) => (
          <section key={category.id} className="mb-12">
            <h2 className="mb-6 text-xl font-bold text-brand-navy">{category.name}</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((dish) => (
                <article
                  key={dish.id}
                  className="flex flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5"
                >
                  <div className="mb-4 flex items-start gap-4">
                    <DishPhoto
                      emoji={dish.emoji}
                      gradient={dish.gradient}
                      className="h-20 w-20 shrink-0 border-4 border-brand-cream"
                      emojiClassName="text-3xl"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-brand-navy">{dish.name}</h3>
                      <p className="mt-1 text-xs text-brand-orange">★ {dish.rating}</p>
                      <p className="mt-2 line-clamp-2 text-xs text-brand-navy/50">
                        {dish.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3">
                    <p className="text-sm font-bold text-brand-orange">
                      ${dish.price.toFixed(2)}
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
