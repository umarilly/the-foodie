"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { NAV_ITEMS } from "@/lib/nav-items";
import { Logo } from "@/components/layout/logo";

export function MobileNav({
  isLoggedIn,
  isAdmin,
}: {
  isLoggedIn: boolean;
  isAdmin: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <SheetContent side="left" className="w-72">
        <SheetHeader>
          <SheetTitle asChild>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
          <div className="my-2 h-px bg-border" />
          {isLoggedIn ? (
            <>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
              >
                Profile
              </Link>
              <Link
                href="/account/orders"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
              >
                Orders
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
                >
                  Admin dashboard
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
