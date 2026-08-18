"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction } from "@/lib/auth/actions";
import { PhoneField } from "@/components/auth/phone-field";
import { SubmitButton } from "@/components/auth/submit-button";

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, undefined);

  return (
    <form key={JSON.stringify(state?.values)} action={formAction} className="flex flex-col gap-4">
      <PhoneField errors={state?.errors?.phone} defaultValue={state?.values?.phone} />

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
            Password
          </label>
          <Link href="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-700">
            Forgot password?
          </Link>
        </div>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
        {state?.errors?.password?.map((error) => (
          <p key={error} className="mt-1.5 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}

      <SubmitButton>Sign in</SubmitButton>
    </form>
  );
}
