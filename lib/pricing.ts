import type { PriceDataPoint, PricingTrend } from "./types";
import seedData from "@/data/pricing/seed.json";

type SeedEntry = {
  dataPoints: PriceDataPoint[];
};

type SeedData = Record<string, SeedEntry>;

const typedSeedData = seedData as SeedData;

// ── Make tier definitions with base MSRP estimates ──────────────────────
const MAKE_TIERS: Record<string, { tier: string; baseMsrp: number }> = {
  // Economy (~$25-35K MSRP)
  "Honda": { tier: "economy", baseMsrp: 28000 },
  "Toyota": { tier: "economy", baseMsrp: 30000 },
  "Nissan": { tier: "economy", baseMsrp: 27000 },
  "Hyundai": { tier: "economy", baseMsrp: 26000 },
  "Kia": { tier: "economy", baseMsrp: 25000 },
  "Mazda": { tier: "economy", baseMsrp: 27000 },
  "Subaru": { tier: "economy", baseMsrp: 29000 },
  "Mitsubishi": { tier: "economy", baseMsrp: 24000 },
  "FIAT": { tier: "economy", baseMsrp: 22000 },
  "Suzuki": { tier: "economy", baseMsrp: 20000 },
  "Scion": { tier: "economy", baseMsrp: 20000 },
  "Saturn": { tier: "economy", baseMsrp: 20000 },
  "Pontiac": { tier: "economy", baseMsrp: 25000 },
  "Oldsmobile": { tier: "economy", baseMsrp: 22000 },
  "Plymouth": { tier: "economy", baseMsrp: 20000 },
  "Mercury": { tier: "economy", baseMsrp: 24000 },
  "Saab": { tier: "economy", baseMsrp: 30000 },

  // Mid (~$35-55K MSRP)
  "BMW": { tier: "mid", baseMsrp: 48000 },
  "Audi": { tier: "mid", baseMsrp: 45000 },
  "Mercedes-Benz": { tier: "mid", baseMsrp: 50000 },
  "Lexus": { tier: "mid", baseMsrp: 45000 },
  "Acura": { tier: "mid", baseMsrp: 38000 },
  "INFINITI": { tier: "mid", baseMsrp: 42000 },
  "Volvo": { tier: "mid", baseMsrp: 42000 },
  "Cadillac": { tier: "mid", baseMsrp: 45000 },
  "Lincoln": { tier: "mid", baseMsrp: 42000 },
  "Genesis": { tier: "mid", baseMsrp: 43000 },
  "Buick": { tier: "mid", baseMsrp: 32000 },
  "Chrysler": { tier: "mid", baseMsrp: 30000 },
  "Dodge": { tier: "mid", baseMsrp: 35000 },
  "Ford": { tier: "mid", baseMsrp: 35000 },
  "Chevrolet": { tier: "mid", baseMsrp: 35000 },
  "GMC": { tier: "mid", baseMsrp: 40000 },
  "Jeep": { tier: "mid", baseMsrp: 38000 },
  "Volkswagen": { tier: "mid", baseMsrp: 30000 },
  "MINI": { tier: "mid", baseMsrp: 32000 },
  "Alfa Romeo": { tier: "mid", baseMsrp: 42000 },
  "Jaguar": { tier: "mid", baseMsrp: 48000 },
  "RAM": { tier: "mid", baseMsrp: 40000 },
  "HUMMER": { tier: "mid", baseMsrp: 55000 },

  // Premium (~$60-120K MSRP)
  "Porsche": { tier: "premium", baseMsrp: 85000 },
  "Land Rover": { tier: "premium", baseMsrp: 65000 },
  "Maserati": { tier: "premium", baseMsrp: 80000 },
  "Bentley": { tier: "premium", baseMsrp: 200000 },
  "Aston Martin": { tier: "premium", baseMsrp: 160000 },

  // Exotic (~$200K+ MSRP)
  "Ferrari": { tier: "exotic", baseMsrp: 280000 },
  "Lamborghini": { tier: "exotic", baseMsrp: 260000 },
  "McLaren": { tier: "exotic", baseMsrp: 220000 },
  "Rolls-Royce": { tier: "exotic", baseMsrp: 350000 },
  "Lotus": { tier: "premium", baseMsrp: 75000 },

  // EV
  "Tesla": { tier: "mid", baseMsrp: 50000 },
  "Rivian": { tier: "mid", baseMsrp: 75000 },
};

