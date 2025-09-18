

"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { TrendingUp, FileText } from 'lucide-react';
import { YearlyProgressChart } from "./yearly-progress-chart";

const weeklySalesData = [
  { week: "Week 1", sales: 150 },
  { week: "Week 2", sales: 180 },
  { week: "Week 3", sales: 220 },
  { week: "Week 4", sales: 200 },
]

const weeklySalesChartConfig = {
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const dailySalesData = [
    { day: "Sun", sales: 90 },
    { day: "Mon", sales: 140 },
    { day: "Tue", sales: 160 },
    { day: "Wed", sales: 150 },
    { day: "Thu", sales: 180 },
    { day: "Fri", sales: 210 },
    { day: "Sat", sales: 190 },
]

const dailySalesChartConfig = {
    sales: {
      label: "Sales",
      color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

export function DashboardCharts() {
  return (
    <div className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Day-wise Sales</CardTitle>
                    <CardDescription>A summary of your sales for the current week.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={dailySalesChartConfig} className="h-[250px] w-full">
                    <BarChart data={dailySalesData} accessibilityLayer>
                        <CartesianGrid vertical={false} />
                        <XAxis
                        dataKey="day"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
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
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">AI Analysis:</span> Your sales show a strong midweek performance, peaking on Friday. Consider running promotions on Sundays and Mondays to boost sales on slower days.
                    </p>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Weekly Sales</CardTitle>
                <CardDescription>Your sales performance over the past four weeks.</CardDescription>
                </CardHeader>
                <CardContent>
                <ChartContainer config={weeklySalesChartConfig} className="h-[250px] w-full">
                    <LineChart data={weeklySalesData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="week"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                    />
                    <YAxis />
                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                    <Line
                        dataKey="sales"
                        type="monotone"
                        stroke="var(--color-sales)"
                        strokeWidth={2}
                        dot={true}
                    />
                    </LineChart>
                </ChartContainer>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-muted-foreground">
                        <span className="font-bold text-foreground">AI Analysis:</span> You have a consistent upward trend in weekly sales, indicating healthy business growth. The slight dip in the most recent week is minor, but monitor next week's performance to ensure the growth trajectory continues.
                    </p>
                </CardFooter>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Monthly wise Progress</CardTitle>
                <CardDescription>Your progress towards annual targets.</CardDescription>
            </CardHeader>
            <CardContent>
                <YearlyProgressChart />
            </CardContent>
            <CardFooter>
                 <p className="text-sm text-muted-foreground">
                    <span className="font-bold text-foreground">AI Analysis:</span> You started the year strong, exceeding your target in January. While March and April were slower, your performance is picking back up. Focus on maintaining this momentum to reach your year-end goals.
                </p>
            </CardFooter>
        </Card>
    </div>
  )
}
