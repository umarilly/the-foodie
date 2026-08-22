import { auth } from "@/auth";

/**
 * Re-verifies the ADMIN role from the server session on every call. The
 * `/admin/*` proxy check is an optimistic UX redirect only — every
 * mutating admin action must independently confirm the acting user's role
 * here rather than trusting that a request reaching this code already
 * passed the proxy.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return null;
  }
  return session.user;
}
