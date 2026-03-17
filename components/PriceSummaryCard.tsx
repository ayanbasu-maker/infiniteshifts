import type { PricingTrend } from "@/lib/types";

interface PriceSummaryCardProps {
  trend: PricingTrend;
}

export default function PriceSummaryCard({ trend }: PriceSummaryCardProps) {
  const directionConfig = {
    up: {
      arrow: "\u2191",
      color: "text-green-500",
      bg: "bg-green-500/10",
      label: "Appreciating",
      desc: "This car is gaining value. Prices are trending upward.",
    },
    down: {
      arrow: "\u2193",
      color: "text-red-500",
      bg: "bg-red-500/10",
      label: "Depreciating",
      desc: "Prices are dropping. Could be a good time to buy soon.",
    },
    stable: {
      arrow: "\u2194",
      color: "text-neutral-400",
      bg: "bg-neutral-400/10",
      label: "Stable",
      desc: "Prices are holding steady with minimal change.",
    },
  };

  const config = directionConfig[trend.projectedDirection];
  const avgListings = Math.round(
    trend.dataPoints.reduce((sum, dp) => sum + dp.listingCount, 0) /
      trend.dataPoints.length
  );

  const confidenceColors: Record<string, string> = {
    high: "text-green-500",
    medium: "text-brand-gold",
    low: "text-neutral-400",
    estimated: "text-blue-400",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      {/* Current Price */}
      <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-5">
        <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
          Current Avg Price
        </p>
        <p className="text-2xl font-bold text-foreground">
          ${trend.currentAvg.toLocaleString()}
        </p>
      </div>

      {/* Trend Direction */}
      <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-5">
        <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
          Trend
        </p>
        <div className="flex items-center gap-2">
          <span className={`text-2xl font-bold ${config.color}`}>
            {config.arrow}
          </span>
          <div>
            <p className={`text-lg font-bold ${config.color}`}>
              {config.label}
            </p>
          </div>
        </div>
      </div>

      {/* Projected Change */}
      <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-5">
        <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
          3-Month Projection
        </p>
        <p className={`text-2xl font-bold ${config.color}`}>
          {trend.projectedChangePercent > 0 ? "+" : ""}
          {trend.projectedChangePercent}%
        </p>
      </div>

      {/* Confidence */}
      <div className="bg-neutral-900 rounded-lg border border-neutral-800 p-5">
        <p className="text-xs uppercase tracking-wider text-neutral-400 mb-1">
          Data Confidence
        </p>
        <p className={`text-lg font-bold capitalize ${confidenceColors[trend.confidence]}`}>
          {trend.confidence}
        </p>
        <p className="text-xs text-neutral-400 mt-1">
          ~{avgListings} avg listings
        </p>
      </div>

      {/* Insight bar */}
      <div className={`md:col-span-4 ${config.bg} rounded-lg p-4 border border-neutral-800`}>
        <p className="text-sm text-foreground">
          <span className="font-semibold">{config.arrow} Insight:</span>{" "}
          {config.desc}
        </p>
      </div>
    </div>
  );
}
