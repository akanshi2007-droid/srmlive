"use client";

import { useEffect, useState } from "react";
import { getEvents } from "@/lib/events";
import { CATEGORIES } from "@/data/events";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import CategoryFilter from "@/components/CategoryFilter";
import LoadingGrid from "@/components/LoadingGrid";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

export default function ExplorePage() {
  const [events, setEvents] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  async function load() {
    setStatus("loading");
    try {
      const data = await getEvents({ search, category });
      setEvents(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    const timeout = setTimeout(load, 200); // small debounce on search typing
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, category]);

  return (
    <div className="container-page py-10 sm:py-14">
      <h1 className="font-display font-black text-3xl sm:text-4xl mb-1">Explore</h1>
      <p className="text-ink-soft mb-8">
        Search across every event currently posted on campus.
      </p>

      <div className="flex flex-col gap-4 mb-8">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryFilter categories={CATEGORIES} active={category} onChange={setCategory} />
      </div>

      {status === "loading" && <LoadingGrid />}
      {status === "error" && <ErrorState onRetry={load} />}
      {status === "ready" && events.length === 0 && <EmptyState />}
      {status === "ready" && events.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}
