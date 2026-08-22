import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getOrderByNumberForUser } from "@/lib/data/orders";
import { OrderStatusBadge } from "@/components/orders/order-status-badge";
import { OrderTracker } from "@/components/orders/order-tracker";
import { Separator } from "@/components/ui/separator";
import { formatCents } from "@/lib/money";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const session = await auth();
  if (!session?.user) notFound();

  const order = await getOrderByNumberForUser(orderNumber, session.user.id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-heading text-xl font-semibold">
            {order.orderNumber}
          </h2>
          <p className="text-sm text-muted-foreground">
            Placed{" "}
            {new Date(order.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
            })}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <OrderTracker status={order.status} />
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold">Items</h3>
        <ul className="mt-4 flex flex-col gap-2 text-sm">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between">
              <span>
                {item.quantity} × {item.nameSnapshot}
              </span>
              <span className="tabular-nums">
                {formatCents(item.priceCentsSnapshot * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="flex flex-col gap-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatCents(order.subtotalCents)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery fee</span>
            <span className="tabular-nums">
              {order.deliveryFeeCents === 0 ? "Free" : formatCents(order.deliveryFeeCents)}
            </span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatCents(order.totalCents)}</span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg font-semibold">Delivery details</h3>
        <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Recipient</dt>
            <dd>{order.contactName}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Phone</dt>
            <dd>{order.contactPhone}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-muted-foreground">Address</dt>
            <dd>{order.deliveryAddress}</dd>
          </div>
          {order.notes && (
            <div className="sm:col-span-2">
              <dt className="text-muted-foreground">Notes</dt>
              <dd>{order.notes}</dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}
