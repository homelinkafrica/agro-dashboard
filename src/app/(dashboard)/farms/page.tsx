import { Warehouse } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function FarmsPage() {
  return (
    <PlaceholderPage
      title="Farms list"
      icon={Warehouse}
      description="You don't have any farms yet. This is where your farms will appear."
    />
  );
}
