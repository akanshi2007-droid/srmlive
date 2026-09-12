"use client";

import { Bookmark } from "lucide-react";
import { useSavedEvents } from "@/lib/useSavedEvents";

export default function SaveButton({ eventId }) {
  const { isSaved, toggleSave } = useSavedEvents();
  const saved = isSaved(eventId);

  function handleClick(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(eventId);
  }

  return (
    <button
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save this event"}
      className="flex items-center rounded px-2 py-1 text-ink-soft hover:text-ink transition-colors"
    >
      <Bookmark className={`h-4 w-4 ${saved ? "fill-ink text-ink" : ""}`} />
    </button>
  );
}
