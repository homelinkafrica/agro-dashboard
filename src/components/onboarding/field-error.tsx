/** Inline validation message shown directly under the field or button it belongs to. */
export function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;

  return (
    <>
      {errors.map((error) => (
        <p key={error} className="mt-1.5 text-sm text-danger">
          {error}
        </p>
      ))}
    </>
  );
}
