
// This file can be removed if useAuth is directly exported from auth-provider.tsx
// For now, let's assume auth-provider.tsx exports it.
// If you want a separate file:
"use client";
import { useAuth as useAuthFromProvider } from "@/lib/auth-provider";

/**
 * @deprecated Prefer importing useAuth directly from '@/lib/auth-provider'
 */
export const useAuth = useAuthFromProvider;
