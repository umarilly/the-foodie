import { prisma } from "@/lib/prisma";

export function getCategoriesWithItems() {
  return prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      items: {
        where: { isAvailable: true },
        orderBy: { name: "asc" },
      },
    },
  });
}

export function getFeaturedItems() {
  return prisma.menuItem.findMany({
    where: { isAvailable: true, isFeatured: true },
    include: { category: true },
    orderBy: { name: "asc" },
    take: 8,
  });
}

export function getMenuItemBySlug(slug: string) {
  return prisma.menuItem.findUnique({
    where: { slug },
    include: { category: true },
  });
}
