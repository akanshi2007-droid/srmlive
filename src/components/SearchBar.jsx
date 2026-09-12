"use client";

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search events, clubs, or venues"
        className="w-full rounded border border-line bg-paper py-2.5 pl-10 pr-4 text-sm placeholder:text-ink-soft focus:border-ink"
      />
    </div>
  );
}
