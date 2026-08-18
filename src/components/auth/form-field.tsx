import type { InputHTMLAttributes } from "react";

export function FormField({
  label,
  name,
  errors,
  ...inputProps
}: {
  label: string;
  name: string;
  errors?: string[];
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-zinc-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className="block w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        {...inputProps}
      />
      {errors?.map((error) => (
        <p key={error} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
