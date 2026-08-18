import type { LucideIcon } from "lucide-react";

export function PlaceholderPage({
  title,
  icon: Icon,
  description,
}: {
  title: string;
  icon: LucideIcon;
  description: string;
}) {
  return (
    <div className="flex flex-col px-4 pt-6 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-zinc-300 bg-white px-6 py-20 text-center">
        <Icon className="h-10 w-10 text-zinc-300" />
        <p className="text-sm font-medium text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
