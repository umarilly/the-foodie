import type { Metadata } from "next";
import { ReceiptText, Clock3, UtensilsCrossed, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatCents } from "@/lib/money";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default async function AdminDashboardPage() {
  const [orderCount, pendingCount, menuItemCount, revenue, recentOrders] =
    await Promise.all([
      prisma.order.count(),
      prisma.order.count({
        where: { status: { in: ["PENDING", "CONFIRMED", "PREPARING"] } },
      }),
      prisma.menuItem.count(),
      prisma.order.aggregate({
        _sum: { totalCents: true },
        where: { status: { not: "CANCELLED" } },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { items: true },
      }),
    ]);

  const stats = [
    {
      label: "Total orders",
      value: orderCount.toString(),
      icon: ReceiptText,
    },
    {
      label: "Active orders",
      value: pendingCount.toString(),
      icon: Clock3,
    },
    {
      label: "Menu items",
      value: menuItemCount.toString(),
      icon: UtensilsCrossed,
    },
    {
      label: "Revenue",
      value: formatCents(revenue._sum.totalCents ?? 0),
      icon: Wallet,
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <stat.icon className="h-4 w-4" />
              <span className="text-sm">{stat.label}</span>
            </div>
            <p className="mt-2 font-heading text-2xl font-semibold">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">Recent orders</h2>
        <ul className="mt-4 flex flex-col divide-y divide-border">
          {recentOrders.map((order) => (
            <li key={order.id}>
              <Link
                href={`/admin/orders/${order.orderNumber}`}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div>
                  <p className="font-medium">{order.orderNumber}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.contactName} · {order.items.length} item
                    {order.items.length === 1 ? "" : "s"}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums">
                    {formatCents(order.totalCents)}
                  </span>
                  <OrderStatusBadge status={order.status} />
                </div>
              </Link>
            </li>
          ))}
          {recentOrders.length === 0 && (
            <p className="py-3 text-sm text-muted-foreground">
              No orders yet.
            </p>
          )}
        </ul>
      </div>
    </div>
  );
}