// Model-specific MSRP overrides (for models that differ significantly from make average)
const MODEL_MSRP_OVERRIDES: Record<string, number> = {
  // Honda
  "Civic": 24000, "Fit": 18000, "HR-V": 24000, "Accord": 28000,
  "CR-V": 30000, "Pilot": 38000, "Odyssey": 35000, "Ridgeline": 38000,
  "S2000": 35000, "NSX": 160000, "Civic Type R": 42000, "Prelude": 25000,

  // Toyota
  "Corolla": 22000, "Camry": 27000, "RAV4": 30000, "Highlander": 38000,
  "4Runner": 40000, "Tacoma": 32000, "Tundra": 42000, "Supra": 55000,
  "GR Supra": 55000, "GR86": 30000, "86": 28000, "Land Cruiser": 85000,
  "Sequoia": 60000, "MR2": 22000, "Celica": 22000, "FJ Cruiser": 30000,

  // BMW
  "3 Series": 44000, "5 Series": 55000, "7 Series": 90000, "X3": 48000,
  "X5": 65000, "X7": 80000, "M3": 75000, "M4": 78000, "M5": 108000,
  "M2": 63000, "Z4": 55000, "i4": 55000, "i7": 105000, "8 Series": 88000,

  // Mercedes
  "C-Class": 45000, "E-Class": 58000, "S-Class": 115000, "G-Class": 140000,
  "GLE-Class": 60000, "GLS-Class": 80000, "AMG GT": 120000, "SL-Class": 110000,
  "CLA-Class": 38000, "GLA-Class": 38000, "A-Class": 35000,

  // Porsche
  "911": 115000, "Cayenne": 75000, "Macan": 60000, "Panamera": 92000,
  "Taycan": 90000, "Boxster": 65000, "Cayman": 65000, "718 Boxster": 68000,
  "718 Cayman": 65000, "918 Spyder": 850000,

  // Ford
  "F-150": 38000, "Mustang": 32000, "Bronco": 35000, "Explorer": 38000,
  "Escape": 30000, "Expedition": 55000, "GT": 500000, "Ranger": 30000,
  "Focus RS": 42000, "Focus ST": 28000, "Maverick": 25000,

  // Chevrolet
  "Corvette": 65000, "Camaro": 30000, "Camaro SS": 42000, "Camaro ZL1": 65000,
  "Silverado 1500": 38000, "Tahoe": 55000, "Suburban": 60000,
  "Impala": 32000, "Malibu": 25000, "Equinox": 28000, "Blazer": 35000,
  "SS": 48000, "Colorado": 30000,

  // Dodge
  "Challenger": 32000, "Charger": 34000, "Charger Hellcat": 72000,
  "Challenger SRT8": 50000, "Viper": 100000, "Durango": 40000,

  // Nissan
  "GT-R": 115000, "370Z": 32000, "350Z": 28000, "Z": 42000,
  "300ZX": 30000, "240SX": 18000, "Altima": 26000, "Maxima": 38000,
  "Frontier": 30000, "Pathfinder": 38000, "Rogue": 29000,

  // Subaru
  "WRX": 32000, "WRX STI": 42000, "BRZ": 30000, "Outback": 32000,
  "Forester": 30000, "Crosstrek": 28000, "Impreza": 22000,

  // Audi
  "R8": 150000, "RS3": 60000, "RS5": 75000, "RS6": 120000,
  "RS7": 125000, "S3": 46000, "S4": 52000, "S5": 55000,
  "TT": 48000, "TT RS": 70000, "e-tron GT": 105000,

  // Lexus
  "IS 300": 40000, "IS 350": 44000, "IS 500": 58000, "IS F": 65000,
  "GS 350": 52000, "GS F": 85000, "LS 500": 78000, "LC 500": 95000,
  "LFA": 375000, "RC F": 65000, "LX 600": 90000,

  // Tesla
  "Model 3": 42000, "Model Y": 48000, "Model S": 85000, "Model X": 95000,
  "Cybertruck": 70000, "Roadster": 200000,

  // Misc enthusiast
  "Lancer Evolution": 38000, "3000GT": 30000, "Eclipse": 22000,
  "Stinger": 38000, "Stinger GT": 42000, "Veloster N": 33000,
  "Golf R": 44000, "Golf GTI": 32000,
  "Cooper S": 32000, "John Cooper Works": 38000,
  "Miata MX-5": 28000, "MX-5 Miata": 28000, "RX-7": 30000, "RX-8": 28000,
  "Cayman S": 72000, "Boxster S": 70000,
  "CTS-V": 72000,
};

