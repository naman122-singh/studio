"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";

const salesData = [
  { month: "January", sales: 186 },
  { month: "February", sales: 305 },
  { month: "March", sales: 237 },
  { month: "April", sales: 273 },
  { month: "May", sales: 209 },
  { month: "June", sales: 214 },
];

const salesChartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const growthData = [
    { month: 'Jan', growth: 10, target: 12 },
    { month: 'Feb', growth: 15, target: 14 },
    { month: 'Mar', growth: 22, target: 20 },
    { month: 'Apr', growth: 28, target: 25 },
    { month: 'May', growth: 35, target: 30 },
    { month: 'Jun', growth: 42, target: 40 },
]

const growthChartConfig = {
    growth: {
      label: "Growth",
      color: "hsl(var(--chart-1))",
    },
    target: {
      label: "Target",
      color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Sales Overview</CardTitle>
            <CardDescription>A summary of your sales over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesChartConfig} className="h-[250px] w-full">
              <BarChart data={salesData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar dataKey="sales" fill="var(--color-sales)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Growth Trends</CardTitle>
            <CardDescription>Your growth compared to set targets.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={growthChartConfig} className="h-[250px] w-full">
              <LineChart data={growthData} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Line
                  dataKey="growth"
                  type="monotone"
                  stroke="var(--color-growth)"
                  strokeWidth={2}
                  dot={true}
                />
                 <Line
                  dataKey="target"
                  type="monotone"
                  stroke="var(--color-target)"
                  strokeWidth={2}
                  strokeDasharray="3 3"
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
  )
}
