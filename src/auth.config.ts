import type { NextAuthConfig } from "next-auth";

// Edge-safe config: no providers that touch Prisma live here, so this file
// (and anything that only imports it, like middleware.ts) never pulls the
// Node-only Prisma client into the Edge bundle. The real Credentials
// provider is added on top of this in `auth.ts`, which only runs in the
// Node runtime (route handlers, server components, server actions).
export const authConfig = {
  // Required when self-hosting outside a platform Auth.js auto-trusts
  // (e.g. Vercel) — without it, every request behind Docker/a reverse
  // proxy is rejected with an UntrustedHost error.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role: "CUSTOMER" | "ADMIN" }).role;
        token.firstName = (user as { firstName: string }).firstName;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "CUSTOMER" | "ADMIN";
        session.user.firstName = token.firstName as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
