"use client";

import { useRef, useTransition } from "react";
import { Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  deleteMenuItemAction,
  toggleAvailabilityAction,
} from "@/actions/admin-menu";

export function ToggleAvailabilityButton({
  id,
  isAvailable,
}: {
  id: string;
  isAvailable: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={(formData) => startTransition(() => toggleAvailabilityAction(formData))}
      className="flex items-center gap-2"
    >
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="isAvailable" value={String(isAvailable)} />
      <Switch
        checked={isAvailable}
        disabled={pending}
        onCheckedChange={() => formRef.current?.requestSubmit()}
      />
      <span className="text-xs text-muted-foreground">
        {isAvailable ? "Available" : "Hidden"}
      </span>
    </form>
  );
}

export function DeleteMenuItemButton({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label={`Delete ${name}`}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{name}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the item from the menu. Past orders that included it
            keep their own record and are not affected.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={pending}
            onClick={() => {
              const formData = new FormData();
              formData.set("id", id);
              startTransition(() => deleteMenuItemAction(formData));
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
