"use client";

import { useRef } from "react";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import LikeButton from "./LikeButton";
import SaveButton from "./SaveButton";
import EventPoster from "./EventPoster";
import { getCategoryStyle } from "@/lib/categoryStyles";

function dateParts(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return {
    day: date.getDate(),
    month: date.toLocaleDateString("en-IN", { month: "short" }),
  };
}

export default function EventCard({ event }) {
  const { day, month } = dateParts(event.date);
  const { bg } = getCategoryStyle(event.category);
  const cardRef = useRef(null);

  // Tilts the card toward the cursor and moves a spotlight glow with it -
  // ties the card's motion to the same cursor the custom pointer controls.
  function handleMouseMove(e) {
    const card = cardRef.current;
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rotateY = ((x / rect.width) - 0.5) * 8;
    const rotateX = ((y / rect.height) - 0.5) * -8;

    card.style.setProperty("--mx", `${px}%`);
    card.style.setProperty("--my", `${py}%`);
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col overflow-hidden rounded bg-paper border-2 transition-transform duration-200 [transform-style:preserve-3d] will-change-transform"
      style={{ borderColor: bg }}
    >
      <div
        className="card-spotlight pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ "--spotlight-color": `${bg}26` }}
      />

      <Link href={`/event/${event.id}`} className="block relative">
        <div className="relative aspect-[4/3] overflow-hidden">
          <EventPoster
            category={event.category}
            club={event.club}
            className="transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>

        {/* Date badge overlapping the poster edge, like a torn ticket stub */}
        <div
          className="absolute -bottom-4 left-4 flex h-14 w-14 flex-col items-center justify-center rounded bg-paper border-2 transition-transform duration-300 group-hover:-rotate-6"
          style={{ borderColor: bg }}
        >
          <span className="font-display text-lg font-black leading-none">{day}</span>
          <span className="text-[10px] font-semibold uppercase text-ink-soft">{month}</span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4 pt-6">
        <Link href={`/event/${event.id}`}>
          <h3 className="font-display font-bold text-lg leading-snug mb-2 line-clamp-2">
            {event.title}
          </h3>
        </Link>

        <div className="text-sm text-ink-soft space-y-1.5 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">{event.venue}</span>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-line">
          <span className="text-xs font-medium text-ink-soft truncate max-w-[55%]">
            {event.club}
          </span>
          <div className="flex items-center gap-1">
            <LikeButton eventId={event.id} initialLikes={event.likes} />
            <SaveButton eventId={event.id} />
          </div>
        </div>
      </div>
    </article>
  );
}
