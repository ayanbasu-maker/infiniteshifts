import { NextResponse } from "next/server";
import { getRecommendations } from "@/lib/pricing";
import type { RecommendationPreferences } from "@/lib/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const budget = parseInt(searchParams.get("budget") || "0");
  const carType = (searchParams.get("carType") || "any") as RecommendationPreferences["carType"];
  const priority = (searchParams.get("priority") || "best-value") as RecommendationPreferences["priority"];
  const yearMin = parseInt(searchParams.get("yearMin") || "1990");
  const yearMax = parseInt(searchParams.get("yearMax") || "2026");

  if (!budget || budget < 1000) {
    return NextResponse.json({ error: "Budget is required (min $1,000)" }, { status: 400 });
  }

  const validTypes = ["any", "sedan", "suv", "coupe", "truck", "sports", "luxury"];
  const validPriorities = ["best-value", "appreciating", "lowest-depreciation", "most-car-for-money"];

  if (!validTypes.includes(carType)) {
    return NextResponse.json({ error: "Invalid car type" }, { status: 400 });
  }
  if (!validPriorities.includes(priority)) {
    return NextResponse.json({ error: "Invalid priority" }, { status: 400 });
  }

  const recommendations = getRecommendations({ budget, carType, priority, yearMin, yearMax });
  return NextResponse.json(recommendations);
}
