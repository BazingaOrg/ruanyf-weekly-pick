"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Wrench, Brain, Bookmark } from "lucide-react";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  isCollapsed?: boolean;
}

function NavLink({ href, children, icon, isCollapsed }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "nav-link relative flex items-center justify-center transition-all duration-300",
        isActive ? "bg-accent text-accent-foreground" : "hover:bg-accent/50",
        isCollapsed ? "h-10 w-10 rounded-lg" : "h-9 w-full rounded-md"
      )}
      title={isCollapsed ? String(children) : undefined}
    >
      {isCollapsed ? (
        <div className="flex h-full w-full items-center justify-center">
          {icon}
        </div>
      ) : (
        <div className="flex w-full items-center gap-3 px-2">
          {icon}
          <span className="truncate">{children}</span>
        </div>
      )}
    </Link>
  );
}

interface NavigationProps {
  isCollapsed?: boolean;
}

export function Navigation({ isCollapsed }: NavigationProps) {
  return (
    <nav className="flex flex-col items-center gap-1">
      <NavLink
        href="/tools"
        icon={<Wrench className="h-4 w-4" />}
        isCollapsed={isCollapsed}
      >
        工具
      </NavLink>
      <NavLink
        href="/ai"
        icon={<Brain className="h-4 w-4" />}
        isCollapsed={isCollapsed}
      >
        AI
      </NavLink>
      <NavLink
        href="/resources"
        icon={<Bookmark className="h-4 w-4" />}
        isCollapsed={isCollapsed}
      >
        资源
      </NavLink>
    </nav>
  );
}
