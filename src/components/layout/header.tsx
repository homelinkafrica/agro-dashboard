"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Menu,
  PartyPopper,
  UploadCloud,
  UserRound,
} from "lucide-react";
import { useSidebar } from "./sidebar-context";

const CURRENT_YEAR = new Date().getFullYear();

export function Header() {
  const { toggleCollapsed, openMobile } = useSidebar();
  const [campaignYear, setCampaignYear] = useState(CURRENT_YEAR);

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-2 border-b border-zinc-200 bg-zinc-900 px-3 text-zinc-100 sm:px-4">
      <button
        type="button"
        aria-label="Toggle navigation"
        onClick={() => {
          if (typeof window !== "undefined" && window.innerWidth < 768) {
            openMobile();
          } else {
            toggleCollapsed();
          }
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white"
      >
        <Menu className="h-5 w-5" />
      </button>

      <button
        type="button"
        className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-zinc-800"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-semibold text-white">
          Y
        </span>
        <span className="truncate text-sm font-semibold tracking-wide uppercase">
          Your Farm | Your Name
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
      </button>

      <div className="hidden items-center gap-1 rounded-lg border border-green-600/60 px-1 py-1 text-green-400 sm:flex">
        <button
          type="button"
          aria-label="Previous campaign"
          onClick={() => setCampaignYear((y) => y - 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-green-600/10"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-2 text-sm font-medium whitespace-nowrap">
          CAMPAIGN: {campaignYear}
        </span>
        <button
          type="button"
          aria-label="Next campaign"
          onClick={() => setCampaignYear((y) => y + 1)}
          className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-green-600/10"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
        <IconButton label="Help" className="hidden sm:flex">
          <HelpCircle className="h-5 w-5" />
        </IconButton>
        <IconButton label="Import" className="hidden sm:flex">
          <UploadCloud className="h-5 w-5" />
        </IconButton>
        <IconButton label="Notifications">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </IconButton>
        <IconButton label="What's new" className="hidden sm:flex">
          <PartyPopper className="h-5 w-5" />
        </IconButton>
        <IconButton label="Account">
          <UserRound className="h-5 w-5" />
        </IconButton>
        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium hover:bg-zinc-800 sm:flex"
          aria-label="Language: English (Uganda)"
        >
          <span aria-hidden="true">🇺🇬</span>
          <span>EN</span>
        </button>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
  className = "",
}: {
  children: React.ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className={`relative flex h-9 w-9 items-center justify-center rounded-lg text-zinc-300 hover:bg-zinc-800 hover:text-white ${className}`}
    >
      {children}
    </button>
  );
}
