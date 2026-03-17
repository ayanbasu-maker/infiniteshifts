import type { VehicleMake, VehicleModel } from "./types";

// Curated map of common makes: lowercase key -> display name
const ALLOWED_MAKES: Record<string, string> = {
  "acura": "Acura",
  "alfa romeo": "Alfa Romeo",
  "aston martin": "Aston Martin",
  "audi": "Audi",
  "bmw": "BMW",
  "bentley": "Bentley",
  "buick": "Buick",
  "cadillac": "Cadillac",
  "chevrolet": "Chevrolet",
  "chrysler": "Chrysler",
  "dodge": "Dodge",
  "ferrari": "Ferrari",
  "fiat": "Fiat",
  "ford": "Ford",
  "genesis": "Genesis",
  "gmc": "GMC",
  "honda": "Honda",
  "hyundai": "Hyundai",
  "infiniti": "Infiniti",
  "jaguar": "Jaguar",
  "jeep": "Jeep",
  "kia": "Kia",
  "lamborghini": "Lamborghini",
  "land rover": "Land Rover",
  "lexus": "Lexus",
  "lincoln": "Lincoln",
  "lotus": "Lotus",
  "maserati": "Maserati",
  "mazda": "Mazda",
  "mclaren": "McLaren",
  "mercedes-benz": "Mercedes-Benz",
  "mini": "MINI",
  "mitsubishi": "Mitsubishi",
  "nissan": "Nissan",
  "peugeot": "Peugeot",
  "pontiac": "Pontiac",
  "porsche": "Porsche",
  "ram": "RAM",
  "rivian": "Rivian",
  "rolls-royce": "Rolls-Royce",
  "saab": "Saab",
  "saturn": "Saturn",
  "scion": "Scion",
  "subaru": "Subaru",
  "suzuki": "Suzuki",
  "tesla": "Tesla",
  "toyota": "Toyota",
  "volkswagen": "Volkswagen",
  "volvo": "Volvo",
};

export async function getAllMakes(): Promise<VehicleMake[]> {
  try {
    const res = await fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetAllMakes?format=json",
      { next: { revalidate: 604800 } } // 7-day cache
    );
    const data = await res.json();
    const seen = new Set<string>();
    const makes: VehicleMake[] = data.Results
      .filter((m: { Make_Name: string }) => {
        const key = m.Make_Name.toLowerCase();
        if (ALLOWED_MAKES[key] && !seen.has(key)) {
          seen.add(key);
          return true;
        }
        return false;
      })
      .map((m: { Make_ID: number; Make_Name: string }) => ({
        id: m.Make_ID,
        name: ALLOWED_MAKES[m.Make_Name.toLowerCase()] || m.Make_Name,
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
