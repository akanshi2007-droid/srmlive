# SRMlive — The Campus, Live.

A campus events feed built with Next.js, Tailwind CSS, and Supabase. Discover
what's happening on campus, like and save events, and post new ones.

## Tech stack

- Next.js 14 (App Router) + React
- Tailwind CSS
- Supabase (Postgres) for storing events
- Lucide React for icons

## Project structure

```
src/
  app/          Pages (Home, Explore, Trending, Create Event, Event detail)
  components/   Reusable UI pieces (Navbar, EventCard, buttons, states)
  data/         Seed data used before Supabase is connected
  lib/          Supabase client + data-access functions
```

## 1. Run it locally with sample data (no Supabase needed yet)

```bash
npm install
npm run dev
```

Open http://localhost:3000. The app works fully with the seed data in
`src/data/events.js` — search, filters, likes, saves, and posting new events
all work in memory. This is the fastest way to check the UI.

Note: without Supabase configured, anything you post or like resets when the
dev server restarts, since it's only held in memory.

## 2. Connect Supabase

### a. Create a project

Go to https://supabase.com, create a new project, and wait for it to finish
provisioning.

### b. Create the `events` table

Open **SQL Editor** in your Supabase project and run the contents of
`supabase.sql` (included in this repo). It creates the `events` table, sets
up basic public read/write policies, and optionally seeds two rows.

### c. Set your environment variables

Copy the example env file:

```bash
cp .env.local.example .env.local
```

Find your project's URL and anon key under **Project Settings → API**, and
fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

### d. Restart the dev server

```bash
npm run dev
```

Once both env vars are set, the app automatically reads and writes to
Supabase instead of the in-memory seed data — no code changes needed. This
switch happens in `src/lib/supabaseClient.js` / `src/lib/events.js`.

## 3. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Or connect the GitHub repo directly at https://vercel.com/new. Either way,
add the two environment variables from `.env.local` in the Vercel project
settings (**Settings → Environment Variables**) before your first deploy.

## Notes on scope (things kept deliberately simple)

- **No authentication.** Anyone can post an event or like one — there's no
  login system. The Supabase policies in `supabase.sql` reflect this
  (public read/write). Add Supabase Auth later if you want events tied to a
  real user or club account.
- **Saved events are local to the browser** (stored in `localStorage`), not
  synced to Supabase, since there's no account system to attach them to.
- **Posters** default to a placeholder image (via picsum.photos) if you
  don't provide a poster URL when creating an event.

## Extending it

- Add Supabase Auth + a `profiles` table to tie events/saves to real users.
- Add image upload via Supabase Storage instead of pasting a poster URL.
- Add a "Save" table in Supabase once accounts exist, and swap
  `useSavedEvents` to read/write there instead of localStorage.
