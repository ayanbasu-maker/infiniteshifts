import type { Metadata } from "next";
import PricingPageContent from "@/components/PricingPageContent";

export const metadata: Metadata = {
  title: "Car Pricing Trends & Recommendations | Infinite Shifts",
  description:
    "Track used car pricing trends, find the best time to buy, and get personalized car recommendations based on your budget and preferences.",
};

export default function PricingPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <PricingPageContent />
      </div>
    </section>
  );
}
