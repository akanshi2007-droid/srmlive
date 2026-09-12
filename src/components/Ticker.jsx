import EventPoster from "./EventPoster";

export default function Ticker({ events }) {
  // Duplicate the list once so the marquee can loop seamlessly at -50%.
  const items = [...events, ...events];

  return (
    <div className="border-y-2 border-ink bg-paper-muted overflow-hidden">
      <div className="flex items-center py-4 animate-marquee">
        {items.map((event, i) => (
          <div key={i} className="flex items-center gap-3 mx-4 shrink-0">
            <div className="h-12 w-12 rounded overflow-hidden shrink-0">
              <EventPoster category={event.category} club={event.club} compact />
            </div>
            <div className="whitespace-nowrap">
              <p className="text-sm font-bold leading-none">{event.title}</p>
              <p className="text-xs text-ink-soft mt-1">{event.club}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
