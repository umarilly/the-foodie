"use client";

import { useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { updateProfileAction, type ProfileState } from "@/actions/account";

const initialState: ProfileState = {};

export function ProfileForm({
  firstName,
  lastName,
  email,
  phone,
  address,
}: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}) {
  const [state, formAction, pending] = useActionState(
    updateProfileAction,
    initialState,
  );
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <fieldset disabled={pending} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName">First name</Label>
            <Input id="firstName" name="firstName" defaultValue={firstName} required />
            {fieldErrors.firstName && (
              <p className="text-xs text-destructive">{fieldErrors.firstName}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName">Last name</Label>
            <Input id="lastName" name="lastName" defaultValue={lastName} required />
            {fieldErrors.lastName && (
              <p className="text-xs text-destructive">{fieldErrors.lastName}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={email} disabled />
          <p className="text-xs text-muted-foreground">
            Email can&apos;t be changed.
          </p>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" name="phone" defaultValue={phone} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="address">Delivery address</Label>
          <Input id="address" name="address" defaultValue={address} />
        </div>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        {state.success && (
          <p className="text-sm text-accent">Profile updated.</p>
        )}
        <Button type="submit" className="self-start" disabled={pending}>
          {pending ? "Saving…" : "Save profile"}
        </Button>
      </fieldset>
    </form>
  );
}
