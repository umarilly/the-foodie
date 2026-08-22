import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "CUSTOMER" | "ADMIN";
      firstName: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: "CUSTOMER" | "ADMIN";
    firstName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "CUSTOMER" | "ADMIN";
    firstName: string;
  }
}
