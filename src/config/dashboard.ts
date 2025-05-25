
import type { NavItemGroup } from "@/types";
import { LayoutDashboard, ListChecks, Users, Settings, FolderKanban, GanttChartSquare, BarChart3 } from "lucide-react";

export const dashboardNavItems: NavItemGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["admin", "user"],
      },
      {
        title: "Tasks",
        href: "/tasks",
        icon: ListChecks,
        roles: ["user"],
      },
    ],
  },
  {
    title: "Admin",
    items: [
      {
        title: "Manage Tasks",
        href: "/admin/tasks",
        icon: FolderKanban,
        roles: ["admin"],
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: GanttChartSquare,
        roles: ["admin"],
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: Users,
        roles: ["admin"],
      },
      {
        title: "Time Tracking",
        href: "/admin/tracking",
        icon: BarChart3,
        roles: ["admin"],
      },
    ],
  },
  {
    title: "Settings",
    items: [
       {
        title: "Profile",
        href: "/profile",
        icon: Settings,
        roles: ["admin", "user"],
      },
      {
        title: "General Settings",
        href: "/settings",
        icon: Settings,
        roles: ["admin", "user"],
      },
    ],
  },
];
