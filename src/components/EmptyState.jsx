import { CalendarX } from "lucide-react";

export default function EmptyState({
  title = "No events found",
  message = "Try a different search term or category.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded border border-dashed border-line py-20 text-center">
      <CalendarX className="h-8 w-8 text-ink-soft mb-3" />
      <p className="font-display font-bold text-lg mb-1">{title}</p>
      <p className="text-sm text-ink-soft">{message}</p>
    </div>
  );
}
