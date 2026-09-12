"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock, MapPin, Users } from "lucide-react";
import { getEventById } from "@/lib/events";
import LikeButton from "@/components/LikeButton";
import SaveButton from "@/components/SaveButton";
import EventPoster from "@/components/EventPoster";
import { getCategoryStyle } from "@/lib/categoryStyles";
import LoadingGrid from "@/components/LoadingGrid";
import ErrorState from "@/components/ErrorState";
import EmptyState from "@/components/EmptyState";

function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function EventDetailPage({ params }) {
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState("loading");

  async function load() {
    setStatus("loading");
    try {
      const data = await getEventById(params.id);
      setEvent(data);
      setStatus("ready");
    } catch (err) {
      setStatus("error");
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  if (status === "loading") {
    return (
      <div className="container-page py-10 sm:py-14">
        <LoadingGrid count={1} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-page py-10 sm:py-14">
        <ErrorState onRetry={load} />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="container-page py-10 sm:py-14">
        <EmptyState
          title="Event not found"
          message="It may have been removed or the link is incorrect."
        />
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-12">
      <Link
        href="/explore"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink mb-6"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Explore
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-[4/3] overflow-hidden rounded border-2" style={{ borderColor: getCategoryStyle(event.category).bg }}>
          <EventPoster category={event.category} club={event.club} />
        </div>

        <div>
          <span
            className="inline-block rounded px-2.5 py-1 text-xs font-semibold mb-4"
            style={{
              backgroundColor: getCategoryStyle(event.category).bg,
              color: getCategoryStyle(event.category).fg,
            }}
          >
            {event.category}
          </span>
          <h1 className="font-display font-black text-3xl sm:text-4xl leading-tight mb-4">
            {event.title}
          </h1>

          <div className="space-y-3 text-ink-soft mb-6">
            <div className="flex items-center gap-2.5">
              <CalendarDays className="h-5 w-5 shrink-0" />
              <span>{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="h-5 w-5 shrink-0" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <MapPin className="h-5 w-5 shrink-0" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Users className="h-5 w-5 shrink-0" />
              <span>Hosted by {event.club}</span>
            </div>
          </div>

          <p className="text-ink leading-relaxed mb-8">{event.description}</p>

          <div className="flex items-center gap-3 pt-6 border-t border-line">
            <div className="flex items-center gap-1 rounded border border-line px-3 py-2">
              <LikeButton eventId={event.id} initialLikes={event.likes} />
            </div>
            <div className="flex items-center rounded border border-line px-3 py-2">
              <SaveButton eventId={event.id} />
              <span className="ml-1.5 text-sm text-ink-soft">Save</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
