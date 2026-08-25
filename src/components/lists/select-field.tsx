import { ChevronDown, XCircle } from "lucide-react";

export function SelectField({
  label,
  options = ["All"],
  clearable = false,
}: {
  label: string;
  options?: string[];
  clearable?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold tracking-wide text-zinc-500 uppercase">{label}</label>
      <div className="relative">
        <select className="w-full appearance-none rounded-lg border border-zinc-300 bg-zinc-50 px-3 py-2.5 pr-16 text-sm text-zinc-700 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none">
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1.5">
          {clearable && <XCircle className="h-4 w-4 fill-red-400 text-white" />}
          <ChevronDown className="h-4 w-4 text-zinc-400" />
        </div>
      </div>
    </div>
  );
}
