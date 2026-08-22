"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MenuItemCard } from "@/components/menu/menu-item-card";

type MenuItem = {
  id: string;
  name: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  rating: number;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  items: MenuItem[];
};

export function MenuBrowser({ categories }: { categories: Category[] }) {
  const nonEmpty = categories.filter((c) => c.items.length > 0);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="mb-8 h-auto flex-wrap justify-start gap-1 bg-transparent p-0">
        <TabsTrigger
          value="all"
          className="rounded-full border border-border px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
        >
          All
        </TabsTrigger>
        {nonEmpty.map((category) => (
          <TabsTrigger
            key={category.id}
            value={category.slug}
            className="rounded-full border border-border px-4 py-2 data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="all">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {nonEmpty
            .flatMap((category) => category.items)
            .map((item, index) => (
              <MenuItemCard key={item.id} {...item} priority={index < 4} />
            ))}
        </div>
      </TabsContent>

      {nonEmpty.map((category) => (
        <TabsContent key={category.id} value={category.slug}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.items.map((item) => (
              <MenuItemCard key={item.id} {...item} />
            ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
