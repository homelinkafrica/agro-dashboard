import { FileBarChart } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function ReportsPage() {
  return (
    <PlaceholderPage
      title="Reports"
      icon={FileBarChart}
      description="Yield, cost and activity reports will appear here."
    />
  );
}
