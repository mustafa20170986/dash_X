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

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

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

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const overlayRef = React.useRef<HTMLDivElement>(null);
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLAnchorElement | null)[]>([]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  React.useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  React.useEffect(() => {
    if (window.innerWidth < 1024 && isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useLayoutEffect(() => {
    const overlay = overlayRef.current;
    const drawer = drawerRef.current;
    const items = itemRefs.current.filter(Boolean);

    if (!overlay || !drawer) return;

    gsap.killTweensOf([overlay, drawer, ...items]);

    if (isOpen) {
      gsap.set(overlay, {
        display: "block",
        pointerEvents: "auto",
      });

      const tl = gsap.timeline();

      tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25 })
        .fromTo(
          drawer,
          { xPercent: -100 },
          { xPercent: 0, duration: 0.35, ease: "power3.out" },
          0,
        )
        .fromTo(
          items,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 0.25,
          },
          0.1,
        );
    } else {
      if (getComputedStyle(overlay).display === "none") return;

      gsap
        .timeline({
          onComplete: () => {
            gsap.set(overlay, {
              display: "none",
              pointerEvents: "none",
            });
          },
        })
        .to(
          items,
          {
            x: -10,
            opacity: 0,
            stagger: {
              each: 0.02,
              from: "end",
            },
            duration: 0.15,
          },
          0,
        )
        .to(
          drawer,
          {
            xPercent: -100,
            duration: 0.3,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          overlay,
          {
            opacity: 0,
            duration: 0.2,
          },
          0.05,
        );
    }
  }, [isOpen]);

  const SidebarContent = () => (
    <>
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-2">
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
                onClick={onClose}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    active
                      ? "bg-primary-foreground/20"
                      : "bg-muted group-hover:bg-background",
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>

                <div className="flex-1">
                  <p>{link.name}</p>
                  <p
                    className={cn(
                      "text-xs",
                      active
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground",
                    )}
                  >
                    {link.desc}
                  </p>
                </div>

                {active && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="border-t p-3">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted"
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
      {/* Desktop */}
      <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile */}
      <div
        ref={overlayRef}
        className="fixed inset-0 top-16 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        style={{
          display: "none",
          opacity: 0,
          pointerEvents: "none",
        }}
        onClick={onClose}
      >
        <div
          ref={drawerRef}
          className="flex h-full w-72 max-w-[85vw] flex-col border-r bg-background shadow-2xl"
          style={{
            transform: "translateX(-100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <SidebarContent />
        </div>
      </div>
    </>
  );
}
