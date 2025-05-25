
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar";
import { Logo } from "@/components/logo";
import { dashboardNavItems } from "@/config/dashboard";
import type { NavItem } from "@/types";
import { useAuth } from "@/lib/auth-provider";
import { UserNav } from "./user-nav";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export function AppSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

  const renderNavItem = (item: NavItem) => {
    if (item.roles && user && !item.roles.includes(user.role)) {
      return null;
    }
    return (
      <SidebarMenuItem key={item.href}>
        <SidebarMenuButton
          asChild
          isActive={isActive(item.href)}
          tooltip={item.title}
        >
          <Link href={item.href}>
            {item.icon && <item.icon />}
            <span>{item.title}</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="flex-grow p-2">
        {dashboardNavItems.map((group, index) => (
          <SidebarGroup key={group.title || `group-${index}`}>
            {group.title && (
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            )}
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(renderNavItem)}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        {user && (
          <div className="flex flex-col gap-2 items-center group-data-[collapsible=icon]:hidden">
             <UserNav />
             <Button variant="ghost" size="sm" onClick={logout} className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
               <LogOut className="mr-2 h-4 w-4" /> Logout
             </Button>
          </div>
        )}
         {user && (
           <div className="hidden group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:gap-2">
             <UserNav />
              <SidebarMenuButton onClick={logout} tooltip="Logout">
                <LogOut/>
              </SidebarMenuButton>
           </div>
         )}
      </SidebarFooter>
    </Sidebar>
  );
}
