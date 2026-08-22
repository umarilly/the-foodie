import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-border bg-secondary/40 py-16 text-center",
        className,
      )}
    >
      <div className="mx-auto max-w-2xl px-4">
        {eyebrow && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-heading text-4xl font-semibold sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
