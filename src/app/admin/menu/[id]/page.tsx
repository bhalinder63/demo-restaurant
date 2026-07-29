import { notFound } from "next/navigation";
import Header from "@/components/Header";
import AdminNav from "@/components/AdminNav";
import MenuItemForm from "@/components/MenuItemForm";
import { getCategories, getMenuItemByIdAdmin } from "@/lib/data";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [categories, item] = await Promise.all([getCategories(), getMenuItemByIdAdmin(id)]);

  if (!item) notFound();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-xl px-6 pb-24 pt-4">
        <h1 className="mb-6 text-3xl font-bold text-brand-navy">Owner Dashboard</h1>
        <AdminNav active="/admin/menu" />
        <h2 className="mb-4 text-xl font-bold text-brand-navy">Edit {item.name}</h2>
        <MenuItemForm categories={categories} initialItem={item} />
      </main>
    </div>
  );
}
