import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReceiptText } from "lucide-react";
import { auth } from "@/auth";
import { getOrdersForUser } from "@/lib/data/orders";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { formatCents } from "@/lib/money";

export const metadata: Metadata = {
  title: "My Orders",
};

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user) notFound();

  const orders = await getOrdersForUser(session.user.id);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center text-muted-foreground">
        <ReceiptText className="h-10 w-10 opacity-40" />
        <p>You haven&apos;t placed any orders yet.</p>
        <Link href="/menu" className="font-medium text-primary hover:underline">
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <ul className="flex flex-col divide-y divide-border">
      {orders.map((order) => (
        <li key={order.id}>
          <Link
            href={`/account/orders/${order.orderNumber}`}
            className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                {order.items.length} item{order.items.length === 1 ? "" : "s"} ·{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold tabular-nums">
                {formatCents(order.totalCents)}
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
