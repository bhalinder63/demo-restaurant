"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createMenuItem, updateMenuItem, type MenuItemInput } from "@/app/admin/actions";
import { DISH_GRADIENTS, DEFAULT_GRADIENT } from "@/lib/gradients";
import type { AdminMenuItem } from "@/lib/data";

type Category = { id: string; name: string };

export default function MenuItemForm({
  categories,
  initialItem,
}: {
  categories: Category[];
  initialItem?: AdminMenuItem;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialItem);

  const [name, setName] = useState(initialItem?.name ?? "");
  const [description, setDescription] = useState(initialItem?.description ?? "");
  const [price, setPrice] = useState(String(initialItem?.price ?? ""));
  const [stockQty, setStockQty] = useState(String(initialItem?.stockQty ?? "0"));
  const [emoji, setEmoji] = useState(initialItem?.emoji ?? "🍽️");
  const [gradient, setGradient] = useState(initialItem?.gradient ?? DEFAULT_GRADIENT);
  const [categoryId, setCategoryId] = useState(
    initialItem?.categoryId ?? categories[0]?.id ?? ""
  );
  const [isAvailable, setIsAvailable] = useState(initialItem?.isAvailable ?? true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const input: MenuItemInput = {
      name,
      description,
      price: Number(price),
      stockQty: Number(stockQty),
      emoji,
      gradient,
      categoryId,
      isAvailable,
    };

    try {
      if (isEdit && initialItem) {
        await updateMenuItem(initialItem.id, input);
      } else {
        await createMenuItem(input);
      }
      router.push("/admin/menu");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5"
    >
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium text-brand-navy">
          Name
        </label>
        <input
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-brand-navy">
          Description
        </label>
        <textarea
          id="description"
          required
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-brand-navy">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            step="0.01"
            min={0}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="stockQty" className="text-sm font-medium text-brand-navy">
            Stock quantity
          </label>
          <input
            id="stockQty"
            type="number"
            step="1"
            min={0}
            required
            value={stockQty}
            onChange={(e) => setStockQty(e.target.value)}
            className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-sm font-medium text-brand-navy">
            Category
          </label>
          <select
            id="category"
            required
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="emoji" className="text-sm font-medium text-brand-navy">
            Emoji
          </label>
          <input
            id="emoji"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
            placeholder="🍜"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="gradient" className="text-sm font-medium text-brand-navy">
          Photo color
        </label>
        <select
          id="gradient"
          value={gradient}
          onChange={(e) => setGradient(e.target.value)}
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange"
        >
          {DISH_GRADIENTS.map((g) => (
            <option key={g.value} value={g.value}>
              {g.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-navy">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        Available on menu
      </label>

      {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark disabled:opacity-60"
      >
        {submitting ? "Saving…" : isEdit ? "Save Changes" : "Create Item"}
      </button>
    </form>
  );
}
