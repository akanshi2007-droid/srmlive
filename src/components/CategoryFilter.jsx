"use client";

export default function CategoryFilter({ categories, active, onChange }) {
  const all = ["All", ...categories];

  return (
    <div className="flex flex-wrap gap-2">
      {all.map((category) => {
        const isActive = active === category;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isActive
                ? "border-ink bg-ink text-paper"
                : "border-line text-ink-soft hover:border-ink hover:text-ink"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
