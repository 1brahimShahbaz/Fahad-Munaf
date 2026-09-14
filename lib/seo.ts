import type { Metadata } from "next";
import { SITE } from "./constants";

type PageSEO = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  /** Extra keywords merged with site defaults (blog posts, course pages). */
  keywords?: string[];
  /** When true, page title is used as-is (for homepage brand title). */
  titleAbsolute?: boolean;
};

// TODO: swap for a real photo of Fahad once one is available.
export const DEFAULT_OG_IMAGE = "/images/fmp-og.png";

/** Primary brand + discovery phrases for name searches. */
export const SEO_KEYWORDS = [
  "Fahad Munaf Parekh",
  "Sir Fahad Munaf Parekh",
  "Fahad Munaf Parekh Economics",
  "Fahad Munaf Parekh tutor",
  "Fahad Munaf Parekh Economics teacher",
  "Fahad Munaf Parekh CAIE",
  "Fahad Munaf Parekh Karachi",
  "fahadmunafparekh.com",
  "best A Level Economics tutor in Karachi",
  "best A Level Economics teacher in Karachi",
  "best O Level Economics tutor in Karachi",
  "best O Level Economics teacher in Karachi",
  "private A Level Economics in Karachi",
  "private O Level Economics in Karachi",
  "private Economics tuition Karachi",
  "best A Level Economics tutor Karachi",
  "best A Level teacher Karachi",
  "A Level Economics teacher Karachi",
  "Economics tutor Karachi",
  "Economics tuition Karachi",
  "O Level Economics tutor Karachi",
  "AS Level Economics Karachi",
  "A2 Level Economics Karachi",
  "CAIE Economics 9708 Karachi",
  "best Economics teacher Pakistan",
  "A Level Economics tuition",
  "CAIE 9708 Economics tutor",
  "Edexcel Economics tutor Pakistan",
  "Edexcel Economics teacher",
  "O Level Economics notes",
  "online Economics tutor Pakistan",
  "Pakistan economics tuition online",
  "AS Level Economics",
  "A2 Level Economics",
] as const;

const DEFAULT_TITLE = `${SITE.personName} — Economics Tutor in Karachi (CAIE & Edexcel)`;

const META_TITLE_SUFFIX = ` | ${SITE.personName}`;
const META_TITLE_MAX = 60;

/** Shorter `<title>` text for blog posts (display titles unchanged). */
export const BLOG_SEO_TITLES: Record<string, string> = {
  "elasticity-economics-a-level-complete-guide":
    "A Level Elasticity Guide",
  "o-level-economics-complete-revision-guide":
    "O Level Economics Revision",
  "as-level-economics-vs-a2-level-economics-differences":
    "AS vs A2 Economics Guide",
  "how-to-study-economics-a-level-complete-guide":
    "Study A Level Economics",
  "economics-notes-as-level-how-to-make-good-notes":
    "AS Level Economics Notes",
  "keynesian-vs-monetarist-economics-a-level-explained":
    "Keynesian vs Monetarist Guide",
  "how-to-prepare-for-caie-economics-october-november-2026":
    "CAIE Economics Oct/Nov 2026",
  "market-failure-economics-a-level-explained":
    "A Level Market Failure",
  "online-economics-tuition-pakistan-guide":
    "Economics Tuition Pakistan",
  "economics-9708-paper-4-essay-writing-guide":
    "9708 Paper 4 Essay Guide",
  "caie-vs-edexcel-economics-a-level-which-is-harder":
    "CAIE vs Edexcel A Level",
  "top-10-economics-mistakes-a-level-students-make":
    "Top 10 A Level Eco Mistakes",
  "best-economics-tutor-karachi-a-level-o-level":
    "Best Economics Tutor in Karachi",
};

/** Returns a page title segment that keeps full metadata title ≤ 60 characters. */
export function seoPageTitle(pageTitle: string): string {
  const full = `${pageTitle}${META_TITLE_SUFFIX}`;
  if (full.length <= META_TITLE_MAX) return pageTitle;
  const maxBase = META_TITLE_MAX - META_TITLE_SUFFIX.length;
  if (pageTitle.length <= maxBase) return pageTitle;
  const cut = pageTitle.slice(0, maxBase - 1).replace(/\s+\S*$/, "");
  return `${cut}…`;
}

export function blogSeoTitle(slug: string, displayTitle: string): string {
  const short = BLOG_SEO_TITLES[slug];
  if (short) return seoPageTitle(short);
  return seoPageTitle(displayTitle);
}

/**
 * Resolved icons and relative OG/Twitter URLs are joined with metadataBase.
 * In development, SITE.url points at production — the browser would fetch
 * `/icon.png` from the wrong host unless we use localhost here.
 */
