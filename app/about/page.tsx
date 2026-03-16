import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Infinite Shifts",
  description: "Learn more about Infinite Shifts and the person behind the channel.",
};

export default function AboutPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">About Me</h1>
        <div className="w-12 h-1 bg-brand-gold rounded mb-10" />

        <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
          <p>
            Welcome to Infinite Shifts — a passion project born from a love of
            cars, wrenching, and the open road.
          </p>
          <p>
            This channel is all about documenting builds, sharing automotive
            knowledge, and connecting with people who live and breathe cars. From
            garage projects to spirited drives, every video is a new chapter in
            the journey.
          </p>
          <p>
            Whether you&apos;re a seasoned gearhead or just getting into the car
            world, there&apos;s something here for you. Thanks for being part of the
            ride.
          </p>
        </div>

        <div className="mt-12">
          <a
            href="https://www.youtube.com/@infiniteshifts1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Check out the channel
          </a>
        </div>
      </div>
    </section>
  );
}
