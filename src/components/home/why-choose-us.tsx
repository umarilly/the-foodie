import Image from "next/image";

const REASONS = [
  {
    number: "01",
    title: "Made-to-order, always",
    description: "Nothing sits under a heat lamp. Cooking starts when you order.",
  },
  {
    number: "02",
    title: "Real delivery windows",
    description: "Track your order status from kitchen to doorstep.",
  },
  {
    number: "03",
    title: "Simple, honest pricing",
    description: "No surprise fees at checkout — what you see is what you pay.",
  },
  {
    number: "04",
    title: "Loved by regulars",
    description: "Most of our orders come from people who keep coming back.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-2xl lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1000&auto=format&fit=crop"
            alt="Chef preparing food in the kitchen"
            fill
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why people choose us
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold sm:text-4xl">
            A kitchen that doesn&apos;t cut corners
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {REASONS.map((reason) => (
              <div key={reason.number}>
                <span className="font-heading text-2xl font-semibold text-accent">
                  {reason.number}
                </span>
                <h3 className="mt-1 font-heading text-lg font-semibold">
                  {reason.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
