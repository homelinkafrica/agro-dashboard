"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown, CheckCircle2, LandPlot } from "lucide-react";
import type { Farm } from "@/lib/farms/types";
import { FarmRowMenu } from "./farm-row-menu";

export function FarmsTable({ farms }: { farms: Farm[] }) {
  const [activeFarmId, setActiveFarmId] = useState(farms[0]?.id ?? null);
  const [openMenuRowId, setOpenMenuRowId] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const sortedFarms = useMemo(() => {
    const sorted = [...farms].sort((a, b) => a.name.localeCompare(b.name));
    return sortDirection === "asc" ? sorted : sorted.reverse();
  }, [farms, sortDirection]);

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
      <table className="w-full min-w-[860px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-zinc-200 text-xs font-semibold tracking-wide text-zinc-500 uppercase">
            <th className="px-5 py-3">
              <button
                type="button"
                onClick={() => setSortDirection((d) => (d === "asc" ? "desc" : "asc"))}
                className="flex items-center gap-1 hover:text-zinc-700"
              >
                Name
                <ArrowUpDown className="h-3.5 w-3.5 text-green-600" />
              </button>
            </th>
            <th className="px-5 py-3">Area</th>
            <th className="px-5 py-3">Number of fields</th>
            <th className="px-5 py-3">Farmer</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Address</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody>
          {sortedFarms.map((farm) => {
            const isActive = farm.id === activeFarmId;
            const isMenuOpen = farm.id === openMenuRowId;

            return (
              <tr
                key={farm.id}
                className={`border-b border-zinc-100 last:border-0 ${
                  isActive || isMenuOpen ? "bg-green-50" : "hover:bg-zinc-50"
                }`}
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-700">
                      <LandPlot className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-zinc-900">{farm.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3 text-zinc-700">{farm.areaHectares} ha</td>
                <td className="px-5 py-3 text-zinc-700">{farm.fieldCount}</td>
                <td className="px-5 py-3 text-zinc-700">{farm.farmerName}</td>
                <td className="px-5 py-3 text-zinc-700">{farm.email}</td>
                <td className="px-5 py-3 text-zinc-700">{farm.address}</td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {isActive ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold tracking-wide text-green-700 uppercase">
                        <CheckCircle2 className="h-4 w-4" />
                        Current farm
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveFarmId(farm.id)}
                        className="rounded-lg border border-green-600 px-3 py-1.5 text-xs font-semibold tracking-wide text-green-600 uppercase hover:bg-green-50"
                      >
                        Switch farm
                      </button>
                    )}
                    <FarmRowMenu
                      onOpenChange={(open) => setOpenMenuRowId(open ? farm.id : null)}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
