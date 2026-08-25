"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import { ToggleSwitch } from "@/components/lists/toggle-switch";

export default function EquipmentPage() {
  const [groupByType, setGroupByType] = useState(false);
  const [importedEquipment, setImportedEquipment] = useState(false);
  const [archive, setArchive] = useState(false);

  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <h1 className="text-2xl font-semibold text-zinc-900">Equipment list</h1>
          <ToggleSwitch label="Group by type" checked={groupByType} onChange={setGroupByType} />
          <ToggleSwitch label="Imported equipment" checked={importedEquipment} onChange={setImportedEquipment} />
          <ToggleSwitch label="Archive" checked={archive} onChange={setArchive} />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
          >
            Workload
          </button>
          <button
            type="button"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Add equipment
          </button>
        </div>
      </div>

      <div className="flex justify-center py-16">
        <div className="flex max-w-sm flex-col items-center gap-4 rounded-xl border border-zinc-200 bg-white px-8 py-10 text-center shadow-sm">
          <Truck className="h-10 w-10 text-zinc-300" />
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">You have no added equipment</h2>
            <p className="mt-1 text-sm text-zinc-500">You can add it now.</p>
          </div>
          <button
            type="button"
            className="w-full rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Add equipment
          </button>
        </div>
      </div>
    </div>
  );
}
