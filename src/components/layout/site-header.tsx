import { Logo } from "@/components/layout/logo";
import { NavLinks } from "@/components/layout/nav-links";
import { MobileNav } from "@/components/layout/mobile-nav";
import { AccountMenu } from "@/components/layout/account-menu";
import { CartButton } from "@/components/cart/cart-button";

type SessionUser = {
  id: string;
  firstName: string;
  role: "CUSTOMER" | "ADMIN";
  name?: string | null;
  email?: string | null;
};

export function SiteHeader({ user }: { user: SessionUser | null }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <MobileNav isLoggedIn={!!user} isAdmin={user?.role === "ADMIN"} />
          <Logo />
        </div>
        <NavLinks className="hidden md:flex" />
        <div className="flex items-center gap-1">
          <CartButton />
          <AccountMenu user={user} />
        </div>
      </div>
    </header>
  );
}
