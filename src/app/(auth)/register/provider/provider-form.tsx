"use client";

import { useActionState, useState } from "react";
import { FormField } from "@/components/auth/form-field";
import { PhoneField } from "@/components/auth/phone-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { ChoiceToggle } from "@/components/onboarding/choice-toggle";
import { CooperativeCodeField } from "@/components/onboarding/cooperative-code-field";
import { FieldError } from "@/components/onboarding/field-error";
import { FormSection } from "@/components/onboarding/form-section";
import { MultiSelectField } from "@/components/onboarding/multi-select-field";
import { OnboardingSelect } from "@/components/onboarding/select-field";
import { registerProviderAction } from "@/lib/onboarding/actions";
import {
  DISTRICT_OPTIONS,
  LANGUAGES,
  PROVIDER_ROLES,
  SERVICES_OFFERED,
} from "@/lib/onboarding/options";

const WORK_MODE_OPTIONS = [
  { value: "independent", label: "Independent" },
  { value: "affiliated", label: "Affiliated with a cooperative" },
] as const;

export function ProviderForm() {
  const [state, formAction] = useActionState(registerProviderAction, undefined);
  const [workMode, setWorkMode] = useState<"independent" | "affiliated">(
    state?.values?.workMode === "affiliated" ? "affiliated" : "independent",
  );

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormSection title="How you work">
        <OnboardingSelect
          label="Provider role"
          name="providerRole"
          options={PROVIDER_ROLES}
          placeholder="Select your role"
          defaultValue={state?.values?.providerRole}
          errors={state?.errors?.providerRole}
        />

        <ChoiceToggle
          legend="How will you work?"
          name="workMode"
          options={WORK_MODE_OPTIONS}
          value={workMode}
          onChange={setWorkMode}
          helperText="You can add the other later from your profile."
        />

        {workMode === "affiliated" ? (
          <CooperativeCodeField
            defaultValue={state?.values?.cooperativeCode}
            errors={state?.errors?.cooperativeCode}
            note="Your affiliation will be pending until the cooperative approves it — you can still use the app in the meantime."
          />
        ) : (
          <>
            <MultiSelectField
              label="Service area"
              name="serviceAreas"
              options={DISTRICT_OPTIONS}
              helperText="Select every district you cover."
              defaultValue={state?.values?.serviceAreas}
              errors={state?.errors?.serviceAreas}
            />

            <MultiSelectField
              label="Services offered"
              name="services"
              options={SERVICES_OFFERED}
              defaultValue={state?.values?.services}
              errors={state?.errors?.services}
            />

            <FormField
              label="License / registration number"
              name="licenseNumber"
              type="text"
              placeholder="e.g. UVB/2024/0198"
              defaultValue={state?.values?.licenseNumber}
              errors={state?.errors?.licenseNumber}
            />
          </>
        )}
      </FormSection>

      <FormSection title="Your details">
        <FormField
          label="Full name"
          name="fullName"
          type="text"
          autoComplete="name"
          placeholder="Nakato Grace"
          required
          defaultValue={state?.values?.fullName}
          errors={state?.errors?.fullName}
        />

        <PhoneField errors={state?.errors?.phone} defaultValue={state?.values?.phone} />

        <FormField
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
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
      </FormSection>

      <div>
        <SubmitButton>Continue</SubmitButton>
        <FieldError errors={state?.message ? [state.message] : undefined} />
      </div>
    </form>
  );
}
