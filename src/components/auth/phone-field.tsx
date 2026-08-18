export function PhoneField({
  errors,
  defaultValue,
  readOnly,
}: {
  errors?: string[];
  defaultValue?: string;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-zinc-700">
        Phone number
      </label>
      <div
        className={`flex overflow-hidden rounded-lg border border-zinc-300 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500 ${
          readOnly ? "bg-zinc-50" : ""
        }`}
      >
        <span className="flex items-center gap-1.5 border-r border-zinc-300 bg-zinc-50 px-3 text-sm text-zinc-600">
          <span aria-hidden="true">🇺🇬</span>
          +256
        </span>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder="712 345 678"
          defaultValue={defaultValue}
          readOnly={readOnly}
          required
          className="block w-full px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
        />
      </div>
      {errors?.map((error) => (
        <p key={error} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ))}
    </div>
  );
}
