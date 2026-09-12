import { supabase, isSupabaseConfigured } from "./supabaseClient";
import { seedEvents } from "@/data/events";

// A mutable in-memory copy of the seed data. This is only used when
// Supabase isn't configured yet, so likes/new events "work" during local
// development without a database. It resets on every server restart.
let memoryEvents = [...seedEvents];

/**
 * Fetch all events, optionally filtered by search text and/or category.
 * Returns events sorted with the soonest date first.
 */
export async function getEvents({ search = "", category = "All" } = {}) {
  let events;

  if (isSupabaseConfigured) {
    let query = supabase.from("events").select("*").order("date", { ascending: true });
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    events = data;
  } else {
    events = [...memoryEvents].sort((a, b) => a.date.localeCompare(b.date));
  }

  return events.filter((event) => {
    const matchesCategory = category === "All" || event.category === category;
    const matchesSearch =
      search.trim() === "" ||
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.club.toLowerCase().includes(search.toLowerCase()) ||
      event.venue.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

/** Fetch a single event by id. Returns null if not found. */
export async function getEventById(id) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from("events").select("*").eq("id", id).single();
    if (error) return null;
    return data;
  }
  return memoryEvents.find((event) => String(event.id) === String(id)) ?? null;
}

/** Return the events with the most likes, highest first. */
export async function getTrendingEvents() {
  const events = await getEvents();
  return [...events].sort((a, b) => b.likes - a.likes);
}

/** Increment the like count for an event by 1 and return the new count. */
export async function likeEvent(id) {
  if (isSupabaseConfigured) {
    const current = await getEventById(id);
    if (!current) throw new Error("Event not found");
    const { data, error } = await supabase
      .from("events")
      .update({ likes: current.likes + 1 })
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data.likes;
  }

  const event = memoryEvents.find((e) => String(e.id) === String(id));
  if (!event) throw new Error("Event not found");
  event.likes += 1;
  return event.likes;
}

/** Create a new event. Returns the created record. */
export async function createEvent(newEvent) {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from("events")
      .insert([{ ...newEvent, likes: 0 }])
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  const created = {
    ...newEvent,
    id: String(Date.now()),
    likes: 0,
  };
  memoryEvents = [created, ...memoryEvents];
  return created;
}
