"use client";

import { useState } from "react";
import { VEHICLE_DATA, getYearRange } from "@/lib/vehicles";

interface VehicleSelectorProps {
  onSelect: (year: number, make: string, model: string) => void;
}

const years = getYearRange();
const makes = Object.keys(VEHICLE_DATA).sort();

export default function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedTrim, setSelectedTrim] = useState("");

  const models = selectedMake
    ? Object.keys(VEHICLE_DATA[selectedMake] || {}).sort()
    : [];

  const trims =
    selectedMake && selectedModel
      ? VEHICLE_DATA[selectedMake]?.[selectedModel] || []
      : [];

  // If there's only one trim (same as model name), auto-select it
  const effectiveTrim = trims.length === 1 ? trims[0] : selectedTrim;

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedTrim("");
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedTrim("");
  };

  const handleSearch = () => {
    if (selectedYear && selectedMake && effectiveTrim) {
      onSelect(selectedYear as number, selectedMake, effectiveTrim);
    }
  };

  const canSearch = selectedYear && selectedMake && selectedModel && effectiveTrim;

  const selectClass =
    "w-full bg-neutral-900 text-foreground rounded-lg border border-neutral-800 hover:border-brand-gold/50 focus:border-brand-gold focus:outline-none px-4 py-3 text-sm transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Year
          </label>
          <select
            className={selectClass}
            value={selectedYear}
            onChange={(e) =>
              setSelectedYear(e.target.value ? parseInt(e.target.value) : "")
            }
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Make */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Make
          </label>
          <select
            className={selectClass}
            value={selectedMake}
            onChange={(e) => handleMakeChange(e.target.value)}
          >
            <option value="">Select Make</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Model */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Model
          </label>
          <select
            className={selectClass}
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            disabled={!selectedMake}
          >
            <option value="">{selectedMake ? "Select Model" : "Select Make First"}</option>
            {models.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Trim */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Trim
          </label>
          <select
            className={selectClass}
            value={effectiveTrim}
            onChange={(e) => setSelectedTrim(e.target.value)}
            disabled={!selectedModel || trims.length <= 1}
          >
            {trims.length === 0 ? (
              <option value="">Select Model First</option>
            ) : trims.length === 1 ? (
              <option value={trims[0]}>{trims[0]}</option>
            ) : (
              <>
                <option value="">Select Trim</option>
                {trims.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={!canSearch}
        className="w-full md:w-auto bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        View Pricing Trends
      </button>
    </div>
  );
}
