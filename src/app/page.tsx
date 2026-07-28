import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularDishes from "@/components/PopularDishes";
import { getFeaturedDish, getPopularDishes } from "@/lib/data";

export default async function Home() {
  const [featuredDish, popularDishes] = await Promise.all([
    getFeaturedDish(),
    getPopularDishes(),
  ]);

  return (
    <div className="relative flex-1 overflow-hidden bg-background">
      <div
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brand-peach/60 blur-2xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-brand-peach/50 blur-2xl"
        aria-hidden="true"
      />

      <div className="relative">
        <Header />
        {featuredDish && <Hero featuredDish={featuredDish} />}
        <PopularDishes dishes={popularDishes} />
      </div>
    </div>
  );
}
