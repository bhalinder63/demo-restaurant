import Link from "next/link";
import Header from "@/components/Header";
import AdminNav from "@/components/AdminNav";
import MenuItemRow from "@/components/MenuItemRow";
import { getAllMenuItemsAdmin } from "@/lib/data";

export default async function AdminMenuPage() {
  const items = await getAllMenuItemsAdmin();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-4">
        <h1 className="mb-6 font-display text-3xl font-bold text-brand-navy">Owner Dashboard</h1>
        <AdminNav active="/admin/menu" />

        <div className="mb-6 flex justify-end">
          <Link
            href="/admin/menu/new"
            className="rounded-full bg-brand-orange px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
          >
            + Add Menu Item
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-brand-navy/60">No menu items yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <MenuItemRow key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
