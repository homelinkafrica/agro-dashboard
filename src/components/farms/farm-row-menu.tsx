"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MoreVertical } from "lucide-react";

const MENU_ITEMS = [
  { label: "Upload image" },
  { label: "Edit" },
  { label: "Import fields" },
  { label: "Import Agroedi" },
  { label: "Delete", danger: true },
];

export function FarmRowMenu({ onOpenChange }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const setOpenState = useCallback(
    (value: boolean) => {
      setOpen(value);
      onOpenChange?.(value);
    },
    [onOpenChange],
  );

  function openMenu() {
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      // Menu is fixed-positioned (portaled to <body>), so it escapes any
      // ancestor with overflow clipping — e.g. the table's horizontal-scroll
      // wrapper, which would otherwise cut off a menu extending past it.
      setPosition({ top: rect.bottom + 4, left: rect.right - 192 });
    }
    setOpenState(true);
  }

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (buttonRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpenState(false);
    }

    function handleScrollOrResize() {
      setOpenState(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("scroll", handleScrollOrResize, true);
    window.addEventListener("resize", handleScrollOrResize);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("scroll", handleScrollOrResize, true);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [open, setOpenState]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-label="Farm actions"
        aria-expanded={open}
        onClick={() => (open ? setOpenState(false) : openMenu())}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 hover:bg-zinc-50"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            style={{ top: position.top, left: position.left }}
            className="fixed z-50 w-48 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg"
          >
            {MENU_ITEMS.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => setOpenState(false)}
                className={`block w-full px-4 py-2 text-left text-sm font-medium tracking-wide uppercase hover:bg-zinc-50 ${
                  item.danger ? "text-red-600" : "text-green-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
