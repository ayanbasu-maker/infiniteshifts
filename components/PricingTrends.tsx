"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import VehicleSelector from "./VehicleSelector";
import PriceSummaryCard from "./PriceSummaryCard";
import type { PricingTrend } from "@/lib/types";

const PriceChart = dynamic(() => import("./PriceChart"), { ssr: false });

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
  const [timeframe, setTimeframe] = useState<"6m" | "1y">("1y");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedVehicle, setSearchedVehicle] = useState<{
    year: number;
    make: string;
    model: string;
  } | null>(null);

  const fetchPricing = async (year: number, make: string, model: string, tf: "6m" | "1y") => {
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

  const handleTimeframeChange = (tf: "6m" | "1y") => {
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
        <div className="flex items-center gap-2">
          <span className="text-sm text-neutral-400 mr-2">Timeframe:</span>
          <button
            onClick={() => handleTimeframeChange("6m")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeframe === "6m"
                ? "bg-brand-gold text-black"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-brand-gold/50"
            }`}
          >
            6 Months
          </button>
          <button
            onClick={() => handleTimeframeChange("1y")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              timeframe === "1y"
                ? "bg-brand-gold text-black"
                : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-brand-gold/50"
            }`}
          >
            1 Year
          </button>
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

      {/* Disclaimer */}
      <p className="text-xs text-neutral-400 pt-4 border-t border-neutral-800">
        Pricing data is based on publicly available market information and is intended for general reference only.
        Actual prices may vary based on condition, mileage, location, and other factors.
        Projections are estimates based on historical trends and are not financial advice.
      </p>
    </div>
  );
}
