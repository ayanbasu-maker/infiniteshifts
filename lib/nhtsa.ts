import type { VehicleMake, VehicleModel } from "./types";

// Curated list of common passenger vehicle makes to filter NHTSA's 10,000+ results
const ALLOWED_MAKES = new Set([
  "Acura", "Alfa Romeo", "Aston Martin", "Audi", "BMW", "Bentley", "Buick",
  "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford",
  "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia",
  "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Maserati",
  "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi", "Nissan",
  "Peugeot", "Pontiac", "Porsche", "RAM", "Rivian", "Rolls-Royce", "Saab",
  "Saturn", "Scion", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen",
  "Volvo",
]);

export async function getAllMakes(): Promise<VehicleMake[]> {
  try {
    const res = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json",
      { next: { revalidate: 604800 } } // 7-day cache
    );
    const data = await res.json();
    const makes: VehicleMake[] = data.Results
      .filter((m: { Make_Name: string }) => ALLOWED_MAKES.has(m.Make_Name))
      .map((m: { Make_ID: number; Make_Name: string }) => ({
        id: m.Make_ID,
        name: m.Make_Name,
      }))
      .sort((a: VehicleMake, b: VehicleMake) => a.name.localeCompare(b.name));
    return makes;
  } catch {
    return [];
  }
}

export async function getModelsForMake(makeId: number): Promise<VehicleModel[]> {
  try {
    const res = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/${makeId}?format=json`,
      { next: { revalidate: 604800 } }
    );
    const data = await res.json();
    const models: VehicleModel[] = data.Results
      .map((m: { Model_ID: number; Model_Name: string }) => ({
        id: m.Model_ID,
        name: m.Model_Name,
      }))
      .sort((a: VehicleModel, b: VehicleModel) => a.name.localeCompare(b.name));
    return models;
  } catch {
    return [];
  }
}

export function getYearRange(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear + 1; y >= 1995; y--) {
    years.push(y);
  }
  return years;
}
