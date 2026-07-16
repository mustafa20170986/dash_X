"use client";

import React from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  AreaChart,
  Area
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Target, Activity } from "lucide-react";
import AgGridExample from "@/components/dashboard/ag-grid-example";

const data = [
  { name: "Jan", revenue: 4000, users: 2400 },
  { name: "Feb", revenue: 3000, users: 1398 },
  { name: "Mar", revenue: 2000, users: 9800 },
  { name: "Apr", revenue: 2780, users: 3908 },
  { name: "May", revenue: 1890, users: 4800 },
  { name: "Jun", revenue: 2390, users: 3800 },
  { name: "Jul", revenue: 3490, users: 4300 },
];

export default function SaasDashboard() {
  return (
    <DashboardShell title="SaaS Analytics">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Total Revenue", value: "$45,231.89", icon: DollarSign, trend: "+20.1%", color: "text-emerald-500" },
          { title: "Active Users", value: "+2,350", icon: Users, trend: "+180.1%", color: "text-emerald-500" },
          { title: "Sales", value: "+12,234", icon: Target, trend: "+19%", color: "text-emerald-500" },
          { title: "Active Now", value: "+573", icon: Activity, trend: "+201 since last hour", color: "text-emerald-500" },
        ].map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={stat.color}>{stat.trend}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888820" />
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip />
                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00" },
                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00" },
                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00" },
                { name: "William Kim", email: "will@email.com", amount: "+$99.00" },
                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00" },
              ].map((item, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center font-semibold mr-4">
                    {item.name[0]}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{item.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detailed Audit Log (ag-Grid)</CardTitle>
        </CardHeader>
        <CardContent>
          <AgGridExample />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
