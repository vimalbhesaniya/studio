
"use client";

import { useAuth } from "@/lib/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Logo } from "@/components/logo";
import { Skeleton } from "@/components/ui/skeleton";


export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Logo />
        <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-6 rounded-full animate-spin" /> {/* Basic spinner */}
            <Skeleton className="h-4 w-[200px]" />
        </div>
        <p className="text-muted-foreground">Loading TaskZenith...</p>
      </div>
    </div>
  );
}
