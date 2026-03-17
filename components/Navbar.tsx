"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          INFINITE <span className="text-brand-gold">SHIFTS</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-brand-gold transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-brand-gold transition-colors">
            About
          </Link>
          <Link href="/garage" className="text-sm font-medium hover:text-brand-gold transition-colors">
            Cars I've Owned
          </Link>
          <a
            href="https://www.youtube.com/@infiniteshifts1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium bg-brand-gold hover:bg-brand-gold-hover text-black px-4 py-2 rounded-lg transition-colors"
          >
            YouTube
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-neutral-800 transition-transform ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-neutral-800 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-neutral-800 transition-transform ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-800 px-4 pb-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-sm font-medium hover:text-brand-gold transition-colors">
            Home
          </Link>
          <Link href="/about" onClick={() => setMenuOpen(false)} className="text-sm font-medium hover:text-brand-gold transition-colors">
            About
          </Link>
          <Link href="/garage" onClick={() => setMenuOpen(false)} className="text-sm font-medium hover:text-brand-gold transition-colors">
            Cars I've Owned
          </Link>
          <a
            href="https://www.youtube.com/@infiniteshifts1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-brand-gold"
          >
            YouTube
          </a>
        </div>
      )}
    </nav>
  );
}
