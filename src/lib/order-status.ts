export const ORDER_STATUS_FLOW = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
] as const;

export const ORDER_STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export const ORDER_STATUS_COLOR: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  CONFIRMED: "bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400",
  PREPARING: "bg-orange-100 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400",
  OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400",
  DELIVERED: "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-400",
  CANCELLED: "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400",
};
