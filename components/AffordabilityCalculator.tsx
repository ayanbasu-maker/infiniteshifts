"use client";

import { useState, useMemo } from "react";

type Mode = "cash" | "financing";
type InputType = "salary" | "networth";

const LOAN_TERMS = [24, 36, 48, 60, 72, 84];

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function parseInput(val: string): number {
  return Number(val.replace(/[^0-9.]/g, "")) || 0;
}

// Standard amortization: monthly payment for a loan
function monthlyPayment(principal: number, annualRate: number, months: number): number {
  if (annualRate === 0) return principal / months;
  const r = annualRate / 100 / 12;
  return (principal * r) / (1 - Math.pow(1 + r, -months));
}


interface TierResult {
  label: string;
  description: string;
  maxPrice: number;
  monthlyPayment?: number;
  totalInterest?: number;
  totalCost?: number;
  downPayment?: number;
  loanAmount?: number;
}

export default function AffordabilityCalculator() {
  const [mode, setMode] = useState<Mode>("cash");
  const [inputType, setInputType] = useState<InputType>("salary");
  const [rawInput, setRawInput] = useState("");
  const [displayInput, setDisplayInput] = useState("");

  // Tweakable params
  const [downPct, setDownPct] = useState(20);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(7);
  const [includeFees, setIncludeFees] = useState(true);

  const inputValue = parseInput(rawInput);
  const hasInput = inputValue > 0;

  // Tier definitions — same car price targets for both cash and financing
  function getTierPrices(val: number, type: InputType, feesMultiplier: number) {
    if (type === "salary") {
      return [
        { label: "Conservative", pct: 0.20, description: "20% of gross salary — financially sound choice" },
        { label: "Moderate",     pct: 0.30, description: "30% of gross salary — balanced approach" },
        { label: "Aggressive",   pct: 0.40, description: "40% of gross salary — upper bound for high earners" },
      ].map(t => ({ ...t, carPrice: (val * t.pct) / feesMultiplier }));
    } else {
      return [
        { label: "Conservative", pct: 0.05, description: "Wealth-preserving — 5% of liquid net worth" },
        { label: "Moderate",     pct: 0.10, description: "Balanced — 10% of net worth" },
        { label: "Aggressive",   pct: 0.20, description: "Liberal — 20% of net worth" },
      ].map(t => ({ ...t, carPrice: (val * t.pct) / feesMultiplier }));
    }
  }

  const results: TierResult[] | null = useMemo(() => {
    if (!hasInput) return null;
    const feesMultiplier = includeFees ? 1.1 : 1.0;
    const tiers = getTierPrices(inputValue, inputType, feesMultiplier);

    if (mode === "cash") {
      return tiers.map(({ label, description, carPrice }) => ({
        label,
        description,
        maxPrice: carPrice,
      }));
    } else {
      return tiers.map(({ label, description, carPrice }) => {
        const downAmt = carPrice * (downPct / 100);
        const loanAmt = carPrice - downAmt;
        const monthly = monthlyPayment(loanAmt, interestRate, loanTerm);
        const totalInterest = monthly * loanTerm - loanAmt;
        return {
          label,
          description,
          maxPrice: carPrice,
          monthlyPayment: monthly,
          totalInterest,
          totalCost: monthly * loanTerm + downAmt,
          downPayment: downAmt,
          loanAmount: loanAmt,
        };
      });
    }
  }, [hasInput, mode, inputType, inputValue, downPct, loanTerm, interestRate, includeFees]);

  const inputLabel = inputType === "salary" ? "Annual Gross Salary" : "Liquid Net Worth";
  const inputPlaceholder = inputType === "salary" ? "e.g. 80,000" : "e.g. 250,000";

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setRawInput(raw);
    setDisplayInput(raw ? new Intl.NumberFormat("en-US").format(Number(raw)) : "");
  }

  const insightText = useMemo(() => {
    if (!hasInput || !results) return null;
    const mod = results[1];
    if (mode === "cash") {
      return `At ${formatCurrency(inputValue)} ${inputType === "salary" ? "annual salary" : "net worth"}, the moderate guideline (30%) suggests staying under ${formatCurrency(mod.maxPrice)} for a cash purchase.`;
    } else {
      return `At ${formatCurrency(inputValue)} ${inputType === "salary" ? "annual salary" : "net worth"}, the moderate guideline puts your car price at ${formatCurrency(mod.maxPrice)} with a ~${formatCurrency(mod.monthlyPayment!)}/mo payment.`;
    }
  }, [hasInput, results, mode, inputType, inputValue]);

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="flex gap-1 bg-neutral-900 rounded-lg p-1 w-fit">
        {(["cash", "financing"] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2.5 rounded-md text-sm font-medium transition-colors ${
              mode === m ? "bg-brand-gold text-black" : "text-neutral-400 hover:text-foreground"
            }`}
          >
            {m === "cash" ? "Cash Purchase" : "Financing"}
          </button>
        ))}
      </div>

      {/* Input section */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        {/* Input type toggle */}
        <div className="flex gap-2 mb-5">
          {(["salary", "networth"] as InputType[]).map((t) => (
            <button
              key={t}
              onClick={() => setInputType(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                inputType === t
                  ? "bg-brand-gold/10 border-brand-gold text-brand-gold"
                  : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
              }`}
            >
              {t === "salary" ? "Annual Salary" : "Net Worth"}
            </button>
          ))}
        </div>

        <label className="block text-sm text-neutral-400 mb-2">{inputLabel}</label>
        <div className="relative w-full max-w-xs">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-sm">$</span>
          <input
            type="text"
            inputMode="numeric"
            value={displayInput}
            onChange={handleInputChange}
            placeholder={inputPlaceholder}
            className="w-full pl-7 pr-4 py-3 rounded-lg bg-background border border-neutral-800 text-foreground text-base focus:border-brand-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Tweakable settings */}
      <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
        <h3 className="text-sm font-semibold text-foreground mb-5 flex items-center gap-2">
          Adjust Parameters
          <span className="text-xs font-normal text-neutral-400">— tweak these to match your situation</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Down payment — financing only */}
          {mode === "financing" && (
            <SliderField
              label="Down Payment"
              value={downPct}
              onChange={setDownPct}
              min={0} max={50} step={5}
              format={(v) => `${v}%`}
              hint="Percentage of car price paid upfront"
            />
          )}

          {/* Loan term — financing only */}
          {mode === "financing" && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm text-foreground font-medium">Loan Term</label>
                <span className="text-sm text-brand-gold font-semibold">{loanTerm} months</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                {LOAN_TERMS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setLoanTerm(t)}
                    className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                      loanTerm === t
                        ? "bg-brand-gold text-black border-brand-gold"
                        : "border-neutral-800 text-neutral-400 hover:border-neutral-700"
                    }`}
                  >
                    {t}mo
                  </button>
                ))}
              </div>
              <p className="text-xs text-neutral-400 mt-2">48–60 months is generally recommended</p>
            </div>
          )}

          {/* Interest rate — financing only */}
          {mode === "financing" && (
            <SliderField
              label="Interest Rate (APR)"
              value={interestRate}
              onChange={setInterestRate}
              min={2} max={20} step={0.5}
              format={(v) => `${v}%`}
              hint="Average new car rate ~6–8%, used car ~9–12%"
            />
          )}

          {/* Tax/title/fees toggle — cash only */}
          {mode === "cash" && <div>
            <div className="flex items-center justify-between mb-1">
              <div>
                <label className="text-sm text-foreground font-medium">Include Tax, Title & Fees</label>
                <p className="text-xs text-neutral-400 mt-0.5">Adds ~10% to account for taxes and dealer fees</p>
              </div>
              <button
                onClick={() => setIncludeFees(!includeFees)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  includeFees ? "bg-brand-gold" : "bg-neutral-700"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    includeFees ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-6">
          {/* Insight callout */}
          {insightText && (
            <div className="bg-brand-gold/10 border border-brand-gold/30 rounded-lg px-5 py-3">
              <p className="text-sm text-foreground">{insightText}</p>
            </div>
          )}

          {/* Three tier cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.map((tier, i) => (
              <TierCard key={tier.label} tier={tier} isRecommended={i === 1} mode={mode} />
            ))}
          </div>

          {/* Financing breakdown */}
          {mode === "financing" && (
            <div className="bg-neutral-900 rounded-xl border border-neutral-800 p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Payment Breakdown</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-800">
                      <th className="text-left py-2 text-neutral-400 font-medium">Tier</th>
                      <th className="text-right py-2 text-neutral-400 font-medium">Car Price</th>
                      <th className="text-right py-2 text-neutral-400 font-medium">Down</th>
                      <th className="text-right py-2 text-neutral-400 font-medium">Loan</th>
                      <th className="text-right py-2 text-neutral-400 font-medium">Monthly</th>
                      <th className="text-right py-2 text-neutral-400 font-medium">Total Interest</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((tier, i) => (
                      <tr key={tier.label} className={`border-b border-neutral-800/50 ${i === 1 ? "text-brand-gold" : ""}`}>
                        <td className="py-3 font-medium">{tier.label}</td>
                        <td className="py-3 text-right">{formatCurrency(tier.maxPrice)}</td>
                        <td className="py-3 text-right">{formatCurrency(tier.downPayment ?? 0)}</td>
                        <td className="py-3 text-right">{formatCurrency(tier.loanAmount ?? 0)}</td>
                        <td className="py-3 text-right">{formatCurrency(tier.monthlyPayment ?? 0)}/mo</td>
                        <td className="py-3 text-right">{formatCurrency(tier.totalInterest ?? 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-neutral-400 mt-4">
                {includeFees ? "Car price shown excludes tax/title/fees (add ~10% on top)." : "Car price shown is sticker price only."} Rates are estimates — your actual APR will vary by credit score and lender.
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-neutral-400">
            These are guidelines based on common financial rules of thumb, not personalized financial advice. Your situation may vary based on existing debts, savings goals, and cost of living.
          </p>
        </div>
      )}

      {!hasInput && (
        <div className="text-center py-16 text-neutral-400">
          <p className="text-base">Enter your {inputType === "salary" ? "annual salary" : "net worth"} above to see your affordability range.</p>
        </div>
      )}
    </div>
  );
}

function TierCard({ tier, isRecommended, mode }: { tier: TierResult; isRecommended: boolean; mode: Mode }) {
  return (
    <div
      className={`rounded-xl border p-5 flex flex-col gap-3 transition-all ${
        isRecommended
          ? "border-brand-gold bg-brand-gold/5"
          : "border-neutral-800 bg-neutral-900"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className={`text-xs font-semibold uppercase tracking-wider ${isRecommended ? "text-brand-gold" : "text-neutral-400"}`}>
          {tier.label}
        </span>
        {isRecommended && (
          <span className="text-xs bg-brand-gold text-black px-2 py-0.5 rounded-full font-medium">
            Recommended
          </span>
        )}
      </div>

      <div>
        <div className={`text-3xl font-bold ${isRecommended ? "text-brand-gold" : "text-foreground"}`}>
          {formatCurrency(tier.maxPrice)}
        </div>
        <div className="text-xs text-neutral-400 mt-0.5">max car price</div>
      </div>

      {mode === "financing" && tier.monthlyPayment !== undefined && (
        <div className="pt-2 border-t border-neutral-800 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Monthly</span>
            <span className="font-medium">{formatCurrency(tier.monthlyPayment)}/mo</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-400">Total interest</span>
            <span className="font-medium">{formatCurrency(tier.totalInterest ?? 0)}</span>
          </div>
        </div>
      )}

      <p className="text-xs text-neutral-400 mt-auto">{tier.description}</p>
    </div>
  );
}

function SliderField({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
  hint?: string;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm text-foreground font-medium">{label}</label>
        <span className="text-sm text-brand-gold font-semibold">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-brand-gold bg-neutral-800"
      />
      <div className="flex justify-between text-xs text-neutral-400 mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
      {hint && <p className="text-xs text-neutral-400 mt-1">{hint}</p>}
    </div>
  );
}
