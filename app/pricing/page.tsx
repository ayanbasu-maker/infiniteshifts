import type { Metadata } from "next";
import PricingTrends from "@/components/PricingTrends";

export const metadata: Metadata = {
  title: "Car Pricing Trends | Infinite Shifts",
  description:
    "Track used car pricing trends and find the best time to buy. See which enthusiast cars are trending down in price.",
};

export default function PricingPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Car Pricing <span className="text-brand-gold">Trends</span>
        </h1>
        <div className="w-12 h-1 bg-brand-gold rounded mb-4" />
        <p className="text-neutral-400 text-lg mb-10 max-w-2xl">
          Pick a car and see where prices are headed. Find the deals before
          everyone else does.
        </p>
        <PricingTrends />
      </div>
    </section>
  );
}
