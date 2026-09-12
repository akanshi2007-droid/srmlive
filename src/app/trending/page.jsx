"use client";

import { useEffect, useState } from "react";
import { getTrendingEvents } from "@/lib/events";
import EventCard from "@/components/EventCard";
import LoadingGrid from "@/components/LoadingGrid";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function TrendingPage() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");

  async function load() {
    setStatus("loading");
    try {
      const data = await getTrendingEvents();
      setEvents(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display font-black text-3xl sm:text-4xl mb-1">Trending</h1>
      <p className="text-ink-soft mb-8">
        The most-liked events on campus right now.
      </p>

      {status === "loading" && <LoadingGrid />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "ready" && events.length === 0 && <EmptyState />}
      {status === "ready" && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event, i) => (
            <div key={event.id} className="relative">
              <span className="absolute -top-2 -left-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-ink text-paper text-xs font-bold">
                {i + 1}
              </span>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
