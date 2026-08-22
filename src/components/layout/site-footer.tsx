import Link from "next/link";
import { Camera, Globe, MessageCircle } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { NAV_ITEMS } from "@/lib/nav-items";
import { NewsletterForm } from "@/components/layout/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-muted-foreground">
            Fresh, made-to-order food from our kitchen to your door. Real
            ingredients, no shortcuts.
          </p>
          <div className="flex gap-3 text-muted-foreground">
            <Link href="#" aria-label="Facebook" className="hover:text-primary">
              <Globe className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="hover:text-primary">
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Instagram" className="hover:text-primary">
              <Camera className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Explore
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Contact
          </h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li>G-9, Islamabad</li>
            <li>+92 313 5712381</li>
            <li>hello@thefoodie.example</li>
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-foreground">
            Stay in the loop
          </h3>
          <p className="mt-4 text-sm text-muted-foreground">
            Get news on new dishes and offers. No spam.
          </p>
          <div className="mt-3">
            <NewsletterForm />
          </div>
        </div>
      </div>
      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} The Foodie. All rights reserved.
      </div>
    </footer>
  );
}
