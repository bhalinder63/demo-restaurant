import Header from "@/components/Header";
import AdminNav from "@/components/AdminNav";
import MenuItemForm from "@/components/MenuItemForm";
import { getCategories } from "@/lib/data";

export default async function NewMenuItemPage() {
  const categories = await getCategories();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-4">
        <h1 className="mb-6 font-display text-3xl font-bold text-brand-navy">Owner Dashboard</h1>
        <AdminNav active="/admin/menu" />
        <h2 className="mb-4 font-display text-xl font-bold text-brand-navy">Add Menu Item</h2>
        <MenuItemForm categories={categories} />
      </main>
    </div>
  );
}
