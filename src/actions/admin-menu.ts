"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { menuItemSchema } from "@/lib/validations";

export type MenuItemFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function collectFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fieldErrors[key]) {
      fieldErrors[key] = issue.message;
    }
  }
  return fieldErrors;
}

export async function createMenuItemAction(
  _prevState: MenuItemFormState,
  formData: FormData,
): Promise<MenuItemFormState> {
  const admin = await requireAdmin();
  if (!admin) return { error: "Not authorized." };

  const parsed = menuItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    priceCents: formData.get("priceCents"),
    imageUrl: formData.get("imageUrl"),
    categoryId: formData.get("categoryId"),
    isAvailable: formData.get("isAvailable") === "on",
    isFeatured: formData.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }

  const baseSlug = slugify(parsed.data.name);
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.menuItem.findUnique({ where: { slug } })) {
    suffix += 1;
    slug = `${baseSlug}-${suffix}`;
  }

  await prisma.menuItem.create({ data: { ...parsed.data, slug } });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  redirect("/admin/menu");
}

export async function updateMenuItemAction(
  _prevState: MenuItemFormState,
  formData: FormData,
): Promise<MenuItemFormState> {
  const admin = await requireAdmin();
  if (!admin) return { error: "Not authorized." };

  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "Missing item id." };

  const parsed = menuItemSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    priceCents: formData.get("priceCents"),
    imageUrl: formData.get("imageUrl"),
    categoryId: formData.get("categoryId"),
    isAvailable: formData.get("isAvailable") === "on",
    isFeatured: formData.get("isFeatured") === "on",
  });

  if (!parsed.success) {
    return {
      error: "Please fix the errors below.",
      fieldErrors: collectFieldErrors(parsed.error.issues),
    };
  }

  await prisma.menuItem.update({ where: { id }, data: parsed.data });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
  redirect("/admin/menu");
}

export async function deleteMenuItemAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await prisma.menuItem.delete({ where: { id } });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}

export async function toggleAvailabilityAction(formData: FormData) {
  const admin = await requireAdmin();
  if (!admin) return;

  const id = String(formData.get("id") ?? "");
  const isAvailable = formData.get("isAvailable") === "true";
  if (!id) return;

  await prisma.menuItem.update({
    where: { id },
    data: { isAvailable: !isAvailable },
  });

  revalidatePath("/admin/menu");
  revalidatePath("/menu");
}
