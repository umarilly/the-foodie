import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus, Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCents } from "@/lib/money";
import {
  DeleteMenuItemButton,
  ToggleAvailabilityButton,
} from "@/components/admin/menu-item-row-actions";

export const metadata: Metadata = {
  title: "Manage Menu",
};

export default async function AdminMenuPage() {
  const items = await prisma.menuItem.findMany({
    include: { category: true },
    orderBy: [{ category: { sortOrder: "asc" } }, { name: "asc" }],
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold">Menu items</h2>
        <Button asChild>
          <Link href="/admin/menu/new">
            <Plus className="h-4 w-4" />
            New item
          </Link>
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.isFeatured && (
                        <Badge variant="outline" className="mt-0.5 text-[10px]">
                          Featured
                        </Badge>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {item.category.name}
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {formatCents(item.priceCents)}
                </td>
                <td className="px-4 py-3">
                  <ToggleAvailabilityButton
                    id={item.id}
                    isAvailable={item.isAvailable}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Button asChild variant="ghost" size="icon">
                      <Link href={`/admin/menu/${item.id}`} aria-label={`Edit ${item.name}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <DeleteMenuItemButton id={item.id} name={item.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
