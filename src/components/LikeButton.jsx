"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { likeEvent } from "@/lib/events";

export default function LikeButton({ eventId, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleLike(e) {
    e.preventDefault();
    e.stopPropagation();
    if (liked || busy) return;

    setBusy(true);
    // Optimistic update so the tap feels instant.
    setLikes((n) => n + 1);
    setLiked(true);

    try {
      await likeEvent(eventId);
    } catch (err) {
      // Roll back on failure.
      setLikes((n) => n - 1);
      setLiked(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      onClick={handleLike}
      aria-pressed={liked}
      aria-label={liked ? "Liked" : "Like this event"}
      className="flex items-center gap-1 rounded px-2 py-1 text-sm text-ink-soft hover:text-ink transition-colors"
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          liked ? "fill-signal text-signal" : ""
        }`}
      />
      <span>{likes}</span>
    </button>
  );
}
