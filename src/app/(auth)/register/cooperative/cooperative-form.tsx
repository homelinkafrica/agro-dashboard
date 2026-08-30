"use client";

import { useActionState } from "react";
import { FormField } from "@/components/auth/form-field";
import { PhoneField } from "@/components/auth/phone-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { FieldError } from "@/components/onboarding/field-error";
import { FormSection } from "@/components/onboarding/form-section";
import { OnboardingSelect } from "@/components/onboarding/select-field";
import { registerCooperativeAction } from "@/lib/onboarding/actions";
import { COOPERATIVE_TYPES, DISTRICT_OPTIONS } from "@/lib/onboarding/options";

export function CooperativeForm() {
  const [state, formAction] = useActionState(registerCooperativeAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormSection title="Cooperative details">
        <FormField
          label="Cooperative / SACCO name"
          name="cooperativeName"
          type="text"
          placeholder="Budaka Farmers SACCO"
          required
          defaultValue={state?.values?.cooperativeName}
          errors={state?.errors?.cooperativeName}
        />

        <OnboardingSelect
          label="District"
          name="district"
          options={DISTRICT_OPTIONS}
          placeholder="Select a district"
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

        <OnboardingSelect
          label="Cooperative type"
          name="cooperativeType"
          options={COOPERATIVE_TYPES}
          placeholder="Select a type"
          defaultValue={state?.values?.cooperativeType}
          errors={state?.errors?.cooperativeType}
        />

        <FormField
          label="Registration number (optional)"
          name="registrationNumber"
          type="text"
          placeholder="UG-SAC-00412"
          aria-describedby="registrationNumber-help"
          defaultValue={state?.values?.registrationNumber}
          errors={state?.errors?.registrationNumber}
        />
        <p id="registrationNumber-help" className="-mt-3 text-sm text-zinc-500">
          Leave blank if not formally registered
        </p>
      </FormSection>

      <FormSection title="Your admin account">
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
      </FormSection>

      <div>
        <SubmitButton>Continue</SubmitButton>
        <FieldError errors={state?.message ? [state.message] : undefined} />
      </div>
    </form>
  );
}
