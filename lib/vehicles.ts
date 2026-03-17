// Comprehensive makes and models list sourced from Autotrader/Cars.com style data
// Includes current and popular discontinued models for used car searches

export const VEHICLE_DATA: Record<string, string[]> = {
  "Acura": ["CL", "ILX", "Integra", "Legend", "MDX", "NSX", "RDX", "RL", "RLX", "RSX", "TL", "TLX", "TSX", "Vigor", "ZDX"],
  "Alfa Romeo": ["4C", "Giulia", "Giulietta", "GTV", "Spider", "Stelvio", "Tonale"],
  "Aston Martin": ["DB7", "DB9", "DB11", "DB12", "DBS", "Rapide", "V8 Vantage", "V12 Vantage", "Vantage", "Vanquish"],
  "Audi": ["A3", "A4", "A5", "A6", "A7", "A8", "e-tron", "e-tron GT", "Q3", "Q4 e-tron", "Q5", "Q7", "Q8", "R8", "RS3", "RS4", "RS5", "RS6", "RS7", "S3", "S4", "S5", "S6", "S7", "S8", "SQ5", "SQ7", "SQ8", "TT", "TTS", "TT RS"],
  "BMW": ["1 Series", "2 Series", "3 Series", "4 Series", "5 Series", "6 Series", "7 Series", "8 Series", "i3", "i4", "i5", "i7", "i8", "iX", "M2", "M3", "M4", "M5", "M6", "M8", "X1", "X2", "X3", "X4", "X5", "X6", "X7", "XM", "Z3", "Z4", "Z8"],
  "Bentley": ["Arnage", "Azure", "Bentayga", "Continental GT", "Continental Flying Spur", "Flying Spur", "Mulsanne"],
  "Buick": ["Cascada", "Century", "Enclave", "Encore", "Encore GX", "Envision", "Envista", "Grand National", "LaCrosse", "LeSabre", "Lucerne", "Park Avenue", "Regal", "Rendezvous", "Riviera", "Verano"],
  "Cadillac": ["ATS", "CT4", "CT5", "CT6", "CTS", "DeVille", "DTS", "Eldorado", "Escalade", "Escalade ESV", "ELR", "Fleetwood", "Lyriq", "Seville", "SRX", "STS", "XT4", "XT5", "XT6", "XLR", "XTS"],
  "Chevrolet": ["Avalanche", "Blazer", "Bolt EV", "Bolt EUV", "Camaro", "Caprice", "Cavalier", "Cobalt", "Colorado", "Corvette", "Cruze", "El Camino", "Equinox", "HHR", "Impala", "Malibu", "Monte Carlo", "S-10", "Silverado 1500", "Silverado 2500HD", "Sonic", "Spark", "SS", "Suburban", "Tahoe", "TrailBlazer", "Traverse", "Trax", "Volt"],
  "Chrysler": ["200", "300", "300M", "Crossfire", "Pacifica", "PT Cruiser", "Sebring", "Town & Country", "Voyager"],
  "Dodge": ["Avenger", "Challenger", "Charger", "Dakota", "Dart", "Durango", "Grand Caravan", "Hornet", "Magnum", "Neon", "Nitro", "Ram 1500", "Ram 2500", "Stealth", "Viper"],
  "Ferrari": ["296 GTB", "348", "360", "430", "458 Italia", "488 GTB", "488 Pista", "550 Maranello", "599 GTB", "812 Superfast", "California", "F355", "F40", "F8 Tributo", "FF", "GTC4Lusso", "LaFerrari", "Portofino", "Roma", "SF90 Stradale", "Testarossa"],
  "FIAT": ["124 Spider", "500", "500 Abarth", "500e", "500L", "500X"],
  "Ford": ["Bronco", "Bronco Sport", "Crown Victoria", "EcoSport", "Edge", "Escape", "Excursion", "Expedition", "Explorer", "F-150", "F-150 Lightning", "F-250", "F-350", "Fiesta", "Five Hundred", "Flex", "Focus", "Focus RS", "Focus ST", "Fusion", "GT", "Maverick", "Mustang", "Mustang Mach-E", "Probe", "Ranger", "Taurus", "Taurus SHO", "Thunderbird"],
  "Genesis": ["G70", "G80", "G90", "GV60", "GV70", "GV80"],
  "GMC": ["Acadia", "Canyon", "Envoy", "Hummer EV", "Jimmy", "Sierra 1500", "Sierra 2500HD", "Terrain", "Typhoon", "Yukon", "Yukon XL"],
  "Honda": ["Accord", "Civic", "Civic Si", "Civic Type R", "CR-V", "CR-Z", "Crosstour", "del Sol", "Element", "Fit", "HR-V", "Insight", "Odyssey", "Passport", "Pilot", "Prelude", "Prologue", "Ridgeline", "S2000"],
  "Hyundai": ["Accent", "Azera", "Elantra", "Elantra N", "Genesis Coupe", "Ioniq 5", "Ioniq 6", "Kona", "Kona Electric", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Tiburon", "Tucson", "Veloster", "Veloster N", "Venue"],
  "INFINITI": ["EX35", "FX35", "FX45", "G35", "G37", "M35", "M37", "M45", "Q50", "Q60", "Q70", "QX30", "QX50", "QX55", "QX56", "QX60", "QX70", "QX80"],
  "Jaguar": ["E-Pace", "F-Pace", "F-Type", "I-Pace", "S-Type", "X-Type", "XE", "XF", "XJ", "XJR", "XJS", "XK", "XKR"],
  "Jeep": ["Cherokee", "Commander", "Compass", "Gladiator", "Grand Cherokee", "Grand Cherokee L", "Grand Wagoneer", "Liberty", "Patriot", "Renegade", "Wagoneer", "Wrangler", "Wrangler Unlimited"],
  "Kia": ["Carnival", "EV6", "EV9", "Forte", "K5", "K900", "Niro", "Optima", "Rio", "Sedona", "Seltos", "Soul", "Sorento", "Sportage", "Stinger", "Telluride"],
  "Lamborghini": ["Aventador", "Countach", "Diablo", "Gallardo", "Huracan", "Murcielago", "Revuelto", "Urus"],
  "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Freelander", "LR2", "LR3", "LR4", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
  "Lexus": ["CT 200h", "ES 350", "GS 350", "GS F", "GX 460", "GX 470", "IS 250", "IS 300", "IS 350", "IS 500", "IS F", "LC 500", "LFA", "LS 400", "LS 430", "LS 460", "LS 500", "LX 570", "LX 600", "NX 350", "NX 350h", "RC 350", "RC F", "RX 330", "RX 350", "RX 450h", "SC 300", "SC 400", "SC 430", "TX 350", "UX 200", "RZ 450e"],
  "Lincoln": ["Aviator", "Continental", "Corsair", "LS", "Mark VIII", "MKC", "MKS", "MKT", "MKX", "MKZ", "Nautilus", "Navigator", "Town Car", "Zephyr"],
  "Lotus": ["Elise", "Emira", "Esprit", "Evora", "Exige"],
  "Maserati": ["Ghibli", "GranCabrio", "GranTurismo", "Grecale", "Levante", "MC20", "Quattroporte"],
  "Mazda": ["3", "6", "CX-3", "CX-30", "CX-5", "CX-50", "CX-7", "CX-9", "CX-70", "CX-90", "Mazda3", "Mazda6", "MX-5 Miata", "Millenia", "MPV", "Protege", "RX-7", "RX-8", "Tribute"],
  "McLaren": ["540C", "570S", "600LT", "620R", "650S", "675LT", "720S", "750S", "765LT", "Artura", "GT", "MP4-12C", "P1", "Senna"],
  "Mercedes-Benz": ["A-Class", "AMG GT", "C-Class", "CL-Class", "CLA-Class", "CLK-Class", "CLS-Class", "E-Class", "EQB", "EQE", "EQS", "G-Class", "GLA-Class", "GLB-Class", "GLC-Class", "GLE-Class", "GLK-Class", "GLS-Class", "ML-Class", "R-Class", "S-Class", "SL-Class", "SLC-Class", "SLK-Class", "SLR McLaren", "SLS AMG"],
  "MINI": ["Clubman", "Convertible", "Cooper", "Cooper S", "Countryman", "Hardtop", "John Cooper Works", "Paceman"],
  "Mitsubishi": ["3000GT", "Eclipse", "Eclipse Cross", "Galant", "Lancer", "Lancer Evolution", "Mirage", "Montero", "Montero Sport", "Outlander", "Outlander PHEV", "Outlander Sport"],
  "Nissan": ["200SX", "240SX", "300ZX", "350Z", "370Z", "Altima", "Armada", "Frontier", "GT-R", "Juke", "Kicks", "Leaf", "Maxima", "Murano", "Pathfinder", "Quest", "Rogue", "Rogue Sport", "Sentra", "Titan", "Versa", "Xterra", "Z"],
  "Pontiac": ["Aztek", "Bonneville", "Fiero", "Firebird", "G6", "G8", "Grand Am", "Grand Prix", "GTO", "Solstice", "Sunfire", "Trans Am", "Vibe"],
  "Porsche": ["718 Boxster", "718 Cayman", "718 Spyder", "911", "918 Spyder", "924", "928", "944", "968", "Boxster", "Boxster S", "Cayenne", "Cayman", "Cayman S", "Macan", "Macan S", "Panamera", "Taycan"],
  "RAM": ["1500", "1500 Classic", "2500", "3500", "ProMaster", "ProMaster City"],
  "Rivian": ["R1S", "R1T", "R2"],
  "Rolls-Royce": ["Cullinan", "Dawn", "Ghost", "Phantom", "Spectre", "Wraith"],
  "Saab": ["9-2X", "9-3", "9-4X", "9-5", "9-7X", "900", "9000"],
  "Saturn": ["Astra", "Aura", "Ion", "L-Series", "Outlook", "S-Series", "Sky", "Vue"],
  "Scion": ["FR-S", "iA", "iM", "tC", "xA", "xB", "xD"],
  "Subaru": ["Ascent", "BRZ", "Baja", "Crosstrek", "Forester", "Impreza", "Legacy", "Outback", "Solterra", "SVX", "Tribeca", "WRX", "WRX STI"],
  "Suzuki": ["Equator", "Grand Vitara", "Kizashi", "Samurai", "Sidekick", "SX4", "Swift", "Vitara", "XL-7"],
  "Tesla": ["Cybertruck", "Model 3", "Model S", "Model X", "Model Y", "Roadster"],
  "Toyota": ["4Runner", "86", "Avalon", "bZ4X", "C-HR", "Camry", "Celica", "Corolla", "Corolla Cross", "Crown", "FJ Cruiser", "GR Corolla", "GR86", "GR Supra", "Highlander", "Land Cruiser", "Matrix", "MR2", "Prius", "Prius Prime", "RAV4", "RAV4 Prime", "Sequoia", "Sienna", "Solara", "Supra", "Tacoma", "Tercel", "Tundra", "Venza", "Yaris"],
  "Volkswagen": ["Arteon", "Atlas", "Atlas Cross Sport", "Beetle", "CC", "Corrado", "e-Golf", "Eos", "GLI", "Golf", "Golf GTI", "Golf R", "ID.4", "ID.Buzz", "Jetta", "New Beetle", "Passat", "Phaeton", "R32", "Rabbit", "Scirocco", "Taos", "Tiguan", "Touareg"],
  "Volvo": ["240", "740", "850", "C30", "C40 Recharge", "C70", "EX30", "EX90", "S40", "S60", "S70", "S80", "S90", "V60", "V70", "V90", "XC40", "XC40 Recharge", "XC60", "XC70", "XC90"],
};

export function getAllMakes(): string[] {
  return Object.keys(VEHICLE_DATA).sort();
}

export function getModelsForMake(make: string): string[] {
  return VEHICLE_DATA[make] || [];
}

export function getYearRange(): number[] {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  for (let y = currentYear + 1; y >= 1995; y--) {
    years.push(y);
  }
  return years;
}
