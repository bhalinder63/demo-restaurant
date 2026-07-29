import { auth } from "@/auth";
import Header from "@/components/Header";

export default async function AdminPage() {
  const session = await auth();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-6 pb-24 pt-4">
        <h1 className="text-3xl font-bold text-brand-navy">Owner Dashboard</h1>
        <p className="mt-2 text-brand-navy/60">
          Welcome, {session?.user?.name}. Menu management, stock control, and order
          management are coming in the next stage.
        </p>
      </main>
    </div>
  );
}
