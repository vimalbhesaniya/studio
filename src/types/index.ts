
export type Role = "admin" | "user";

export interface User {
  id: string;
  email: string;
  name?: string;
  role: Role;
  avatar?: string; // URL to avatar image
}

export interface Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "todo" | "inprogress" | "done" | "archived";

export interface Task {
  id: string;
  name: string;
  description?: string;
  status: TaskStatus;
  categoryId?: string;
  assignedTo?: string; // User ID
  startDate?: string;
  dueDate?: string;
  canUserEdit: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimeLog {
  id: string;
  taskId: string;
  userId: string;
  startTime: string;
  endTime?: string;
  duration?: number; // in seconds
  createdAt: string;
}

export interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  external?: boolean;
  label?: string;
  description?: string;
  roles?: Role[]; // Roles that can see this nav item
}

export interface NavItemGroup {
  title?: string;
  items: NavItem[];
}
