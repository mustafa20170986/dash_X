"use client";

import React from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { DataTable } from "@/components/dashboard/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Users, CalendarDays, FileText, Briefcase } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
  status: "Active" | "On Leave" | "Remote";
}

const employees: Employee[] = [
  { id: "1", name: "John Doe", department: "Engineering", role: "Frontend Developer", status: "Active" },
  { id: "2", name: "Jane Smith", department: "Marketing", role: "Growth Lead", status: "Remote" },
  { id: "3", name: "Robert Fox", department: "Product", role: "Product Manager", status: "On Leave" },
  { id: "4", name: "Jenny Wilson", department: "Design", role: "UX Designer", status: "Active" },
  { id: "5", name: "Albert Flores", department: "Engineering", role: "Backend Developer", status: "Active" },
];

const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "name",
    header: "Employee",
  },
  {
    accessorKey: "department",
    header: "Department",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "Active" ? "default" : status === "Remote" ? "secondary" : "outline"}>
          {status}
        </Badge>
      );
    },
  },
];

export default function HrDashboard() {
  return (
    <DashboardShell title="HR Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">+2 since last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Leave Requests</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14</div>
            <p className="text-xs text-muted-foreground">5 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 in Engineering</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payroll Review</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-muted-foreground">Completed for July</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={employees} searchKey="name" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Birthdays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "John Doe", date: "July 20", age: 28 },
                { name: "Jane Smith", date: "July 24", age: 32 },
                { name: "Jenny Wilson", date: "August 2", age: 25 },
              ].map((bday, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                    {bday.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{bday.name}</p>
                    <p className="text-xs text-muted-foreground">{bday.date} • Turning {bday.age}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
