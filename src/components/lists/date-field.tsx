import { Calendar } from "lucide-react";

export function DateField({ label }: { label: string }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-500 uppercase">{label}</label>
      <div className="relative">
        <input
          type="text"
          placeholder="dd/mm/yyyy"
          className="w-full rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 pr-9 text-sm text-zinc-700 placeholder:text-zinc-400 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
        />
        <Calendar className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      </div>
    </div>
  );
}
