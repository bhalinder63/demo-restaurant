export type Dish = {
  slug: string;
  name: string;
  price: number;
  rating: string;
  emoji: string;
  gradient: string;
  description: string;
};

export const popularDishes: Dish[] = [
  {
    slug: "chinese-noodles-pasta",
    name: "Chinese noodles Pasta",
    price: 20,
    rating: "5.6k",
    emoji: "🍜",
    gradient: "from-orange-200 to-red-300",
    description: "We denounce with righteous indignation and dislike men.",
  },
  {
    slug: "vegetable-chowmein",
    name: "Vegetable Chowmein",
    price: 20,
    rating: "5.6k",
    emoji: "🥗",
    gradient: "from-lime-200 to-green-300",
    description: "We denounce with righteous indignation and dislike men.",
  },
  {
    slug: "pasta-al-pomodoro",
    name: "Pasta al pomodoro",
    price: 20,
    rating: "5.6k",
    emoji: "🍝",
    gradient: "from-red-200 to-orange-300",
    description: "We denounce with righteous indignation and dislike men.",
  },
  {
    slug: "rice-and-curry",
    name: "Rice and curry",
    price: 20,
    rating: "5.6k",
    emoji: "🍛",
    gradient: "from-amber-200 to-yellow-300",
    description: "We denounce with righteous indignation and dislike men.",
  },
];

export const featuredDish: Dish = {
  slug: "salmon-salad",
  name: "Salmon Salad",
  price: 12,
  rating: "4.8",
  emoji: "🥗",
  gradient: "from-orange-200 to-rose-300",
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};
