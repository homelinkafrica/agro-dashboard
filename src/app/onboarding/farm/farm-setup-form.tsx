"use client";

import { useActionState } from "react";
import { FormField } from "@/components/auth/form-field";
import { SubmitButton } from "@/components/auth/submit-button";
import { FieldError } from "@/components/onboarding/field-error";
import { FormSection } from "@/components/onboarding/form-section";
import { GpsLocationField } from "@/components/onboarding/gps-location-field";
import { MultiSelectField } from "@/components/onboarding/multi-select-field";
import { OnboardingSelect } from "@/components/onboarding/select-field";
import { createFarmAction } from "@/lib/onboarding/actions";
import { DISTRICT_OPTIONS, ENTERPRISE_TYPES } from "@/lib/onboarding/options";

export function FarmSetupForm({
  defaultDistrict,
  suggestedName,
}: {
  defaultDistrict: string;
  suggestedName: string;
}) {
  const [state, formAction] = useActionState(createFarmAction, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormSection title="Farm details">
        <MultiSelectField
          label="Enterprise type(s)"
          name="enterpriseTypes"
          options={ENTERPRISE_TYPES}
          helperText="Select everything you raise or grow — most farms are mixed."
          defaultValue={state?.values?.enterpriseTypes}
          errors={state?.errors?.enterpriseTypes}
        />

        <FormField
          label="Farm name (optional)"
          name="name"
          type="text"
          placeholder={suggestedName}
          defaultValue={state?.values?.name}
          errors={state?.errors?.name}
        />

        <OnboardingSelect
          label="District"
          name="district"
          options={DISTRICT_OPTIONS}
          placeholder="Select a district"
          defaultValue={state?.values?.district ?? defaultDistrict}
          errors={state?.errors?.district}
        />

        <FormField
          label="Farm size in hectares (optional)"
          name="areaHectares"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.1"
          placeholder="12.5"
          defaultValue={state?.values?.areaHectares}
          errors={state?.errors?.areaHectares}
        />

        <GpsLocationField
          defaultLatitude={state?.values?.latitude}
          defaultLongitude={state?.values?.longitude}
        />

        <FormField
          label="Number of fields (optional)"
          name="fieldCount"
          type="number"
          inputMode="numeric"
          min="0"
          step="1"
          placeholder="4"
          defaultValue={state?.values?.fieldCount}
          errors={state?.errors?.fieldCount}
        />
      </FormSection>

      <div>
        <SubmitButton>Finish setup</SubmitButton>
        <FieldError errors={state?.message ? [state.message] : undefined} />
      </div>
    </form>
  );
}
