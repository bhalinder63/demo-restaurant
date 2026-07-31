import Header from "@/components/Header";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-4">
        <h1 className="mb-8 font-display text-3xl font-bold text-brand-navy">Checkout</h1>
        <CheckoutForm />
      </main>
    </div>
  );
}
