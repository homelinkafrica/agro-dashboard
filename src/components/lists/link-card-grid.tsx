import type { LucideIcon } from "lucide-react";

export type LinkCardItem = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
};

export function LinkCardGrid({ items }: { items: LinkCardItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <button
          key={item.title}
          type="button"
          className="flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white px-6 py-10 text-center shadow-sm transition-colors hover:border-green-300 hover:shadow-md"
        >
          <item.icon className="h-10 w-10 text-green-600" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold text-zinc-900">{item.title}</h3>
          {item.subtitle && <p className="text-sm text-zinc-500">{item.subtitle}</p>}
        </button>
      ))}
    </div>
  );
}
