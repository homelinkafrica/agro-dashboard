"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CheckboxField } from "@/components/lists/checkbox-field";
import { DateField } from "@/components/lists/date-field";
import { FiltersPanel } from "@/components/lists/filters-panel";
import { SelectField } from "@/components/lists/select-field";
import { SortableHeader } from "@/components/lists/sortable-header";
import { ToggleSwitch } from "@/components/lists/toggle-switch";

const COLUMNS = ["Field", "Operation group", "Task name", "Equipment", "Products / area / duration"];

export default function TasksPage() {
  const [filtersOpen, setFiltersOpen] = useState(true);

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Active Tasks</h1>
          <ToggleSwitch label="Filters" checked={filtersOpen} onChange={setFiltersOpen} />
        </div>
        <div className="flex items-center gap-2">
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
            Add tasks
          </button>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => setFiltersOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filtersOpen && (
        <FiltersPanel>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField label="Task status or badge" />
            <SelectField label="Operation group" />
            <SelectField label="Equipment" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField label="Group of fields" />
            <SelectField label="Campaign" options={["2026", "2025", "2024"]} />
            <DateField label="Start period" />
            <DateField label="End period" />
          </div>
          <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <SelectField label="Field" />
            <div className="flex items-center pb-2.5">
              <CheckboxField label="Filter for a field: expand to groups" />
            </div>
          </div>
        </FiltersPanel>
      )}

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
              <th className="px-5 py-3">
                <SortableHeader label="Date" />
              </th>
              {COLUMNS.map((column) => (
                <th key={column} className="px-5 py-3">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="px-5 py-6 text-sm font-medium text-zinc-500">
                No results for selected filters
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