function getMetadataBase(): URL {
  if (process.env.NODE_ENV === "development") {
    const port = process.env.PORT ?? "3000";
    return new URL(`http://localhost:${port}`);
  }
  return new URL(SITE.url);
}

function absoluteImageUrl(image: string): string {
  if (image.startsWith("http")) return image;
  return `${SITE.url}${image.startsWith("/") ? image : `/${image}`}`;
}

export function buildMetadata(seo: PageSEO = {}): Metadata {
  const title = seo.titleAbsolute
    ? seo.title ?? DEFAULT_TITLE
    : seo.title
      ? `${seo.title} | ${SITE.personName}`
      : DEFAULT_TITLE;
  const description = seo.description || SITE.description;
  const url = `${SITE.url}${seo.path || ""}`;
  const image = absoluteImageUrl(seo.image || DEFAULT_OG_IMAGE);

  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
    process.env.GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: getMetadataBase(),
    title,
    description,
    applicationName: SITE.personName,
    alternates: { canonical: url },
    keywords: [
      ...SEO_KEYWORDS,
      ...(seo.keywords?.filter(Boolean) ?? []),
    ],
    authors: [
      { name: SITE.personName, url: SITE.url },
      { name: SITE.name, url: SITE.url },
    ],
    creator: SITE.personName,
    publisher: SITE.personName,
    category: "education",
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: `${SITE.personName} — ${SITE.tagline}`,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE.personName} — Economics tutor in Karachi`,
        },
      ],
      locale: "en_PK",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: googleVerification
      ? { google: googleVerification }
      : undefined,
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png", sizes: "48x48" },
        { url: "/icon.png", type: "image/png", sizes: "192x192" },
      ],
      apple: [
        {
          url: "/apple-touch-icon.png",
          type: "image/png",
          sizes: "180x180",
        },
      ],
      shortcut: ["/favicon.ico"],
    },
  };
}

const personId = `${SITE.url}/#person`;
const orgId = `${SITE.url}/#organization`;
const websiteId = `${SITE.url}/#website`;

export const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: SITE.personName,
  alternateName: [SITE.name, "Sir Fahad", "Fahad Munaf Parekh Economics"],
  givenName: "Fahad",
  familyName: "Parekh",
  honorificPrefix: "Sir",
  jobTitle: "Economics Tutor",
  description:
    "A Level Economics tutor in Karachi, Pakistan. Teaches CAIE 9708, Edexcel Economics, AS Level, A2 Level and O Level Economics (CAIE 2281 / 0455) in person across several Karachi institutions and live online across Pakistan.",
  url: SITE.url,
  image: absoluteImageUrl(DEFAULT_OG_IMAGE),
  ...(SITE.phoneE164 ? { telephone: SITE.phoneE164 } : {}),
  address: {
    "@type": "PostalAddress",
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.instagram,
    SITE.socials.youtube,
    SITE.socials.whatsapp,
  ],
  knowsAbout: [
    "A Level Economics",
    "O Level Economics",
    "AS Level Economics",
    "A2 Level Economics",
    "Cambridge International Examinations",
    "CAIE Economics 9708",
    "CAIE 2281 Economics O Level",
    "Edexcel A Level Economics",
    "Microeconomics",
    "Macroeconomics",
    "Economics Tuition Karachi",
  ],
  worksFor: { "@id": orgId },
};

export const localBusinessJsonLd = {
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "@id": orgId,
  name: `${SITE.personName} — Economics Tuition`,
  alternateName: [SITE.name, "Fahad Munaf Parekh Economics", SITE.domain],
  description:
    "A Level and O Level Economics tuition in Karachi, Pakistan by Fahad Munaf Parekh. CAIE 9708 and Edexcel Economics specialist. In-person classes in Karachi and online tuition across Pakistan and internationally.",
  url: SITE.url,
  ...(SITE.phoneE164 ? { telephone: SITE.phoneE164 } : {}),
  priceRange: "$$",
  image: absoluteImageUrl(DEFAULT_OG_IMAGE),
  founder: { "@id": personId },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Karachi",
    addressRegion: "Sindh",
    addressCountry: "PK",
  },
  areaServed: [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Pakistan",
    "United Arab Emirates",
    "United Kingdom",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Economics Tuition Courses",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "AS Level Economics (CAIE 9708)",
          description:
            "Comprehensive AS Level Economics tuition in Karachi and online, covering the full CAIE 9708 syllabus.",
          url: `${SITE.url}/courses/as-level`,
          provider: { "@id": personId },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "A2 Level Economics (CAIE 9708)",
          description:
            "Advanced A2 Level Economics tuition for CAIE 9708 — evaluation, essays and past-paper mastery.",
          url: `${SITE.url}/courses/a2-level`,
          provider: { "@id": personId },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Course",
          name: "O Level Economics (CAIE 2281)",
          description:
            "O Level Economics tuition for CAIE 2281 — strong foundations in micro and macro fundamentals.",
          url: `${SITE.url}/courses/o-level`,
          provider: { "@id": personId },
        },
      },
    ],
  },
  sameAs: [
    SITE.socials.facebook,
    SITE.socials.instagram,
    SITE.socials.youtube,
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  url: SITE.url,
  name: DEFAULT_TITLE,
  alternateName: [SITE.personName, SITE.name, SITE.domain],
  description: SITE.description,
  inLanguage: "en",
  publisher: { "@id": personId },
};

