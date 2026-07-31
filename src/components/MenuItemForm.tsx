"use client";

import { useState, useRef, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  createMenuItem,
  updateMenuItem,
  uploadMenuItemImage,
  type MenuItemInput,
} from "@/app/admin/actions";
import { DISH_GRADIENTS, DEFAULT_GRADIENT } from "@/lib/gradients";
import type { AdminMenuItem } from "@/lib/data";

type Category = { id: string; name: string };

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function MenuItemForm({
  categories,
  initialItem,
}: {
  categories: Category[];
  initialItem?: AdminMenuItem;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialItem);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const [imageUrl, setImageUrl] = useState<string | null>(initialItem?.imageUrl ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialItem?.imageUrl ?? null);
  const [imageError, setImageError] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setImageError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setImageError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_SIZE) {
      setImageError("Image must be smaller than 5MB.");
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleRemovePhoto() {
    setImageFile(null);
    setImageUrl(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      let finalImageUrl = imageUrl;

      if (imageFile) {
        const uploadData = new FormData();
        uploadData.set("file", imageFile);
        const { url } = await uploadMenuItemImage(uploadData);
        finalImageUrl = url;
      }

      const input: MenuItemInput = {
        name,
        description,
        price: Number(price),
        stockQty: Number(stockQty),
        emoji,
        gradient,
        imageUrl: finalImageUrl,
        categoryId,
        isAvailable,
      };

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
      className="flex flex-col gap-5 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
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
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
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
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm font-medium text-brand-navy">
            Price (₹)
          </label>
          <input
            id="price"
            type="number"
            step="1"
            min={0}
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
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
            className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="category" className="text-sm font-medium text-brand-navy">
          Category
        </label>
        <select
          id="category"
          required
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-brand-navy/10 p-4">
        <p className="text-sm font-medium text-brand-navy">Photo</p>

        <div className="flex items-center gap-4">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- transient blob: preview URL, not eligible for next/image optimization
            <img
              src={previewUrl}
              alt=""
              className="h-20 w-20 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div
              className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient}`}
            >
              <span className="text-3xl">{emoji}</span>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-brand-navy/70"
            />
            {previewUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="w-fit text-xs font-medium text-red-500 hover:underline"
              >
                Remove photo
              </button>
            )}
          </div>
        </div>

        {imageError && <p className="text-xs text-red-600">{imageError}</p>}

        <p className="text-xs text-brand-navy/40">
          No photo uploaded? We&apos;ll show an emoji on a colored background instead.
        </p>

        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="emoji" className="text-xs font-medium text-brand-navy/70">
              Fallback emoji
            </label>
            <input
              id="emoji"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
              placeholder="🍜"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="gradient" className="text-xs font-medium text-brand-navy/70">
              Fallback color
            </label>
            <select
              id="gradient"
              value={gradient}
              onChange={(e) => setGradient(e.target.value)}
              className="rounded-lg border border-brand-navy/15 px-4 py-2 text-sm outline-none focus:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/40 focus-visible:ring-offset-1"
            >
              {DISH_GRADIENTS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-brand-navy">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        Available on menu
      </label>

      {error && <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-400">{error}</p>}

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
