"use client";

import { useState } from "react";
import type { CarRecommendation } from "@/lib/types";

const CAR_TYPES = [
  { value: "any", label: "Any Type" },
  { value: "sedan", label: "Sedan" },
  { value: "coupe", label: "Coupe / Sports Car" },
  { value: "suv", label: "SUV / Crossover" },
  { value: "truck", label: "Truck" },
  { value: "sports", label: "Performance / Enthusiast" },
  { value: "luxury", label: "Luxury" },
];

const PRIORITIES = [
  { value: "best-value", label: "Best Value", description: "Biggest bang for your buck — most car for the money with strong value retention" },
  { value: "appreciating", label: "Appreciating Cars", description: "Cars that are going up in value — collector and enthusiast favorites" },
  { value: "lowest-depreciation", label: "Holds Value Best", description: "Cars projected to lose the least money going forward" },
  { value: "most-car-for-money", label: "Most Car for Money", description: "Highest original MSRP you can get within your budget" },
];

const BUDGET_PRESETS = [10000, 20000, 30000, 50000, 75000, 100000, 150000, 250000];

export default function CarRecommendations() {
  const [budget, setBudget] = useState<number>(30000);
  const [customBudget, setCustomBudget] = useState("");
  const [carType, setCarType] = useState("any");
  const [priority, setPriority] = useState("best-value");
  const [results, setResults] = useState<CarRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchRecommendations = async () => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `/api/recommendations?budget=${budget}&carType=${carType}&priority=${priority}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBudgetPreset = (val: number) => {
    setBudget(val);
    setCustomBudget("");
  };

  const handleCustomBudget = (val: string) => {
    setCustomBudget(val);
    const num = parseInt(val.replace(/[^0-9]/g, ""));
    if (!isNaN(num) && num > 0) {
      setBudget(num);
    }
  };

  const directionArrow = (dir: "up" | "down" | "stable") => {
    if (dir === "up") return "↑";
    if (dir === "down") return "↓";
    return "→";
  };

  const directionColor = (dir: "up" | "down" | "stable") => {
    if (dir === "up") return "text-green-500";
    if (dir === "down") return "text-red-500";
    return "text-neutral-400";
  };

  const confidenceDots = (c: "high" | "medium" | "low") => {
    if (c === "high") return { dots: "●●●", color: "text-green-500" };
    if (c === "medium") return { dots: "●●○", color: "text-brand-gold" };
    return { dots: "●○○", color: "text-neutral-400" };
  };

  return (
    <div className="space-y-8">
      {/* Budget Selection */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          What&apos;s your budget?
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {BUDGET_PRESETS.map((val) => (
            <button
              key={val}
              onClick={() => handleBudgetPreset(val)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                budget === val && !customBudget
                  ? "bg-brand-gold text-black"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-brand-gold/50"
              }`}
            >
              ${val.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-neutral-400">Or enter custom:</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400">$</span>
            <input
              type="text"
              value={customBudget}
              onChange={(e) => handleCustomBudget(e.target.value)}
              placeholder="Enter amount"
              className="pl-7 pr-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-foreground text-sm focus:border-brand-gold/50 focus:outline-none w-40"
            />
          </div>
        </div>
      </div>

      {/* Car Type */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          What type of car?
        </label>
        <div className="flex flex-wrap gap-2">
          {CAR_TYPES.map((type) => (
            <button
              key={type.value}
              onClick={() => setCarType(type.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                carType === type.value
                  ? "bg-brand-gold text-black"
                  : "bg-neutral-900 text-neutral-400 border border-neutral-800 hover:border-brand-gold/50"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority */}
      <div>
        <label className="text-sm font-semibold text-foreground mb-3 block">
          What matters most to you?
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {PRIORITIES.map((p) => (
            <button
              key={p.value}
              onClick={() => setPriority(p.value)}
              className={`p-4 rounded-lg text-left transition-colors border ${
                priority === p.value
                  ? "bg-brand-gold/10 border-brand-gold text-foreground"
                  : "bg-neutral-900 border-neutral-800 hover:border-brand-gold/50 text-neutral-400"
              }`}
            >
              <p className={`text-sm font-semibold ${priority === p.value ? "text-brand-gold" : "text-foreground"}`}>
                {p.label}
              </p>
              <p className="text-xs mt-1 text-neutral-400">{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={fetchRecommendations}
        className="w-full md:w-auto px-8 py-3 bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold rounded-lg transition-colors"
      >
        Find My Cars
      </button>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Results */}
      {!loading && searched && results.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-2">
            Top {results.length} Picks for ${budget.toLocaleString()}
          </h3>
          <p className="text-sm text-neutral-400 mb-6">
            Based on depreciation trends, market data, and your preferences
          </p>

          <div className="space-y-4">
            {results.map((car, index) => {
              const conf = confidenceDots(car.confidence);
              return (
                <div
                  key={`${car.year}-${car.make}-${car.model}`}
                  className="bg-neutral-900 border border-neutral-800 rounded-lg p-5 hover:border-brand-gold/30 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded">
                          #{index + 1}
                        </span>
                        <h4 className="text-lg font-bold text-foreground">
                          {car.year} {car.make} {car.model}
                        </h4>
                      </div>
                      <p className="text-sm text-neutral-400 mt-2">{car.reason}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xl font-bold text-foreground">
                        ${car.currentAvg.toLocaleString()}
                      </p>
                      <p className="text-xs text-neutral-400">
                        MSRP: ${car.msrp.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-4 pt-3 border-t border-neutral-800">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-neutral-400">Trend:</span>
                      <span className={`text-sm font-semibold ${directionColor(car.projectedDirection)}`}>
                        {directionArrow(car.projectedDirection)} {car.projectedChangePercent > 0 ? "+" : ""}{car.projectedChangePercent}%
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-neutral-400">Depreciation:</span>
                      <span className="text-sm font-semibold text-foreground">
                        {car.depreciationPercent}% off MSRP
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-neutral-400">Confidence:</span>
                      <span className={`text-sm font-semibold ${conf.color}`}>
                        {conf.dots}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* No results */}
      {!loading && searched && results.length === 0 && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-8 text-center">
          <p className="text-lg text-neutral-400">
            No matches found for your criteria. Try adjusting your budget or car type.
          </p>
        </div>
      )}

      {/* Disclaimer */}
      {searched && results.length > 0 && (
        <p className="text-xs text-neutral-400 pt-4 border-t border-neutral-800">
          Recommendations are based on our algorithmic pricing model and depreciation trends.
          Actual market prices vary by condition, mileage, location, and demand. These are not financial advice.
        </p>
      )}
    </div>
  );
}
