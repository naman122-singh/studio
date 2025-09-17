
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart, Pie, PieChart, Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { TrendingUp, FileText } from 'lucide-react';

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

const productSalesData = [
    { name: "Pottery", value: 50, fill: "hsl(var(--chart-1))" },
    { name: "Textiles", value: 25, fill: "hsl(var(--chart-2))" },
    { name: "Woodwork", value: 15, fill: "hsl(var(--chart-3))" },
    { name: "Jewelry", value: 10, fill: "hsl(var(--chart-4))" },
]

const productChartConfig = {
    sales: {
        label: "Sales"
    }
} satisfies ChartConfig

export function DashboardCharts() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">6-Month Sales Overview</CardTitle>
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
        <CardFooter>
          <p className="text-sm text-muted-foreground">This bar chart displays monthly sales figures. Sales peaked in February at 305 units, demonstrating the strongest performance in the first half of the year. Following the peak, sales have stabilized, consistently remaining above 200 units per month.</p>
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
            <p className="text-sm text-muted-foreground">This line chart shows weekly sales trends. The solid line represents sales per week, indicating a general upward trend with a slight dip in the final week.</p>
        </CardFooter>
      </Card>
      
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
            <p className="text-sm text-muted-foreground">This chart shows your daily sales performance. Sales build throughout the week, peaking on Friday, followed by a slight dip on Saturday.</p>
          </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Product-wise Sales</CardTitle>
                <CardDescription>Distribution of sales across your product categories.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
                <ChartContainer config={productChartConfig} className="h-[250px] w-full max-w-[250px]">
                    <RadialBarChart
                        data={productSalesData}
                        innerRadius="60%"
                        outerRadius="100%"
                        startAngle={90}
                        endAngle={90 + 360}
                    >
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label content={() => null} />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="value"
                            background={{ fill: "hsl(var(--muted))" }}
                            cornerRadius={10}
                        />
                         <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel hideIndicator />}
                         />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
             <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Top categories by sales
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing sales distribution for top 4 product categories.
                </div>
            </CardFooter>
        </Card>

    </div>
  )
}
