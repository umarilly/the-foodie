import type { Metadata } from "next";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const session = await auth();
  const user = session?.user
    ? await prisma.user.findUnique({ where: { id: session.user.id } })
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="font-heading text-3xl font-semibold">Checkout</h1>
      <div className="mt-8">
        <CheckoutForm
          defaultName={user ? `${user.firstName} ${user.lastName}` : ""}
          defaultPhone={user?.phone ?? ""}
          defaultAddress={user?.address ?? ""}
        />
      </div>
    </div>
  );
}
