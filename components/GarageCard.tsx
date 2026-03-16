import Image from "next/image";
import { GarageVehicle } from "@/lib/types";

function formatPrice(n: number) {
  return "$" + n.toLocaleString();
}

export default function GarageCard({ vehicle }: { vehicle: GarageVehicle }) {
  const gainLoss =
    vehicle.bought !== undefined && vehicle.sold !== undefined
      ? vehicle.sold - vehicle.bought
      : null;

  return (
    <div className="bg-neutral-900 rounded-lg overflow-hidden border border-neutral-800 hover:border-brand-gold/50 transition-all duration-300 flex flex-col">
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
        {/* Badge */}
        <div className={`absolute top-2 right-2 text-xs font-semibold px-2 py-1 rounded-full ${vehicle.status === "current" ? "bg-brand-gold text-black" : "bg-neutral-700 text-neutral-300"}`}>
          {vehicle.status === "current" ? "Current" : "Sold"}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-lg leading-tight">{vehicle.name}</h3>

        {/* Price row */}
        <div className="flex flex-wrap gap-3 text-sm">
          {vehicle.bought !== undefined && (
            <span className="text-neutral-400">
              Bought: <span className="text-white font-medium">{formatPrice(vehicle.bought)}</span>
            </span>
          )}
          {vehicle.sold !== undefined && (
            <span className="text-neutral-400">
              Sold: <span className="text-white font-medium">{formatPrice(vehicle.sold)}</span>
            </span>
          )}
          {gainLoss !== null && (
            <span className={`font-semibold ${gainLoss >= 0 ? "text-green-400" : "text-red-400"}`}>
              {gainLoss >= 0 ? "+" : ""}{formatPrice(gainLoss)}
            </span>
          )}
        </div>

        {vehicle.description && (
          <p className="text-sm text-neutral-400 leading-relaxed">{vehicle.description}</p>
        )}
      </div>
    </div>
  );
}
