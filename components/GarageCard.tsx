import Image from "next/image";
import { GarageVehicle } from "@/lib/types";

export default function GarageCard({ vehicle }: { vehicle: GarageVehicle }) {
  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-brand-gold/50 transition-all duration-300">
      <div className="relative aspect-video bg-neutral-800">
        {vehicle.image ? (
          <Image
            src={vehicle.image}
            alt={vehicle.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-neutral-700">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{vehicle.name}</h3>
        {vehicle.description && (
          <p className="text-sm text-neutral-400 mt-1">{vehicle.description}</p>
        )}
      </div>
    </div>
  );
}
