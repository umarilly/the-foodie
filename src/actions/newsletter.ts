"use server";

import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";

export type NewsletterState = {
  error?: string;
  success?: boolean;
};

export async function subscribeAction(
  _prevState: NewsletterState,
  formData: FormData,
): Promise<NewsletterState> {
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return { error: "Enter a valid email address." };
  }

  const email = parsed.data.email.toLowerCase();

  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return { success: true };
}
