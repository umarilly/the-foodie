import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { MenuBrowser } from "@/components/menu/menu-browser";
import { getCategoriesWithItems } from "@/lib/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: "Browse the full menu at The Foodie and order online.",
};

export default async function MenuPage() {
  const categories = await getCategoriesWithItems();
  const serialized = categories.map((category) => ({
    ...category,
    items: category.items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      imageUrl: item.imageUrl,
      rating: item.rating,
    })),
  }));

  return (
    <div>
      <PageHero
        eyebrow="Our Menu"
        title="Everything, made fresh to order"
        description="From starters to dessert — pick your favorites and we'll get cooking."
      />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <MenuBrowser categories={serialized} />
      </div>
    </div>
  );
}
