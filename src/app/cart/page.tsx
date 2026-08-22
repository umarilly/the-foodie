"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore, cartTotalCents } from "@/store/cart-store";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = cartTotalCents(items);

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center gap-4 px-4 py-24 text-center">
        <ShoppingBasket className="h-12 w-12 text-muted-foreground" />
        <h1 className="font-heading text-2xl font-semibold">
          Your cart is empty
        </h1>
        <p className="text-muted-foreground">
          Add a few dishes from the menu to get started.
        </p>
        <Button asChild size="lg">
          <Link href="/menu">Browse the menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold">Your Cart</h1>

      <ul className="mt-8 flex flex-col divide-y divide-border">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.li
              key={item.menuItemId}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-4 py-5"
            >
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="font-heading font-semibold">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatCents(item.priceCents)} each
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-border px-2 py-1">
                <button
                  type="button"
                  onClick={() => decrement(item.menuItemId)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted"
                  aria-label={`Decrease quantity of ${item.name}`}
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-5 text-center text-sm tabular-nums">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => increment(item.menuItemId)}
                  className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-muted"
                  aria-label={`Increase quantity of ${item.name}`}
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <span className="w-24 text-right font-semibold tabular-nums">
                {formatCents(item.priceCents * item.quantity)}
              </span>
              <button
                type="button"
                onClick={() => removeItem(item.menuItemId)}
                className="text-muted-foreground hover:text-destructive"
                aria-label={`Remove ${item.name} from cart`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>

      <Separator className="my-6" />

      <div className="ml-auto flex max-w-xs flex-col gap-3">
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{formatCents(total)}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Delivery fee and total are calculated at checkout.
        </p>
        <Button asChild size="lg">
          <Link href="/checkout">Proceed to checkout</Link>
        </Button>
      </div>
    </div>
  );
}
