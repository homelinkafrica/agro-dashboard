"use client";

import { useState } from "react";
import { CheckboxField } from "@/components/lists/checkbox-field";
import { FiltersPanel } from "@/components/lists/filters-panel";
import { SelectField } from "@/components/lists/select-field";
import { SortableHeader } from "@/components/lists/sortable-header";
import { ToggleSwitch } from "@/components/lists/toggle-switch";

const COLUMNS = [
  "Field Area",
  "Crop",
  "Type",
  "Variety",
  "Crop Area",
  "Seed",
  "Harvest",
  "Yield",
  "Residues",
  "Biomass",
];

export default function CampaignsPage() {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Campaign</h1>
          <ToggleSwitch label="Filters" checked={filtersOpen} onChange={setFiltersOpen} />
        </div>
        <button
          type="button"
          className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
        >
          Edit
        </button>
      </div>

      {filtersOpen && (
        <FiltersPanel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField label="Crop type" clearable />
            <SelectField label="Crop" clearable />
            <SelectField label="Group of fields" clearable />
          </div>
          <CheckboxField label="Show linked crops" defaultChecked />
        </FiltersPanel>
      )}

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full min-w-[1100px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              <th className="px-5 py-3">
                <SortableHeader label="Field" />
              </th>
              {COLUMNS.map((column) => (
                <th key={column} className="px-5 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}
