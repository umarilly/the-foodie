import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PREPARING: "Preparing",
  OUT_FOR_DELIVERY: "Out for delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

const STATUS_CLASS: Record<string, string> = {
  PENDING: "bg-muted text-muted-foreground border-transparent",
  CONFIRMED: "bg-accent/15 text-accent-foreground border-accent/30",
  PREPARING: "bg-accent/15 text-accent-foreground border-accent/30",
  OUT_FOR_DELIVERY: "bg-primary/15 text-primary border-primary/30",
  DELIVERED: "bg-emerald-500/15 text-emerald-700 border-emerald-500/30 dark:text-emerald-400",
  CANCELLED: "bg-destructive/15 text-destructive border-destructive/30",
};

export function OrderStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", STATUS_CLASS[status] ?? "")}
    >
      {STATUS_LABEL[status] ?? status}
    </Badge>
  );
}

export const ORDER_STATUS_STEPS = [
  "PENDING",
  "CONFIRMED",
  "PREPARING",
  "OUT_FOR_DELIVERY",
  "DELIVERED",
] as const;
