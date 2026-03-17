"use client";

import { useState, useEffect } from "react";
import type { VehicleMake, VehicleModel } from "@/lib/types";
import { getYearRange } from "@/lib/nhtsa";

interface VehicleSelectorProps {
  onSelect: (year: number, make: string, model: string) => void;
}

export default function VehicleSelector({ onSelect }: VehicleSelectorProps) {
  const [years] = useState(getYearRange());
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [models, setModels] = useState<VehicleModel[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const [selectedMake, setSelectedMake] = useState<{ id: number; name: string } | null>(null);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  // Load makes on mount
  useEffect(() => {
    setLoadingMakes(true);
    fetch("/api/vehicles/makes")
      .then((res) => res.json())
      .then((data) => setMakes(data))
      .catch(() => setMakes([]))
      .finally(() => setLoadingMakes(false));
  }, []);

  // Load models when make changes
  useEffect(() => {
    if (!selectedMake) {
      setModels([]);
      return;
    }
    setLoadingModels(true);
    setSelectedModel("");
    fetch(`/api/vehicles/models?makeId=${selectedMake.id}`)
      .then((res) => res.json())
      .then((data) => setModels(data))
      .catch(() => setModels([]))
      .finally(() => setLoadingModels(false));
  }, [selectedMake]);

  const handleSearch = () => {
    if (selectedYear && selectedMake && selectedModel) {
      onSelect(selectedYear as number, selectedMake.name, selectedModel);
    }
  };

  const selectClass =
    "w-full bg-neutral-900 text-foreground rounded-lg border border-neutral-800 hover:border-brand-gold/50 focus:border-brand-gold focus:outline-none px-4 py-3 text-sm transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Year */}
        <div>
          <label className="block text-sm font-medium text-neutral-400 mb-2">
            Year
          </label>
          <select
            className={selectClass}
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value ? parseInt(e.target.value) : "");
            }}
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
            value={selectedMake?.id ?? ""}
            onChange={(e) => {
              const make = makes.find((m) => m.id === parseInt(e.target.value));
              setSelectedMake(make ?? null);
            }}
            disabled={loadingMakes}
          >
            <option value="">
              {loadingMakes ? "Loading..." : "Select Make"}
            </option>
            {makes.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
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
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={!selectedMake || loadingModels}
          >
            <option value="">
              {loadingModels ? "Loading..." : "Select Model"}
            </option>
            {models.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={!selectedYear || !selectedMake || !selectedModel}
        className="w-full md:w-auto bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold px-8 py-3 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        View Pricing Trends
      </button>
    </div>
  );
}
