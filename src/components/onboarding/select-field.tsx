import { ChevronDown } from "lucide-react";
import type { Option } from "@/lib/onboarding/options";
import { FieldError } from "./field-error";

export function OnboardingSelect({
  label,
  name,
  options,
  placeholder = "Select an option",
  helperText,
  defaultValue,
  errors,
  required = true,
}: {
  label: string;
  name: string;
  options: Option[];
  placeholder?: string;
  helperText?: string;
  defaultValue?: string;
  errors?: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ""}
          className="w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 py-2.5 pr-10 text-sm text-zinc-900 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      </div>
      {helperText && <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>}
      <FieldError errors={errors} />
    </div>
  );
}
