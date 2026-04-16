const inputClass =
  "w-full bg-background border border-neutral-800 rounded-lg px-4 py-3 text-foreground text-sm focus:border-brand-gold focus:outline-none transition-colors placeholder:text-neutral-400";

export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/infiniteshifts@gmail.com"
      method="POST"
      className="space-y-4"
    >
      {/* FormSubmit config */}
      <input type="hidden" name="_subject" value="New message from Infinite Shifts" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      {/* Honeypot — invisible to humans, bots fill it in and FormSubmit discards the submission */}
      <input type="text" name="_honey" style={{ display: "none" }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm text-neutral-400 mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-neutral-400 mb-1.5">Message</label>
        <textarea
          name="message"
          placeholder="What's on your mind?"
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-8 py-3 bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold rounded-lg transition-colors"
      >
        Send Message
      </button>
    </form>
  );
}
