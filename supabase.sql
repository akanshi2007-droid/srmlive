-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text not null,
  date date not null,
  time text not null,
  venue text not null,
  club text not null,
  likes integer not null default 0,
  created_at timestamptz not null default now()
);

-- Row Level Security: on by default in Supabase. These policies let anyone
-- read events, and anyone insert/update events (no login system in this
-- version of the app). Tighten these once you add authentication.
alter table events enable row level security;

create policy "Public read access"
  on events for select
  using (true);

create policy "Public insert access"
  on events for insert
  with check (true);

create policy "Public update access (for likes)"
  on events for update
  using (true);

-- Optional: seed a few rows so Explore isn't empty right after setup.
-- Feel free to skip this and use the "Create Event" form instead.
insert into events (title, category, description, date, time, venue, club, likes)
values
  (
    'GDG SRM DevFest: Building with Gemini',
    'Tech',
    'A hands-on session on building apps with the Gemini API, followed by a short hackday.',
    '2026-09-20',
    '2:00 PM',
    'Tech Park, Block 1 - Seminar Hall',
    'Google Developer Group SRM',
    342
  ),
  (
    'Milan ''26 — Battle of Bands, Auditions',
    'Cultural',
    'Open auditions for this year''s Battle of Bands at Milan. All genres welcome.',
    '2026-09-22',
    '5:30 PM',
    'University Building Front Lawn',
    'SRM Music Club',
    501
  );
