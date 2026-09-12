"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore" },
  { href: "/trending", label: "Trending" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-live" />
          </span>
          <span className="font-display text-lg font-black tracking-tight">
            SRMlive
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-colors ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-0 h-[1.5px] bg-ink transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/create"
            className="inline-flex items-center rounded bg-ink px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-signal"
          >
            Create Event
          </Link>
        </div>

        <button
          className="md:hidden -mr-2 p-2 text-ink"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-paper">
          <div className="container-page flex flex-col py-3">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-ink-soft hover:text-ink border-b border-line last:border-none"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="mt-3 inline-flex items-center justify-center rounded bg-ink px-4 py-3 text-sm font-medium text-paper"
            >
              Create Event
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
