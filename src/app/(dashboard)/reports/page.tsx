import { ClipboardList, Package, Sprout } from "lucide-react";
import { LinkCardGrid } from "@/components/lists/link-card-grid";

const items = [
  { title: "By Campaigns", icon: Sprout },
  { title: "By Operations", icon: ClipboardList },
  { title: "Reports on products and costs", icon: Package },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Reports</h1>
      <LinkCardGrid items={items} />
    </div>
  );
}
