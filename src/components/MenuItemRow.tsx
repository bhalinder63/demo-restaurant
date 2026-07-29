"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import DishPhoto from "./DishPhoto";
import { updateStockQty, toggleAvailability, deleteMenuItem } from "@/app/admin/actions";
import type { AdminMenuItem } from "@/lib/data";

export default function MenuItemRow({ item }: { item: AdminMenuItem }) {
  const [stockInput, setStockInput] = useState(String(item.stockQty));
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const stockChanged = Number(stockInput) !== item.stockQty;

  function saveStock() {
    const value = Number(stockInput);
    if (!Number.isInteger(value) || value < 0) {
      setError("Enter a whole number ≥ 0.");
      return;
    }
    setError(null);
    startTransition(async () => {
      await updateStockQty(item.id, value);
    });
  }

  function handleToggleAvailability() {
    startTransition(async () => {
      await toggleAvailability(item.id, !item.isAvailable);
    });
  }

  function handleDelete() {
    if (!confirm(`Delete "${item.name}"? This can't be undone.`)) return;
    startTransition(async () => {
      try {
        await deleteMenuItem(item.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete.");
      }
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-black/5">
      <DishPhoto
        emoji={item.emoji}
        gradient={item.gradient}
        className="h-14 w-14 shrink-0 border-2 border-brand-cream"
        emojiClassName="text-2xl"
      />

      <div className="min-w-[140px] flex-1">
        <p className="font-semibold text-brand-navy">{item.name}</p>
        <p className="text-xs text-brand-navy/50">
          {item.categoryName} · ${item.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <label className="text-xs text-brand-navy/50">Stock</label>
        <input
          type="number"
          min={0}
          value={stockInput}
          onChange={(e) => setStockInput(e.target.value)}
          className="w-20 rounded-lg border border-brand-navy/15 px-2 py-1 text-sm outline-none focus:border-brand-orange"
        />
        {stockChanged && (
          <button
            onClick={saveStock}
            disabled={isPending}
            className="rounded-full bg-brand-orange px-3 py-1 text-xs font-semibold text-white disabled:opacity-50"
          >
            Save
          </button>
        )}
      </div>

      <label className="flex items-center gap-2 text-xs text-brand-navy/70">
        <input
          type="checkbox"
          checked={item.isAvailable}
          onChange={handleToggleAvailability}
          disabled={isPending}
        />
        Available
      </label>

      <Link
        href={`/admin/menu/${item.id}`}
        className="rounded-full border border-brand-navy/20 px-3 py-1.5 text-xs font-semibold text-brand-navy transition-colors hover:border-brand-orange hover:text-brand-orange"
      >
        Edit
      </Link>

      <button
        onClick={handleDelete}
        disabled={isPending}
        className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-50"
      >
        Delete
      </button>

      {error && <p className="w-full text-xs text-red-600">{error}</p>}
    </div>
  );
}
