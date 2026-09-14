# Sir Fahad Munaf Parekh — Economics Tutor Portfolio

Premium Next.js 14 portfolio + course showcase website built from the official `PLAN.md` and `design.md` brief. Implements the navy / gold / cream design system, six page templates, an SEO-ready content layer, and Google Analytics 4 wiring.

---

## Quick start

```bash
npm install
npm run dev                # http://localhost:3000
npm run build              # production build (all routes static)
npm run start              # serve the production build
```

All pages are statically generated except `/api/contact`, which is a server route.

---

## Tech stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** with custom design tokens (`tailwind.config.ts`)
- **Fonts:** Fraunces (display), Inter (body), Space Grotesk (numbers) — loaded via `next/font/google` with zero CLS
- **Embla Carousel** for hero slider, testimonials and reels carousel
- **Framer Motion** ready for entry animations (use as needed)
- **React CountUp** + **Intersection Observer** for animated metrics
- **React Hook Form** + **Zod** for the contact form
- **next-seo** + native Next.js Metadata API for SEO
- **next-sitemap** for sitemap generation
- **@next/third-parties** for Google Analytics 4
- **Lucide React** for icons

---

## Folder structure

```
app/
├── layout.tsx              # Root layout (Header + Footer + GA + JSON-LD)
├── page.tsx                # Home
├── about/page.tsx
├── notes/page.tsx
├── contact/page.tsx
├── courses/
│   ├── as-level/page.tsx
│   ├── a2-level/page.tsx
│   └── o-level/page.tsx
├── blog/
│   ├── page.tsx            # Blog index
│   └── [slug]/page.tsx     # Single post
├── api/contact/route.ts    # Contact form endpoint
├── not-found.tsx           # 404
├── sitemap.ts              # Generates /sitemap.xml
└── robots.ts               # Generates /robots.txt

components/
├── layout/      Header, Footer, FloatingWhatsApp
├── home/        HeroSlider, RegistrationBanner, SampleLectures, SampleNotes, ReelsCarousel, Affiliations
├── courses/     CoursePageTemplate, CourseAtAGlance
├── about/       MetricCounter, TestimonialsCarousel
├── notes/       NotesLibrary, StickyWhatsAppBar
├── contact/     ContactForm, HoursCard
├── blog/        BlogIndex, BlogCard, TOC, ShareRail
└── shared/      Logo, Container, SectionEyebrow, SampleLectureCard, SampleNoteCard, VideoLightbox, WhatsAppButton

lib/
├── constants.ts            # Site config (whatsapp, orbed, contact info)
├── seo.ts                  # buildMetadata helper + JSON-LD schemas
├── analytics.ts            # trackEvent() helper for GA4
└── utils.ts                # cn() helper

data/                       # All content lives here (swap to Sanity later)
├── courses.ts
├── lectures.ts
├── notes.ts
├── testimonials.ts
├── affiliations.ts         # also exports reels[]
└── posts.ts

public/
├── images/                 # teacher-home.jpeg, teacher-about.jpeg, orbed.jpeg
└── notes/                  # Drop PDFs here (paths configured in data/notes.ts)
```

---

## How to edit content (no developer needed)

| You want to change…                  | Edit this file               |
| ------------------------------------- | ---------------------------- |
| Phone, email, WhatsApp, Orbed URL     | `lib/constants.ts`           |
| A and A* %, total students, years     | `lib/constants.ts` → `SITE.metrics` (and `app/about/page.tsx` numbers) |
| Sample lectures (titles, videos)      | `data/lectures.ts`           |
| Sample notes (titles, PDF paths)      | `data/notes.ts`              |
| Course copy (AS / A2 / O)             | `data/courses.ts`            |
| Testimonials                          | `data/testimonials.ts`       |
| Affiliations + glimpse reels          | `data/affiliations.ts`       |
| Blog posts                            | `data/posts.ts`              |
| Site SEO defaults                     | `lib/seo.ts`                 |

