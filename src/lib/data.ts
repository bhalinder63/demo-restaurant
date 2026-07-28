import { prisma } from "./db";

export type DishCard = {
  id: string;
  name: string;
  description: string;
  price: number;
  rating: string;
  emoji: string;
  gradient: string;
};

function toDishCard(item: {
  id: string;
  name: string;
  description: string;
  price: { toString(): string };
  rating: { toString(): string };
  emoji: string;
  gradient: string;
}): DishCard {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: Number(item.price.toString()),
    rating: item.rating.toString(),
    emoji: item.emoji,
    gradient: item.gradient,
  };
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
