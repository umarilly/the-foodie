import { MapPin, MenuSquare, ChefHat, Bike } from "lucide-react";

const STEPS = [
  {
    icon: MapPin,
    title: "Share your address",
    description: "Tell us where to deliver — we cover the whole city.",
  },
  {
    icon: MenuSquare,
    title: "Choose your food",
    description: "Browse the menu and build your order in seconds.",
  },
  {
    icon: ChefHat,
    title: "We start cooking",
    description: "Your order goes straight to the kitchen, made fresh.",
  },
  {
    icon: Bike,
    title: "Track your delivery",
    description: "Watch your order move from kitchen to your door.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="mx-auto mb-12 max-w-xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          How it works
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
          Four steps to your next meal
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <step.icon className="h-7 w-7" />
            </div>
            <span className="mb-2 font-heading text-sm font-semibold text-accent">
              0{index + 1}
            </span>
            <h3 className="font-heading text-lg font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