To swap the logo: replace `components/shared/Logo.tsx` with an `<Image src="/logo.svg" ... />` once the final logo is delivered.

---

## SEO

Three layers, all wired and live:

1. **Metadata API** — every page exports a typed `metadata` object via `buildMetadata()` in `lib/seo.ts`. Handles `<title>`, `<meta description>`, Open Graph, Twitter cards, canonical URL, robots directives.
2. **JSON-LD structured data**, injected per-page:
   - `EducationalOrganization` (root layout)
   - `Person` (home + about)
   - `Course` (each course page)
   - `BreadcrumbList` (each course page)
   - `BlogPosting` (each blog post)
3. **Sitemap + robots** — Next.js App Router native `app/sitemap.ts` and `app/robots.ts`. Sitemap auto-includes every blog post. `/api/` and `/studio/` are disallowed.

### Quality checklist (run after launch)

- Submit `https://fahadmunafparekh.com/sitemap.xml` to Google Search Console.
- Verify domain ownership in Search Console.
- Test rich results with [Google's Rich Results Test](https://search.google.com/test/rich-results) for `/courses/as-level` and `/blog/...`.
- Add a real 1200×630 OG image to `public/images/og-default.jpg`.

---

## Google Analytics 4

Wired via the official `@next/third-parties/google` package — lazy-loaded, handles App Router route changes automatically, respects Do-Not-Track.

### Setup

1. Create a GA4 property at <https://analytics.google.com>.
2. Copy your Measurement ID (`G-XXXXXXXXXX`).
3. Create `.env.local` from `.env.local.example` and fill in:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   NEXT_PUBLIC_ANALYTICS_ENABLED=true
   ```
4. Restart the dev server. GA loads only when `NEXT_PUBLIC_GA_ID` is set.

### Tracked events (in `lib/analytics.ts`)

| Event             | Where it fires                                |
| ----------------- | --------------------------------------------- |
| `register_click`  | Every "Register" CTA (with `source` param)    |
| `whatsapp_click`  | Every WhatsApp link (with `context` param)    |
| `orbed_click`     | "Study Online With Me" header & mobile menu   |
| `lecture_play`    | Every play of a sample lecture                |
| `notes_download`  | Every download of a sample note               |
| `contact_submit`  | Successful contact form submission            |
| `blog_share`      | Share rail on each blog post                  |

Open GA4 → **Reports → Engagement → Events** to see them within ~24 hours of first traffic.

To disable analytics temporarily (during testing): set `NEXT_PUBLIC_ANALYTICS_ENABLED=false`.

---

## Contact form

The form posts to `/api/contact`. Currently it logs to the server console and returns success. To wire real email delivery:

- **Option A (Resend, recommended):** add `RESEND_API_KEY` to `.env.local` and replace the body of `app/api/contact/route.ts` with a Resend send call.
- **Option B (host SMTP):** install `nodemailer` and configure SMTP through the host's email account (`hi@yourdomain.com`).

---

## What is not yet done (per the original PLAN.md phasing)

- **Phase 4: Sanity CMS.** Content lives in typed `/data` files today. Swapping to Sanity is a 1-file change per data source — schemas can be generated from these types.
- **Final logo.** A clean Fraunces wordmark with the gold underline-flourish on the **Z** is in place (`components/shared/Logo.tsx`) — swap for the real logo once delivered.
- **Real WhatsApp number / Orbed URL / metrics.** Placeholders in `lib/constants.ts`.
- **Hosting deployment** (PM2 + Nginx on Hostinger hPanel) — handled at launch.

---

## Useful scripts

```bash
npm run dev       # dev server (hot reload)
npm run build     # full production build (typechecks + generates sitemap)
npm run start     # serve the production build
npm run lint      # ESLint
```

---

*Built from `PLAN.md` v2.0 and `design.md` v1.0.*
