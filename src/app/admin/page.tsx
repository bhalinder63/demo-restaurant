import Link from "next/link";
import { auth } from "@/auth";
import Header from "@/components/Header";
import AdminNav from "@/components/AdminNav";
import { getAllOrders, getAllMenuItemsAdmin } from "@/lib/data";

export default async function AdminPage() {
  const session = await auth();
  const [orders, menuItems] = await Promise.all([getAllOrders(), getAllMenuItemsAdmin()]);

  const activeOrders = orders.filter(
    (o) => o.status !== "DELIVERED" && o.status !== "CANCELLED"
  ).length;
  const lowStock = menuItems.filter((m) => m.isAvailable && m.stockQty <= 5);

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-4">
        <h1 className="mb-2 text-3xl font-bold text-brand-navy">Owner Dashboard</h1>
        <p className="mb-6 text-brand-navy/60">Welcome, {session?.user?.name}.</p>
        <AdminNav active="/admin" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <Link
            href="/admin/orders"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-brand-navy/50">Active orders</p>
            <p className="mt-1 text-3xl font-bold text-brand-navy">{activeOrders}</p>
            <p className="mt-2 text-sm font-medium text-brand-orange">Manage orders →</p>
          </Link>

          <Link
            href="/admin/menu"
            className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-brand-navy/50">Menu items</p>
            <p className="mt-1 text-3xl font-bold text-brand-navy">{menuItems.length}</p>
            <p className="mt-2 text-sm font-medium text-brand-orange">Manage menu →</p>
          </Link>
        </div>

        {lowStock.length > 0 && (
          <div className="mt-6 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-200">
            <p className="mb-2 font-semibold text-amber-800">Low stock</p>
            <ul className="flex flex-col gap-1 text-sm text-amber-700">
              {lowStock.map((item) => (
                <li key={item.id}>
                  {item.name} — {item.stockQty} left
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
