"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/archive", label: "Archive" },
  { href: "/projects", label: "Projects" },
  { href: "/lets-do-this", label: "Let's Do This" },
  { href: "/library", label: "Library" },
  { href: "/work", label: "Work" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-sm border-b border-rule-light">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-sans text-sm font-semibold tracking-wide uppercase text-ink hover:text-accent transition-colors"
        >
          Jake Bouma
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {links.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-sans text-xs tracking-wide uppercase transition-colors ${
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href))
                  ? "text-accent font-medium"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-ink-muted"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-rule-light bg-cream">
          <div className="px-6 py-5 flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`font-sans text-xs tracking-wide uppercase transition-colors ${
                  pathname === link.href
                    ? "text-accent font-medium"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
