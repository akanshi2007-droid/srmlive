// Each category gets a bold, fixed color identity. This is what powers the
// generated "poster" art on event cards instead of using random stock
// photos - it makes the grid feel like a wall of real club flyers instead
// of a stock-photo carousel, and it means every event looks intentional
// from the moment it's created, with zero image upload required.

export const CATEGORY_STYLES = {
  Tech: {
    bg: "#2F5EFF",
    fg: "#FFFFFF",
    pattern: "dots",
  },
  Hackathon: {
    bg: "#13141A",
    fg: "#FFB800",
    pattern: "grid",
  },
  Cultural: {
    bg: "#D8286B",
    fg: "#FFFFFF",
    pattern: "waves",
  },
  Sports: {
    bg: "#1C9A55",
    fg: "#FFFFFF",
    pattern: "stripes",
  },
  Workshop: {
    bg: "#FFB800",
    fg: "#13141A",
    pattern: "grid",
  },
  "Guest Lecture": {
    bg: "#5B21B6",
    fg: "#FFFFFF",
    pattern: "dots",
  },
  Fest: {
    bg: "#FF5A1F",
    fg: "#FFFFFF",
    pattern: "waves",
  },
};

export const DEFAULT_STYLE = { bg: "#13141A", fg: "#FFFFFF", pattern: "dots" };

export function getCategoryStyle(category) {
  return CATEGORY_STYLES[category] || DEFAULT_STYLE;
}
