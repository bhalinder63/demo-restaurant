"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/app/admin/actions";
import { ORDER_STATUS_FLOW, ORDER_STATUS_LABEL } from "@/lib/order-status";

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newStatus = e.target.value;
    startTransition(async () => {
      await updateOrderStatus(orderId, newStatus);
    });
  }

  const allStatuses = [...ORDER_STATUS_FLOW, "CANCELLED"];

  return (
    <select
      value={status}
      onChange={handleChange}
      disabled={isPending}
      className="rounded-full border border-brand-navy/15 px-3 py-1.5 text-xs font-semibold text-brand-navy outline-none focus:border-brand-orange disabled:opacity-50"
    >
      {allStatuses.map((s) => (
        <option key={s} value={s}>
          {ORDER_STATUS_LABEL[s] ?? s}
        </option>
      ))}
    </select>
  );
}
