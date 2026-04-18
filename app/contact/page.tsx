import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Infinite Shifts",
  description: "Get in touch with Infinite Shifts — questions, collaborations, or just to say hi.",
};

export default function ContactPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">
          Get in <span className="text-brand-gold">Touch</span>
        </h1>
        <div className="w-12 h-1 bg-brand-gold rounded mb-4" />
        <p className="text-neutral-400 text-lg mb-10">
          Have a question, or just want to talk cars? Drop me a note.
        </p>
        <ContactForm />
      </div>
    </section>
  );
}
