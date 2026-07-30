import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const popular = await prisma.category.upsert({
    where: { name: "Popular Dishes" },
    update: {},
    create: { name: "Popular Dishes", sortOrder: 1 },
  });

  const salads = await prisma.category.upsert({
    where: { name: "Salads" },
    update: {},
    create: { name: "Salads", sortOrder: 0 },
  });

  const menuItems = [
    {
      name: "Salmon Salad",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      price: 12,
      emoji: "🥗",
      gradient: "from-orange-200 to-rose-300",
      rating: 4.8,
      stockQty: 25,
      categoryId: salads.id,
    },
    {
      name: "Chinese noodles Pasta",
      description: "We denounce with righteous indignation and dislike men.",
      price: 20,
      emoji: "🍜",
      gradient: "from-orange-200 to-red-300",
      rating: 4.7,
      stockQty: 30,
      categoryId: popular.id,
    },
    {
      name: "Vegetable Chowmein",
      description: "We denounce with righteous indignation and dislike men.",
      price: 20,
      emoji: "🥗",
      gradient: "from-lime-200 to-green-300",
      rating: 4.6,
      stockQty: 30,
      categoryId: popular.id,
    },
    {
      name: "Pasta al pomodoro",
      description: "We denounce with righteous indignation and dislike men.",
      price: 20,
      emoji: "🍝",
      gradient: "from-red-200 to-orange-300",
      rating: 4.5,
      stockQty: 30,
      categoryId: popular.id,
    },
    {
      name: "Rice and curry",
      description: "We denounce with righteous indignation and dislike men.",
      price: 20,
      emoji: "🍛",
      gradient: "from-amber-200 to-yellow-300",
      rating: 4.9,
      stockQty: 30,
      categoryId: popular.id,
    },
  ];

  for (const item of menuItems) {
    await prisma.menuItem.upsert({
      where: { name: item.name },
      update: item,
      create: item,
    });
  }

  const ownerPasswordHash = await bcrypt.hash("owner123", 10);
  await prisma.user.upsert({
    where: { email: "owner@foodie.test" },
    update: {},
    create: {
      name: "Restaurant Owner",
      email: "owner@foodie.test",
      passwordHash: ownerPasswordHash,
      role: "OWNER",
    },
  });

  const customerPasswordHash = await bcrypt.hash("customer123", 10);
  await prisma.user.upsert({
    where: { email: "customer@foodie.test" },
    update: {},
    create: {
      name: "Test Customer",
      email: "customer@foodie.test",
      passwordHash: customerPasswordHash,
      role: "CUSTOMER",
    },
  });

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
