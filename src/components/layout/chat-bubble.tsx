"use client";

import { MessageCircle } from "lucide-react";

export function ChatBubble() {
  return (
    <button
      type="button"
      title="Chat support (coming soon)"
      aria-label="Open chat support"
      className="fixed bottom-4 left-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-colors hover:bg-green-700"
    >
      <MessageCircle className="h-5 w-5" />
    </button>
  );
}
