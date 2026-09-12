// Temporary seed data.
// This lets the whole app work end-to-end before Supabase is wired up.
// Once `src/lib/events.js` finds Supabase credentials, this file stops being used
// for reads (Supabase becomes the source of truth), but it's kept here as a
// reference for the shape of an "event" record.

export const CATEGORIES = [
  "Tech",
  "Hackathon",
  "Cultural",
  "Sports",
  "Workshop",
  "Guest Lecture",
  "Fest",
];

export const seedEvents = [
  {
    id: "1",
    title: "Smart India Hackathon — Internal Selection Round",
    category: "Hackathon",
    description:
      "Teams pitch their problem-statement solutions to the internal jury before the national round. Open for audience — come see what your batchmates are building, from campus safety apps to crop-yield predictors.",
    date: "2026-09-18",
    time: "10:00 AM",
    venue: "TP Ganesan Auditorium",
    club: "SRM Innovation & Incubation Center",
    likes: 214,
  },
  {
    id: "2",
    title: "GDG SRM DevFest: Building with Gemini",
    category: "Tech",
    description:
      "A hands-on session on building apps with the Gemini API, followed by a short hackday. Bring a laptop. Swag and food for the first 100 sign-ups.",
    date: "2026-09-20",
    time: "2:00 PM",
    venue: "Tech Park, Block 1 - Seminar Hall",
    club: "Google Developer Group SRM",
    likes: 342,
  },
  {
    id: "3",
    title: "Milan '26 — Battle of Bands, Auditions",
    category: "Cultural",
    description:
      "Open auditions for this year's Battle of Bands at Milan. All genres welcome. Bring your own instruments if possible; a basic drum kit and amps will be provided.",
    date: "2026-09-22",
    time: "5:30 PM",
    venue: "University Building Front Lawn",
    club: "SRM Music Club",
    likes: 501,
  },
  {
    id: "4",
    title: "Inter-Department Football League — Semifinal",
    category: "Sports",
    description:
      "Mech vs ECE in what's shaping up to be the closest match of the league. Come cheer your department on.",
    date: "2026-09-19",
    time: "4:00 PM",
    venue: "Main Ground",
    club: "SRM Sports Board",
    likes: 178,
  },
  {
    id: "5",
    title: "Resume & LinkedIn Workshop for Pre-Finals",
    category: "Workshop",
    description:
      "A practical, no-fluff session on getting your resume past the first filter and making your LinkedIn actually work for placements. Run by alumni now working at product companies.",
    date: "2026-09-25",
    time: "11:00 AM",
    venue: "Dr. T.P. Ganesan Hall",
    club: "Placement Cell",
    likes: 266,
  },
  {
    id: "6",
    title: "Guest Lecture: Systems Design at Scale",
    category: "Guest Lecture",
    description:
      "An SRM alum and staff engineer at a large fintech company walks through how systems are designed to handle millions of transactions a day, with real incident stories.",
    date: "2026-09-23",
    time: "3:00 PM",
    venue: "Tech Park, Block 2 - Auditorium",
    club: "IEEE SRM Student Branch",
    likes: 189,
  },
  {
    id: "7",
    title: "E-Summit '26 — Pitch Night",
    category: "Fest",
    description:
      "Student founders pitch to a panel of investors and alumni entrepreneurs. Open floor for questions after each pitch. Refreshments served.",
    date: "2026-09-27",
    time: "6:00 PM",
    venue: "Buddha Vihar Auditorium",
    club: "E-Cell SRM",
    likes: 412,
  },
  {
    id: "8",
    title: "Beginner's Git & GitHub Workshop",
    category: "Workshop",
    description:
      "For first and second years who keep hearing 'push it to GitHub' and want to actually understand what that means. Laptops required, no prior experience needed.",
    date: "2026-09-17",
    time: "1:00 PM",
    venue: "Tech Park, Block 1 - Lab 204",
    club: "SRM Coding Club",
    likes: 133,
  },
  {
    id: "9",
    title: "Classical Dance Recital — Navarasa",
    category: "Cultural",
    description:
      "An evening of Bharatanatyam and Kuchipudi performances exploring the nine rasas, choreographed and performed entirely by students.",
    date: "2026-09-29",
    time: "6:30 PM",
    venue: "Amphitheatre",
    club: "SRM Dance Crew",
    likes: 297,
  },
  {
    id: "10",
    title: "Blood Donation Camp",
    category: "Workshop",
    description:
      "In partnership with a local hospital. Bring your college ID. Juice and biscuits provided after donation.",
    date: "2026-09-16",
    time: "9:00 AM",
    venue: "Sports Complex Foyer",
    club: "NSS SRM",
    likes: 245,
  },
  {
    id: "11",
    title: "CTF Night: Capture The Flag",
    category: "Tech",
    description:
      "A beginner-friendly overnight capture-the-flag competition covering web exploitation, crypto, and reverse engineering. Teams of up to 3. Pizza at midnight.",
    date: "2026-10-02",
    time: "8:00 PM",
    venue: "Tech Park, Block 1 - Lab 301",
    club: "IEEE SRM Student Branch",
    likes: 356,
  },
  {
    id: "12",
    title: "Rotaract Street Play — Road Safety",
    category: "Cultural",
    description:
      "A short street play on road safety, performed near the main gate during peak footfall hours, followed by a short pledge drive.",
    date: "2026-09-21",
    time: "5:00 PM",
    venue: "Main Gate Plaza",
    club: "Rotaract Club SRM",
    likes: 91,
  },
];
