// Fixed palette so Tailwind's build-time class scanner can see every
// possible gradient string as a literal — arbitrary DB-supplied class
// names would never get their CSS generated.
export const DISH_GRADIENTS = [
  { label: "Orange → Rose", value: "from-orange-200 to-rose-300" },
  { label: "Orange → Red", value: "from-orange-200 to-red-300" },
  { label: "Lime → Green", value: "from-lime-200 to-green-300" },
  { label: "Red → Orange", value: "from-red-200 to-orange-300" },
  { label: "Amber → Yellow", value: "from-amber-200 to-yellow-300" },
  { label: "Sky → Blue", value: "from-sky-200 to-blue-300" },
  { label: "Purple → Pink", value: "from-purple-200 to-pink-300" },
  { label: "Teal → Cyan", value: "from-teal-200 to-cyan-300" },
] as const;

export const DEFAULT_GRADIENT = DISH_GRADIENTS[0].value;
