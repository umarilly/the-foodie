type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

/**
 * Sends transactional email via the Resend HTTP API when RESEND_API_KEY is
 * configured. Without a key (the default for local/demo use), this just
 * logs the email so the rest of the flow (contact form, order confirmation)
 * still works end-to-end without requiring real credentials.
 */
export async function sendEmail({ to, subject, html }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "The Foodie <onboarding@resend.dev>";

  if (!apiKey) {
    console.log(`[email:mock] to=${to} subject="${subject}"\n${html}`);
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!response.ok) {
    console.error("Failed to send email", await response.text());
  }
}
