import { Check, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { ORDER_STATUS_STEPS } from "@/components/orders/order-status-badge";

const STEP_LABELS: Record<(typeof ORDER_STATUS_STEPS)[number], string> = {
  PENDING: "Placed",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "On the way",
  DELIVERED: "Delivered",
};

export function OrderTracker({ status }: { status: string }) {
  if (status === "CANCELLED") {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive">
        <Ban className="h-4 w-4" />
        This order was cancelled.
      </div>
    );
  }

  const currentIndex = ORDER_STATUS_STEPS.indexOf(
    status as (typeof ORDER_STATUS_STEPS)[number],
  );

  return (
    <ol className="flex w-full items-center">
      {ORDER_STATUS_STEPS.map((step, index) => {
        const isDone = index <= currentIndex;
        const isLast = index === ORDER_STATUS_STEPS.length - 1;
        return (
          <li key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                  isDone
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground",
                )}
              >
                {isDone ? <Check className="h-4 w-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  "text-center text-xs font-medium",
                  isDone ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {STEP_LABELS[step]}
              </span>
            </div>
            {!isLast && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1",
                  index < currentIndex ? "bg-primary" : "bg-border",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
