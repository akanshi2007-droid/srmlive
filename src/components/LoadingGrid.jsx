export default function LoadingGrid({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="border border-line rounded overflow-hidden animate-pulse"
        >
          <div className="aspect-[4/3] bg-paper-muted" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-paper-muted rounded" />
            <div className="h-3 w-1/2 bg-paper-muted rounded" />
            <div className="h-3 w-2/3 bg-paper-muted rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
