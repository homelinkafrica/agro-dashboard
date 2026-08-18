"use client";

import type { ReactNode } from "react";
import { ChatBubble } from "./chat-bubble";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { SidebarProvider } from "./sidebar-context";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col bg-zinc-50">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <main className="min-w-0 flex-1 overflow-x-hidden">{children}</main>
        </div>
        <ChatBubble />
      </div>
    </SidebarProvider>
  );
}
