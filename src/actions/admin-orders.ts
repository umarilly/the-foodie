"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { orderStatusSchema } from "@/lib/validations";

export type OrderStatusState = {
  error?: string;
  success?: boolean;
};

export async function updateOrderStatusAction(
  _prevState: OrderStatusState,
  formData: FormData,
): Promise<OrderStatusState> {
  const admin = await requireAdmin();
  if (!admin) return { error: "Not authorized." };

  const orderId = String(formData.get("orderId") ?? "");
  const parsed = orderStatusSchema.safeParse({
    status: formData.get("status"),
  });

  if (!orderId || !parsed.success) {
    return { error: "Invalid status update." };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: { status: parsed.data.status },
  });

  revalidatePath("/admin/orders");
  revalidatePath("/account/orders");
  return { success: true };
}
