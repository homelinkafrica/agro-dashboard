import { NotebookPen } from "lucide-react";
import { PlaceholderPage } from "@/components/dashboard/placeholder-page";

export default function NotesPage() {
  return (
    <PlaceholderPage
      title="Notes"
      icon={NotebookPen}
      description="Field notes and observations will appear here."
    />
  );
}