/** Combined graph for every page — helps Google associate the site with Fahad Munaf Parekh. */
export function getSiteJsonLdGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [websiteJsonLd, personJsonLd, localBusinessJsonLd],
  };
}

const COURSE_META = {
  AS: {
    name: "AS Level Economics (CAIE 9708)",
    code: "9708",
    level: "AS Level",
    desc: "Cambridge International AS Level Economics (CAIE 9708) with Sir Fahad Munaf Parekh — Economics tuition in Karachi and online, full syllabus coverage, recorded lectures, notes and past papers.",
    path: "/courses/as-level",
    teaches: [
      "Demand and supply",
      "Price, income and cross elasticity",
      "Market failure and government intervention",
      "Inflation, unemployment and economic growth",
      "International trade, exchange rates and balance of payments",
    ],
  },
  A2: {
    name: "A2 Level Economics (CAIE 9708)",
    code: "9708",
    level: "A2 Level",
    desc: "Cambridge International A2 Level Economics (CAIE 9708) with Sir Fahad Munaf Parekh — Economics tuition in Karachi and online, utility and indifference curves, market structures, macro policy and evaluation technique.",
    path: "/courses/a2-level",
    teaches: [
      "Utility theory and indifference curve analysis",
      "Perfect and imperfect competition",
      "Labour market and trade unions",
      "Circular flow, consumption and saving functions",
      "Globalisation, devaluation and inflation policy",
    ],
  },
  O: {
    name: "O Level Economics (CAIE 2281)",
    code: "2281",
    level: "O Level",
    desc: "Cambridge O Level Economics (CAIE 2281) with Sir Fahad Munaf Parekh — Economics tuition in Karachi and online, strong micro and macro foundations, recorded lectures, notes and solved past papers.",
    path: "/courses/o-level",
    teaches: [
      "The basic economic problem",
      "Demand, supply and market equilibrium",
      "Costs, revenue and market structures",
      "The labour market and division of labour",
      "Inflation, unemployment and the standard of living",
    ],
  },
} as const;

export type CourseSchemaLevel = keyof typeof COURSE_META;

/**
 * Course schema with `hasCourseInstance` and `offers` — the fields Google needs
 * for Course rich results, not just a bare Course node.
 */
export function courseJsonLd(level: CourseSchemaLevel) {
  const m = COURSE_META[level];
  return {
    "@context": "https://schema.org",
    ...courseNode(m),
  };
}

function courseNode(m: (typeof COURSE_META)[CourseSchemaLevel]) {
  return {
    "@type": "Course",
    "@id": `${SITE.url}${m.path}#course`,
    name: m.name,
    description: m.desc,
    courseCode: m.code,
    educationalLevel: m.level,
    educationalCredentialAwarded: `Cambridge ${m.level} Economics (${m.code})`,
    teaches: [...m.teaches],
    about: ["Economics", "Microeconomics", "Macroeconomics"],
    inLanguage: "en",
    url: `${SITE.url}${m.path}`,
    provider: { "@id": orgId },
    instructor: { "@id": personId },
    offers: {
      "@type": "Offer",
      category: "Paid",
      availability: "https://schema.org/InStock",
      // Enrolment happens over WhatsApp, and a `wa.me` deep link is a poor
      // schema target — point at the indexable enrolment page instead.
      url: `${SITE.url}/register`,
    },
    hasCourseInstance: [
      {
        "@type": "CourseInstance",
        name: `${m.name} — live online classes`,
        courseMode: "Online",
        courseWorkload: "PT4H",
        inLanguage: "en",
        instructor: { "@id": personId },
      },
      {
        "@type": "CourseInstance",
        name: `${m.name} — in-person classes in Karachi`,
        courseMode: "Onsite",
        courseWorkload: "PT4H",
        inLanguage: "en",
        instructor: { "@id": personId },
        location: {
          "@type": "Place",
          name: `${SITE.personName} — Economics classes, Karachi`,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Karachi",
            addressRegion: "Sindh",
            addressCountry: "PK",
          },
        },
      },
    ],
  };
}

