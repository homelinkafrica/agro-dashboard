"use client";

import { useActionState } from "react";
import { SubmitButton } from "@/components/auth/submit-button";
import { FieldError } from "@/components/onboarding/field-error";
import { FormSection } from "@/components/onboarding/form-section";
import { inviteMembersAction } from "@/lib/onboarding/actions";

export function InviteMembersForm({ joinCode }: { joinCode: string }) {
  const [state, formAction] = useActionState(inviteMembersAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormSection title="Share your join code">
        <p className="text-sm text-zinc-500">
          Members enter this code when they sign up, and they&apos;ll be linked to your cooperative
          automatically.
        </p>
        <p className="rounded-lg border border-dashed border-green-300 bg-green-50 px-4 py-3 text-center text-lg font-semibold tracking-wide text-green-800">
          {joinCode}
        </p>
      </FormSection>

      <FormSection title="Or invite members by SMS">
        <div>
          <label htmlFor="phones" className="mb-1.5 block text-sm font-medium text-zinc-700">
            Phone numbers
          </label>
          <textarea
            id="phones"
            name="phones"
            rows={5}
            placeholder={"0712345678\n0772345678, 0756789012"}
            defaultValue={state?.values?.phones}
            className="block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
          />
          <p className="mt-1.5 text-sm text-zinc-500">
            Paste one number per line, or separate them with commas.
          </p>
          <FieldError errors={state?.errors?.phones} />
        </div>
      </FormSection>

      <div>
        <SubmitButton>Send invites and continue</SubmitButton>
        <FieldError errors={state?.message ? [state.message] : undefined} />
      </div>
    </form>
  );
}
