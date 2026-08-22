import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OrderTracker } from "@/components/orders/order-tracker";
import { formatCents } from "@/lib/money";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;
  const session = await auth();
  if (!session?.user) notFound();

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order || order.userId !== session.user.id) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <div className="flex flex-col items-center gap-3 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <h1 className="font-heading text-3xl font-semibold">
          Order confirmed
        </h1>
        <p className="text-muted-foreground">
          Thank you for ordering from The Foodie — order{" "}
          <span className="font-medium text-foreground">{order.orderNumber}</span>{" "}
          is on its way to the kitchen.
        </p>
      </div>

      <div className="mt-10 rounded-xl border border-border bg-card p-6">
        <OrderTracker status={order.status} />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">Order details</h2>
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
              {order.deliveryFeeCents === 0
                ? "Free"
                : formatCents(order.deliveryFeeCents)}
            </span>
          </div>
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatCents(order.totalCents)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-3">
        <Button asChild variant="outline">
          <Link href="/account/orders">View my orders</Link>
        </Button>
        <Button asChild>
          <Link href="/menu">Order more</Link>
        </Button>
      </div>
    </div>
  );
}
