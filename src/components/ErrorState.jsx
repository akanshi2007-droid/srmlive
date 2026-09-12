import { TriangleAlert } from "lucide-react";

export default function ErrorState({
  message = "Something went wrong while loading events.",
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded border border-line bg-paper-muted py-20 text-center">
      <TriangleAlert className="h-8 w-8 text-ink-soft mb-3" />
      <p className="font-display font-bold text-lg mb-1">Couldn't load events</p>
      <p className="text-sm text-ink-soft mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-signal"
        >
          Try again
        </button>
      )}
    </div>
  );
}
