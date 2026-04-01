import AffordabilityCalculator from "./AffordabilityCalculator";

export default function PricingPageContent() {
  return (
    <div>
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        How Much Car Can I <span className="text-brand-gold">Afford?</span>
      </h1>
      <div className="w-12 h-1 bg-brand-gold rounded mb-4" />
      <p className="text-neutral-400 text-lg mb-8 max-w-2xl">
        Enter your salary or net worth and we&apos;ll show you what top financial guidelines say you should spend — cash or financed.
      </p>
      <AffordabilityCalculator />
    </div>
  );
}
