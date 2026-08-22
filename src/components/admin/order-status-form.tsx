"use client";

import { useActionState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateOrderStatusAction, type OrderStatusState } from "@/actions/admin-orders";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "Pending" },
  { value: "CONFIRMED", label: "Confirmed" },
  { value: "PREPARING", label: "Preparing" },
  { value: "OUT_FOR_DELIVERY", label: "Out for delivery" },
  { value: "DELIVERED", label: "Delivered" },
  { value: "CANCELLED", label: "Cancelled" },
];

const initialState: OrderStatusState = {};

export function OrderStatusForm({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateOrderStatusAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex items-end gap-3">
      <input type="hidden" name="orderId" value={orderId} />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium" htmlFor="status">
          Order status
        </label>
        <Select name="status" defaultValue={currentStatus}>
          <SelectTrigger id="status" className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Updating…" : "Update status"}
      </Button>
      {state.success && (
        <span className="text-sm text-accent">Updated.</span>
      )}
      {state.error && (
        <span className="text-sm text-destructive">{state.error}</span>
      )}
    </form>
  );
}
