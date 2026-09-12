import {
  Cpu,
  Flag,
  Music,
  Trophy,
  Wrench,
  Mic2,
  PartyPopper,
} from "lucide-react";
import { getCategoryStyle } from "@/lib/categoryStyles";

const ICONS = {
  Tech: Cpu,
  Hackathon: Flag,
  Cultural: Music,
  Sports: Trophy,
  Workshop: Wrench,
  "Guest Lecture": Mic2,
  Fest: PartyPopper,
};

const PATTERNS = {
  dots: (fg) =>
    `radial-gradient(${fg}33 1.5px, transparent 1.5px)`,
  grid: (fg) =>
    `linear-gradient(${fg}26 1px, transparent 1px), linear-gradient(90deg, ${fg}26 1px, transparent 1px)`,
  stripes: (fg) =>
    `repeating-linear-gradient(-45deg, ${fg}22 0, ${fg}22 2px, transparent 2px, transparent 14px)`,
  waves: (fg) =>
    `repeating-radial-gradient(circle at 0 0, transparent 0, transparent 12px, ${fg}22 13px)`,
};

const PATTERN_SIZE = {
  dots: "14px 14px",
  grid: "24px 24px",
  stripes: "auto",
  waves: "auto",
};

export default function EventPoster({ category, club, className = "", compact = false }) {
  const { bg, fg, pattern } = getCategoryStyle(category);
  const Icon = ICONS[category] || Cpu;
  const initials = club
    .split(" ")
    .filter((w) => w[0] === w[0]?.toUpperCase())
    .slice(0, 2)
    .map((w) => w[0])
    .join("") || club.slice(0, 2).toUpperCase();

  if (compact) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center ${className}`}
        style={{
          backgroundColor: bg,
          backgroundImage: PATTERNS[pattern](fg),
          backgroundSize: PATTERN_SIZE[pattern],
        }}
      >
        <Icon className="h-5 w-5" style={{ color: fg }} strokeWidth={2} />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-full w-full flex-col justify-between overflow-hidden ${className}`}
      style={{
        backgroundColor: bg,
        backgroundImage: PATTERNS[pattern](fg),
        backgroundSize: PATTERN_SIZE[pattern],
      }}
    >
      <div className="flex items-start justify-between p-4">
        <span
          className="text-xs font-bold tracking-wide"
          style={{ color: fg }}
        >
          {initials}
        </span>
        <Icon className="h-5 w-5" style={{ color: fg }} strokeWidth={2} />
      </div>

      <p
        className="px-4 pb-4 font-display font-black uppercase leading-[0.85] tracking-tight text-2xl sm:text-3xl break-words"
        style={{ color: fg, opacity: 0.92 }}
      >
        {category}
      </p>
    </div>
  );
}
