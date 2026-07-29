"use client";

import { useEffect, useState } from "react";
import {
  ORDER_STATUS_FLOW,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
} from "@/lib/order-status";

const POLL_INTERVAL_MS = 4000;
const TERMINAL_STATUSES = new Set(["DELIVERED", "CANCELLED"]);

export default function OrderStatusTracker({
  orderId,
  initialStatus,
}: {
  orderId: string;
  initialStatus: string;
}) {
  const [status, setStatus] = useState(initialStatus);

  useEffect(() => {
    if (TERMINAL_STATUSES.has(status)) return;

    let cancelled = false;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.status) {
          setStatus(data.status);
        }
      } catch {
        // transient network error — try again on the next tick
      }
    }, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [orderId, status]);

  const isCancelled = status === "CANCELLED";
  const currentStepIndex = ORDER_STATUS_FLOW.indexOf(
    status as (typeof ORDER_STATUS_FLOW)[number]
  );

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-brand-navy/50">
          {TERMINAL_STATUSES.has(status) ? "Final status" : "Live status — updates automatically"}
        </p>
        <span
          className={`rounded-full px-4 py-1.5 text-sm font-semibold ${ORDER_STATUS_COLOR[status] ?? "bg-gray-100 text-gray-700"}`}
        >
          {ORDER_STATUS_LABEL[status] ?? status}
        </span>
      </div>

      {!isCancelled && (
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center justify-between">
            {ORDER_STATUS_FLOW.map((step, i) => (
              <div key={step} className="flex flex-1 flex-col items-center last:flex-none">
                <div className="flex w-full items-center">
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      i <= currentStepIndex
                        ? "bg-brand-orange text-white"
                        : "bg-brand-navy/10 text-brand-navy/40"
                    }`}
                  >
                    {i <= currentStepIndex ? "✓" : i + 1}
                  </div>
                  {i < ORDER_STATUS_FLOW.length - 1 && (
                    <div
                      className={`h-0.5 flex-1 transition-colors ${
                        i < currentStepIndex ? "bg-brand-orange" : "bg-brand-navy/10"
                      }`}
                    />
                  )}
                </div>
                <p className="mt-2 max-w-[70px] text-center text-[11px] text-brand-navy/60">
                  {ORDER_STATUS_LABEL[step]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
