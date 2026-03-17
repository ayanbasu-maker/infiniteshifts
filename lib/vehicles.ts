// Comprehensive makes and models list with trim-level detail
// Sourced from Autotrader, Cars.com, and dealer listing patterns

export const VEHICLE_DATA: Record<string, string[]> = {
  "Acura": ["CL", "ILX", "Integra", "Integra Type R", "Integra Type S", "Legend", "MDX", "MDX Type S", "NSX", "NSX Type S", "RDX", "RDX A-Spec", "RL", "RLX", "RSX", "RSX Type S", "TL", "TL Type S", "TLX", "TLX Type S", "TSX", "Vigor", "ZDX"],
  "Alfa Romeo": ["4C", "4C Spider", "Giulia", "Giulia Quadrifoglio", "Giulietta", "GTV", "Spider", "Stelvio", "Stelvio Quadrifoglio", "Tonale"],
  "Aston Martin": ["DB7", "DB9", "DB11", "DB11 V12", "DB12", "DBS", "DBS Superleggera", "Rapide", "Rapide S", "V8 Vantage", "V12 Vantage", "Vantage", "Vantage AMR", "Vanquish", "Vanquish S"],
  "Audi": ["A3", "A3 e-tron", "A4", "A4 allroad", "A5", "A5 Sportback", "A6", "A6 allroad", "A7", "A8", "A8 L", "e-tron", "e-tron GT", "e-tron S", "Q3", "Q4 e-tron", "Q5", "Q5 Sportback", "Q7", "Q8", "Q8 e-tron", "R8", "R8 V10", "R8 V10 Plus", "R8 V10 Performance", "RS 3", "RS 4", "RS 5", "RS 5 Sportback", "RS 6 Avant", "RS 7", "RS e-tron GT", "RS Q8", "S3", "S4", "S5", "S5 Sportback", "S6", "S7", "S8", "SQ5", "SQ5 Sportback", "SQ7", "SQ8", "TT", "TT S", "TT RS"],
  "BMW": ["128i", "135i", "228i", "230i", "M235i", "M240i", "318i", "320i", "323i", "325i", "328i", "328d", "330e", "330i", "M340i", "428i", "430i", "435i", "440i", "M440i", "528i", "530e", "530i", "535i", "540i", "545i", "550i", "M550i", "640i", "645Ci", "650i", "740i", "745e", "750i", "760i", "840i", "850i", "M850i", "ALPINA B7", "i3", "i4", "i4 M50", "i5", "i5 M60", "i7", "i7 M70", "i8", "iX", "iX M60", "M2", "M2 Competition", "M3", "M3 Competition", "M4", "M4 Competition", "M4 CS", "M4 GTS", "M5", "M5 Competition", "M5 CS", "M6", "M6 Gran Coupe", "M8", "M8 Competition", "M8 Gran Coupe", "X1", "X2", "X3", "X3 M", "X3 M Competition", "X3 M40i", "X4", "X4 M", "X4 M40i", "X5", "X5 M", "X5 M Competition", "X5 M50i", "X6", "X6 M", "X6 M Competition", "X7", "X7 M60i", "XM", "Z3", "Z3 M Coupe", "Z3 M Roadster", "Z4", "Z4 M40i", "Z8"],
  "Bentley": ["Arnage", "Azure", "Bentayga", "Bentayga Speed", "Continental GT", "Continental GT Speed", "Continental Flying Spur", "Flying Spur", "Flying Spur Speed", "Mulsanne", "Mulsanne Speed"],
  "Buick": ["Cascada", "Century", "Enclave", "Encore", "Encore GX", "Envision", "Envista", "Grand National", "LaCrosse", "LeSabre", "Lucerne", "Park Avenue", "Regal", "Regal GS", "Rendezvous", "Riviera", "Verano"],
  "Cadillac": ["ATS", "ATS-V", "CT4", "CT4-V", "CT4-V Blackwing", "CT5", "CT5-V", "CT5-V Blackwing", "CT6", "CT6-V", "CTS", "CTS-V", "DeVille", "DTS", "Eldorado", "Escalade", "Escalade ESV", "Escalade-V", "ELR", "Fleetwood", "Lyriq", "Seville", "SRX", "STS", "STS-V", "XT4", "XT5", "XT6", "XLR", "XLR-V", "XTS"],
  "Chevrolet": ["Avalanche", "Blazer", "Blazer RS", "Blazer EV", "Blazer EV SS", "Bolt EV", "Bolt EUV", "Camaro", "Camaro LT", "Camaro SS", "Camaro ZL1", "Camaro ZL1 1LE", "Camaro Z/28", "Caprice", "Cavalier", "Cobalt", "Cobalt SS", "Colorado", "Colorado ZR2", "Corvette", "Corvette Stingray", "Corvette Z06", "Corvette Grand Sport", "Corvette ZR1", "Corvette E-Ray", "Cruze", "El Camino", "Equinox", "Equinox EV", "HHR", "Impala", "Impala SS", "Malibu", "Monte Carlo", "Monte Carlo SS", "S-10", "Silverado 1500", "Silverado 1500 Trail Boss", "Silverado 1500 ZR2", "Silverado 2500HD", "Sonic", "Spark", "SS", "Suburban", "Tahoe", "TrailBlazer", "Traverse", "Trax", "Volt"],
  "Chrysler": ["200", "300", "300 SRT8", "300M", "Crossfire", "Crossfire SRT-6", "Pacifica", "PT Cruiser", "PT Cruiser GT", "Sebring", "Town & Country", "Voyager"],
  "Dodge": ["Avenger", "Challenger", "Challenger R/T", "Challenger R/T Scat Pack", "Challenger SRT Hellcat", "Challenger SRT Hellcat Redeye", "Challenger SRT Demon", "Challenger SRT Demon 170", "Challenger SRT Super Stock", "Charger", "Charger R/T", "Charger R/T Scat Pack", "Charger SRT Hellcat", "Charger SRT Hellcat Redeye", "Charger Daytona", "Dakota", "Dart", "Dart GT", "Durango", "Durango R/T", "Durango SRT", "Durango SRT Hellcat", "Grand Caravan", "Hornet", "Hornet R/T", "Magnum", "Magnum SRT8", "Neon", "Neon SRT-4", "Nitro", "Ram 1500", "Ram 2500", "Stealth", "Viper", "Viper GTS", "Viper ACR", "Viper SRT10"],
  "Ferrari": ["296 GTB", "296 GTS", "348", "360 Modena", "360 Spider", "430 Scuderia", "458 Italia", "458 Spider", "458 Speciale", "488 GTB", "488 Spider", "488 Pista", "550 Maranello", "575M", "599 GTB", "599 GTO", "612 Scaglietti", "812 Superfast", "812 GTS", "812 Competizione", "California", "California T", "F355", "F40", "F50", "F8 Tributo", "F8 Spider", "FF", "GTC4Lusso", "LaFerrari", "Portofino", "Portofino M", "Roma", "Roma Spider", "SF90 Stradale", "SF90 Spider", "Testarossa"],
  "FIAT": ["124 Spider", "124 Spider Abarth", "500", "500 Abarth", "500e", "500L", "500X"],
  "Ford": ["Bronco", "Bronco Raptor", "Bronco Badlands", "Bronco Wildtrak", "Bronco Sport", "Bronco Sport Badlands", "Crown Victoria", "EcoSport", "Edge", "Edge ST", "Escape", "Excursion", "Expedition", "Explorer", "Explorer ST", "F-150", "F-150 Raptor", "F-150 Raptor R", "F-150 Tremor", "F-150 Lightning", "F-250", "F-350", "Fiesta", "Fiesta ST", "Five Hundred", "Flex", "Focus", "Focus ST", "Focus RS", "Fusion", "Fusion Sport", "GT", "Maverick", "Mustang", "Mustang GT", "Mustang EcoBoost", "Mustang Bullitt", "Mustang Mach 1", "Mustang Shelby GT350", "Mustang Shelby GT350R", "Mustang Shelby GT500", "Mustang Dark Horse", "Mustang Mach-E", "Mustang Mach-E GT", "Probe", "Ranger", "Ranger Raptor", "Taurus", "Taurus SHO", "Thunderbird"],
  "Genesis": ["G70", "G80", "G80 Sport", "G90", "GV60", "GV70", "GV70 Sport", "GV80"],
  "GMC": ["Acadia", "Acadia AT4", "Canyon", "Canyon AT4X", "Envoy", "Hummer EV", "Hummer EV SUV", "Jimmy", "Sierra 1500", "Sierra 1500 AT4", "Sierra 1500 AT4X", "Sierra 1500 Denali", "Sierra 2500HD", "Terrain", "Typhoon", "Yukon", "Yukon AT4", "Yukon Denali", "Yukon XL"],
  "Honda": ["Accord", "Accord Sport", "Accord Touring", "Accord Hybrid", "Civic", "Civic Sport", "Civic Si", "Civic Type R", "CR-V", "CR-V Hybrid", "CR-Z", "Crosstour", "del Sol", "Element", "Fit", "Fit Sport", "HR-V", "Insight", "Odyssey", "Passport", "Passport TrailSport", "Pilot", "Pilot TrailSport", "Prelude", "Prologue", "Ridgeline", "S2000", "S2000 CR"],
  "Hyundai": ["Accent", "Azera", "Elantra", "Elantra N", "Elantra N Line", "Genesis Coupe", "Ioniq 5", "Ioniq 5 N", "Ioniq 6", "Kona", "Kona N", "Kona Electric", "Palisade", "Santa Cruz", "Santa Fe", "Sonata", "Sonata N Line", "Tiburon", "Tucson", "Tucson N Line", "Veloster", "Veloster N", "Veloster Turbo", "Venue"],
  "INFINITI": ["EX35", "FX35", "FX45", "FX50", "G35", "G35 Coupe", "G37", "G37 Coupe", "G37 IPL", "M35", "M37", "M45", "M56", "Q50", "Q50 Red Sport 400", "Q60", "Q60 Red Sport 400", "Q70", "QX30", "QX50", "QX55", "QX56", "QX60", "QX70", "QX80"],
  "Jaguar": ["E-Pace", "F-Pace", "F-Pace SVR", "F-Type", "F-Type R", "F-Type SVR", "I-Pace", "S-Type", "S-Type R", "X-Type", "XE", "XE SV Project 8", "XF", "XFR", "XFR-S", "XJ", "XJR", "XJR575", "XJS", "XK", "XKR", "XKR-S"],
  "Jeep": ["Cherokee", "Cherokee Trailhawk", "Commander", "Compass", "Compass Trailhawk", "Gladiator", "Gladiator Rubicon", "Gladiator Mojave", "Grand Cherokee", "Grand Cherokee Trailhawk", "Grand Cherokee SRT", "Grand Cherokee Trackhawk", "Grand Cherokee L", "Grand Wagoneer", "Liberty", "Patriot", "Renegade", "Renegade Trailhawk", "Wagoneer", "Wrangler", "Wrangler Rubicon", "Wrangler Sahara", "Wrangler Unlimited", "Wrangler Rubicon 392"],
  "Kia": ["Carnival", "EV6", "EV6 GT", "EV9", "EV9 GT", "Forte", "Forte GT", "K5", "K5 GT", "K900", "Niro", "Niro EV", "Optima", "Optima SX", "Rio", "Sedona", "Seltos", "Soul", "Sorento", "Sorento SX", "Sportage", "Sportage X-Pro", "Stinger", "Stinger GT", "Stinger GT-Line", "Telluride", "Telluride SX"],
  "Lamborghini": ["Aventador", "Aventador S", "Aventador SVJ", "Countach", "Countach LPI 800-4", "Diablo", "Diablo SV", "Gallardo", "Gallardo Superleggera", "Huracan", "Huracan Performante", "Huracan STO", "Huracan Tecnica", "Huracan Sterrato", "Murcielago", "Murcielago SV", "Revuelto", "Urus", "Urus S", "Urus Performante"],
  "Land Rover": ["Defender", "Defender 90", "Defender 110", "Defender 130", "Defender V8", "Discovery", "Discovery Sport", "Freelander", "LR2", "LR3", "LR4", "Range Rover", "Range Rover Sport", "Range Rover Sport SVR", "Range Rover Evoque", "Range Rover Velar", "Range Rover SV", "Range Rover SVAutobiography"],
  "Lexus": ["CT 200h", "ES 300h", "ES 350", "ES 350 F Sport", "GS 350", "GS 350 F Sport", "GS 450h", "GS F", "GX 460", "GX 470", "GX 550", "IS 250", "IS 300", "IS 350", "IS 350 F Sport", "IS 500", "IS 500 F Sport Performance", "IS F", "LC 500", "LC 500 Convertible", "LC 500h", "LFA", "LS 400", "LS 430", "LS 460", "LS 460 F Sport", "LS 500", "LS 500h", "LS 500 F Sport", "LX 470", "LX 570", "LX 600", "LX 600 F Sport", "NX 250", "NX 350", "NX 350h", "NX 350 F Sport", "NX 450h+", "RC 300", "RC 350", "RC 350 F Sport", "RC F", "RC F Track Edition", "RX 330", "RX 350", "RX 350 F Sport", "RX 350h", "RX 450h", "RX 450h+", "RX 500h", "RX 500h F Sport Performance", "RZ 450e", "SC 300", "SC 400", "SC 430", "TX 350", "TX 500h", "UX 200", "UX 250h"],
  "Lincoln": ["Aviator", "Aviator Grand Touring", "Continental", "Corsair", "Corsair Grand Touring", "LS", "Mark VIII", "MKC", "MKS", "MKT", "MKX", "MKZ", "Nautilus", "Navigator", "Navigator L", "Town Car", "Zephyr"],
  "Lotus": ["Elise", "Emira", "Esprit", "Evora", "Evora GT", "Exige", "Exige S"],
  "Maserati": ["Ghibli", "Ghibli Trofeo", "GranCabrio", "GranTurismo", "GranTurismo Trofeo", "Grecale", "Grecale Trofeo", "Levante", "Levante Trofeo", "MC20", "MC20 Cielo", "Quattroporte", "Quattroporte Trofeo"],
  "Mazda": ["3", "6", "CX-3", "CX-30", "CX-30 Turbo", "CX-5", "CX-5 Turbo", "CX-50", "CX-50 Turbo", "CX-7", "CX-9", "CX-70", "CX-90", "CX-90 PHEV", "Mazda3", "Mazda3 Turbo", "Mazda6", "Mazda6 Turbo", "MX-5 Miata", "MX-5 Miata RF", "Millenia", "MPV", "Protege", "Mazdaspeed3", "Mazdaspeed6", "RX-7", "RX-7 Turbo", "RX-8", "Tribute"],
  "McLaren": ["540C", "570GT", "570S", "570S Spider", "600LT", "600LT Spider", "620R", "650S", "650S Spider", "675LT", "675LT Spider", "720S", "720S Spider", "750S", "750S Spider", "765LT", "765LT Spider", "Artura", "GT", "MP4-12C", "P1", "Senna"],
  "Mercedes-Benz": [
    "A 220", "A 35 AMG",
    "AMG GT", "AMG GT 43", "AMG GT 53", "AMG GT 63", "AMG GT 63 S", "AMG GT C", "AMG GT R", "AMG GT S",
    "C 300", "C 43 AMG", "C 55 AMG", "C 63 AMG", "C 63 S AMG",
    "CL 550", "CL 55 AMG", "CL 63 AMG", "CL 65 AMG",
    "CLA 250", "CLA 35 AMG", "CLA 45 AMG",
    "CLK 320", "CLK 350", "CLK 430", "CLK 500", "CLK 55 AMG", "CLK 63 AMG",
    "CLS 450", "CLS 500", "CLS 53 AMG", "CLS 55 AMG", "CLS 550", "CLS 63 AMG",
    "E 300", "E 350", "E 400", "E 43 AMG", "E 450", "E 500", "E 53 AMG", "E 55 AMG", "E 550", "E 63 AMG", "E 63 S AMG",
    "EQB 300", "EQB 350",
    "EQE 350+", "EQE 500",
    "EQS 450+", "EQS 580",
    "G 550", "G 55 AMG", "G 63 AMG", "G 65 AMG",
    "GLA 250", "GLA 35 AMG", "GLA 45 AMG",
    "GLB 250", "GLB 35 AMG",
    "GLC 300", "GLC 43 AMG", "GLC 63 AMG", "GLC 63 S AMG",
    "GLE 350", "GLE 450", "GLE 53 AMG", "GLE 580", "GLE 63 AMG", "GLE 63 S AMG",
    "GLK 250", "GLK 350",
    "GLS 450", "GLS 580", "GLS 63 AMG",
    "Maybach GLS 600", "Maybach S 580", "Maybach S 680",
    "ML 350", "ML 500", "ML 55 AMG", "ML 550", "ML 63 AMG",
    "R 350", "R 500", "R 63 AMG",
    "S 450", "S 500", "S 550", "S 560", "S 580", "S 600", "S 55 AMG", "S 63 AMG", "S 65 AMG",
    "SL 400", "SL 43 AMG", "SL 450", "SL 500", "SL 55 AMG", "SL 550", "SL 63 AMG", "SL 65 AMG",
    "SLC 300", "SLC 43 AMG",
    "SLK 230", "SLK 250", "SLK 300", "SLK 350", "SLK 55 AMG",
    "SLR McLaren", "SLS AMG"
  ],
  "MINI": ["Clubman", "Clubman S", "Clubman JCW", "Convertible", "Cooper", "Cooper S", "Countryman", "Countryman S", "Countryman JCW", "Hardtop", "John Cooper Works", "John Cooper Works GP", "Paceman"],
  "Mitsubishi": ["3000GT", "3000GT VR-4", "Eclipse", "Eclipse GT", "Eclipse Cross", "Galant", "Galant VR-4", "Lancer", "Lancer Evolution", "Lancer Ralliart", "Mirage", "Montero", "Montero Sport", "Outlander", "Outlander PHEV", "Outlander Sport"],
  "Nissan": ["200SX", "240SX", "300ZX", "300ZX Turbo", "350Z", "350Z Nismo", "370Z", "370Z Nismo", "Altima", "Altima SR", "Armada", "Frontier", "Frontier PRO-4X", "GT-R", "GT-R Nismo", "GT-R Track Edition", "GT-R Premium", "Juke", "Juke Nismo", "Kicks", "Leaf", "Leaf Plus", "Maxima", "Maxima SR", "Murano", "Pathfinder", "Quest", "Rogue", "Rogue Sport", "Sentra", "Sentra SE-R Spec V", "Titan", "Titan PRO-4X", "Versa", "Xterra", "Z", "Z Nismo", "Z Performance"],
  "Pontiac": ["Aztek", "Bonneville", "Fiero", "Fiero GT", "Firebird", "Firebird Trans Am", "Firebird Formula", "G6", "G6 GTP", "G8", "G8 GT", "G8 GXP", "Grand Am", "Grand Prix", "Grand Prix GTP", "GTO", "Solstice", "Solstice GXP", "Sunfire", "Vibe"],
  "Porsche": [
    "718 Boxster", "718 Boxster S", "718 Boxster GTS", "718 Boxster T", "718 Boxster Spyder",
    "718 Cayman", "718 Cayman S", "718 Cayman GTS", "718 Cayman T", "718 Cayman GT4", "718 Cayman GT4 RS",
    "718 Spyder",
    "911 Carrera", "911 Carrera S", "911 Carrera T", "911 Carrera GTS",
    "911 Carrera 4", "911 Carrera 4S", "911 Carrera 4 GTS",
    "911 Targa 4", "911 Targa 4S", "911 Targa 4 GTS",
    "911 Turbo", "911 Turbo S",
    "911 GT3", "911 GT3 RS", "911 GT3 Touring", "911 GT2 RS",
    "911 Sport Classic", "911 Dakar", "911 S/T",
    "918 Spyder", "924", "928", "944", "968",
    "Boxster", "Boxster S", "Boxster GTS", "Boxster Spyder",
    "Carrera GT",
    "Cayenne", "Cayenne S", "Cayenne E-Hybrid", "Cayenne GTS", "Cayenne Turbo", "Cayenne Turbo S", "Cayenne Turbo GT",
    "Cayenne Coupe", "Cayenne Coupe Turbo GT",
    "Cayman", "Cayman S", "Cayman GTS", "Cayman R",
    "Macan", "Macan S", "Macan GTS", "Macan T", "Macan Turbo",
    "Panamera", "Panamera 4", "Panamera 4S", "Panamera GTS", "Panamera Turbo", "Panamera Turbo S",
    "Taycan", "Taycan 4S", "Taycan GTS", "Taycan Turbo", "Taycan Turbo S", "Taycan Cross Turismo"
  ],
  "RAM": ["1500", "1500 Classic", "1500 TRX", "1500 Rebel", "1500 Laramie", "2500", "2500 Power Wagon", "3500", "ProMaster", "ProMaster City"],
  "Rivian": ["R1S", "R1T", "R1T Adventure", "R1S Adventure", "R2"],
  "Rolls-Royce": ["Cullinan", "Cullinan Black Badge", "Dawn", "Dawn Black Badge", "Ghost", "Ghost Black Badge", "Ghost Extended", "Phantom", "Phantom Extended", "Spectre", "Wraith", "Wraith Black Badge"],
  "Saab": ["9-2X", "9-2X Aero", "9-3", "9-3 Aero", "9-4X", "9-5", "9-5 Aero", "9-7X", "900", "900 Turbo", "9000", "9000 Aero"],
  "Saturn": ["Astra", "Aura", "Aura XR", "Ion", "Ion Red Line", "L-Series", "Outlook", "S-Series", "Sky", "Sky Red Line", "Vue", "Vue Red Line"],
  "Scion": ["FR-S", "iA", "iM", "tC", "xA", "xB", "xD"],
  "Subaru": ["Ascent", "Ascent Onyx", "BRZ", "BRZ tS", "Baja", "Crosstrek", "Crosstrek Wilderness", "Forester", "Forester Sport", "Forester Wilderness", "Impreza", "Impreza WRX", "Legacy", "Legacy GT", "Outback", "Outback Wilderness", "Outback XT", "Solterra", "SVX", "Tribeca", "WRX", "WRX TR", "WRX STI", "WRX STI S209", "WRX STI Type RA"],
  "Suzuki": ["Equator", "Grand Vitara", "Kizashi", "Kizashi Sport", "Samurai", "Sidekick", "SX4", "SX4 Sport", "Swift", "Swift Sport", "Vitara", "XL-7"],
  "Tesla": ["Cybertruck", "Cybertruck Foundation", "Model 3", "Model 3 Performance", "Model 3 Long Range", "Model S", "Model S Plaid", "Model S Long Range", "Model X", "Model X Plaid", "Model X Long Range", "Model Y", "Model Y Performance", "Model Y Long Range", "Roadster"],
  "Toyota": ["4Runner", "4Runner TRD Off-Road", "4Runner TRD Pro", "86", "Avalon", "Avalon TRD", "bZ4X", "C-HR", "Camry", "Camry SE", "Camry XSE", "Camry TRD", "Celica", "Celica GT-S", "Corolla", "Corolla SE", "Corolla Hatchback", "Corolla Cross", "Corolla Cross Hybrid", "Crown", "FJ Cruiser", "GR Corolla", "GR Corolla Morizo", "GR86", "GR Supra", "GR Supra 3.0", "GR Supra 3.0 Premium", "Highlander", "Highlander Hybrid", "Land Cruiser", "Matrix", "MR2", "MR2 Spyder", "Prius", "Prius Prime", "RAV4", "RAV4 Prime", "RAV4 TRD Off-Road", "Sequoia", "Sequoia TRD Pro", "Sienna", "Solara", "Supra", "Supra Turbo", "Tacoma", "Tacoma TRD Sport", "Tacoma TRD Off-Road", "Tacoma TRD Pro", "Tundra", "Tundra TRD Pro", "Venza", "Yaris", "Yaris GR"],
  "Volkswagen": ["Arteon", "Arteon R-Line", "Atlas", "Atlas Cross Sport", "Beetle", "Beetle Turbo", "CC", "CC R-Line", "Corrado", "Corrado VR6", "e-Golf", "Eos", "GLI", "Golf", "Golf GTI", "Golf R", "Golf R32", "ID.4", "ID.Buzz", "Jetta", "Jetta GLI", "New Beetle", "New Beetle Turbo S", "Passat", "Passat VR6", "Phaeton", "R32", "Rabbit", "Scirocco", "Taos", "Tiguan", "Tiguan R-Line", "Touareg", "Touareg V8"],
  "Volvo": ["240", "240 Turbo", "740", "740 Turbo", "850", "850 T-5R", "850 R", "C30", "C30 R-Design", "C40 Recharge", "C70", "EX30", "EX90", "S40", "S60", "S60 Polestar", "S60 R", "S70", "S80", "S90", "V60", "V60 Polestar", "V60 Cross Country", "V70", "V70 R", "V90", "V90 Cross Country", "XC40", "XC40 Recharge", "XC60", "XC60 Polestar", "XC70", "XC90"],
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
  for (let y = currentYear + 1; y >= 1990; y--) {
    years.push(y);
  }
  return years;
}