// Models that tend to appreciate (enthusiast/collector cars)
const APPRECIATING_MODELS = new Set([
  "S2000", "NSX", "GT-R", "Supra", "GR Supra", "911", "Cayman S", "Boxster S",
  "M3", "M5", "M4", "Viper", "Corvette", "Camaro ZL1", "Camaro SS",
  "WRX STI", "Lancer Evolution", "RX-7", "300ZX", "240SX", "MR2",
  "IS F", "LFA", "RC F", "GS F", "Focus RS", "Golf R", "R8",
  "Challenger SRT8", "Charger Hellcat", "CTS-V", "GTO", "Firebird",
  "Trans Am", "Veloster N", "Civic Type R", "Type R",
  "918 Spyder", "GT", "Elise", "Exige", "Evora", "Emira",
  "F40", "F50", "Testarossa", "Countach", "Diablo", "Gallardo",
  "Continental GT", "Phantom", "G-Class", "Defender",
  "Land Cruiser", "FJ Cruiser", "4Runner", "Bronco",
  "Wrangler", "Wrangler Unlimited",
]);

// ── Seeded pseudo-random number generator ───────────────────────────────
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ── Linear regression ───────────────────────────────────────────────────
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

// ── Generate realistic pricing data for any car ─────────────────────────
function generatePricingData(
  year: number,
  make: string,
  model: string,
  timeframe: "6m" | "1y"
): PricingTrend {
  const currentYear = 2026;
  const vehicleAge = currentYear - year;

  // Get base MSRP
  const makeInfo = MAKE_TIERS[make] || { tier: "mid", baseMsrp: 35000 };
  let msrp = MODEL_MSRP_OVERRIDES[model] || makeInfo.baseMsrp;

  // Apply depreciation curve
  let currentValue = msrp;
  for (let y = 0; y < vehicleAge; y++) {
    if (y === 0) currentValue *= 0.82;       // Year 1: -18%
    else if (y === 1) currentValue *= 0.85;   // Year 2: -15%
    else if (y === 2) currentValue *= 0.88;   // Year 3: -12%
    else if (y <= 4) currentValue *= 0.92;    // Year 4-5: -8%
    else currentValue *= 0.95;                 // Year 6+: -5%
  }

  // Floor: cars don't drop below ~12% of MSRP
  const floor = msrp * 0.12;
  if (currentValue < floor) currentValue = floor;

  // Enthusiast appreciation: if model is in the set AND old enough, bump it up
  const isAppreciating = APPRECIATING_MODELS.has(model);
  if (isAppreciating && vehicleAge > 5) {
    // These models appreciate after initial depreciation
    const appreciationYears = Math.min(vehicleAge - 5, 15);
    currentValue *= (1 + 0.04 * appreciationYears); // ~4% per year appreciation
  }

  // Round to nearest $500
  currentValue = Math.round(currentValue / 500) * 500;

  // Generate 12 months of data using seeded random
  const seed = hashCode(`${year}-${make}-${model}`);
  const rng = seededRandom(seed);

  // Determine monthly trend direction
  let monthlyTrend: number;
  if (isAppreciating && vehicleAge > 5) {
    monthlyTrend = 0.003 + rng() * 0.005; // +0.3% to +0.8% per month (appreciating)
  } else if (vehicleAge <= 3) {
    monthlyTrend = -(0.008 + rng() * 0.005); // -0.8% to -1.3% per month (new car depreciation)
  } else if (vehicleAge <= 8) {
    monthlyTrend = -(0.003 + rng() * 0.004); // -0.3% to -0.7% per month
  } else {
    monthlyTrend = -(0.001 + rng() * 0.003); // -0.1% to -0.4% per month (old cars slow depreciation)
  }

  // Seasonal multipliers (spring/summer slightly higher)
  const seasonalFactors = [
    0.97, 0.98, 1.00, 1.02, 1.03, 1.04,  // Jan-Jun
    1.03, 1.02, 1.01, 0.99, 0.98, 0.97,  // Jul-Dec
  ];

  // Build 12 months of data points going backwards from March 2026
  const dataPoints: PriceDataPoint[] = [];
  let price = currentValue;

  // Work backwards from current month
  for (let i = 11; i >= 0; i--) {
    const monthsAgo = i;
    const date = new Date(2026, 2 - monthsAgo, 1); // March 2026 minus months
    const monthIndex = date.getMonth();
    const dateStr = `${date.getFullYear()}-${String(monthIndex + 1).padStart(2, "0")}`;

    // Calculate price for this month
    const seasonal = seasonalFactors[monthIndex];
    const monthPrice = price * (1 - monthlyTrend * monthsAgo) * seasonal;
    const noise = 1 + (rng() - 0.5) * 0.02; // ±1% random noise

    // Listing count based on how common the car is
    let baseListings: number;
    if (makeInfo.tier === "economy") baseListings = 200 + Math.floor(rng() * 300);
    else if (makeInfo.tier === "mid") baseListings = 100 + Math.floor(rng() * 200);
    else if (makeInfo.tier === "premium") baseListings = 30 + Math.floor(rng() * 70);
    else baseListings = 10 + Math.floor(rng() * 30); // exotic

    // Older cars have fewer listings
    if (vehicleAge > 15) baseListings = Math.floor(baseListings * 0.3);
    else if (vehicleAge > 10) baseListings = Math.floor(baseListings * 0.5);
    else if (vehicleAge > 5) baseListings = Math.floor(baseListings * 0.7);

    const listingVariation = 1 + (rng() - 0.5) * 0.1;

    dataPoints.push({
      date: dateStr,
      avgPrice: Math.round(monthPrice * noise / 100) * 100,
      listingCount: Math.max(5, Math.round(baseListings * listingVariation)),
    });
  }

  // Sort chronologically
  dataPoints.sort((a, b) => a.date.localeCompare(b.date));

  // Slice to timeframe
  const sliceCount = timeframe === "6m" ? 6 : 12;
  const slicedPoints = dataPoints.slice(-Math.min(sliceCount, dataPoints.length));

  // Calculate projection using linear regression
  const regressionPoints = slicedPoints.map((dp, i) => ({
    x: i,
    y: dp.avgPrice,
  }));
  const { slope } = linearRegression(regressionPoints);

  const currentAvg = slicedPoints[slicedPoints.length - 1].avgPrice;
  const projectedChangePercent = currentAvg > 0
    ? Math.round(((slope * 3) / currentAvg) * 1000) / 10
    : 0;

  let projectedDirection: "up" | "down" | "stable";
  if (projectedChangePercent > 2) projectedDirection = "up";
  else if (projectedChangePercent < -2) projectedDirection = "down";
  else projectedDirection = "stable";

  return {
    year,
    make,
    model,
    timeframe,
    dataPoints: slicedPoints,
    currentAvg,
    projectedDirection,
    projectedChangePercent,
    confidence: "estimated",
  };
}

