"use client";

import { useState } from "react";
import PricingTrends from "./PricingTrends";
import CarRecommendations from "./CarRecommendations";

type Tab = "trends" | "recommendations";

export default function PricingPageContent() {
  const [tab, setTab] = useState<Tab>("trends");

  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        Car Pricing <span className="text-brand-gold">{tab === "trends" ? "Trends" : "Recommendations"}</span>
      </h1>
      <div className="w-12 h-1 bg-brand-gold rounded mb-4" />
      <p className="text-neutral-400 text-lg mb-8 max-w-2xl">
        {tab === "trends"
          ? "Pick a car and see where prices are headed. Find the deals before everyone else does."
          : "Tell us what you want and we'll find the best cars based on depreciation trends and value."}
      </p>

      {/* Tab switcher */}
      <div className="flex gap-1 mb-10 bg-neutral-900 rounded-lg p-1 w-fit">
        <button
          onClick={() => setTab("trends")}
          className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
            tab === "trends"
              ? "bg-brand-gold text-black"
              : "text-neutral-400 hover:text-foreground"
          }`}
        >
          Pricing Trends
        </button>
        <button
          onClick={() => setTab("recommendations")}
          className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
            tab === "recommendations"
              ? "bg-brand-gold text-black"
              : "text-neutral-400 hover:text-foreground"
          }`}
        >
          Find My Car
        </button>
      </div>

      {tab === "trends" ? <PricingTrends /> : <CarRecommendations />}
    </div>
  );
}
