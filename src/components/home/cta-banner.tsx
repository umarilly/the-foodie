import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="bg-primary py-16 text-primary-foreground">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
        <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
          Hungry already? Let&apos;s fix that.
        </h2>
        <p className="max-w-md text-primary-foreground/85">
          Browse the full menu and get your order in — most deliveries land
          in 15–25 minutes.
        </p>
        <Button
          asChild
          size="lg"
          variant="secondary"
          className="text-base font-semibold"
        >
          <Link href="/menu">Order Now</Link>
        </Button>
      </div>
    </section>
  );
}
