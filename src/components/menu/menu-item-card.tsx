"use client";

import Image from "next/image";
import { Plus, Star } from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { formatCents } from "@/lib/money";

type MenuItemCardProps = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  rating: number;
  priority?: boolean;
};

export function MenuItemCard({
  id,
  name,
  description,
  priceCents,
  imageUrl,
  rating,
  priority = false,
}: MenuItemCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  function handleAdd() {
    addItem({ menuItemId: id, name, priceCents, imageUrl });
    toast.success(`${name} added to cart`);
  }

  return (
    <Card className="group overflow-hidden py-0 gap-0">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <Image
          src={imageUrl}
          alt={name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/90 px-2 py-1 text-xs font-medium backdrop-blur">
          <Star className="h-3 w-3 fill-accent text-accent" />
          {rating.toFixed(1)}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading text-lg font-semibold leading-tight">
            {name}
          </h3>
          <span className="shrink-0 font-semibold text-primary tabular-nums">
            {formatCents(priceCents)}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {description}
        </p>
        <motion.div whileTap={{ scale: 0.96 }} className="mt-2">
          <Button onClick={handleAdd} className="w-full gap-1.5">
            <Plus className="h-4 w-4" />
            Add to cart
          </Button>
        </motion.div>
      </div>
    </Card>
  );
}
