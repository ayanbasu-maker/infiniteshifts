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
            Welcome to Infinite Shifts — a channel about one simple idea: you
            can drive incredible cars without spending incredible money.
          </p>
          <p>
            I&apos;ve always been obsessed with cars. Not just the exotic stuff you
            see on posters — but the hidden gems. The cars that were once out of
            reach, depreciated hard, and are now sitting at prices that make zero
            sense for what you&apos;re getting.
          </p>
          <p>
            Every video is part of a bigger story — my own car journey. Reviews,
            real ownership experiences, what I&apos;d buy, what I&apos;d avoid, and which
            cars I think are the best value plays on the market right now.
          </p>
          <p>
            If you love cars and love a good deal, you&apos;re in the right place.
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
