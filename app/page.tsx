import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import LandingHero from "@/components/landing/hero";
import DashboardShowcaseSection from "@/components/landing/dashboard-showcase-section";

const dashboards = [
  {
    id: "saas",
    title: "SaaS Analytics",
    description: "Comprehensive overview of your software's performance, user growth, and revenue streams.",
    features: ["KPI Cards", "Revenue Charts", "Monthly Growth", "User Analytics", "Dark Mode Support"],
    color: "from-blue-500 to-indigo-600",
    href: "/dashboards/saas",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "crm",
    title: "CRM Dashboard",
    description: "Manage your customers, sales pipeline, and team performance in one centralized hub.",
    features: ["Customer List", "Sales Pipeline", "Tasks & Calendar", "Team Performance", "Messaging"],
    color: "from-emerald-500 to-teal-600",
    href: "/dashboards/crm",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "finance",
    title: "Finance Tracker",
    description: "Track income, expenses, and profit with real-time data visualization and budgeting tools.",
    features: ["Income/Expense Tracking", "Profit Margins", "Transaction History", "Budget Planning", "Financial Charts"],
    color: "from-amber-500 to-orange-600",
    href: "/dashboards/finance",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "inventory",
    title: "Inventory Management",
    description: "Keep track of stock levels, suppliers, and orders with automated alerts and analytics.",
    features: ["Product Tracking", "Low Stock Alerts", "Supplier Management", "Order Processing", "Stock Analytics"],
    color: "from-rose-500 to-pink-600",
    href: "/dashboards/inventory",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: "hr",
    title: "HR & Employee Portal",
    description: "Streamline employee management, attendance, leave requests, and payroll reviews.",
    features: ["Employee Directory", "Attendance Tracking", "Leave Management", "Payroll Review", "Recruitment Pipe"],
    color: "from-violet-500 to-purple-600",
    href: "/dashboards/hr",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHero />
      
      <div className="py-20 space-y-32">
        {dashboards.map((db, index) => (
          <DashboardShowcaseSection 
            key={db.id} 
            dashboard={db} 
            reverse={index % 2 !== 0} 
          />
        ))}
      </div>

      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© 2026 DashVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
