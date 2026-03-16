import type { Metadata } from "next";
import GarageCard from "@/components/GarageCard";
import { GarageVehicle } from "@/lib/types";

export const metadata: Metadata = {
  title: "My Garage | Infinite Shifts",
  description: "Check out the vehicles in the Infinite Shifts garage.",
};

const vehicles: GarageVehicle[] = [
  {
    name: "Coming Soon",
    image: "",
    description: "First vehicle details dropping soon — stay tuned.",
  },
  {
    name: "Coming Soon",
    image: "",
    description: "Another build in the works. Check back for updates.",
  },
  {
    name: "Coming Soon",
    image: "",
    description: "More to come. Subscribe to get notified.",
  },
];

export default function GaragePage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Garage</h1>
        <div className="w-12 h-1 bg-brand-gold rounded mb-4" />
        <p className="text-neutral-400 text-lg mb-10">
          Every car I&apos;ve owned has a story — what I paid, what I got, and whether it was worth it. More details coming soon.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((vehicle, i) => (
            <GarageCard key={i} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
