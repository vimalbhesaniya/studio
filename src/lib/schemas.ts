
import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

export type LoginFormData = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
  role: z.enum(["user", "admin"], { message: "Invalid role selected." }).default("user"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // path of error
});

export type RegisterFormData = z.infer<typeof RegisterSchema>;

export const CategorySchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
});
export type CategoryFormData = z.infer<typeof CategorySchema>;

export const TaskSchema = z.object({
  name: z.string().min(3, { message: "Task name must be at least 3 characters." }),
  description: z.string().optional(),
  status: z.enum(["todo", "inprogress", "done", "archived"]).default("todo"),
  categoryId: z.string().optional(),
  assignedTo: z.string().optional(),
  startDate: z.date().optional(),
  dueDate: z.date().optional(),
  canUserEdit: z.boolean().default(false),
});
export type TaskFormData = z.infer<typeof TaskSchema>;
