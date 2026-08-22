import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Log in",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-20">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-muted-foreground">
          Log in to track orders and check out faster.
        </p>
      </div>
      <LoginForm callbackUrl={callbackUrl} />
    </div>
  );
}
