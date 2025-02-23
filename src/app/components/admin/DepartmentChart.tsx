import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, LabelProps, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/app/components/chart";
import { useQuery } from "@tanstack/react-query";
import { retrieveDepartmentEmployeeCounts } from "@/app/api/department";
import { DepartmentEmployeeCount } from "@/app/types/department-roles";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

const colors = [
  "var(--color-chrome)",
  "var(--color-safari)",
  "var(--color-firefox)",
  "var(--color-edge)",
  "var(--color-other)",
];

const convertToChartData = (data: DepartmentEmployeeCount[]) => {
  data = data.sort((a, b) => b.employeeCount - a.employeeCount);
  const chartData: { browser: string; visitors: number; fill: string }[] = [];
  const other = {
    browser: "other",
    visitors: 0,
    fill: colors[colors.length - 1],
  };

  for (let i = 0; i < data.length; i++) {
    if (i >= 5) {
      other.visitors += data[i].employeeCount;
    } else {
      chartData.push({
        browser: data[i].name,
        visitors: data[i].employeeCount,
        fill: colors[i],
      });
    }
  }
  if (other.visitors > 0) {
    chartData.push(other);
  }
  return chartData;
};

export function DepartmentChart() {
  const { data} = useQuery({
    queryKey: ["chart-data"],
    queryFn: retrieveDepartmentEmployeeCounts,
  });

  const totalVisitors = React.useMemo(() => {
    return data?.reduce((acc, curr) => acc + curr.employeeCount, 0);
  }, [data]);

  const chartData = React.useMemo(() => {
    return convertToChartData(data ?? []);
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut with Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }: LabelProps) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors?.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Visitors
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
