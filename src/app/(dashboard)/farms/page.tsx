import { FarmsTable } from "@/components/farms/farms-table";
import { sampleFarms } from "@/lib/farms/sample-data";

export default function FarmsPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-zinc-900">Farms list</h1>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-green-600 px-4 py-2 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
          >
            Manage farmers
          </button>
          <button
            type="button"
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Add farm
          </button>
        </div>
      </div>

      <FarmsTable farms={sampleFarms} />
    </div>
  );
}
