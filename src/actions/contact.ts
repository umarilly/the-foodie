"use server";

import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import { contactSchema } from "@/lib/validations";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type ContactState = {
  error?: string;
  success?: boolean;
};

export async function submitContactAction(
  _prevState: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    return { error: "Please fill in every field with a valid value." };
  }

  await prisma.contactMessage.create({ data: parsed.data });

  await sendEmail({
    to: "hello@thefoodie.example",
    subject: `New message: ${parsed.data.subject}`,
    html: `<p><strong>From:</strong> ${escapeHtml(parsed.data.name)} (${escapeHtml(parsed.data.email)})</p><p>${escapeHtml(parsed.data.message)}</p>`,
  });

  return { success: true };
}
