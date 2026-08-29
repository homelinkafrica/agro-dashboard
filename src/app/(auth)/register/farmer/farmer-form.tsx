"use client";

import { useActionState, useState } from "react";
import { FormField } from "@/components/auth/form-field";
import { PhoneField } from "@/components/auth/phone-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { ChoiceToggle } from "@/components/onboarding/choice-toggle";
import { CooperativeCodeField } from "@/components/onboarding/cooperative-code-field";
import { FieldError } from "@/components/onboarding/field-error";
import { FormSection } from "@/components/onboarding/form-section";
import { OnboardingSelect } from "@/components/onboarding/select-field";
import { registerFarmerAction } from "@/lib/onboarding/actions";
import { DISTRICT_OPTIONS, LANGUAGES } from "@/lib/onboarding/options";

const MEMBERSHIP_OPTIONS = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export function FarmerForm() {
  const [state, formAction] = useActionState(registerFarmerAction, undefined);
  const [belongsToCooperative, setBelongsToCooperative] = useState<"yes" | "no">(
    state?.values?.belongsToCooperative === "yes" ? "yes" : "no",
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormSection title="Cooperative membership">
        <ChoiceToggle
          legend="Do you belong to a cooperative?"
          name="belongsToCooperative"
          options={MEMBERSHIP_OPTIONS}
          value={belongsToCooperative}
          onChange={setBelongsToCooperative}
        />

        {/* The toggle swaps this field in place — no extra step, no navigation. */}
        {belongsToCooperative === "yes" && (
          <CooperativeCodeField
            defaultValue={state?.values?.cooperativeCode}
            errors={state?.errors?.cooperativeCode}
          />
        )}
      </FormSection>

      <FormSection title="Your details">
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

        <OnboardingSelect
          label="Preferred language"
          name="preferredLanguage"
          options={LANGUAGES}
          placeholder="Select a language"
          defaultValue={state?.values?.preferredLanguage}
          errors={state?.errors?.preferredLanguage}
        />

        <OnboardingSelect
          label="District"
          name="district"
          options={DISTRICT_OPTIONS}
          placeholder="Select your district"
          defaultValue={state?.values?.district}
          errors={state?.errors?.district}
        />

        <FormField
          label="Sub-county (optional)"
          name="subCounty"
          type="text"
          placeholder="e.g. Kamonkoli"
          defaultValue={state?.values?.subCounty}
          errors={state?.errors?.subCounty}
        />
      </FormSection>

      <div>
        <SubmitButton>Continue</SubmitButton>
        <FieldError errors={state?.message ? [state.message] : undefined} />
      </div>
    </form>
  );
}
