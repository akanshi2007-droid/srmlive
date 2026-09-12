"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import EventPoster from "@/components/EventPoster";
import Ticker from "@/components/Ticker";
import Reveal from "@/components/Reveal";
import LoadingGrid from "@/components/LoadingGrid";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

const COLLAGE_CATEGORIES = ["Cultural", "Tech", "Fest", "Sports", "Hackathon"];

export default function HomePage() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error

  async function load() {
    setStatus("loading");
    try {
      const data = await getEvents();
      setEvents(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  const upcoming = events.slice(0, 6);
  const clubCount = new Set(events.map((e) => e.club)).size;

  return (
    <div>
      {/* Hero - ink background so the app opens with a strong, non-default moment */}
      <section className="relative overflow-hidden bg-ink text-paper">
        {/* Floating decorative shapes - drift slowly, ignored by screen readers */}
        <div
          aria-hidden="true"
          className="absolute -top-10 right-[8%] h-24 w-24 rounded-full border-2 border-signal/40 animate-float"
        />
        <div
          aria-hidden="true"
          className="absolute top-1/2 -right-10 h-16 w-16 rounded-full bg-live/20 animate-float-slow"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-[6%] hidden sm:block animate-spin-slow"
        >
          <svg width="46" height="46" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
              fill="#D8286B"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="container-page relative pt-12 pb-14 sm:pt-16 sm:pb-20 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-paper/25 px-3 py-1 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-live" />
              </span>
              <span className="text-xs font-semibold tracking-wide">
                {events.length || "—"} events live on campus right now
              </span>
            </div>

            <h1 className="font-display font-black leading-[0.9] text-[16vw] sm:text-8xl lg:text-[7rem] tracking-tight">
              SRMlive
            </h1>
            <p className="font-display font-black leading-[0.95] text-3xl sm:text-5xl lg:text-6xl tracking-tight text-paper/70 mt-1">
              The campus, live.
            </p>

            <p className="mt-6 max-w-md text-base text-paper/70">
              Every hackathon, fest, match, and guest lecture happening on
              campus, posted straight by the clubs running them. No more
              finding out about things a day too late.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                data-cursor-hover
                className="group inline-flex items-center gap-2 rounded bg-paper px-5 py-3 text-sm font-semibold text-ink transition-all duration-200 hover:bg-signal hover:text-paper hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,0.25)]"
              >
                Explore events{" "}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/create"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded border border-paper/30 px-5 py-3 text-sm font-medium text-paper transition-all duration-200 hover:border-paper hover:-translate-y-0.5"
              >
                Post your event
              </Link>
            </div>
          </div>

          {/* Poster collage - a tangible, subject-specific visual instead of an abstract graphic */}
          <div className="hidden lg:block relative h-72">
            {COLLAGE_CATEGORIES.map((category, i) => {
              const positions = [
                "top-0 left-6 rotate-[-6deg] z-30 animate-float",
                "top-4 left-40 rotate-[4deg] z-20 animate-float-slow",
                "top-28 left-0 rotate-[3deg] z-20 animate-float",
                "top-32 left-32 rotate-[-4deg] z-10 animate-float-slow",
                "top-2 left-64 rotate-[8deg] z-10 animate-float",
              ];
              return (
                <div
                  key={category}
                  className={`absolute h-32 w-24 rounded shadow-xl overflow-hidden border-2 border-ink transition-transform duration-300 hover:scale-110 hover:z-40 ${positions[i]}`}
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <EventPoster category={category} club="SRM" compact />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Ticker - the one deliberate motion moment */}
      {status === "ready" && events.length > 0 && <Ticker events={events} />}

      {/* Stats strip */}
      <Reveal>
        <section className="container-page py-10 grid grid-cols-3 divide-x divide-line border-b border-line">
          <Stat value={events.length || "—"} label="live listings" accent="#2F5EFF" />
          <Stat value={clubCount || "—"} label="clubs posting" accent="#D8286B" />
          <Stat value="24/7" label="always updating" accent="#FFB800" />
        </section>
      </Reveal>

      {/* Upcoming grid */}
      <section className="container-page py-14">
        <Reveal>
          <div className="flex items-end justify-between mb-6">
            <h3 className="font-display font-bold text-2xl">Happening this week</h3>
            <Link
              href="/explore"
              className="text-sm font-medium text-signal hover:underline"
            >
              View all
            </Link>
          </div>
        </Reveal>

        {status === "loading" && <LoadingGrid />}
        {status === "error" && <ErrorState onRetry={load} />}
        {status === "ready" && upcoming.length === 0 && <EmptyState />}
        {status === "ready" && upcoming.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {upcoming.map((event, i) => (
              <Reveal key={event.id} delay={i * 60}>
                <EventCard event={event} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({ value, label, accent }) {
  return (
    <div className="px-4 first:pl-0 text-center">
      <span
        className="mx-auto mb-3 block h-1 w-8 rounded-full"
        style={{ backgroundColor: accent }}
      />
      <p className="font-display font-black text-3xl sm:text-4xl">{value}</p>
      <p className="text-sm text-ink-soft mt-1">{label}</p>
    </div>
  );
}
