"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { createEvent } from "@/lib/events";
import { CATEGORIES } from "@/data/events";

const EMPTY_FORM = {
  title: "",
  category: CATEGORIES[0],
  description: "",
  date: "",
  time: "",
  venue: "",
  club: "",
};

export default function CreateEventPage() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const created = await createEvent(form);
      setStatus("success");
      setTimeout(() => router.push(`/event/${created.id}`), 900);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message || "Couldn't post this event. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="container-page py-20 flex flex-col items-center text-center">
        <CheckCircle2 className="h-10 w-10 text-signal mb-4" />
        <h1 className="font-display font-bold text-2xl mb-1">Event posted</h1>
        <p className="text-ink-soft">Taking you to your event page…</p>
      </div>
    );
  }

  return (
    <div className="container-page py-10 sm:py-14 max-w-2xl">
      <h1 className="font-display font-black text-3xl sm:text-4xl mb-1">Create Event</h1>
      <p className="text-ink-soft mb-8">
        Fill in the details below. It'll show up on the Explore page right after you post it.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Field label="Event title">
          <input
            required
            type="text"
            value={form.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="e.g. Coding Club Weekly Meetup"
            className="input"
          />
        </Field>

        <Field label="Category">
          <select
            value={form.category}
            onChange={(e) => updateField("category", e.target.value)}
            className="input"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Description">
          <textarea
            required
            rows={4}
            value={form.description}
            onChange={(e) => updateField("description", e.target.value)}
            placeholder="What should people know before showing up?"
            className="input resize-none"
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Date">
            <input
              required
              type="date"
              value={form.date}
              onChange={(e) => updateField("date", e.target.value)}
              className="input"
            />
          </Field>
          <Field label="Time">
            <input
              required
              type="time"
              value={form.time}
              onChange={(e) => updateField("time", e.target.value)}
              className="input"
            />
          </Field>
        </div>

        <Field label="Venue">
          <input
            required
            type="text"
            value={form.venue}
            onChange={(e) => updateField("venue", e.target.value)}
            placeholder="e.g. Tech Park, Block 1 - Seminar Hall"
            className="input"
          />
        </Field>

        <Field label="Club / organiser">
          <input
            required
            type="text"
            value={form.club}
            onChange={(e) => updateField("club", e.target.value)}
            placeholder="e.g. SRM Coding Club"
            className="input"
          />
        </Field>

        <p className="text-xs text-ink-soft -mt-2">
          A poster is generated automatically from the category you pick above.
        </p>

        {status === "error" && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded bg-ink px-5 py-3 text-sm font-medium text-paper hover:bg-signal transition-colors disabled:opacity-60"
        >
          {status === "submitting" ? "Posting…" : "Post event"}
        </button>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1.5">{label}</span>
      {children}
    </label>
  );
}
