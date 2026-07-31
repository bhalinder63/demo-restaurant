import { notFound } from "next/navigation";
import Header from "@/components/Header";
import DishPhoto from "@/components/DishPhoto";
import OrderStatusTracker from "@/components/OrderStatusTracker";
import { getOrderById } from "@/lib/data";
import { formatCurrency } from "@/lib/currency";

export default async function OrderStatusPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getOrderById(id);

  if (!order) notFound();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-4">
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold text-brand-navy">Order confirmed 🎉</h1>
          <p className="mt-1 text-sm text-brand-navy/50">Order #{order.id.slice(-8)}</p>
        </div>

        <OrderStatusTracker orderId={order.id} initialStatus={order.status} />

        <div className="mb-6 rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
          <h2 className="mb-4 font-semibold text-brand-navy">Items</h2>
          <div className="flex flex-col gap-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center gap-4">
                <DishPhoto
                  name={item.name}
                  emoji={item.emoji}
                  gradient={item.gradient}
                  imageUrl={item.imageUrl}
                  className="h-12 w-12 shrink-0 border-2 border-brand-cream"
                  emojiClassName="text-xl"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-navy">{item.name}</p>
                  <p className="text-xs text-brand-navy/50">
                    {item.quantity} × {formatCurrency(item.priceEach)}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-navy">
                  {formatCurrency(item.quantity * item.priceEach)}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-brand-navy/10 pt-4 text-base font-bold text-brand-navy">
            <span>Total</span>
            <span>{formatCurrency(order.total)}</span>
          </div>
        </div>

        <div className="rounded-2xl bg-surface p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
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
