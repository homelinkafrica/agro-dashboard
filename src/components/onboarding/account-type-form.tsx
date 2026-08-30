"use client";

import { useActionState } from "react";
import { Building2, Sprout, Stethoscope, type LucideIcon } from "lucide-react";
import { SubmitButton } from "@/components/auth/submit-button";
import { selectAccountTypeAction } from "@/lib/onboarding/actions";
import type { AccountType } from "@/lib/onboarding/options";
import { FieldError } from "./field-error";

const ACCOUNT_TYPE_CARDS: { value: AccountType; title: string; description: string; icon: LucideIcon }[] = [
  {
    value: "farmer",
    title: "Farmer",
    description: "Manage your own farm records, solo or as part of a cooperative",
    icon: Sprout,
  },
  {
    value: "cooperative",
    title: "Cooperative",
    description: "Register a cooperative or SACCO and manage its members",
    icon: Building2,
  },
  {
    value: "provider",
    title: "Service provider",
    description: "Offer veterinary or extension services, independently or with a cooperative",
    icon: Stethoscope,
  },
];

export function AccountTypeForm() {
  const [state, formAction] = useActionState(selectAccountTypeAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <fieldset className="flex flex-col gap-3">
        <legend className="sr-only">Account type</legend>

        {ACCOUNT_TYPE_CARDS.map(({ value, title, description, icon: Icon }) => (
          <label
            key={value}
            className="group flex cursor-pointer items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4 transition-colors has-checked:border-green-600 has-checked:bg-green-50/50 has-focus-visible:ring-2 has-focus-visible:ring-green-500 hover:border-zinc-300"
          >
            <input
              type="radio"
              name="accountType"
              value={value}
              defaultChecked={state?.values?.accountType === value}
              className="sr-only"
            />

            <Icon className="mt-0.5 h-6 w-6 shrink-0 text-zinc-400 group-has-checked:text-green-600" />

            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-zinc-900">{title}</span>
              <span className="mt-0.5 block text-sm text-zinc-500">{description}</span>
            </span>

            {/* Radio-style selection indicator */}
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-zinc-300 group-has-checked:border-green-600">
              <span className="h-2.5 w-2.5 rounded-full bg-transparent group-has-checked:bg-green-600" />
            </span>
          </label>
        ))}
      </fieldset>

      <div>
        <SubmitButton>Continue</SubmitButton>
        <FieldError errors={state?.message ? [state.message] : undefined} />
      </div>
    </form>
  );
}
