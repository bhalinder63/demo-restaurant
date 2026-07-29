import { prisma } from "./db";

export type DishCard = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: string;
  emoji: string;
  gradient: string;
  stockQty: number;
};

function toDishCard(item: {
  id: string;
  name: string;
  description: string;
  price: { toString(): string };
  rating: { toString(): string };
  emoji: string;
  gradient: string;
  stockQty: number;
}): DishCard {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price.toString()),
    rating: item.rating.toString(),
    emoji: item.emoji,
    gradient: item.gradient,
    stockQty: item.stockQty,
  };
}

export type MenuCategory = {
  id: string;
  name: string;
  items: DishCard[];
};

export async function getMenuByCategory(): Promise<MenuCategory[]> {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "desc" },
    include: {
      menuItems: {
        where: { isAvailable: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return categories
    .filter((c) => c.menuItems.length > 0)
    .map((c) => ({
      id: c.id,
      name: c.name,
      items: c.menuItems.map(toDishCard),
    }));
}

export async function getPopularDishes(): Promise<DishCard[]> {
  const items = await prisma.menuItem.findMany({
    where: { isAvailable: true, category: { name: "Popular Dishes" } },
    orderBy: { createdAt: "asc" },
  });
  return items.map(toDishCard);
}

export async function getFeaturedDish(): Promise<DishCard | null> {
  const item = await prisma.menuItem.findFirst({
    where: { isAvailable: true, category: { name: "Salads" } },
    orderBy: { createdAt: "asc" },
  });
  return item ? toDishCard(item) : null;
}

export type OrderDetail = {
  id: string;
  status: string;
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  createdAt: Date;
  items: {
    id: string;
    name: string;
    emoji: string;
    gradient: string;
    quantity: number;
    priceEach: number;
  }[];
};

export async function getOrderById(id: string): Promise<OrderDetail | null> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: { include: { menuItem: true } } },
  });
  if (!order) return null;

  return {
    id: order.id,
    status: order.status,
    total: Number(order.total.toString()),
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    deliveryAddress: order.deliveryAddress,
    createdAt: order.createdAt,
    items: order.items.map((oi) => ({
      id: oi.id,
      name: oi.menuItem.name,
      emoji: oi.menuItem.emoji,
      gradient: oi.menuItem.gradient,
      quantity: oi.quantity,
      priceEach: Number(oi.priceEach.toString()),
    })),
  };
}

// --- Admin-facing queries ---

export type AdminOrderSummary = {
  id: string;
  status: string;
  total: number;
  customerName: string;
  customerPhone: string;
  createdAt: Date;
  itemCount: number;
};

export async function getAllOrders(): Promise<AdminOrderSummary[]> {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { items: true },
  });

  return orders.map((o) => ({
    id: o.id,
    status: o.status,
    total: Number(o.total.toString()),
    customerName: o.customerName,
    customerPhone: o.customerPhone,
    createdAt: o.createdAt,
    itemCount: o.items.reduce((sum, i) => sum + i.quantity, 0),
  }));
}

export type AdminMenuItem = DishCard & {
  categoryId: string;
  categoryName: string;
  isAvailable: boolean;
};

export async function getAllMenuItemsAdmin(): Promise<AdminMenuItem[]> {
  const items = await prisma.menuItem.findMany({
    orderBy: [{ category: { sortOrder: "desc" } }, { createdAt: "asc" }],
    include: { category: true },
  });

  return items.map((item) => ({
    ...toDishCard(item),
    categoryId: item.categoryId,
    categoryName: item.category.name,
    isAvailable: item.isAvailable,
  }));
}

export async function getMenuItemByIdAdmin(id: string): Promise<AdminMenuItem | null> {
  const item = await prisma.menuItem.findUnique({
    where: { id },
    include: { category: true },
  });
  if (!item) return null;

  return {
    ...toDishCard(item),
    categoryId: item.categoryId,
    categoryName: item.category.name,
    isAvailable: item.isAvailable,
  };
}

export async function getCategories() {
  return prisma.category.findMany({ orderBy: { sortOrder: "desc" } });
}
