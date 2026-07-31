import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/Header";
import { prisma } from "@/lib/db";
import { ORDER_STATUS_LABEL, ORDER_STATUS_COLOR } from "@/lib/order-status";
import { formatCurrency } from "@/lib/currency";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/orders");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="relative flex-1 bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 pb-24 pt-4">
        <h1 className="mb-8 font-display text-3xl font-bold text-brand-navy">My Orders</h1>

        {orders.length === 0 ? (
          <div className="rounded-2xl bg-surface p-10 text-center shadow-sm ring-1 ring-black/5 dark:ring-white/10">
            <p className="text-brand-navy/60">You haven&apos;t placed any orders yet.</p>
            <Link
              href="/menu"
              className="mt-4 inline-block rounded-full bg-brand-orange px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brand-orange-dark"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/order/${order.id}`}
                className="flex items-center justify-between rounded-2xl bg-surface p-5 shadow-sm ring-1 ring-black/5 dark:ring-white/10 transition-shadow hover:shadow-md"
              >
                <div>
                  <p className="font-semibold text-brand-navy">
                    Order #{order.id.slice(-8)}
                  </p>
                  <p className="text-xs text-brand-navy/50">
                    {order.createdAt.toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-brand-navy">
                    {formatCurrency(Number(order.total))}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${ORDER_STATUS_COLOR[order.status] ?? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"}`}
                  >
                    {ORDER_STATUS_LABEL[order.status] ?? order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
