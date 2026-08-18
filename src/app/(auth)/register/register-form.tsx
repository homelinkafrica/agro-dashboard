"use client";

import { useActionState } from "react";
import { registerAction } from "@/lib/auth/actions";
import { FormField } from "@/components/auth/form-field";
import { PhoneField } from "@/components/auth/phone-field";
import { SubmitButton } from "@/components/auth/submit-button";

export function RegisterForm() {
  const [state, formAction] = useActionState(registerAction, undefined);

  return (
    <form key={JSON.stringify(state?.values)} action={formAction} className="flex flex-col gap-4">
      <FormField
        label="Full name"
        name="fullName"
        type="text"
        autoComplete="name"
        placeholder="Byasi Solomon"
        required
        defaultValue={state?.values?.fullName}
        errors={state?.errors?.fullName}
      />

      <PhoneField errors={state?.errors?.phone} defaultValue={state?.values?.phone} />

      <FormField
        label="Email (optional)"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        defaultValue={state?.values?.email}
        errors={state?.errors?.email}
      />

      <FormField
        label="Password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        errors={state?.errors?.password}
      />

      <FormField
        label="Confirm password"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        required
        errors={state?.errors?.confirmPassword}
      />

      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}

      <SubmitButton>Create account</SubmitButton>
    </form>
  );
}
