
import { siteConfig } from "@/config/site";
import { Command } from "lucide-react"; // Using Command as a generic app icon
import Link from "next/link";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center space-x-2 ${className || ''}`}>
      <Command className="h-6 w-6 text-primary" />
      <span className="font-bold text-xl text-primary">{siteConfig.name}</span>
    </Link>
  );
}
