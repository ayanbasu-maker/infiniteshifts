export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
}

export interface GarageVehicle {
  name: string;
  image: string;
  description?: string;
  bought?: number;
  sold?: number;
  status: "sold" | "current";
}

export interface Subscriber {
  email: string;
  subscribedAt: string;
}

export interface VehicleMake {
  id: number;
  name: string;
}

export interface VehicleModel {
  id: number;
  name: string;
}

export interface PriceDataPoint {
  date: string;
  avgPrice: number;
  listingCount: number;
}

export interface PricingTrend {
  year: number;
  make: string;
  model: string;
  timeframe: "6m" | "1y" | "3y" | "5y";
  dataPoints: PriceDataPoint[];
  currentAvg: number;
  projectedDirection: "up" | "down" | "stable";
  projectedChangePercent: number;
  confidence: "low" | "medium" | "high";
  confidenceReason: string;
  dataSource: string;
}
