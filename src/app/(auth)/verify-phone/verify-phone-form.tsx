"use client";

import { useActionState } from "react";
import { verifyPhoneAction } from "@/lib/auth/actions";
import { OtpInput } from "@/components/auth/otp-input";
import { SubmitButton } from "@/components/auth/submit-button";

export function VerifyPhoneForm({ phone }: { phone: string }) {
  const [state, formAction] = useActionState(verifyPhoneAction, undefined);

  return (
    <form action={formAction} className="flex flex-col items-center gap-4">
      <input type="hidden" name="phone" value={phone} />
      <OtpInput error={state?.errors?.code} />
      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}
      <div className="w-full">
        <SubmitButton>Verify</SubmitButton>
      </div>
    </form>
  );
}
