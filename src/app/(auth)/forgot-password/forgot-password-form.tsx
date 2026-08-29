"use client";

import { useActionState } from "react";
import { requestPasswordResetAction } from "@/lib/auth/actions";
import { PhoneField } from "@/components/auth/phone-field";
import { SubmitButton } from "@/components/auth/submit-button";

export function ForgotPasswordForm() {
  const [state, formAction] = useActionState(requestPasswordResetAction, undefined);

  return (
    <form key={JSON.stringify(state?.values)} action={formAction} className="flex flex-col gap-4">
      <PhoneField errors={state?.errors?.phone} defaultValue={state?.values?.phone} />
      {state?.message && <p className="text-sm text-danger">{state.message}</p>}
      <SubmitButton>Send reset code</SubmitButton>
    </form>
  );
}
