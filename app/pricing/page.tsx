import type { Metadata } from "next";
import PricingPageContent from "@/components/PricingPageContent";

export const metadata: Metadata = {
  title: "How Much Car Can I Afford? | Infinite Shifts",
  description:
    "Find out how much car you can afford based on your salary or net worth. Calculate cash purchase limits and monthly payment budgets using proven financial guidelines.",
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
