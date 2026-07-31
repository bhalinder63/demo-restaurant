import Header from "@/components/Header";
import CartView from "./CartView";

export default function CartPage() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-4">
        <h1 className="mb-8 font-display text-3xl font-bold text-brand-navy">Your Cart</h1>
        <CartView />
      </main>
    </div>
  );
}
