
import { LoginForm } from "@/components/auth/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your TaskZenith account.",
};

export default function LoginPage() {
  return <LoginForm />;
}
