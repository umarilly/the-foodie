import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { MenuItemForm } from "@/components/admin/menu-item-form";
import { createMenuItemAction } from "@/actions/admin-menu";

export const metadata: Metadata = {
  title: "New Menu Item",
};

export default async function NewMenuItemPage() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold">New menu item</h2>
      <div className="mt-6">
        <MenuItemForm
          action={createMenuItemAction}
          categories={categories}
          submitLabel="Create item"
        />
      </div>
    </div>
  );
}
