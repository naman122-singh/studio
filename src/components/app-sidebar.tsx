"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger as SheetTriggerPrimitive,
  SheetClose,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";
import { navLinks, type NavLink } from "@/lib/nav-links";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-60 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b">
              <Logo />
            </div>
            <nav className="flex-1 overflow-y-auto">
              <ul className="py-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <SheetClose asChild>
                      <SidebarLink link={link} isMobile={isMobile} />
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="hidden md:flex flex-col w-60 border-r h-full bg-sidebar text-sidebar-foreground">
      <div className="p-4 border-b h-16 flex items-center">
        <Logo />
      </div>
      <nav className="flex-1 overflow-y-auto">
        <TooltipProvider>
          <ul className="py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <SidebarLink link={link} isMobile={isMobile} />
              </li>
            ))}
          </ul>
        </TooltipProvider>
      </nav>
    </aside>
  );
}

export function SidebarTrigger({ className }: { className?: string }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("md:hidden", className)}>
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0">
                <div className="flex flex-col h-full">
                    <div className="p-4 border-b">
                        <Logo />
                    </div>
                    <nav className="flex-1 overflow-y-auto">
                        <ul className="py-2">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <SheetClose asChild>
                                        <SidebarLink link={link} isMobile={true} />
                                    </SheetClose>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </SheetContent>
        </Sheet>
    )
}

function SidebarLink({ link, isMobile }: { link: NavLink; isMobile: boolean }) {
  const pathname = usePathname();
  const isActive = pathname === link.href;

  const linkContent = (
    <Link
      href={link.href}
      className={cn(
        "flex items-center gap-3 rounded-md p-3 mx-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "hover:bg-sidebar-accent/50"
      )}
    >
      {link.icon}
      <span>{link.label}</span>
    </Link>
  );

  if (isMobile) {
    return linkContent;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
      <TooltipContent side="right">
        <p>{link.tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}
