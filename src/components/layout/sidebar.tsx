"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sprout } from "lucide-react";
import { navItems } from "./nav-items";
import { useSidebar } from "./sidebar-context";

export function Sidebar() {
  const { collapsed, mobileOpen, closeMobile } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-full w-64 flex-col border-r border-zinc-200 bg-white transition-all duration-200 ease-in-out md:sticky md:inset-y-auto md:top-16 md:z-0 md:h-[calc(100vh-4rem)] md:translate-x-0 ${
          collapsed ? "md:w-20" : "md:w-64"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 px-5">
          <Sprout className="h-7 w-7 shrink-0 text-green-600" />
          <span
            className={`truncate text-lg font-semibold tracking-tight text-zinc-900 ${collapsed ? "md:hidden" : ""}`}
          >
            Agro<span className="text-amber-500">Uganda</span>
          </span>
        </div>

        <nav className="flex-1 overflow-y-auto py-3">
          <ul className="flex flex-col gap-0.5 px-3">
            {navItems.map((item) => (
              <SidebarLink key={item.href} item={item} collapsed={collapsed} onNavigate={closeMobile} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

function SidebarLink({
  item,
  collapsed,
  onNavigate,
}: {
  item: (typeof navItems)[number];
  collapsed: boolean;
  onNavigate: () => void;
}) {
  const pathname = usePathname();
  const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
  const Icon = item.icon;

  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        title={collapsed ? item.label : undefined}
        className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-green-50 text-green-700"
            : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
        } ${collapsed ? "md:justify-center" : ""}`}
      >
        <Icon
          className={`h-5 w-5 shrink-0 ${isActive ? "text-green-600" : "text-zinc-400 group-hover:text-zinc-600"}`}
        />
        <span className={collapsed ? "md:hidden" : ""}>{item.label}</span>
      </Link>
    </li>
  );
}
