import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DishPhoto from "@/components/DishPhoto";
import { getOrderById } from "@/lib/data";
import {
  ORDER_STATUS_FLOW,
  ORDER_STATUS_LABEL,
  ORDER_STATUS_COLOR,
} from "@/lib/order-status";

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  const isCancelled = order.status === "CANCELLED";
  const currentStepIndex = ORDER_STATUS_FLOW.indexOf(
    order.status as (typeof ORDER_STATUS_FLOW)[number]
  );

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-navy">Order confirmed 🎉</h1>
            <p className="mt-1 text-sm text-brand-navy/50">Order #{order.id.slice(-8)}</p>
          </div>
          <span
            className={`rounded-full px-4 py-1.5 text-sm font-semibold ${ORDER_STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-700"}`}
          >
            {ORDER_STATUS_LABEL[order.status] ?? order.status}
          </span>
        </div>

        {!isCancelled && (
          <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <div className="flex items-center justify-between">
              {ORDER_STATUS_FLOW.map((step, i) => (
                <div key={step} className="flex flex-1 flex-col items-center last:flex-none">
                  <div className="flex w-full items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        i <= currentStepIndex
                          ? "bg-brand-orange text-white"
                          : "bg-brand-navy/10 text-brand-navy/40"
                      }`}
                    >
                      {i <= currentStepIndex ? "✓" : i + 1}
                    </div>
                    {i < ORDER_STATUS_FLOW.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 ${
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

        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 font-semibold text-brand-navy">Items</h2>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <DishPhoto
                  emoji={item.emoji}
                  gradient={item.gradient}
                  className="h-12 w-12 shrink-0 border-2 border-brand-cream"
                  emojiClassName="text-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-navy">{item.name}</p>
                  <p className="text-xs text-brand-navy/50">
                    {item.quantity} × ${item.priceEach.toFixed(2)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-navy">
                  ${(item.quantity * item.priceEach).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-brand-navy/10 pt-4 text-base font-bold text-brand-navy">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <h2 className="mb-4 font-semibold text-brand-navy">Delivery details</h2>
          <dl className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-brand-navy/50">Name</dt>
              <dd className="text-brand-navy">{order.customerName}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-brand-navy/50">Phone</dt>
              <dd className="text-brand-navy">{order.customerPhone}</dd>
            </div>
            <div className="flex justify-between gap-6">
              <dt className="shrink-0 text-brand-navy/50">Address</dt>
              <dd className="text-right text-brand-navy">{order.deliveryAddress}</dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
