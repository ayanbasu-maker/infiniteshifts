"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import VehicleSelector from "./VehicleSelector";
import PriceSummaryCard from "./PriceSummaryCard";
import type { PricingTrend } from "@/lib/types";

const PriceChart = dynamic(() => import("./PriceChart"), { ssr: false });

type Timeframe = "6m" | "1y" | "3y" | "5y";

const TIMEFRAME_OPTIONS: { value: Timeframe; label: string }[] = [
  { value: "6m", label: "6 Months" },
  { value: "1y", label: "1 Year" },
  { value: "3y", label: "3 Years" },
  { value: "5y", label: "5 Years" },
];

const POPULAR_CARS = [
  { year: 2006, make: "BMW", model: "M3" },
  { year: 2008, make: "Lexus", model: "IS F" },
  { year: 2009, make: "BMW", model: "M5" },
  { year: 2005, make: "Honda", model: "S2000" },
  { year: 2014, make: "Mercedes-Benz", model: "C63 AMG" },
  { year: 2017, make: "Chevrolet", model: "Camaro SS" },
  { year: 2012, make: "Nissan", model: "GT-R" },
  { year: 2018, make: "Dodge", model: "Charger Hellcat" },
];

export default function PricingTrends() {
  const [trend, setTrend] = useState<PricingTrend | null>(null);
  const [timeframe, setTimeframe] = useState<Timeframe>("1y");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedVehicle, setSearchedVehicle] = useState<{
    year: number;
    make: string;
    model: string;
  } | null>(null);

  const fetchPricing = async (year: number, make: string, model: string, tf: Timeframe) => {
    setLoading(true);
    setError(null);
    setSearchedVehicle({ year, make, model });

    try {
      const res = await fetch(
        `/api/pricing?year=${year}&make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&timeframe=${tf}`
      );
      if (!res.ok) {
        setTrend(null);
        setError(
          "No pricing data available for this vehicle yet. Try one of the popular searches below!"
        );
        return;
      }
      const data = await res.json();
      setTrend(data);
    } catch {
      setError("Something went wrong. Please try again.");
      setTrend(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (year: number, make: string, model: string) => {
    fetchPricing(year, make, model, timeframe);
  };

  const handleTimeframeChange = (tf: Timeframe) => {
    setTimeframe(tf);
    if (searchedVehicle) {
      fetchPricing(searchedVehicle.year, searchedVehicle.make, searchedVehicle.model, tf);
    }
  };

  const handlePopularClick = (car: { year: number; make: string; model: string }) => {
    fetchPricing(car.year, car.make, car.model, timeframe);
  };

  return (
    <div className="space-y-8">
      <VehicleSelector onSelect={handleSelect} />

      {/* Timeframe toggle */}
      {(trend || searchedVehicle) && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-neutral-400 mr-2">Timeframe:</span>
          {TIMEFRAME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleTimeframeChange(opt.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeframe === opt.value
                  ? "bg-brand-gold text-black"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-brand-gold/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Results */}
      {!loading && trend && searchedVehicle && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            {searchedVehicle.year} {searchedVehicle.make} {searchedVehicle.model}
          </h2>
          <PriceChart
            dataPoints={trend.dataPoints}
            projectedDirection={trend.projectedDirection}
            projectedChangePercent={trend.projectedChangePercent}
          />
          <PriceSummaryCard trend={trend} />
        </div>
      )}

      {/* Error / no data */}
      {!loading && error && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
          <p className="text-lg text-neutral-400 mb-2">{error}</p>
        </div>
      )}

      {/* Popular searches */}
      {!loading && !trend && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-neutral-400">
            Popular Searches
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_CARS.map((car) => (
              <button
                key={`${car.year}-${car.make}-${car.model}`}
                onClick={() => handlePopularClick(car)}
                className="bg-neutral-900 border border-neutral-800 hover:border-brand-gold/50 rounded-lg p-4 text-left transition-colors group"
              >
                <p className="text-sm font-medium text-foreground group-hover:text-brand-gold transition-colors">
                  {car.year} {car.make}
                </p>
                <p className="text-xs text-neutral-400">{car.model}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* How it works section */}
      <div className="bg-neutral-900/50 rounded-lg border border-neutral-800 p-6">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-400 mb-4">
          How We Estimate Pricing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-400">
          <div>
            <p className="font-semibold text-foreground mb-1">Our Model</p>
            <p>
              Our pricing model factors in original MSRP, age-based depreciation curves, production volume,
              market demand, collector/enthusiast premiums, and seasonal buying patterns to calculate
              current values and project future trends.
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground mb-1">Confidence Levels</p>
            <p>
              <span className="text-green-500 font-medium">High</span> = abundant data, many active listings.{" "}
              <span className="text-brand-gold font-medium">Medium</span> = solid data with some gaps.{" "}
              <span className="text-neutral-300 font-medium">Low</span> = limited listings, rare model, or very old vehicle.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <p className="text-xs text-neutral-400 pt-4 border-t border-neutral-800">
        Pricing is estimated using our algorithmic model and is intended for general reference only.
        Actual market prices vary based on condition, mileage, location, and demand.
        Projections are estimates based on depreciation trends and are not financial advice.
      </p>
    </div>
  );
}
