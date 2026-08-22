"use server";

import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validations";
import { generateOrderNumber } from "@/lib/order-number";

const FREE_DELIVERY_THRESHOLD_CENTS = 300000; // Rs 3,000
const DELIVERY_FEE_CENTS = 15000; // Rs 150

const cartItemsSchema = z
  .array(
    z.object({
      menuItemId: z.string().min(1),
      quantity: z.coerce.number().int().min(1).max(20),
    }),
  )
  .min(1, "Your cart is empty");

export type CheckoutState = {
  error?: string;
  orderNumber?: string;
};

export async function createOrderAction(
  _prevState: CheckoutState,
  formData: FormData,
): Promise<CheckoutState> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to place an order." };
  }

  const parsedForm = checkoutSchema.safeParse({
    contactName: formData.get("contactName"),
    contactPhone: formData.get("contactPhone"),
    deliveryAddress: formData.get("deliveryAddress"),
    notes: formData.get("notes") ?? "",
    paymentMethod: formData.get("paymentMethod"),
    cardNumber: formData.get("cardNumber") ?? undefined,
    cardExpiry: formData.get("cardExpiry") ?? undefined,
    cardCvc: formData.get("cardCvc") ?? undefined,
  });

  if (!parsedForm.success) {
    return { error: "Please fill in every required field." };
  }

  let cartItemsRaw: unknown;
  try {
    cartItemsRaw = JSON.parse(String(formData.get("items") ?? "[]"));
  } catch {
    return { error: "Your cart looks invalid — please try again." };
  }

  const parsedItems = cartItemsSchema.safeParse(cartItemsRaw);
  if (!parsedItems.success) {
    return { error: "Your cart is empty." };
  }

  if (
    parsedForm.data.paymentMethod === "CARD" &&
    (!parsedForm.data.cardNumber ||
      !parsedForm.data.cardExpiry ||
      !parsedForm.data.cardCvc)
  ) {
    return { error: "Enter your card details to pay by card." };
  }

  // Prices are never trusted from the client: re-fetch each menu item and
  // compute the total from what's actually in the database right now.
  const menuItemIds = parsedItems.data.map((item) => item.menuItemId);
  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: menuItemIds }, isAvailable: true },
  });
  const menuItemById = new Map(menuItems.map((item) => [item.id, item]));

  const orderLines = parsedItems.data.flatMap((line) => {
    const menuItem = menuItemById.get(line.menuItemId);
    if (!menuItem) return [];
    return [
      {
        menuItemId: menuItem.id,
        nameSnapshot: menuItem.name,
        priceCentsSnapshot: menuItem.priceCents,
        quantity: line.quantity,
      },
    ];
  });

  if (orderLines.length === 0) {
    return { error: "The items in your cart are no longer available." };
  }

  const subtotalCents = orderLines.reduce(
    (sum, line) => sum + line.priceCentsSnapshot * line.quantity,
    0,
  );
  const deliveryFeeCents =
    subtotalCents >= FREE_DELIVERY_THRESHOLD_CENTS ? 0 : DELIVERY_FEE_CENTS;
  const totalCents = subtotalCents + deliveryFeeCents;

  const order = await prisma.order.create({
    data: {
      orderNumber: generateOrderNumber(),
      userId: session.user.id,
      status: "PENDING",
      paymentMethod: parsedForm.data.paymentMethod,
      // Card payments are simulated for this project — treated as paid
      // immediately since no real payment gateway is connected.
      paymentStatus:
        parsedForm.data.paymentMethod === "CARD" ? "PAID" : "PENDING",
      subtotalCents,
      deliveryFeeCents,
      totalCents,
      contactName: parsedForm.data.contactName,
      contactPhone: parsedForm.data.contactPhone,
      deliveryAddress: parsedForm.data.deliveryAddress,
      notes: parsedForm.data.notes || null,
      items: { create: orderLines },
    },
  });

  return { orderNumber: order.orderNumber };
}
