import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MenuItemForm } from "@/components/admin/menu-item-form";
import { updateMenuItemAction } from "@/actions/admin-menu";

export default async function EditMenuItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [item, categories] = await Promise.all([
    prisma.menuItem.findUnique({ where: { id } }),
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  if (!item) notFound();

  return (
    <div>
      <h2 className="font-heading text-xl font-semibold">Edit menu item</h2>
      <div className="mt-6">
        <MenuItemForm
          action={updateMenuItemAction}
          categories={categories}
          submitLabel="Save changes"
          defaultValues={{
            id: item.id,
            name: item.name,
            description: item.description,
            priceCents: item.priceCents,
            imageUrl: item.imageUrl,
            categoryId: item.categoryId,
            isAvailable: item.isAvailable,
            isFeatured: item.isFeatured,
          }}
        />
      </div>
    </div>
  );
}
