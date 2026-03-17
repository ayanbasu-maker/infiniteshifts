"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import type { PriceDataPoint } from "@/lib/types";

interface PriceChartProps {
  dataPoints: PriceDataPoint[];
  projectedDirection: "up" | "down" | "stable";
  projectedChangePercent: number;
}

function formatPrice(value: number): string {
  return `$${value.toLocaleString()}`;
}

function formatMonth(date: string): string {
  const [year, month] = date.split("-");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[parseInt(month) - 1]} '${year.slice(2)}`;
}

interface ChartDataPoint {
  date: string;
  label: string;
  avgPrice: number;
  listingCount: number;
  projected?: number;
}

export default function PriceChart({
  dataPoints,
  projectedDirection,
  projectedChangePercent,
}: PriceChartProps) {
  // Build chart data with projection
  const chartData: ChartDataPoint[] = dataPoints.map((dp) => ({
    ...dp,
    label: formatMonth(dp.date),
  }));

  // Add 3 projected months
  const lastPoint = dataPoints[dataPoints.length - 1];
  const lastPrice = lastPoint.avgPrice;
  const monthlyChange = (projectedChangePercent / 100 / 3) * lastPrice;

  const [lastYear, lastMonth] = lastPoint.date.split("-").map(Number);

  // Connect projection to last real data point
  chartData[chartData.length - 1] = {
    ...chartData[chartData.length - 1],
    projected: lastPrice,
  };

  for (let i = 1; i <= 3; i++) {
    let projMonth = lastMonth + i;
    let projYear = lastYear;
    if (projMonth > 12) {
      projMonth -= 12;
      projYear += 1;
    }
    const dateStr = `${projYear}-${String(projMonth).padStart(2, "0")}`;
    chartData.push({
      date: dateStr,
      label: formatMonth(dateStr),
      avgPrice: 0,
      listingCount: 0,
      projected: Math.round(lastPrice + monthlyChange * i),
    });
  }

  const allPrices = chartData
    .map((d) => d.avgPrice || d.projected || 0)
    .filter((p) => p > 0);
  const minPrice = Math.min(...allPrices);
  const maxPrice = Math.max(...allPrices);
  const padding = (maxPrice - minPrice) * 0.15;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    const data = payload[0]?.payload as ChartDataPoint;
    const price = data.projected && !data.avgPrice ? data.projected : data.avgPrice;
    const isProjected = data.projected && !data.avgPrice;

    return (
      <div className="bg-white border border-neutral-800 rounded-lg px-4 py-3 shadow-lg">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">
          {formatPrice(price)}
          {isProjected && (
            <span className="text-xs ml-2 text-neutral-400">(projected)</span>
          )}
        </p>
        {data.listingCount > 0 && (
          <p className="text-xs text-neutral-400">
            {data.listingCount} listings
          </p>
        )}
      </div>
    );
  };

  const _ = projectedDirection; // acknowledge prop usage

  return (
    <div className="w-full h-[350px] md:h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC107" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#FFC107" stopOpacity={0.02} />
            </linearGradient>
            <linearGradient id="projGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFC107" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#FFC107" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="label"
            tick={{ fill: "#737373", fontSize: 12 }}
            axisLine={{ stroke: "#e5e5e5" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            tick={{ fill: "#737373", fontSize: 12 }}
            axisLine={{ stroke: "#e5e5e5" }}
            tickLine={false}
            domain={[minPrice - padding, maxPrice + padding]}
            width={55}
          />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine
            x={chartData[dataPoints.length - 1]?.label}
            stroke="#d4d4d4"
            strokeDasharray="4 4"
            label={{ value: "Now", fill: "#737373", fontSize: 11, position: "top" }}
          />
          <Area
            type="monotone"
            dataKey="avgPrice"
            stroke="#FFC107"
            strokeWidth={2.5}
            fill="url(#goldGradient)"
            connectNulls={false}
          />
          <Area
            type="monotone"
            dataKey="projected"
            stroke="#FFC107"
            strokeWidth={2}
            strokeDasharray="6 4"
            fill="url(#projGradient)"
            connectNulls
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
