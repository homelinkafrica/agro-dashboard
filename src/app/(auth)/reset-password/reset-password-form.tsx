"use client";

import { useActionState } from "react";
import { resetPasswordAction } from "@/lib/auth/actions";
import { FormField } from "@/components/auth/form-field";
import { OtpInput } from "@/components/auth/otp-input";
import { SubmitButton } from "@/components/auth/submit-button";

export function ResetPasswordForm({ phone }: { phone: string }) {
  const [state, formAction] = useActionState(resetPasswordAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="phone" value={phone} />

      <div className="flex flex-col items-center gap-2">
        <label className="text-sm font-medium text-zinc-700">Verification code</label>
        <OtpInput error={state?.errors?.code} />
      </div>

      <FormField
        label="New password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        errors={state?.errors?.password}
      />

      <FormField
        label="Confirm new password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        errors={state?.errors?.confirmPassword}
      />

      {state?.message && <p className="text-sm text-danger">{state.message}</p>}

      <SubmitButton>Reset password</SubmitButton>
    </form>
  );
}
