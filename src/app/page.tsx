import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PopularDishes from "@/components/PopularDishes";

export default function Home() {
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
        <Hero />
        <PopularDishes />
      </div>
    </div>
  );
}
