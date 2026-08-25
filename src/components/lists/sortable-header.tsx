import { ArrowDown } from "lucide-react";

export function SortableHeader({ label }: { label: string }) {
  return (
    <button type="button" className="flex items-center gap-1 hover:text-zinc-700">
      {label}
      <ArrowDown className="h-3.5 w-3.5 text-green-600" />
    </button>
  );
}
