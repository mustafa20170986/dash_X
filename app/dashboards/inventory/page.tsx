"use client";

import React from "react";
import { DashboardShell } from "@/components/dashboard/shell";
import { DataTable } from "@/components/dashboard/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Package, AlertTriangle, Truck, ShoppingCart } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  price: string;
  status: "In Stock" | "Low Stock" | "Out of Stock";
}

const products: Product[] = [
  { id: "1", name: "Wireless Headphones", category: "Electronics", stock: 120, price: "$99.00", status: "In Stock" },
  { id: "2", name: "Mechanical Keyboard", category: "Electronics", stock: 15, price: "$149.00", status: "Low Stock" },
  { id: "3", name: "Ergonomic Chair", category: "Furniture", stock: 45, price: "$299.00", status: "In Stock" },
  { id: "4", name: "Desk Lamp", category: "Home Office", stock: 0, price: "$45.00", status: "Out of Stock" },
  { id: "5", name: "USB-C Hub", category: "Accessories", stock: 200, price: "$59.00", status: "In Stock" },
  { id: "6", name: "Gaming Mouse", category: "Electronics", stock: 8, price: "$79.00", status: "Low Stock" },
];

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "stock",
    header: "Stock Level",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge variant={status === "In Stock" ? "secondary" : status === "Low Stock" ? "outline" : "destructive"}>
          {status}
        </Badge>
      );
    },
  },
];

export default function InventoryDashboard() {
  return (
    <DashboardShell title="Inventory Management">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+4 added this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Suppliers</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34</div>
            <p className="text-xs text-muted-foreground">Across 5 regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">12 pending shipment</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={products} searchKey="name" />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
