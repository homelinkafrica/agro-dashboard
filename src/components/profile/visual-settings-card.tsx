"use client";

import { useState } from "react";

export function VisualSettingsCard() {
  const [borderColorBy, setBorderColorBy] = useState<"field" | "crop">("field");
  const [displayType, setDisplayType] = useState<"list" | "cards">("list");

  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Visual settings</h2>

      <fieldset className="mt-4">
        <legend className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
          Field border color display by
        </legend>
        <div className="mt-2 flex flex-col gap-2">
          <RadioOption
            name="borderColorBy"
            checked={borderColorBy === "field"}
            onChange={() => setBorderColorBy("field")}
            label="Field color (assigned to each field when it was added)"
          />
          <RadioOption
            name="borderColorBy"
            checked={borderColorBy === "crop"}
            onChange={() => setBorderColorBy("crop")}
            label="Crop in current campaign"
          />
        </div>
      </fieldset>

      <fieldset className="mt-5">
        <legend className="text-xs font-medium tracking-wide text-zinc-500 uppercase">Default display type</legend>
        <div className="mt-2 flex flex-col gap-2">
          <RadioOption
            name="displayType"
            checked={displayType === "list"}
            onChange={() => setDisplayType("list")}
            label="List"
          />
          <RadioOption
            name="displayType"
            checked={displayType === "cards"}
            onChange={() => setDisplayType("cards")}
            label="Cards"
          />
        </div>
      </fieldset>

      <button
        type="button"
        className="mt-6 rounded-lg bg-green-200 px-4 py-2 text-sm font-semibold text-green-800 transition-colors hover:bg-green-300"
      >
        Update
      </button>
    </section>
  );
}

function RadioOption({
  name,
  checked,
  onChange,
  label,
}: {
  name: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-2.5 text-sm text-zinc-700">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 border-zinc-300 text-green-600 focus:ring-green-500"
      />
      {label}
    </label>
  );
}
