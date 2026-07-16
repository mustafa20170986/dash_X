"use client";

import React from "react";
import { Sidebar } from "./sidebar";

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
}

export function DashboardShell({ children, title }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <main className="p-4 md:p-8 space-y-8">{children}</main>
      </div>
    </div>
  );
}
