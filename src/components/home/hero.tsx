import Image from "next/image";
import Link from "next/link";
import { Clock3, ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const STATS = [
  { icon: Clock3, label: "Open 24/7" },
  { icon: ShieldCheck, label: "Quality checked" },
  { icon: Truck, label: "Fast delivery" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-secondary/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Order online
          </span>
          <h1 className="font-heading text-5xl font-semibold leading-[1.05] sm:text-6xl">
            Real food, made
            <span className="text-primary"> properly</span>, delivered fast.
          </h1>
          <p className="max-w-md text-lg text-muted-foreground">
            From sizzling steaks to stone-baked pizza — order from a kitchen
            that actually cares what goes on the plate.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="text-base">
              <Link href="/menu">View Menu</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
          <div className="mt-2 flex flex-wrap gap-6">
            {STATS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground"
              >
                <Icon className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1200&auto=format&fit=crop"
              alt="Signature dish from The Foodie"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card p-4 shadow-lg sm:block">
            <p className="font-heading text-2xl font-semibold text-primary">
              15–25 min
            </p>
            <p className="text-sm text-muted-foreground">Average delivery time</p>
          </div>
        </div>
      </div>
    </section>
  );
}
