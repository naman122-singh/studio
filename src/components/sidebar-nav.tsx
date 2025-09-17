"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarSeparator
} from "@/components/ui/sidebar";
import { navLinks } from "@/lib/nav-links";
import { Logo } from "@/components/logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === link.href}
                tooltip={{ children: link.tooltip, className: "font-body" }}
              >
                <Link href={link.href}>
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/user/40/40" data-ai-hint="user avatar" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <span className="font-semibold text-sm truncate">Artisan User</span>
            <span className="text-xs text-muted-foreground truncate">artisan.user@example.com</span>
          </div>
        </div>
      </SidebarFooter>
    </>
  );
}
