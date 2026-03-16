import type { Metadata } from "next";
import GarageCard from "@/components/GarageCard";
import { GarageVehicle } from "@/lib/types";

export const metadata: Metadata = {
  title: "My Garage | Infinite Shifts",
  description: "Every car I've owned — what I paid, what I sold it for, and whether it was worth it.",
};

const vehicles: GarageVehicle[] = [
  {
    name: "1997 Pontiac Grand Prix",
    image: "/garage/pontiac-grand-prix.jpg",
    status: "sold",
    sold: 4500,
    description: "My first car. Loved every mile of it. Sold it at 108K miles — one of those cars you never forget.",
  },
  {
    name: "2007 Ford Mustang GT",
    image: "/garage/fordmustang.png",
    status: "sold",
    bought: 26000,
    sold: 7500,
    description: "300 hp, noisy, boisterous, and had amazing wheels. Made all the right noises for all the wrong reasons. Owned it entirely too long — sold at 110K miles.",
  },
  {
    name: "2009 BMW 335i",
    image: "/garage/bmw335.png",
    status: "sold",
    bought: 14500,
    sold: 15000,
    description: "Owned for 6 months and actually made money. One of the rare wins. Quick flip, clean profit.",
  },
  {
    name: "2008 Lexus IS-F",
    image: "/garage/lexusisf.png",
    status: "sold",
    bought: 32000,
    sold: 29000,
    description: "A screaming V8 in a sports sedan. Lost a little on it but what a machine.",
  },
  {
    name: "2009 BMW E60 M5",
    image: "/garage/bmwm5.png",
    status: "sold",
    bought: 36000,
    sold: 32000,
    description: "The V10 was an absolute riot. One of the most fun cars I've ever owned. Still think about it.",
  },
  {
    name: "2012 Volkswagen Passat",
    image: "/garage/vw-passat.jpg",
    status: "sold",
    bought: 16000,
    sold: 4000,
    description: "The true beater. Owned it way too long and it looked like it by the time I sold it. Got banged up along the way — the definition of a car that owed me nothing.",
  },
  {
    name: "2015 BMW 328i",
    image: "/garage/bmw-328i.jpg",
    status: "sold",
    bought: 27000,
    sold: 11000,
    description: "My daily commuter for years. Heavy depreciation but expected — bought it when it was only 2 years old. It earned every mile.",
  },
  {
    name: "2016 Porsche Macan S",
    image: "/garage/macan.png",
    status: "sold",
    bought: 36000,
    sold: 19000,
    description: "The car that started the YouTube channel. Got a ton of views but the depreciation was horrific. Super popular car that the market didn't exactly agree with.",
  },
  {
    name: "2003 BMW E39 M5",
    image: "/garage/e39m5.png",
    status: "sold",
    bought: 29000,
    sold: 25000,
    description: "Owned for less than a year. Prices on these are going up — maybe I should've held onto it a little longer.",
  },
  {
    name: "2013 Porsche 911",
    image: "/garage/porsche911.png",
    status: "current",
    bought: 0,
    description: "Still in the garage. Fantastic car. Will I sell it? Honestly not sure yet.",
  },
  {
    name: "2021 Tesla Model S",
    image: "/garage/teslamodelsplaid.png",
    status: "sold",
    bought: 71000,
    sold: 53000,
    description: "Had to experience a 1,000 hp beast at least once. Lost a ton on it but had an absolute blast. No car I'll ever buy will be this quick again.",
  },
  {
    name: "2025 Audi Q3",
    image: "/garage/audiq3.png",
    status: "current",
    bought: 0,
    description: "The family car. Fully loaded, great quality, lots of features. Nothing flashy but does everything well. Keeping this one for a while.",
  },
  {
    name: "2014 Mercedes C63 AMG",
    image: "/garage/c63amg.png",
    status: "current",
    bought: 0,
    description: "Recent acquisition. So far so good — early days but very promising.",
  },
];

export default function GaragePage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">My Garage</h1>
        <div className="w-12 h-1 bg-brand-gold rounded mb-4" />
        <p className="text-neutral-400 text-lg mb-10">
          Every car I&apos;ve owned, every one with a story. This is the collection.
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
