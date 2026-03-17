import type { PriceDataPoint, PricingTrend } from "./types";
import seedData from "@/data/pricing/seed.json";

type SeedEntry = {
  dataPoints: PriceDataPoint[];
};

type SeedData = Record<string, SeedEntry>;

const typedSeedData = seedData as SeedData;

function linearRegression(points: { x: number; y: number }[]): { slope: number; intercept: number } {
  const n = points.length;
  if (n < 2) return { slope: 0, intercept: points[0]?.y ?? 0 };

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  for (const p of points) {
    sumX += p.x;
    sumY += p.y;
    sumXY += p.x * p.y;
    sumX2 += p.x * p.x;
  }
  const denom = n * sumX2 - sumX * sumX;
  if (denom === 0) return { slope: 0, intercept: sumY / n };
  const slope = (n * sumXY - sumX * sumY) / denom;
  const intercept = (sumY - slope * sumX) / n;
  return { slope, intercept };
}

export function getPricingData(
  year: number,
  make: string,
  model: string,
  timeframe: "6m" | "1y"
): PricingTrend | null {
  // Try exact match and common variations
  const keys = [
    `${year}-${make}-${model}`,
    `${year}-${make.toUpperCase()}-${model.toUpperCase()}`,
    `${year}-${make.toLowerCase()}-${model.toLowerCase()}`,
  ];

  let entry: SeedEntry | undefined;
  let matchedKey = "";
  for (const key of keys) {
    // Case-insensitive lookup
    const found = Object.entries(typedSeedData).find(
      ([k]) => k.toLowerCase() === key.toLowerCase()
    );
    if (found) {
      entry = found[1];
      matchedKey = found[0];
      break;
    }
  }

  if (!entry || !entry.dataPoints || entry.dataPoints.length === 0) {
    return null;
  }

  // Filter data points by timeframe
  const allPoints = entry.dataPoints;
  const sliceCount = timeframe === "6m" ? 6 : 12;
  const dataPoints = allPoints.slice(-Math.min(sliceCount, allPoints.length));

  if (dataPoints.length < 2) return null;

  // Calculate projection using linear regression
  const regressionPoints = dataPoints.map((dp, i) => ({
    x: i,
    y: dp.avgPrice,
  }));
  const { slope } = linearRegression(regressionPoints);

  const currentAvg = dataPoints[dataPoints.length - 1].avgPrice;
  const projectedChangePercent = currentAvg > 0
    ? Math.round(((slope * 3) / currentAvg) * 1000) / 10 // project 3 months out
    : 0;

  let projectedDirection: "up" | "down" | "stable";
  if (projectedChangePercent > 2) projectedDirection = "up";
  else if (projectedChangePercent < -2) projectedDirection = "down";
  else projectedDirection = "stable";

  // Confidence based on data completeness and listing counts
  const avgListings = dataPoints.reduce((sum, dp) => sum + dp.listingCount, 0) / dataPoints.length;
  let confidence: "low" | "medium" | "high";
  if (dataPoints.length >= 10 && avgListings > 200) confidence = "high";
  else if (dataPoints.length >= 6 && avgListings > 50) confidence = "medium";
  else confidence = "low";

  // Parse make/model from matched key
  const parts = matchedKey.split("-");

  return {
    year: parseInt(parts[0]),
    make: parts[1],
    model: parts.slice(2).join("-"),
    timeframe,
    dataPoints,
    currentAvg,
    projectedDirection,
    projectedChangePercent,
    confidence,
  };
}
