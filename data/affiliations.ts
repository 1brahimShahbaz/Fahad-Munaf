export type AffiliationSlot = "morning" | "evening" | "online";

export type Affiliation = {
  name: string;
  /** Which teaching block this institution runs in. */
  slot: AffiliationSlot;
  /**
   * Logo file under `public/images/`. Optional: when a logo has not been
   * supplied yet the card falls back to a branded monogram, so the
   * institution still appears rather than silently dropping out of the list.
   */
  logoSrc?: string;
  href?: string;
  /**
   * Visual scale multiplier. The logos ship with wildly different built-in
   * padding, so this is what makes them look optically the same size in the
   * row — it is not a layout size, just a nudge. Default = 1.
   */
  scale?: number;
};

export type AffiliationGroup = {
  slot: AffiliationSlot;
  label: string;
  blurb: string;
};

/** Rendered in this order; see components/layout/FooterAffiliations.tsx. */
export const affiliationGroups: AffiliationGroup[] = [
  {
    slot: "morning",
    label: "Morning",
    blurb: "School and college sessions",
  },
  {
    slot: "evening",
    label: "Evening",
    blurb: "Academy and tuition centres",
  },
];

/**
 * Institutions Fahad teaches at, split by teaching block.
 * Logo files are `public/images/AFF*.png|jpg`.
 */
export const affiliations: Affiliation[] = [
  // --- Morning ---
  {
    name: "Alpha High School",
    slot: "morning",
    logoSrc: "/images/AFF10.png",
    scale: 1,
  },
  {
    name: "Whales College",
    slot: "morning",
    logoSrc: "/images/AFF6.jpg",
    scale: 1.14,
  },
  {
    name: "Titan College",
    slot: "morning",
    logoSrc: "/images/AFF7.jpg",
    scale: 1.06,
  },
  {
    name: "Karachi Public School",
    slot: "morning",
    logoSrc: "/images/AFF8.jpg",
    scale: 1.08,
  },
  {
    name: "Ascend School",
    slot: "morning",
    logoSrc: "/images/AFF9.jpg",
    scale: 1,
  },

  // --- Evening ---
  {
    name: "The Professionals Core",
    slot: "evening",
    logoSrc: "/images/AFF1.jpg",
    scale: 1,
  },
  {
    name: "Kashan's Academy",
    slot: "evening",
    logoSrc: "/images/AFF4.png",
    href: "https://www.facebook.com/KashansAcademy/",
    scale: 1.08,
  },
  {
    name: "Panwala Institute",
    slot: "evening",
    logoSrc: "/images/AFF2.jpg",
    scale: 1.22,
  },
  {
    name: "Nadeem's Academy",
    slot: "evening",
    logoSrc: "/images/AFF3.jpg",
    scale: 1.02,
  },
];

export function affiliationsBySlot(slot: AffiliationSlot): Affiliation[] {
  return affiliations.filter((a) => a.slot === slot);
}

/**
 * Teaching institutions only. The `"online"` slot is retained in the type so a
 * platform partner can be added back without a refactor, but nothing uses it.
 */
export const teachingAffiliationCount = affiliations.filter(
  (a) => a.slot !== "online"
).length;
