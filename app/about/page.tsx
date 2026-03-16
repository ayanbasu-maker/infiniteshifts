import type { Metadata } from "next";
import content from "@/data/content.json";

export const metadata: Metadata = {
  title: "About | Infinite Shifts",
  description: "Learn more about Infinite Shifts and the person behind the channel.",
};

export default function AboutPage() {
  const { about } = content;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">{about.title}</h1>
        <div className="w-12 h-1 bg-brand-gold rounded mb-10" />

        <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">
          {about.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-12">
          <a
            href={about.ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            {about.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
