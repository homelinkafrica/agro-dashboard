import { ClipboardList } from "lucide-react";
import { Card, CardLink } from "@/components/ui/card";

export function TasksCard() {
  return (
    <Card title="Tasks" action={<CardLink href="/tasks">All tasks</CardLink>}>
      <div className="flex items-center gap-3 text-zinc-500">
        <ClipboardList className="h-5 w-5 shrink-0" />
        <p className="text-sm">No tasks available</p>
      </div>
    </Card>
  );
}
