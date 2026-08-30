import type { Option } from "@/lib/onboarding/options";
import { FieldError } from "./field-error";

/**
 * Checkbox chip group. Uses real checkboxes sharing one name so the values
 * arrive as a repeated form field — no client-side state needed.
 */
export function MultiSelectField({
  label,
  name,
  options,
  helperText,
  defaultValue = [],
  errors,
}: {
  label: string;
  name: string;
  options: Option[];
  helperText?: string;
  defaultValue?: string[];
  errors?: string[];
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-zinc-700">{label}</legend>
      {helperText && <p className="mb-2 text-sm text-zinc-500">{helperText}</p>}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <label key={option.value} className="cursor-pointer">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              defaultChecked={defaultValue.includes(option.value)}
              className="peer sr-only"
            />
            <span className="inline-block rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-700 transition-colors peer-checked:border-green-600 peer-checked:bg-green-50 peer-checked:text-green-800 peer-focus-visible:ring-2 peer-focus-visible:ring-green-500">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <FieldError errors={errors} />
    </fieldset>
  );
}