/** All three courses as a list — eligible for Google's course carousel. */
export function courseListJsonLd() {
  const levels: CourseSchemaLevel[] = ["O", "AS", "A2"];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Economics courses taught by Sir Fahad Munaf Parekh",
    itemListElement: levels.map((level, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: courseNode(COURSE_META[level]),
    })),
  };
}

/** Visible homepage FAQ + FAQPage rich-result schema share this single source. */
export const HOME_FAQS = [
  {
    question: "Who is the best A Level Economics tutor in Karachi?",
    answer:
      "Fahad Munaf Parekh teaches CAIE Economics 9708 and Edexcel Economics across several O and A Level institutions in Karachi, with a concept-first method aimed at A and A* grades. Over 200 full lectures are free to watch, and classes run in person in Karachi and live online across Pakistan.",
  },
  {
    question: "Where can I find an A Level Economics tutor in Karachi?",
    answer:
      "Fahad Munaf Parekh offers A Level Economics tuition in Karachi — in person across several O and A Level institutions, and through live online classes. Visit fahadmunafparekh.com to register for AS Level, A2 Level, or O Level Economics courses for CAIE and Edexcel.",
  },
  {
    question: "Who is the best O Level Economics tutor in Karachi?",
    answer:
      "Fahad Munaf Parekh is regarded as one of the best O Level Economics tutors and teachers in Karachi. He teaches CAIE O Level Economics (2281), building strong micro and macro foundations that set students up for AS and A2 Level. Classes are available in-person in Karachi and live online across Pakistan.",
  },
  {
    question:
      "Is private A Level and O Level Economics tuition available in Karachi?",
    answer:
      "Yes. Fahad Munaf Parekh offers private A Level Economics in Karachi and private O Level Economics in Karachi — small-group and one-to-one options tailored to each student's weak areas, with weekly past-paper marking and personalised feedback. Private online tuition is also available for students outside Karachi.",
  },
  {
    question: "Does Fahad Munaf Parekh teach online Economics?",
    answer:
      "Yes. Fahad Munaf Parekh offers live online Economics tuition for students across Pakistan — Karachi, Lahore, Islamabad — and internationally. All courses cover the full CAIE 9708 or Edexcel Economics syllabus, with recorded backups and WhatsApp doubt support.",
  },
  {
    question: "What Economics courses does Fahad Munaf Parekh teach?",
    answer:
      "Fahad Munaf Parekh teaches O Level Economics (CAIE 2281), AS Level Economics (CAIE 9708), A2 Level Economics (CAIE 9708), and Edexcel A Level Economics. Courses are available for the May/June and October/November examination series.",
  },
] as const;

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: HOME_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * VideoObject list for the free recorded lectures.
 *
 * Google needs `uploadDate` for a video rich result. We only emit it when a
 * lecture actually carries one in `data/recordedLectures.ts` — a guessed date
 * is worse than none. Add `uploadDate: "YYYY-MM-DD"` to a lecture and it is
 * picked up automatically.
 */
export function lectureVideoListJsonLd(
  groups: {
    level: string;
    label: string;
    strands: {
      title: string;
      lectures: {
        title: string;
        topic: string;
        youtubeId: string;
        uploadDate?: string;
      }[];
    }[];
  }[]
) {
  const items = groups.flatMap((group) =>
    group.strands.flatMap((strand) =>
      strand.lectures.map((lecture) => ({
        "@type": "VideoObject" as const,
        name: `${lecture.topic}: ${lecture.title} — ${group.label} Economics`,
        description: `${lecture.topic} — ${lecture.title}: a free ${group.label} ${strand.title} lecture from ${SITE.name}'s CAIE Economics course.`,
        thumbnailUrl: [
          `https://i.ytimg.com/vi/${lecture.youtubeId}/hqdefault.jpg`,
          `https://i.ytimg.com/vi/${lecture.youtubeId}/maxresdefault.jpg`,
        ],
        embedUrl: `https://www.youtube-nocookie.com/embed/${lecture.youtubeId}`,
        contentUrl: `https://www.youtube.com/watch?v=${lecture.youtubeId}`,
        inLanguage: "en",
        isFamilyFriendly: true,
        learningResourceType: "Lecture",
        educationalLevel: group.label,
        publisher: { "@id": orgId },
        creator: { "@id": personId },
        ...(lecture.uploadDate ? { uploadDate: lecture.uploadDate } : {}),
      }))
    )
  );

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free recorded Economics lectures",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item,
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}
