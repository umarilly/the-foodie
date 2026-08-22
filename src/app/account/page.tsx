import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/account/profile-form";
import { PasswordForm } from "@/components/account/password-form";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) notFound();

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });
  if (!user) notFound();

  return (
    <div className="flex flex-col gap-10">
      <section>
        <h2 className="font-heading text-xl font-semibold">Your details</h2>
        <p className="text-sm text-muted-foreground">
          Used to prefill your delivery info at checkout.
        </p>
        <div className="mt-4 max-w-md">
          <ProfileForm
            firstName={user.firstName}
            lastName={user.lastName}
            email={user.email}
            phone={user.phone ?? ""}
            address={user.address ?? ""}
          />
        </div>
      </section>

      <Separator />

      <section>
        <h2 className="font-heading text-xl font-semibold">Change password</h2>
        <div className="mt-4 max-w-md">
          <PasswordForm />
        </div>
      </section>
    </div>
  );
}
