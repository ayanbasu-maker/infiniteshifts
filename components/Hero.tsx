export default function Hero({ viewCount }: { viewCount?: string }) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-b from-white via-neutral-50 to-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,169,14,0.1)_0%,_transparent_70%)]" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          INFINITE <span className="text-brand-gold">SHIFTS</span>
        </h1>
        <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
          Can&apos;t stop thinking or dreaming about cars? You&apos;ve come to the right place!
        </p>
        <a
          href="https://www.youtube.com/@infiniteshifts1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-brand-gold hover:bg-brand-gold-hover text-black font-semibold px-8 py-3 rounded-lg transition-colors text-lg"
        >
          Watch on YouTube
        </a>
        {viewCount && (
          <div className="mt-4 flex items-center justify-center gap-2 text-lg md:text-xl text-neutral-400 tracking-wide">
            <svg
              className="w-6 h-6 md:w-7 md:h-7 text-green-500 animate-bounce"
              style={{ animationDuration: '2s' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <p>
              <span className="font-bold text-foreground text-xl md:text-2xl">{viewCount}</span> views and counting
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
