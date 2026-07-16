"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import {
  BarChart3,
  Users,
  Wallet,
  Box,
  UserCircle,
  LogOut,
  ChevronRight,
} from "lucide-react";

const sidebarLinks = [
  {
    name: "SaaS Analytics",
    href: "/dashboards/saas",
    icon: BarChart3,
    desc: "Revenue & metrics",
  },
  {
    name: "CRM",
    href: "/dashboards/crm",
    icon: Users,
    desc: "Customer relations",
  },
  {
    name: "Finance",
    href: "/dashboards/finance",
    icon: Wallet,
    desc: "Transactions & reports",
  },
  {
    name: "Inventory",
    href: "/dashboards/inventory",
    icon: Box,
    desc: "Stock management",
  },
  {
    name: "HR",
    href: "/dashboards/hr",
    icon: UserCircle,
    desc: "Team & payroll",
  },
];

export function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const overlayRef = React.useRef(null);
  const drawerRef = React.useRef(null);
  const itemRefs = React.useRef([]);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Close on route change
  React.useEffect(() => {
    onClose?.();
  }, [pathname]);

  // Close on Escape
  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll on mobile when open
  React.useEffect(() => {
    const isSmall = window.innerWidth < 1024;
    if (isOpen && isSmall) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // GSAP animation for mobile drawer
  React.useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    const items = itemRefs.current.filter(Boolean);

    if (!overlay || !drawer) return;

    gsap.killTweensOf(overlay);
    gsap.killTweensOf(drawer);
    gsap.killTweensOf(items);

    if (isOpen) {
      gsap.set(overlay, { display: "block", pointerEvents: "auto" });

      const tl = gsap.timeline();

      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: "power2.out" },
      )
        .fromTo(
          drawer,
          { xPercent: -100 },
          { xPercent: 0, duration: 0.35, ease: "power3.out" },
          0,
        )
        .fromTo(
          items,
          { x: -16, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.25,
            stagger: 0.04,
            ease: "power2.out",
          },
          0.1,
        );
    } else {
      if (getComputedStyle(overlay).display === "none") return;

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlay, { display: "none", pointerEvents: "none" });
        },
      });

      tl.to(items, {
        x: -10,
        opacity: 0,
        duration: 0.12,
        stagger: { each: 0.02, from: "end" },
        ease: "power2.in",
      })
        .to(drawer, { xPercent: -100, duration: 0.28, ease: "power3.inOut" }, 0)
        .to(overlay, { opacity: 0, duration: 0.2, ease: "power2.inOut" }, 0.04);
    }
  }, [isOpen]);

  const SidebarContent = () => (
    <>
      {/* Links */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1.5">
          {sidebarLinks.map((link, index) => {
            const Icon = link.icon;
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => onClose?.()}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    active
                      ? "bg-primary-foreground/15 text-primary-foreground"
                      : "bg-muted text-foreground/70 group-hover:bg-background group-hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate">{link.name}</p>
                  <p
                    className={cn(
                      "truncate text-xs",
                      active
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.desc}
                  </p>
                </div>

                {active && (
                  <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-border/60 p-3">
        <Link
          href="/"
          onClick={() => onClose?.()}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/80 hover:text-foreground"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
            <LogOut className="h-4 w-4" />
          </span>
          <span>Back to Home</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar - always visible on lg+ */}
      <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-72 shrink-0 flex-col border-r border-border/60 bg-background/95 lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile / Tablet drawer overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        style={{ display: "none", opacity: 0, pointerEvents: "none" }}
        onClick={() => onClose?.()}
      >
        <div
          ref={drawerRef}
          onClick={(e) => e.stopPropagation()}
          className="flex h-full w-72 max-w-[85vw] flex-col border-r border-border/60 bg-background shadow-2xl sm:w-80"
          style={{ transform: "translateX(-100%)" }}
        >
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
