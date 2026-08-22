"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore, cartTotalCents } from "@/store/cart-store";
import { formatCents } from "@/lib/money";

export function CartDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const items = useCartStore((state) => state.items);
  const increment = useCartStore((state) => state.increment);
  const decrement = useCartStore((state) => state.decrement);
  const removeItem = useCartStore((state) => state.removeItem);
  const total = cartTotalCents(items);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading text-xl">Your Cart</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-muted-foreground">
              <ShoppingBasket className="h-10 w-10 opacity-40" />
              <p>Your cart is empty.</p>
              <Button asChild size="sm" onClick={() => onOpenChange(false)}>
                <Link href="/menu">Browse the menu</Link>
              </Button>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 py-2">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.li
                    key={item.menuItemId}
                    layout
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex gap-3"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium leading-tight">
                          {item.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.menuItemId)}
                          className="text-muted-foreground hover:text-destructive"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-border px-1.5 py-0.5">
                          <button
                            type="button"
                            onClick={() => decrement(item.menuItemId)}
                            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-muted"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => increment(item.menuItemId)}
                            className="flex h-5 w-5 items-center justify-center rounded-full hover:bg-muted"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold tabular-nums">
                          {formatCents(item.priceCents * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="gap-3 border-t border-border pt-4">
            <div className="flex items-center justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span className="tabular-nums">{formatCents(total)}</span>
            </div>
            <Separator />
            <Button asChild size="lg" onClick={() => onOpenChange(false)}>
              <Link href="/checkout">Checkout</Link>
            </Button>
            <Button asChild variant="outline" onClick={() => onOpenChange(false)}>
              <Link href="/cart">View cart</Link>
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
