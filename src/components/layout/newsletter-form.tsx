"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { subscribeAction, type NewsletterState } from "@/actions/newsletter";

const initialState: NewsletterState = {};

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(
    subscribeAction,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          type="email"
          name="email"
          placeholder="Your email address"
          required
          disabled={pending}
          className="bg-background"
          aria-label="Email address"
        />
        <Button type="submit" disabled={pending} className="shrink-0">
          {pending ? "Joining…" : "Subscribe"}
        </Button>
      </div>
      {state.error && <p className="text-sm text-destructive">{state.error}</p>}
      {state.success && (
        <p className="text-sm text-accent">Thanks — you&apos;re subscribed.</p>
      )}
    </form>
  );
}
