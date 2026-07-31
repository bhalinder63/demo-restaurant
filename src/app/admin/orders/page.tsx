import Header from "@/components/Header";
import AdminNav from "@/components/AdminNav";
import OrderStatusSelect from "@/components/OrderStatusSelect";
import { getAllOrders } from "@/lib/data";
import { formatCurrency } from "@/lib/currency";

export default async function AdminOrdersPage() {
  const orders = await getAllOrders();

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-4xl px-6 pb-24 pt-4">
        <h1 className="mb-6 font-display text-3xl font-bold text-brand-navy">Owner Dashboard</h1>
        <AdminNav active="/admin/orders" />

        {orders.length === 0 ? (
          <p className="text-brand-navy/60">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-surface p-4 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-brand-navy">
                    #{order.id.slice(-8)} — {order.customerName}
                  </p>
                  <p className="text-xs text-brand-navy/50">
                    {order.customerPhone} · {order.itemCount} item
                    {order.itemCount !== 1 ? "s" : ""} · {formatCurrency(order.total)}{" "}
                    · {order.createdAt.toLocaleString()}
                  </p>
                </div>
                <OrderStatusSelect orderId={order.id} status={order.status} />
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
