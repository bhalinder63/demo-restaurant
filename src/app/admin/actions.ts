"use server";

import { revalidatePath } from "next/cache";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/db";
import { requireOwner } from "@/lib/auth-helpers";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadMenuItemImage(formData: FormData): Promise<{ url: string }> {
  await requireOwner();

  const file = formData.get("file");
  if (!(file instanceof File)) {
    throw new Error("No file provided.");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image.");
  }
  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be smaller than 5MB.");
  }

  const blob = await put(`menu-items/${file.name}`, file, {
    access: "public",
    addRandomSuffix: true,
  });

  return { url: blob.url };
}

const VALID_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
  "CANCELLED",
] as const;
type OrderStatusValue = (typeof VALID_STATUSES)[number];

export async function updateOrderStatus(orderId: string, status: string) {
  await requireOwner();

  if (!VALID_STATUSES.includes(status as OrderStatusValue)) {
    throw new Error("Invalid status.");
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as OrderStatusValue },
  });

  revalidatePath("/admin/orders");
  revalidatePath(`/order/${orderId}`);
  revalidatePath("/orders");
}

export type MenuItemInput = {
  name: string;
  description: string;
  price: number;
  stockQty: number;
  emoji: string;
  gradient: string;
  imageUrl: string | null;
  categoryId: string;
  isAvailable: boolean;
};

function validateMenuItemInput(input: MenuItemInput) {
  if (!input.name.trim()) throw new Error("Name is required.");
  if (!input.description.trim()) throw new Error("Description is required.");
  if (!Number.isFinite(input.price) || input.price < 0) {
    throw new Error("Price must be a non-negative number.");
  }
  if (!Number.isInteger(input.stockQty) || input.stockQty < 0) {
    throw new Error("Stock quantity must be a non-negative whole number.");
  }
  if (!input.categoryId) throw new Error("Category is required.");
}

function revalidateMenuPages() {
  revalidatePath("/");
  revalidatePath("/menu");
  revalidatePath("/admin/menu");
}

export async function createMenuItem(input: MenuItemInput): Promise<{ id: string }> {
  await requireOwner();
  validateMenuItemInput(input);

  const item = await prisma.menuItem.create({
    data: {
      name: input.name.trim(),
      description: input.description.trim(),
      price: input.price,
      stockQty: input.stockQty,
      emoji: input.emoji.trim() || "🍽️",
      gradient: input.gradient,
      imageUrl: input.imageUrl,
      categoryId: input.categoryId,
      isAvailable: input.isAvailable,
    },
  });

  revalidateMenuPages();
  return { id: item.id };
}

export async function updateMenuItem(id: string, input: MenuItemInput): Promise<void> {
  await requireOwner();
  validateMenuItemInput(input);

  await prisma.menuItem.update({
    where: { id },
    data: {
      name: input.name.trim(),
      description: input.description.trim(),
      price: input.price,
      stockQty: input.stockQty,
      emoji: input.emoji.trim() || "🍽️",
      gradient: input.gradient,
      imageUrl: input.imageUrl,
      categoryId: input.categoryId,
      isAvailable: input.isAvailable,
    },
  });

  revalidateMenuPages();
}

export async function updateStockQty(id: string, stockQty: number): Promise<void> {
  await requireOwner();
  if (!Number.isInteger(stockQty) || stockQty < 0) {
    throw new Error("Stock quantity must be a non-negative whole number.");
  }

  await prisma.menuItem.update({
    where: { id },
    data: { stockQty },
  });

  revalidateMenuPages();
}

export async function toggleAvailability(id: string, isAvailable: boolean): Promise<void> {
  await requireOwner();

  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable },
  });

  revalidateMenuPages();
}

export async function deleteMenuItem(id: string): Promise<void> {
  await requireOwner();

  const orderItemCount = await prisma.orderItem.count({ where: { menuItemId: id } });
  if (orderItemCount > 0) {
    throw new Error(
      "This item has past orders and can't be deleted. Mark it unavailable instead."
    );
  }

  await prisma.menuItem.delete({ where: { id } });
  revalidateMenuPages();
}
