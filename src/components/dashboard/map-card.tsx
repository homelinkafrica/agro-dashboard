"use client";

import { Layers, Maximize, Minus, Plus } from "lucide-react";
import { Card, CardLink } from "@/components/ui/card";
import { FieldMapPreview } from "./field-map-preview";

export function MapCard() {
  return (
    <Card
      title="Map"
      action={<CardLink href="/map">Show full map</CardLink>}
      bodyClassName="p-0"
      className="h-full"
    >
      <div className="relative h-full min-h-[420px] w-full">
        <FieldMapPreview />

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <MapControlButton label="Expand map">
            <Maximize className="h-4 w-4" />
          </MapControlButton>
          <div className="flex flex-col overflow-hidden rounded-lg border border-zinc-200 bg-white shadow">
            <MapControlButton label="Zoom in" bare>
              <Plus className="h-4 w-4" />
            </MapControlButton>
            <div className="h-px bg-zinc-200" />
            <MapControlButton label="Zoom out" bare>
              <Minus className="h-4 w-4" />
            </MapControlButton>
          </div>
          <MapControlButton label="Map layers">
            <Layers className="h-4 w-4" />
          </MapControlButton>
        </div>

        <div className="absolute bottom-3 left-3 rounded bg-white/85 px-2 py-1 text-xs font-medium text-zinc-600 backdrop-blur-sm">
          Map preview — connect a live map provider
        </div>
      </div>
    </Card>
  );
}

function MapControlButton({
  children,
  label,
  bare = false,
}: {
  children: React.ReactNode;
  label: string;
  bare?: boolean;
}) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      className={`flex h-9 w-9 items-center justify-center text-zinc-700 hover:bg-zinc-50 ${
        bare ? "" : "rounded-lg border border-zinc-200 bg-white shadow"
      }`}
    >
      {children}
    </button>
  );
}
