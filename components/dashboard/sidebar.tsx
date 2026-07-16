"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Users, 
  Wallet, 
  Box, 
  UserCircle, 
  Settings,
  LayoutDashboard,
  LogOut
} from "lucide-react";

const sidebarLinks = [
  { name: "SaaS Analytics", href: "/dashboards/saas", icon: BarChart3 },
  { name: "CRM", href: "/dashboards/crm", icon: Users },
  { name: "Finance", href: "/dashboards/finance", icon: Wallet },
  { name: "Inventory", href: "/dashboards/inventory", icon: Box },
  { name: "HR", href: "/dashboards/hr", icon: UserCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-background">
      <div className="p-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <LayoutDashboard className="w-6 h-6 text-primary" />
          <span>DashVault</span>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </aside>
  );
}
