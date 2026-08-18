import {
  BookOpen,
  CalendarRange,
  FileBarChart,
  LayoutDashboard,
  ListChecks,
  Map,
  NotebookPen,
  Sprout,
  Truck,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Farms list", href: "/farms", icon: Warehouse },
  { label: "Map", href: "/map", icon: Map },
  { label: "Tasks", href: "/tasks", icon: ListChecks },
  { label: "Campaigns", href: "/campaigns", icon: CalendarRange },
  { label: "Fields", href: "/fields", icon: Sprout },
  { label: "Equipment", href: "/equipment", icon: Truck },
  { label: "Workers", href: "/workers", icon: Users },
  { label: "Notes", href: "/notes", icon: NotebookPen },
  { label: "Dictionaries", href: "/dictionaries", icon: BookOpen },
  { label: "Reports", href: "/reports", icon: FileBarChart },
];
