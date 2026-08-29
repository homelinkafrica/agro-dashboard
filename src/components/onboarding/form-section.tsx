import type { ReactNode } from "react";

/** A visually grouped block of fields — used to keep longer web forms on one screen. */
export function FormSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-zinc-200 bg-white p-5 sm:p-6">
      <legend className="px-1.5 text-sm font-semibold text-zinc-900">{title}</legend>
      <div className="flex flex-col gap-4">{children}</div>
    </fieldset>
  );
}
