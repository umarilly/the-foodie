"use client";

import { useActionState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/auth/password-input";
import { changePasswordAction, type ProfileState } from "@/actions/account";

const initialState: ProfileState = {};

export function PasswordForm() {
  const [state, formAction, pending] = useActionState(
    changePasswordAction,
    initialState,
  );
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <fieldset disabled={pending} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="currentPassword">Current password</Label>
          <PasswordInput id="currentPassword" name="currentPassword" autoComplete="current-password" required />
          {fieldErrors.currentPassword && (
            <p className="text-xs text-destructive">{fieldErrors.currentPassword}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="newPassword">New password</Label>
          <PasswordInput id="newPassword" name="newPassword" autoComplete="new-password" required />
          {fieldErrors.newPassword && (
            <p className="text-xs text-destructive">{fieldErrors.newPassword}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="confirmPassword">Confirm new password</Label>
          <PasswordInput id="confirmPassword" name="confirmPassword" autoComplete="new-password" required />
          {fieldErrors.confirmPassword && (
            <p className="text-xs text-destructive">{fieldErrors.confirmPassword}</p>
          )}
        </div>
        {state.error && (
          <p className="text-sm text-destructive">{state.error}</p>
        )}
        {state.success && (
          <p className="text-sm text-accent">Password updated.</p>
        )}
        <Button type="submit" className="self-start" disabled={pending}>
          {pending ? "Updating…" : "Update password"}
        </Button>
      </fieldset>
    </form>
  );
}
