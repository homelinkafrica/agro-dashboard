import { ListChecks } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function TasksPage() {
  return (
    <PlaceholderPage
      title="Tasks"
      icon={ListChecks}
      description="No tasks available. Tasks you create will show up here."
    />
  );
}
