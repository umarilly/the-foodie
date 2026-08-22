import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuItemCard } from "@/components/menu/menu-item-card";
import { getFeaturedItems } from "@/lib/data/menu";

export async function FeaturedDishes() {
  const items = await getFeaturedItems();

  if (items.length === 0) return null;

  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Fan favorites
            </p>
            <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
              What&apos;s popular right now
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link href="/menu">See full menu</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <MenuItemCard
              key={item.id}
              id={item.id}
              name={item.name}
              description={item.description}
              priceCents={item.priceCents}
              imageUrl={item.imageUrl}
              rating={item.rating}
              priority={index < 4}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
