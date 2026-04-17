import type { Metadata } from "next";
import Link from "next/link";

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
          <p>Welcome to Infinite Shifts — a channel where I have fun with cars.</p>
          <p>
            I&apos;ve always been obsessed with cars, probably like you, if you&apos;re reading
            this. Not just the exotic stuff you see on posters, but anything that&apos;s fun to
            drive and interesting. I&apos;m mainly interested in used, heavily depreciated cars
            where you can find something at a great price without breaking the bank. Maintenance,
            on the other hand, might break the bank if you&apos;re not careful!
          </p>
          <p>
            Along the way I also highlight what I&apos;m owning, buying and selling. Check out
            the &ldquo;Cars I&apos;ve Owned&rdquo; section to learn more.
          </p>
          <p>
            If you want to reach out, shoot me a message{" "}
            <Link
              href="/contact"
              className="text-brand-gold hover:underline font-medium"
            >
              here
            </Link>
            .
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
