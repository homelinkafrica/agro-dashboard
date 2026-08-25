"use client";

import { useState } from "react";
import { FiltersPanel } from "@/components/lists/filters-panel";
import { SelectField } from "@/components/lists/select-field";
import { ToggleSwitch } from "@/components/lists/toggle-switch";

export default function FieldsPage() {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [showGroups, setShowGroups] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Field List</h1>
          <ToggleSwitch label="Filters" checked={filtersOpen} onChange={setFiltersOpen} />
          <span className="text-sm font-medium text-zinc-500">Fields: 0</span>
          <span className="text-sm font-medium text-zinc-500">Area: 0.00 ha</span>
          <button type="button" className="text-sm font-semibold text-green-600 hover:text-green-700">
            Setup field colors
          </button>
          <ToggleSwitch label="Show groups" checked={showGroups} onChange={setShowGroups} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
          >
            Cards view
          </button>
          <button
            type="button"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Add field
          </button>
          <button
            type="button"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Add map
          </button>
        </div>
      </div>

      {filtersOpen && (
        <FiltersPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField label="Campaign set for field" clearable />
            <SelectField label="Crop from campaign" clearable />
          </div>
        </FiltersPanel>
      )}
    </div>
  );
}
