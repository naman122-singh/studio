
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowUp, DollarSign, Users, CreditCard, Activity, Edit, PlusCircle } from "lucide-react";
import { DashboardCharts } from "@/components/dashboard-charts";
import Link from "next/link";
import { SidebarTrigger } from "@/components/app-sidebar";
import { TopProducts } from "@/components/top-products";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
                <p className="text-muted-foreground">A quick overview of your business.</p>
            </div>
            <div className="flex gap-2">
                 <Button>
                    <PlusCircle className="mr-2" />
                    Add Product
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Edit className="mr-2" />
                            Update
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle className="font-headline">Daily Update</DialogTitle>
                            <DialogDescription>
                                Enter today's numbers to keep your dashboard up-to-date.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="revenue" className="text-right">
                                    Revenue
                                </Label>
                                <Input id="revenue" type="number" placeholder="e.g., 5000" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-start gap-4">
                                <Label htmlFor="product-sales" className="text-right pt-2">
                                    Today's Sales
                                </Label>
                                <Textarea id="product-sales" placeholder="e.g., 2 Silk Sarees, 5 Brass Lamps" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="sales" className="text-right">
                                    Sales
                                </Label>
                                <Input id="sales" type="number" placeholder="e.g., 25" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </header>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">New Artisans</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+23</div>
                <p className="text-xs text-muted-foreground">+18.1% from last month</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+12,234</div>
                <p className="text-xs text-muted-foreground">+19% from last month</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">+573</div>
                <p className="text-xs text-muted-foreground">+201 since last hour</p>
            </CardContent>
            </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <DashboardCharts />
        </div>
        <TopProducts />
      </div>
    </div>
  );
}
