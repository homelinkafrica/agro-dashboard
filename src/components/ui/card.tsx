import type { ReactNode } from "react";

export function Card({
  title,
  action,
  icon,
  children,
  bodyClassName = "p-5",
  className = "",
}: {
  title: string;
  action?: ReactNode;
  icon?: ReactNode;
  children: ReactNode;
  bodyClassName?: string;
  className?: string;
}) {
  return (
    <section
      className={`flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm ${className}`}
    >
      <header className="flex items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
        <div className="flex items-center gap-2">
          {icon}
          <h2 className="text-lg font-semibold text-zinc-900">{title}</h2>
        </div>
        {action}
      </header>
      <div className={`flex-1 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

export function CardLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-xs font-semibold tracking-wide text-green-600 uppercase hover:text-green-700 hover:underline"
    >
      {children}
    </a>
  );
}
