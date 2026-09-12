"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "srmlive_saved_events";

// Saved events live in localStorage only. There's no login system in this
// version of the app, so "saving" an event is scoped to the visitor's
// browser rather than an account. That's a deliberate scope cut to keep
// the app shippable in a day - see the README for how to extend it.
export function useSavedEvents() {
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setSavedIds(JSON.parse(stored));
    }
  }, []);

  const isSaved = useCallback((id) => savedIds.includes(String(id)), [savedIds]);

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) => {
      const strId = String(id);
      const next = prev.includes(strId)
        ? prev.filter((savedId) => savedId !== strId)
        : [...prev, strId];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { savedIds, isSaved, toggleSave };
}
