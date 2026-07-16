"use client";

import React from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { DataTable } from "@/components/dashboard/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Mail, Phone, MapPin } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Lead";
  value: string;
  lastContact: string;
}

const customers: Customer[] = [
  { id: "1", name: "Alex Rivera", email: "alex@example.com", status: "Active", value: "$12,400", lastContact: "2 days ago" },
  { id: "2", name: "Sarah Chen", email: "sarah@example.com", status: "Lead", value: "$0", lastContact: "5 hours ago" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", status: "Active", value: "$8,900", lastContact: "1 week ago" },
  { id: "4", name: "Emily Brown", email: "emily@example.com", status: "Inactive", value: "$2,100", lastContact: "1 month ago" },
  { id: "5", name: "David Wilson", email: "david@example.com", status: "Active", value: "$15,000", lastContact: "Yesterday" },
];

const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Active" ? "default" : status === "Lead" ? "secondary" : "destructive"}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "value",
    header: "Total Value",
  },
  {
    accessorKey: "lastContact",
    header: "Last Contact",
  },
];

export default function CrmDashboard() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <DashboardShell title="CRM Dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <Skeleton className="h-8 w-[200px]" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader><Skeleton className="h-8 w-[150px]" /></CardHeader>
              <CardContent><Skeleton className="h-[200px] w-full" /></CardContent>
            </Card>
            <Card>
              <CardHeader><Skeleton className="h-8 w-[150px]" /></CardHeader>
              <CardContent><Skeleton className="h-[200px] w-full" /></CardContent>
            </Card>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell title="CRM Dashboard">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={customers} searchKey="name" />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Lead", value: 45, color: "bg-blue-500" },
                  { label: "Proposal", value: 30, color: "bg-indigo-500" },
                  { label: "Negotiation", value: 15, color: "bg-purple-500" },
                  { label: "Closed", value: 10, color: "bg-emerald-500" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className={cn("h-full", item.color)} style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Follow up with Alex", time: "10:00 AM", type: "Call" },
                  { title: "Review Sarah's Proposal", time: "02:00 PM", type: "Meeting" },
                  { title: "Team Sync", time: "04:30 PM", type: "Meeting" },
                ].map((task, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.time} • {task.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
