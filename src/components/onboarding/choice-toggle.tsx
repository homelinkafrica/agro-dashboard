"use client";

/**
 * Two side-by-side toggle buttons backed by radio inputs. Swaps the fields
 * below it in place rather than navigating to another step.
 */
export function ChoiceToggle<T extends string>({
  legend,
  name,
  options,
  value,
  onChange,
  helperText,
}: {
  legend: string;
  name: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  helperText?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-zinc-700">{legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <label
              key={option.value}
              className={`cursor-pointer rounded-lg border px-3 py-2.5 text-center text-sm font-medium transition-colors ${
                isSelected
                  ? "border-green-600 bg-green-50 text-green-800"
                  : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          );
        })}
      </div>
      {helperText && <p className="mt-1.5 text-sm text-zinc-500">{helperText}</p>}
    </fieldset>
  );
}
