import { NextResponse } from "next/server";
import { getPricingData } from "@/lib/pricing";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year");
  const make = searchParams.get("make");
  const model = searchParams.get("model");
  const timeframe = searchParams.get("timeframe") as "6m" | "1y" | null;

  if (!year || !make || !model) {
    return NextResponse.json(
      { error: "year, make, and model are required" },
      { status: 400 }
    );
  }

  const data = getPricingData(
    parseInt(year),
    make,
    model,
    timeframe === "6m" ? "6m" : "1y"
  );

  if (!data) {
    return NextResponse.json(
      { error: "No pricing data available for this vehicle" },
      { status: 404 }
    );
  }

  return NextResponse.json(data);
}