// ── Main pricing function ───────────────────────────────────────────────
export function getPricingData(
  year: number,
  make: string,
  model: string,
  timeframe: "6m" | "1y"
): PricingTrend | null {
  // Try exact match in seed data first
  const keys = [
    `${year}-${make}-${model}`,
    `${year}-${make.toUpperCase()}-${model.toUpperCase()}`,
    `${year}-${make.toLowerCase()}-${model.toLowerCase()}`,
  ];

  let entry: SeedEntry | undefined;
  let matchedKey = "";
  for (const key of keys) {
    const found = Object.entries(typedSeedData).find(
      ([k]) => k.toLowerCase() === key.toLowerCase()
    );
    if (found) {
      entry = found[1];
      matchedKey = found[0];
      break;
    }
  }

  // If seed data found, use it (higher fidelity)
  if (entry && entry.dataPoints && entry.dataPoints.length > 0) {
    const allPoints = entry.dataPoints;
    const sliceCount = timeframe === "6m" ? 6 : 12;
    const dataPoints = allPoints.slice(-Math.min(sliceCount, allPoints.length));

    if (dataPoints.length < 2) return null;

    const regressionPoints = dataPoints.map((dp, i) => ({
      x: i,
      y: dp.avgPrice,
    }));
    const { slope } = linearRegression(regressionPoints);

    const currentAvg = dataPoints[dataPoints.length - 1].avgPrice;
    const projectedChangePercent = currentAvg > 0
      ? Math.round(((slope * 3) / currentAvg) * 1000) / 10
      : 0;

    let projectedDirection: "up" | "down" | "stable";
    if (projectedChangePercent > 2) projectedDirection = "up";
    else if (projectedChangePercent < -2) projectedDirection = "down";
    else projectedDirection = "stable";

    const avgListings = dataPoints.reduce((sum, dp) => sum + dp.listingCount, 0) / dataPoints.length;
    let confidence: "low" | "medium" | "high" | "estimated";
    if (dataPoints.length >= 10 && avgListings > 200) confidence = "high";
    else if (dataPoints.length >= 6 && avgListings > 50) confidence = "medium";
    else confidence = "low";

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

  // No seed data — generate estimated data
  return generatePricingData(year, make, model, timeframe);
}
