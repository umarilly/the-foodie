"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore, cartTotalCents } from "@/store/cart-store";
import { formatCents } from "@/lib/money";
import { createOrderAction, type CheckoutState } from "@/actions/checkout";

const initialState: CheckoutState = {};
const DELIVERY_FEE_CENTS = 15000;
const FREE_DELIVERY_THRESHOLD_CENTS = 300000;

export function CheckoutForm({
  defaultName,
  defaultPhone,
  defaultAddress,
}: {
  defaultName: string;
  defaultPhone: string;
  defaultAddress: string;
}) {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const clear = useCartStore((state) => state.clear);
  const [state, formAction, pending] = useActionState(
    createOrderAction,
    initialState,
  );

  const subtotal = cartTotalCents(items);
  const deliveryFee =
    subtotal >= FREE_DELIVERY_THRESHOLD_CENTS ? 0 : DELIVERY_FEE_CENTS;
  const total = subtotal + deliveryFee;

  const itemsPayload = useMemo(
    () =>
      JSON.stringify(
        items.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      ),
    [items],
  );

  useEffect(() => {
    if (state.orderNumber) {
      clear();
      router.push(`/checkout/confirmation/${state.orderNumber}`);
    }
  }, [state.orderNumber, clear, router]);

  if (items.length === 0 && !state.orderNumber) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 py-16 text-center">
        <h1 className="font-heading text-2xl font-semibold">
          Your cart is empty
        </h1>
        <Button asChild size="lg">
          <Link href="/menu">Browse the menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid grid-cols-1 gap-10 lg:grid-cols-[1.3fr_1fr]">
      <input type="hidden" name="items" value={itemsPayload} />
      <fieldset disabled={pending} className="flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-xl font-semibold">Delivery details</h2>
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contactName">Full name</Label>
              <Input
                id="contactName"
                name="contactName"
                defaultValue={defaultName}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="contactPhone">Phone number</Label>
              <Input
                id="contactPhone"
                name="contactPhone"
                defaultValue={defaultPhone}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="deliveryAddress">Delivery address</Label>
              <Textarea
                id="deliveryAddress"
                name="deliveryAddress"
                defaultValue={defaultAddress}
                rows={3}
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="notes">Notes for the rider (optional)</Label>
              <Textarea id="notes" name="notes" rows={2} />
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold">Payment</h2>
          <PaymentFields />
        </div>

        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}

        <Button type="submit" size="lg" disabled={pending}>
          {pending ? "Placing order…" : `Place order — ${formatCents(total)}`}
        </Button>
      </fieldset>

      <aside className="h-fit rounded-xl border border-border bg-card p-6">
        <h2 className="font-heading text-lg font-semibold">Order summary</h2>
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((item) => (
            <li key={item.menuItemId} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-sm">
                <p className="font-medium leading-tight">{item.name}</p>
                <p className="text-muted-foreground">Qty {item.quantity}</p>
              </div>
              <span className="text-sm font-semibold tabular-nums">
                {formatCents(item.priceCents * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <Separator className="my-4" />
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="tabular-nums">{formatCents(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Delivery fee</span>
            <span className="tabular-nums">
              {deliveryFee === 0 ? "Free" : formatCents(deliveryFee)}
            </span>
          </div>
          <Separator className="my-1" />
          <div className="flex justify-between text-base font-semibold">
            <span>Total</span>
            <span className="tabular-nums">{formatCents(total)}</span>
          </div>
        </div>
      </aside>
    </form>
  );
}

function PaymentFields() {
  const [method, setMethod] = useState<"CASH_ON_DELIVERY" | "CARD">(
    "CASH_ON_DELIVERY",
  );

  return (
    <div className="mt-4 flex flex-col gap-3">
      <RadioGroup
        value={method}
        onValueChange={(value) => setMethod(value as "CASH_ON_DELIVERY" | "CARD")}
        name="paymentMethod"
        className="gap-3"
      >
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
          <RadioGroupItem value="CASH_ON_DELIVERY" id="cod" />
          <div>
            <p className="font-medium">Cash on delivery</p>
            <p className="text-sm text-muted-foreground">Pay with cash when your order arrives.</p>
          </div>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
          <RadioGroupItem value="CARD" id="card" />
          <div>
            <p className="font-medium">Card payment</p>
            <p className="text-sm text-muted-foreground">Simulated for this demo — no real charge is made.</p>
          </div>
        </label>
      </RadioGroup>
      {method === "CARD" && <CardDetailsFields />}
    </div>
  );
}

function CardDetailsFields() {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-lg border border-dashed border-border p-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <Label htmlFor="cardNumber">Card number</Label>
        <Input id="cardNumber" name="cardNumber" placeholder="4242 4242 4242 4242" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cardExpiry">Expiry</Label>
        <Input id="cardExpiry" name="cardExpiry" placeholder="MM/YY" />
      </div>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="cardCvc">CVC</Label>
        <Input id="cardCvc" name="cardCvc" placeholder="123" />
      </div>
    </div>
  );
}
