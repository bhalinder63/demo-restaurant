"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";

export type PlaceOrderInput = {
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: { menuItemId: string; quantity: number }[];
};

export async function placeOrder(
  input: PlaceOrderInput
): Promise<{ orderId: string }> {
  const customerName = input.customerName.trim();
  const customerPhone = input.customerPhone.trim();
  const deliveryAddress = input.deliveryAddress.trim();

  if (!customerName || !customerPhone || !deliveryAddress) {
    throw new Error("Please fill in your name, phone, and delivery address.");
  }
  if (input.items.length === 0) {
    throw new Error("Your cart is empty.");
  }
  for (const item of input.items) {
    if (item.quantity < 1) {
      throw new Error("Invalid item quantity.");
    }
  }

  const session = await auth();
  const userId = session?.user?.id;

  const orderId = await prisma.$transaction(async (tx) => {
    let total = 0;
    const orderItemsData: {
      menuItemId: string;
      quantity: number;
      priceEach: number;
    }[] = [];

    for (const cartItem of input.items) {
      const menuItem = await tx.menuItem.findUnique({
        where: { id: cartItem.menuItemId },
      });
      if (!menuItem || !menuItem.isAvailable) {
        throw new Error(`${menuItem?.name ?? "An item"} is no longer available.`);
      }

      // Atomic, concurrency-safe stock decrement: only succeeds if enough
      // stock remains at the moment of the update, guarding against two
      // simultaneous orders overselling the same item.
      const result = await tx.menuItem.updateMany({
        where: { id: menuItem.id, stockQty: { gte: cartItem.quantity } },
        data: { stockQty: { decrement: cartItem.quantity } },
      });
      if (result.count === 0) {
        throw new Error(`Only ${menuItem.stockQty} left of ${menuItem.name}.`);
      }

      const priceEach = Number(menuItem.price.toString());
      total += priceEach * cartItem.quantity;
      orderItemsData.push({
        menuItemId: menuItem.id,
        quantity: cartItem.quantity,
        priceEach,
      });
    }

    const order = await tx.order.create({
      data: {
        customerName,
        customerPhone,
        deliveryAddress,
        total,
        status: "CONFIRMED",
        userId,
        items: { create: orderItemsData },
      },
    });

    return order.id;
  });

  return { orderId };
}
