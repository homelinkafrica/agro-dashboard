import type { ReactNode } from "react";
import { Sprout } from "lucide-react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="w-full max-w-md">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Sprout className="h-8 w-8 text-green-600" />
        <span className="text-xl font-semibold tracking-tight text-zinc-900">
          Agro<span className="text-amber-500">Uganda</span>
        </span>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold text-zinc-900">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </div>

      {footer && <div className="mt-6 text-center text-sm text-zinc-600">{footer}</div>}
    </div>
  );
}
