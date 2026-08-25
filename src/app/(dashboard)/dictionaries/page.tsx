import { GraduationCap, Package, Sprout } from "lucide-react";
import { LinkCardGrid } from "@/components/lists/link-card-grid";

const items = [
  { title: "Crops", subtitle: "305 items", icon: Sprout },
  { title: "Products", subtitle: "13007 items", icon: Package },
  { title: "Qualifications", subtitle: "1 item", icon: GraduationCap },
];

export default function DictionariesPage() {
  return (
    <div className="flex flex-col gap-4 px-4 py-6 sm:px-6">
      <h1 className="text-2xl font-semibold text-zinc-900">Dictionaries</h1>
      <LinkCardGrid items={items} />
    </div>
  );
}
