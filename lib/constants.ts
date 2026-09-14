export const SITE = {
  /** Display name (formal). */
  name: "Sir Fahad Munaf Parekh",
  /** Primary name for search — use in titles and Person schema. */
  personName: "Fahad Munaf Parekh",
  tagline: "Economics · CAIE & Edexcel",
  description:
    "Fahad Munaf Parekh (Sir Fahad Munaf Parekh) — Economics tutor for CAIE 9708, O Level 2281 / 0455 and Edexcel. 200+ free recorded lectures, online classes and notes.",
  // TODO: replace with the live domain once it is registered.
  url: "https://fahadmunafparekh.com",
  domain: "fahadmunafparekh.com",
  email: "fahadmunaf66@gmail.com",
  /**
   * Display number for the contact cards. Empty until a number is supplied —
   * the UI falls back to a plain "WhatsApp" label, and `whatsappLink()` uses
   * `whatsappShortLink` instead of a `wa.me/<number>` deep link.
   */
  phone: "",
  /** Digits only — enables `wa.me/<number>?text=…` links with a pre-typed message. */
  whatsappNumber: "",
  /** E.164 — schema.org contact point only. Omitted from schema when empty. */
  phoneE164: "",
  /** WhatsApp click-to-chat short link (works without knowing the number). */
  whatsappShortLink:
    "https://api.whatsapp.com/message/ZZWRC67YFHAZP1?autoload=1&app_absent=0",
  whatsappDefaultMessage:
    "Hi Sir Fahad, I'd like more information about your Economics tuition.",
  address: "Karachi, Pakistan",
  mapEmbed:
    "https://maps.google.com/maps?q=Karachi+Pakistan&t=&z=12&ie=UTF8&iwloc=&output=embed",
  /** Office hours — used on the contact page and for the live open/closed badge. */
  openHours: {
    monThu: { startHour: 7, startMinute: 30, endHour: 15, endMinute: 30 },
    friSat: { startHour: 9, startMinute: 0, endHour: 13, endMinute: 0 },
  },
  socials: {
    facebook:
      "https://www.facebook.com/p/Economics-by-Fahad-Munaf-Parekh-100063663895470/",
    instagram: "https://www.instagram.com/economicsbyfmp/",
    youtube: "https://www.youtube.com/@economicwithfahadmunafparekh",
    whatsapp:
      "https://api.whatsapp.com/message/ZZWRC67YFHAZP1?autoload=1&app_absent=0",
  },
} as const;

export const ANALYTICS_ENABLED =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "false";

/**
 * Registration form endpoint — a Google Apps Script Web App URL (ends in
 * `/exec`). The script appends each submission to a Google Sheet owned by
 * your own Google account and emails you a notification. This keeps the form
 * working on a static export (no backend) with the data stored in your Sheet.
 * Set NEXT_PUBLIC_REGISTRATION_ENDPOINT in `.env.local` before building.
 */
export const REGISTRATION_ENDPOINT =
  process.env.NEXT_PUBLIC_REGISTRATION_ENDPOINT || "";

/**
 * Contact page feedback form — separate Google Sheet + Apps Script Web App.
 * Set NEXT_PUBLIC_FEEDBACK_ENDPOINT in `.env.local` before building.
 * Setup: see scripts/google-feedback-form.gs
 */
export const FEEDBACK_ENDPOINT =
  process.env.NEXT_PUBLIC_FEEDBACK_ENDPOINT || "";

/** Grade / level options for the registration form (CAIE codes). */
export const REGISTER_GRADES = [
  "O Level (2281)",
  "AS Level (9708)",
  "A2 Level (9708)",
] as const;

/** Button labels — the /register form vs the WhatsApp registration chat. */
export const CTA_LABELS = {
  /** Links to the website interest form at /register */
  enrollInterest: "Enroll for May/June 2027",
  /** Compact label for the fixed header (full text in title + on /register) */
  enrollInterestHeader: "Enroll · May/June",
  /** Opens WhatsApp to register — enrolment is handled in chat. */
  registerWhatsApp: "Register on WhatsApp",
} as const;

/**
 * Google Analytics 4 — set `NEXT_PUBLIC_GA_ID` in `.env.local`. Blank by
 * default so a fresh build never reports into someone else's property.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; chipColor: string }[];
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Courses",
    href: "/courses",
    children: [
      { label: "AS Level", href: "/courses/as-level", chipColor: "#F8A830" },
      { label: "A2 Level", href: "/courses/a2-level", chipColor: "#283060" },
      { label: "O Level", href: "/courses/o-level", chipColor: "#3B4780" },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Notes", href: "/notes" },
  { label: "Extra Credit", href: "/extra-credit" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/**
 * Click-to-chat link. With `SITE.whatsappNumber` set this is a `wa.me` deep
 * link carrying the message pre-typed; without one it falls back to the
 * WhatsApp short link, which opens the same chat but cannot pre-fill text.
 */
export const whatsappLink = (message?: string) => {
  if (!SITE.whatsappNumber) return SITE.whatsappShortLink;
  const text = encodeURIComponent(message || SITE.whatsappDefaultMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
};

/** "Share this page on WhatsApp" — opens the contact picker, not our inbox. */
export const whatsappShareLink = (text: string) =>
  `https://wa.me/?text=${encodeURIComponent(text)}`;

/**
 * Destination for every "register / enrol now" CTA. Enrolment happens over
 * WhatsApp; the `/register` interest form is separate and posts to its own
 * Google Sheet via `REGISTRATION_ENDPOINT`.
 */
export const registerLink = () =>
  whatsappLink(
    "Hi Sir Fahad, I'd like to register for the May/June 2027 Economics batch. Could you share the fees and timings?"
  );

/**
 * "Unlock the rest" CTAs — notes, past papers, lecture and clip libraries.
 * Naming the resource means the first WhatsApp message already says what the
 * student is asking for, instead of a bare "hi".
 */
export const requestAccessLink = (resource: string) =>
  whatsappLink(
    `Hi Sir Fahad, I'd like access to the full ${resource}. Could you share the details?`
  );

/**
 * Quick-start conversations for the "Talk with FMP" dock — each chip opens
 * WhatsApp on the same number with the message pre-typed.
 */
export const TALK_TOPICS = [
  {
    id: "admission",
    label: "Join May/June 2027",
    message:
      "Hi Sir Fahad, I'd like to join the May/June 2027 Economics batch. Could you share the details?",
  },
  {
    id: "fees",
    label: "Fees & timings",
    message:
      "Hi Sir Fahad, could you please share the fee structure and class timings for Economics?",
  },
  {
    id: "notes",
    label: "Notes & past papers",
    message:
      "Hi Sir Fahad, I'd like access to your Economics notes and past-paper resources.",
  },
  {
    id: "doubt",
    label: "Ask a doubt",
    message:
      "Hi Sir Fahad, I have a doubt in Economics I'd like to ask about:",
  },
] as const;
