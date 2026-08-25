import type { ReactNode } from "react";
import { RotateCcw } from "lucide-react";

export function FiltersPanel({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Filters</h2>
      <div className="mt-4 flex flex-col gap-4">{children}</div>
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="rounded-lg bg-green-500 px-8 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-600"
        >
          Show
        </button>
        <button
          type="button"
          className="flex items-center gap-1.5 text-sm font-semibold text-green-600 hover:text-green-700"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset filters
        </button>
      </div>
    </section>
  );
}
