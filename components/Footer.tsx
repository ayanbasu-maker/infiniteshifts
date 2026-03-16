export default function Footer() {
  return (
    <footer className="bg-neutral-900 border-t border-neutral-800 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-neutral-400">
          &copy; {new Date().getFullYear()} Infinite Shifts. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="https://www.youtube.com/@infiniteshifts1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-brand-gold transition-colors"
          >
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}
