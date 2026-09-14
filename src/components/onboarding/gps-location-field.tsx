"use client";

import { useState } from "react";
import { LocateFixed } from "lucide-react";
import { FieldError } from "./field-error";

/**
 * Optional GPS capture via the browser's geolocation API — the "auto-detect"
 * half of the spec's "map pin or auto-detect" (no live map is wired up yet).
 */
export function GpsLocationField({
  defaultLatitude,
  defaultLongitude,
  errors,
}: {
  defaultLatitude?: string;
  defaultLongitude?: string;
  errors?: string[];
}) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    defaultLatitude && defaultLongitude
      ? { lat: Number(defaultLatitude), lng: Number(defaultLongitude) }
      : null,
  );
  const [status, setStatus] = useState<"idle" | "locating" | "error">("idle");

  function detectLocation() {
    if (!("geolocation" in navigator)) {
      setStatus("error");
      return;
    }

    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        setStatus("idle");
      },
      () => setStatus("error"),
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-700">
        Farm location (optional)
      </label>
      <input type="hidden" name="latitude" value={coords ? String(coords.lat) : ""} readOnly />
      <input type="hidden" name="longitude" value={coords ? String(coords.lng) : ""} readOnly />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={detectLocation}
          disabled={status === "locating"}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-60"
        >
          <LocateFixed className="h-4 w-4" />
          {status === "locating" ? "Locating…" : coords ? "Update location" : "Use my current location"}
        </button>
        {coords && (
          <span className="text-sm text-zinc-500">
            {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          </span>
        )}
      </div>

      {status === "error" && (
        <p className="mt-1.5 text-sm text-danger">
          Couldn&apos;t get your location — you can skip this and add it later.
        </p>
      )}
      <FieldError errors={errors} />
    </div>
  );
}
