import type { Metadata } from "next";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function SignupPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-20">
      <div className="text-center">
        <h1 className="font-heading text-3xl font-semibold">Create an account</h1>
        <p className="mt-2 text-muted-foreground">
          Sign up to order, track deliveries, and save your details.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}
