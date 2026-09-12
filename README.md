# SRMlive — The Campus, Live.

**Live:** https://srmlive.vercel.app/

SRMlive is a **campus event discovery platform for SRM** that brings hackathons, fests, sports matches, workshops, guest lectures, and student activities into one place.

Instead of relying on scattered Instagram stories, WhatsApp groups, and posters, SRMlive gives students a simple way to **discover what's happening on campus, explore events, and engage with the campus community.**

## ✨ Why SRMlive?

Campus events are often promoted across multiple platforms, making it easy for students to miss important opportunities.

SRMlive aims to create a **single, engaging campus feed** where students can:

* Discover upcoming events
* Search events by club, venue, or title
* Explore events by category
* See what's trending among students
* Like and save events
* View complete event information
* Share and promote student activities
* Create and publish new events

The goal is simple:

> **Make campus life easier to discover.**

---

## 🚀 Features

### 🏠 Home

* Editorial-style hero section
* Live event ticker
* "Happening This Week" event grid
* Quick access to popular campus activities

### 🔎 Explore

Search and discover events using:

* Event title
* Club/organiser
* Venue
* Category

### 📈 Trending

Events are ranked based on student engagement and likes, helping surface activities that are gaining attention across campus.

### 📅 Event Details

Each event includes:

* Event name
* Description
* Date
* Time
* Venue
* Organiser
* Category

### ❤️ Like & Save

Students can interact with events by:

* Liking events
* Saving events for later
* Bookmarking without requiring an account

### ➕ Create Event

Students and organisers can create and publish campus events through a dedicated event submission form.

When Supabase authentication is connected, event creation is restricted to logged-in users.

### 🔐 Authentication

Email/password authentication powered by Supabase.

### 🎨 Event Posters

Every event automatically receives a **category-based poster design**.

Instead of relying on random stock images, SRMlive generates visually consistent event artwork using:

* Category colors
* Patterns
* Icons
* Typography

This keeps the platform visually consistent while eliminating the need for image uploads.

### 📱 Responsive Design

Designed to work across:

* Desktop
* Tablet
* Mobile

### ⚡ User Experience

Includes dedicated:

* Loading states
* Empty states
* Error states
* Responsive interactions
* Reduced-motion support

---

## 🛠️ Tech Stack

### Frontend

* Next.js 14
* React
* Tailwind CSS
* Lucide React

### Backend / Database

* Supabase
* PostgreSQL
* Supabase Auth

### Deployment

* Vercel

---

## 🏗️ Project Structure

```text
src/
├── app/
│   ├── Home
│   ├── Explore
│   ├── Trending
│   ├── Create Event
│   ├── Event Details
│   └── Login
│
├── components/
│   ├── Navbar
│   ├── EventCard
│   ├── EventPoster
│   ├── Buttons
│   ├── States
│   └── Cursor
│
├── data/
│   └── events.js
│
└── lib/
    ├── Supabase Client
    ├── Event Data Access
    ├── Authentication
    └── Category Styles
```

---

## 💻 Run Locally

Clone the repository and install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

The application can initially run using the included sample event data.

---

## 🗄️ Supabase Setup

SRMlive uses Supabase for persistent event data and authentication.

### 1. Create a Supabase project

Create a project through Supabase.

### 2. Create the events table

Run the SQL provided in:

```text
supabase.sql
```

This creates the required `events` table and database policies.

### 3. Configure environment variables

Create:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Restart the development server:

```bash
npm run dev
```

Once configured, SRMlive automatically switches from sample data to Supabase.

---

## 🔐 Authentication

Authentication is handled using **Supabase Auth**.

The current implementation supports:

* Email/password sign up
* Email/password login
* Logout
* Protected event creation

Event discovery remains accessible without requiring an account.

---

## 📊 Engagement & Community

SRMlive is designed around **student engagement** rather than simply displaying a list of events.

The platform uses interaction signals such as likes and trending events to help students discover activities that are attracting attention.

This creates a more dynamic experience where the campus community helps surface what's worth checking out.

---

## 🎨 Design Philosophy

### No stock photos

Events receive automatically generated visual posters based on their category.

This provides a consistent visual identity across the platform while keeping event creation simple.

### Editorial-style interface

The interface takes inspiration from modern media and content platforms rather than traditional event listing websites.

The design focuses on:

* Strong visual hierarchy
* Clear event information
* Easy discovery
* Fast navigation
* Mobile responsiveness
* Consistent branding

### Motion with purpose

Subtle interactions are used to make browsing feel more engaging without overwhelming the user.

Animations are automatically reduced for users who prefer reduced motion.

---

## 📌 Current Scope

The project intentionally keeps the first version lightweight.

Current limitations include:

* Email/password authentication only
* No OAuth providers
* Saved events are stored locally
* No dedicated user dashboard
* No password reset flow
* Generated posters instead of image uploads
* No pagination yet

---

## 🔮 Future Improvements

Potential extensions include:

* **My Events** dashboard for organisers
* Google/college email authentication
* Event reminders and notifications
* Supabase-based saved events
* Image uploads through Supabase Storage
* Event sharing
* Event registration
* Club/organiser profiles
* Event analytics
* Pagination and advanced filtering
* Personalised event recommendations
* Push notifications for upcoming events

---

## 🎯 Project Objective

SRMlive aims to become a **central digital discovery layer for campus life** — helping students find opportunities, helping clubs reach their audience, and making campus activities more visible.

> **Discover the campus.
> Find your people.
> Don't miss what's happening.**

---

## 🌐 Live Demo

**SRMlive:** https://srmlive.vercel.app/

Built with **Next.js, Tailwind CSS, React, and Supabase**.
