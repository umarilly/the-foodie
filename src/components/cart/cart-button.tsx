"use client";

import { useState } from "react";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, cartCount } from "@/store/cart-store";
import { CartDrawer } from "@/components/cart/cart-drawer";

export function CartButton() {
  const [open, setOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const count = cartCount(items);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
        onClick={() => setOpen(true)}
      >
        <ShoppingBasket className="h-5 w-5" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
            {count}
          </span>
        )}
      </Button>
      <CartDrawer open={open} onOpenChange={setOpen} />
    </>
  );
}
