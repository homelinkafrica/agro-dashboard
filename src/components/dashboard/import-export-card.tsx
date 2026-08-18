import { Card } from "@/components/ui/card";

export function ImportExportCard() {
  return (
    <Card title="Import and Export">
      <div className="flex flex-col gap-4">
        <button
          type="button"
          className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-green-700"
        >
          Import file
        </button>
        <div className="flex items-center gap-4 text-xs font-semibold tracking-wide text-green-600 uppercase">
          <a href="/files" className="hover:text-green-700 hover:underline">
            File manager
          </a>
          <a href="/exports" className="hover:text-green-700 hover:underline">
            Export manager
          </a>
        </div>
      </div>
    </Card>
  );
}
