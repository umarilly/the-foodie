import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-heading text-2xl font-semibold tracking-tight text-foreground",
        className,
      )}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M6 3v9.5a3.5 3.5 0 0 0 3 3.465V25M6 3v6M9 3v6"
          stroke="var(--color-primary)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 3c-2.8 0-5 3-5 8.5S19.2 20 22 20"
          stroke="var(--color-accent)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 3v22"
          stroke="var(--color-accent)"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
      <span>
        The <em className="italic text-primary">Foodie</em>
      </span>
    </Link>
  );
}
