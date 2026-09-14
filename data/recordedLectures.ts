// GENERATED FILE — do not edit by hand.
// Rebuild with: npm run generate:lectures   (see scripts/generate-lectures.mjs)
// Source: the three "Complete Lectures" playlists on the YouTube channel.
import type { CourseLevel } from "./courses";

export type RecordedLecture = {
  /** Stable slug used for React keys and analytics. */
  id: string;
  /** Card title — this lecture's specific focus within its topic series. */
  title: string;
  /** Topic series the lecture belongs to, e.g. "Inflation". Groups the cards. */
  topic: string;
  /** Position within the topic series, as numbered on YouTube. */
  lectureNo?: number;
  /** YouTube video id — lectures are hosted on YouTube, not on this site. */
  youtubeId: string;
  /** Publication date, `YYYY-MM-DD` — required for video rich results. */
  uploadDate?: string;
};

export type StrandId = "micro" | "macro" | "skills" | "more";

export type LectureStrand = {
  id: StrandId;
  title: string;
  blurb: string;
  /** Teaching order — grouped by topic series, then by lecture number. */
  lectures: RecordedLecture[];
};

export type LectureLevelGroup = {
  level: CourseLevel;
  /** Menu label, e.g. "O Level". */
  label: string;
  /** Syllabus code shown next to the label. */
  syllabus: string;
  blurb: string;
  strands: LectureStrand[];
};

/** `https://www.youtube.com/watch?v=<id>` → privacy-friendly embed URL. */
export function youtubeEmbedUrl(youtubeId: string): string {
  return `https://www.youtube-nocookie.com/embed/${youtubeId}`;
}

/** Poster frame served straight from YouTube (no local storage needed). */
export function youtubeThumbnail(youtubeId: string): string {
  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function youtubeWatchUrl(youtubeId: string): string {
  return `https://www.youtube.com/watch?v=${youtubeId}`;
}

/** Topic series inside a strand, in order — used for the sub-headings. */
export function strandTopics(strand: LectureStrand): string[] {
  const seen: string[] = [];
  for (const l of strand.lectures) if (!seen.includes(l.topic)) seen.push(l.topic);
  return seen;
}

const oLevelGroup: LectureLevelGroup = {
  level: "O",
  label: "O Level",
  syllabus: "CAIE 2281 / 0455",
  blurb:
    "Foundation lectures — the concepts every O Level paper keeps coming back to.",
  strands: [
    {
      id: "micro",
      title: "Microeconomics",
      blurb:
        "Demand, supply, elasticity, market failure and the firm — built up from first principles.",
      lectures: [
        // Basic Economic Problem — 4 lectures
        {
          id: "o-micro-basic-economic-problem-1",
          title: "Lecture 1",
          topic: "Basic Economic Problem",
          lectureNo: 1,
          youtubeId: "vk4otvqqNcc",
          uploadDate: "2025-07-19",
        },
        {
          id: "o-micro-basic-economic-problem-2",
          title: "Lecture 2",
          topic: "Basic Economic Problem",
          lectureNo: 2,
          youtubeId: "MLL8LCit1-k",
          uploadDate: "2025-07-19",
        },
        {
          id: "o-micro-basic-economic-problem-3",
          title: "Lecture 3",
          topic: "Basic Economic Problem",
          lectureNo: 3,
          youtubeId: "prlWUyo_aBY",
          uploadDate: "2025-07-19",
        },
        {
          id: "o-micro-basic-economic-problem-4",
          title: "Lecture 4",
          topic: "Basic Economic Problem",
          lectureNo: 4,
          youtubeId: "NEpR873bxps",
          uploadDate: "2025-07-19",
        },
        // Economic System — 1 lecture
        {
          id: "o-micro-economic-system-1",
          title: "Lecture 1",
          topic: "Economic System",
          lectureNo: 1,
          youtubeId: "t2tfD4R65TY",
          uploadDate: "2024-04-10",
        },
        // Demand — 5 lectures
        {
          id: "o-micro-demand-1",
          title: "Lecture 1",
          topic: "Demand",
          lectureNo: 1,
          youtubeId: "kIiw9rVXakQ",
          uploadDate: "2025-08-14",
        },
        {
          id: "o-micro-demand-2",
          title: "Lecture 2",
          topic: "Demand",
          lectureNo: 2,
          youtubeId: "nIJcO2rWb9k",
          uploadDate: "2025-08-14",
        },
        {
          id: "o-micro-demand-3",
          title: "Lecture 3",
          topic: "Demand",
          lectureNo: 3,
          youtubeId: "170WkxSfNJM",
          uploadDate: "2025-08-22",
        },
        {
          id: "o-micro-demand-4",
          title: "Lecture 4",
          topic: "Demand",
          lectureNo: 4,
          youtubeId: "2GtoySF6mpc",
          uploadDate: "2025-08-23",
        },
        {
          id: "o-micro-demand-5",
          title: "Lecture 5",
          topic: "Demand",
          lectureNo: 5,
          youtubeId: "zD_kAZSX7qk",
          uploadDate: "2025-08-28",
        },
        // Price Elasticity of Demand — 7 lectures
        {
          id: "o-micro-price-elasticity-of-demand-1",
          title: "Lecture 1",
          topic: "Price Elasticity of Demand",
          lectureNo: 1,
          youtubeId: "07nz6DMeGsI",
          uploadDate: "2025-08-29",
        },
        {
          id: "o-micro-price-elasticity-of-demand-2",
          title: "Lecture 2",
          topic: "Price Elasticity of Demand",
          lectureNo: 2,
          youtubeId: "m4joBxxRMcw",
          uploadDate: "2025-08-29",
        },
        {
          id: "o-micro-price-elasticity-of-demand-3",
          title: "Lecture 3",
          topic: "Price Elasticity of Demand",
          lectureNo: 3,
          youtubeId: "_ytmu3qD5Co",
          uploadDate: "2025-08-29",
        },
        {
          id: "o-micro-price-elasticity-of-demand-4",
          title: "Lecture 4",
          topic: "Price Elasticity of Demand",
          lectureNo: 4,
          youtubeId: "K3rWe3ZhfGw",
          uploadDate: "2025-08-30",
        },
        {
          id: "o-micro-price-elasticity-of-demand-5",
          title: "Lecture 5",
          topic: "Price Elasticity of Demand",
          lectureNo: 5,
          youtubeId: "4u_mR2pASa4",
          uploadDate: "2025-08-30",
        },
        {
          id: "o-micro-price-elasticity-of-demand-6",
          title: "Lecture 6",
          topic: "Price Elasticity of Demand",
          lectureNo: 6,
          youtubeId: "Cg-i-WSwOwI",
          uploadDate: "2025-08-30",
        },
        {
          id: "o-micro-price-elasticity-of-demand-7",
          title: "Lecture 7",
          topic: "Price Elasticity of Demand",
          lectureNo: 7,
          youtubeId: "QSR-u2J_TTw",
          uploadDate: "2025-08-30",
        },
        // Supply — 4 lectures
        {
          id: "o-micro-supply-1",
          title: "Lecture 1",
          topic: "Supply",
          lectureNo: 1,
          youtubeId: "joO_Ro4mck0",
          uploadDate: "2025-09-06",
        },
        {
          id: "o-micro-supply-2",
          title: "Lecture 2",
          topic: "Supply",
          lectureNo: 2,
          youtubeId: "-iqajXjt50E",
          uploadDate: "2025-09-06",
        },
        {
          id: "o-micro-supply-3",
          title: "Lecture 3",
          topic: "Supply",
          lectureNo: 3,
          youtubeId: "fooKpBL132c",
          uploadDate: "2025-09-06",
        },
        {
          id: "o-micro-supply-4",
          title: "Lecture 4",
          topic: "Supply",
          lectureNo: 4,
          youtubeId: "siWetQU05-o",
          uploadDate: "2025-09-09",
        },
        // Price Elasticity of Supply — 3 lectures
        {
          id: "o-micro-price-elasticity-of-supply-1",
          title: "Lecture 1",
          topic: "Price Elasticity of Supply",
          lectureNo: 1,
          youtubeId: "ogkHKdC0rUE",
          uploadDate: "2025-07-15",
        },
        {
          id: "o-micro-price-elasticity-of-supply-2",
          title: "Lecture 2",
          topic: "Price Elasticity of Supply",
          lectureNo: 2,
          youtubeId: "lQpYU-V8jYQ",
          uploadDate: "2025-07-16",
        },
        {
          id: "o-micro-price-elasticity-of-supply-3",
          title: "Lecture 3",
          topic: "Price Elasticity of Supply",
          lectureNo: 3,
          youtubeId: "bSOOPMLd9fs",
          uploadDate: "2025-07-16",
        },
        // Market — 6 lectures
        {
          id: "o-micro-market-1",
          title: "Lecture 1",
          topic: "Market",
          lectureNo: 1,
          youtubeId: "SXhKOtlWPrc",
          uploadDate: "2025-09-12",
        },
        {
          id: "o-micro-market-2",
          title: "Lecture 2",
          topic: "Market",
          lectureNo: 2,
          youtubeId: "jpfPrEGKvmA",
          uploadDate: "2025-09-12",
        },
        {
          id: "o-micro-market-3",
          title: "Lecture 3",
          topic: "Market",
          lectureNo: 3,
          youtubeId: "0HsE-1J__Jw",
          uploadDate: "2025-09-13",
        },
        {
          id: "o-micro-market-4",
          title: "Lecture 4",
          topic: "Market",
          lectureNo: 4,
          youtubeId: "cVMK9Z5Eshk",
          uploadDate: "2025-09-16",
        },
        {
          id: "o-micro-market-5",
          title: "Lecture 5",
          topic: "Market",
          lectureNo: 5,
          youtubeId: "bBPEYc1ookQ",
          uploadDate: "2025-09-18",
        },
        {
          id: "o-micro-market-6",
          title: "Lecture 6",
          topic: "Market",
          lectureNo: 6,
          youtubeId: "X0-0-xneDsQ",
          uploadDate: "2025-09-19",
        },
        // Market Failure — 5 lectures
        {
          id: "o-micro-market-failure-1",
          title: "Lecture 1",
          topic: "Market Failure",
          lectureNo: 1,
          youtubeId: "Vu-z2R7tC_8",
          uploadDate: "2025-10-03",
        },
        {
          id: "o-micro-market-failure-2",
          title: "Lecture 2",
          topic: "Market Failure",
          lectureNo: 2,
          youtubeId: "sa0qIrj0k3U",
          uploadDate: "2025-10-03",
        },
        {
          id: "o-micro-market-failure-3",
          title: "Lecture 3",
          topic: "Market Failure",
          lectureNo: 3,
          youtubeId: "ptwmg0DIun0",
          uploadDate: "2025-10-07",
        },
        {
          id: "o-micro-market-failure-4",
          title: "Lecture 4",
          topic: "Market Failure",
          lectureNo: 4,
          youtubeId: "_cXtLGWQVwA",
          uploadDate: "2025-10-07",
        },
        {
          id: "o-micro-market-failure-5",
          title: "Lecture 5",
          topic: "Market Failure",
          lectureNo: 5,
          youtubeId: "4xrcNeqKm_4",
          uploadDate: "2025-10-09",
        },
        // Households — 1 lecture
        {
          id: "o-micro-households-1",
          title: "Lecture 1",
          topic: "Households",
          lectureNo: 1,
          youtubeId: "0VqfTctBQiY",
          uploadDate: "2025-11-27",
        },
        // Money & Banking — 1 lecture
        {
          id: "o-micro-money-and-banking-1",
          title: "Lecture 1",
          topic: "Money & Banking",
          lectureNo: 1,
          youtubeId: "NeHJASCFOuo",
          uploadDate: "2025-11-25",
        },
        // Labour Market — 4 lectures
        {
          id: "o-micro-labour-market-1",
          title: "Lecture 1",
          topic: "Labour Market",
          lectureNo: 1,
          youtubeId: "daGPEyr6Ry4",
          uploadDate: "2025-07-19",
        },
        {
          id: "o-micro-labour-market-2",
          title: "Lecture 2",
          topic: "Labour Market",
          lectureNo: 2,
          youtubeId: "Wu99E4geq9Y",
          uploadDate: "2025-07-19",
        },
        {
          id: "o-micro-labour-market-3",
          title: "Lecture 3",
          topic: "Labour Market",
          lectureNo: 3,
          youtubeId: "LeZw8MbxKgo",
          uploadDate: "2025-07-19",
        },
        {
          id: "o-micro-labour-market-4",
          title: "Practice Questions",
          topic: "Labour Market",
          lectureNo: 4,
          youtubeId: "czUTnWR-0RI",
          uploadDate: "2025-07-19",
        },
        // Cost, Revenue & Profits — 2 lectures
        {
          id: "o-micro-cost-revenue-and-profits-1",
          title: "Lecture 1",
          topic: "Cost, Revenue & Profits",
          lectureNo: 1,
          youtubeId: "w9mG66v22Q8",
          uploadDate: "2025-07-20",
        },
        {
          id: "o-micro-cost-revenue-and-profits-2",
          title: "Lecture 2",
          topic: "Cost, Revenue & Profits",
          lectureNo: 2,
          youtubeId: "AkSzVIxlbaE",
          uploadDate: "2025-07-20",
        },
        // Business Growth — 1 lecture
        {
          id: "o-micro-business-growth-1",
          title: "Lecture 1",
          topic: "Business Growth",
          lectureNo: 1,
          youtubeId: "FAgZDvTfNhs",
          uploadDate: "2026-01-25",
        },
        // Market Structures — 1 lecture
        {
          id: "o-micro-market-structures-1",
          title: "Lecture 1",
          topic: "Market Structures",
          lectureNo: 1,
          youtubeId: "5c8UUL7hn-c",
          uploadDate: "2026-01-25",
        },
      ],
    },
    {
      id: "macro",
      title: "Macroeconomics",
      blurb:
        "Inflation, unemployment, trade and exchange rates, with the policy chains examiners reward.",
      lectures: [
        // Inflation — 12 lectures
        {
          id: "o-macro-inflation-1",
          title: "Aggregated Demand Analysis",
          topic: "Inflation",
          lectureNo: 1,
          youtubeId: "fuSXyCgA9k0",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-2",
          title: "Effects of Inflation",
          topic: "Inflation",
          lectureNo: 2,
          youtubeId: "GRLLO0j17DQ",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-3",
          title: "Effects of Inflation",
          topic: "Inflation",
          lectureNo: 3,
          youtubeId: "JciRi__oB3U",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-4",
          title: "Causes of Inflation",
          topic: "Inflation",
          lectureNo: 4,
          youtubeId: "-P3WYL5XxQk",
          uploadDate: "2024-03-04",
        },
        {
          id: "o-macro-inflation-5",
          title: "Causes of Inflation",
          topic: "Inflation",
          lectureNo: 5,
          youtubeId: "fp615oxLiqI",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-6",
          title: "Causes of Inflation",
          topic: "Inflation",
          lectureNo: 6,
          youtubeId: "9TxW7vkdCrY",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-7",
          title: "Inflation, Deflation & Disinflation",
          topic: "Inflation",
          lectureNo: 7,
          youtubeId: "KtQ1jXXVIKU",
          uploadDate: "2024-02-02",
        },
        {
          id: "o-macro-inflation-8",
          title: "Contractionary Fiscal Policy",
          topic: "Inflation",
          lectureNo: 8,
          youtubeId: "lfvpFbQ02ok",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-9",
          title: "Contractionary Monetary Policy",
          topic: "Inflation",
          lectureNo: 9,
          youtubeId: "tNQB_Vid-rM",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-10",
          title: "Supply Side Policy",
          topic: "Inflation",
          lectureNo: 10,
          youtubeId: "nLLxEV0eOwg",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-11",
          title: "Expansionary Fiscal & Monetary Policy",
          topic: "Inflation",
          lectureNo: 11,
          youtubeId: "lohn6aJhohk",
          uploadDate: "2024-03-03",
        },
        {
          id: "o-macro-inflation-12",
          title: "Causes,Effects & Policies",
          topic: "Inflation",
          lectureNo: 12,
          youtubeId: "My5wBnsoEk4",
          uploadDate: "2026-05-08",
        },
        // Retail & Consumer Price Index — 1 lecture
        {
          id: "o-macro-retail-and-consumer-price-index-1",
          title: "Lecture 1",
          topic: "Retail & Consumer Price Index",
          lectureNo: 1,
          youtubeId: "8CI0T4-RRxE",
          uploadDate: "2024-02-13",
        },
        // Unemployment — 2 lectures
        {
          id: "o-macro-unemployment-1",
          title: "Types/Causes of Unemployment",
          topic: "Unemployment",
          lectureNo: 1,
          youtubeId: "3qGx7mU1jIE",
          uploadDate: "2026-03-07",
        },
        {
          id: "o-macro-unemployment-2",
          title: "Policies to solve Unemployment",
          topic: "Unemployment",
          lectureNo: 2,
          youtubeId: "TvpYyU2aS9k",
          uploadDate: "2026-03-07",
        },
        // Population — 1 lecture
        {
          id: "o-macro-population-1",
          title: "Lecture 1",
          topic: "Population",
          lectureNo: 1,
          youtubeId: "0nLUsciQmks",
          uploadDate: "2024-05-23",
        },
        // International Trade — 3 lectures
        {
          id: "o-macro-international-trade-1",
          title: "Introduction to Free Trade",
          topic: "International Trade",
          lectureNo: 1,
          youtubeId: "1knfbSau4yM",
          uploadDate: "2026-02-16",
        },
        {
          id: "o-macro-international-trade-2",
          title: "Multinational Companies",
          topic: "International Trade",
          lectureNo: 2,
          youtubeId: "oYEDaMcxDSg",
          uploadDate: "2026-02-16",
        },
        {
          id: "o-macro-international-trade-3",
          title: "Protectionism Tools",
          topic: "International Trade",
          lectureNo: 3,
          youtubeId: "f5MbtUnIxuY",
          uploadDate: "2026-02-16",
        },
        // Exchange Rate — 5 lectures
        {
          id: "o-macro-exchange-rate-1",
          title: "Lecture 1",
          topic: "Exchange Rate",
          lectureNo: 1,
          youtubeId: "2EKxKuDfO6I",
          uploadDate: "2025-03-12",
        },
        {
          id: "o-macro-exchange-rate-2",
          title: "Lecture 2",
          topic: "Exchange Rate",
          lectureNo: 2,
          youtubeId: "kMDGEfK9IJo",
          uploadDate: "2025-03-12",
        },
        {
          id: "o-macro-exchange-rate-3",
          title: "Lecture 3",
          topic: "Exchange Rate",
          lectureNo: 3,
          youtubeId: "JB-2i_vNRek",
          uploadDate: "2025-03-12",
        },
        {
          id: "o-macro-exchange-rate-4",
          title: "Topical Past Paper Questions",
          topic: "Exchange Rate",
          lectureNo: 4,
          youtubeId: "5i1qRC5azPA",
          uploadDate: "2025-03-12",
        },
        {
          id: "o-macro-exchange-rate-5",
          title: "Topical Past Paper Questions",
          topic: "Exchange Rate",
          lectureNo: 5,
          youtubeId: "-MX8YC_yvds",
          uploadDate: "2025-03-13",
        },
        // Balance of Payment — 4 lectures
        {
          id: "o-macro-balance-of-payment-1",
          title: "Introduction to BOP",
          topic: "Balance of Payment",
          lectureNo: 1,
          youtubeId: "FficHeQLyEY",
          uploadDate: "2026-02-19",
        },
        {
          id: "o-macro-balance-of-payment-2",
          title: "Current Account Causes/Effects",
          topic: "Balance of Payment",
          lectureNo: 2,
          youtubeId: "kuXQwdAoxkE",
          uploadDate: "2026-02-20",
        },
        {
          id: "o-macro-balance-of-payment-3",
          title: "Expenditure Switching Policy",
          topic: "Balance of Payment",
          lectureNo: 3,
          youtubeId: "VeBsdJuRsw0",
          uploadDate: "2026-02-24",
        },
        {
          id: "o-macro-balance-of-payment-4",
          title: "Expenditure Reducing Policy",
          topic: "Balance of Payment",
          lectureNo: 4,
          youtubeId: "4ScRhvq4ULw",
          uploadDate: "2026-02-25",
        },
      ],
    },
    {
      id: "skills",
      title: "Syllabus & Exam Skills",
      blurb:
        "Orientation classes covering the 2281 / 0455 syllabus and the paper pattern.",
      lectures: [
        // Syllabus & Paper Pattern — 2 lectures
        {
          id: "o-skills-syllabus-and-paper-pattern-1",
          title: "Orientation Class for May June 2026",
          topic: "Syllabus & Paper Pattern",
          lectureNo: 1,
          youtubeId: "5ZWhBGGP5ns",
          uploadDate: "2025-08-12",
        },
        {
          id: "o-skills-syllabus-and-paper-pattern-2",
          title: "Lecture 2",
          topic: "Syllabus & Paper Pattern",
          lectureNo: 2,
          youtubeId: "XmSYBoW4uZU",
          uploadDate: "2026-08-27",
        },
      ],
    },
  ],
};

const asLevelGroup: LectureLevelGroup = {
  level: "AS",
  label: "AS Level",
  syllabus: "CAIE 9708",
  blurb:
    "AS foundations — diagrams, elasticities and the macro toolkit, explained step by step.",
  strands: [
    {
      id: "micro",
      title: "Microeconomics",
      blurb:
        "The price system in full: elasticities, price controls, tax incidence and market failure.",
      lectures: [
        // Basic Economic Problem — 5 lectures
        {
          id: "as-micro-basic-economic-problem-1",
          title: "Lecture 1",
          topic: "Basic Economic Problem",
          lectureNo: 1,
          youtubeId: "CY5fKwGuxfU",
          uploadDate: "2024-12-23",
        },
        {
          id: "as-micro-basic-economic-problem-2",
          title: "Lecture 2",
          topic: "Basic Economic Problem",
          lectureNo: 2,
          youtubeId: "ODB6ZpSg_Bs",
          uploadDate: "2024-12-23",
        },
        {
          id: "as-micro-basic-economic-problem-3",
          title: "Lecture 3",
          topic: "Basic Economic Problem",
          lectureNo: 3,
          youtubeId: "_koPy-mA7Cw",
          uploadDate: "2024-12-23",
        },
        {
          id: "as-micro-basic-economic-problem-4",
          title: "Lecture 4",
          topic: "Basic Economic Problem",
          lectureNo: 4,
          youtubeId: "S8tufP6lKrk",
          uploadDate: "2024-12-23",
        },
        {
          id: "as-micro-basic-economic-problem-5",
          title: "Lecture 5",
          topic: "Basic Economic Problem",
          lectureNo: 5,
          youtubeId: "2tuWjfQm1bI",
          uploadDate: "2024-12-23",
        },
        // Demand — 5 lectures
        {
          id: "as-micro-demand-1",
          title: "Lecture 1",
          topic: "Demand",
          lectureNo: 1,
          youtubeId: "0zYUIrWKXpI",
          uploadDate: "2025-08-31",
        },
        {
          id: "as-micro-demand-2",
          title: "Lecture 2",
          topic: "Demand",
          lectureNo: 2,
          youtubeId: "VQC3VqQ_NR0",
          uploadDate: "2025-08-31",
        },
        {
          id: "as-micro-demand-3",
          title: "Lecture 3",
          topic: "Demand",
          lectureNo: 3,
          youtubeId: "4_6yHAF3fqY",
          uploadDate: "2025-08-31",
        },
        {
          id: "as-micro-demand-4",
          title: "Lecture 4",
          topic: "Demand",
          lectureNo: 4,
          youtubeId: "9SiyKPAju3o",
          uploadDate: "2025-08-31",
        },
        {
          id: "as-micro-demand-5",
          title: "Lecture 5",
          topic: "Demand",
          lectureNo: 5,
          youtubeId: "mGd_atfbxwY",
          uploadDate: "2025-08-31",
        },
        // Price Elasticity of Demand — 4 lectures
        {
          id: "as-micro-price-elasticity-of-demand-1",
          title: "Lecture 1",
          topic: "Price Elasticity of Demand",
          lectureNo: 1,
          youtubeId: "-3sW6WBM8Kc",
          uploadDate: "2025-09-02",
        },
        {
          id: "as-micro-price-elasticity-of-demand-2",
          title: "Lecture 2",
          topic: "Price Elasticity of Demand",
          lectureNo: 2,
          youtubeId: "N0eKBxLSWVE",
          uploadDate: "2025-09-02",
        },
        {
          id: "as-micro-price-elasticity-of-demand-3",
          title: "Lecture 3",
          topic: "Price Elasticity of Demand",
          lectureNo: 3,
          youtubeId: "DaX3zOtGDWo",
          uploadDate: "2025-09-02",
        },
        {
          id: "as-micro-price-elasticity-of-demand-4",
          title: "Lecture 4",
          topic: "Price Elasticity of Demand",
          lectureNo: 4,
          youtubeId: "cnr5xvSaoSI",
          uploadDate: "2025-09-02",
        },
        // Income Elasticity of Demand (YED) — 7 lectures
        {
          id: "as-micro-income-elasticity-of-demand-yed-1",
          title: "Lecture 1",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 1,
          youtubeId: "ls6ciurhAyQ",
          uploadDate: "2025-09-23",
        },
        {
          id: "as-micro-income-elasticity-of-demand-yed-2",
          title: "Lecture 2",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 2,
          youtubeId: "l4_GbEXgky4",
          uploadDate: "2025-09-23",
        },
        {
          id: "as-micro-income-elasticity-of-demand-yed-3",
          title: "Lecture 3",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 3,
          youtubeId: "W4eJ6gMzzqE",
          uploadDate: "2025-09-23",
        },
        {
          id: "as-micro-income-elasticity-of-demand-yed-4",
          title: "Lecture 4",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 4,
          youtubeId: "o-CMwpuj5fE",
          uploadDate: "2025-09-23",
        },
        {
          id: "as-micro-income-elasticity-of-demand-yed-5",
          title: "Lecture 5",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 5,
          youtubeId: "SLhsQhY80wQ",
          uploadDate: "2025-09-25",
        },
        {
          id: "as-micro-income-elasticity-of-demand-yed-6",
          title: "Lecture 6",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 6,
          youtubeId: "1QM8eSbq-zg",
          uploadDate: "2025-09-25",
        },
        {
          id: "as-micro-income-elasticity-of-demand-yed-7",
          title: "Lecture 7",
          topic: "Income Elasticity of Demand (YED)",
          lectureNo: 7,
          youtubeId: "948LGB_7Odc",
          uploadDate: "2025-09-30",
        },
        // Cross Elasticity of Demand (XED) — 7 lectures
        {
          id: "as-micro-cross-elasticity-of-demand-xed-1",
          title: "Lecture 1",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 1,
          youtubeId: "fUpzbDp8tGY",
          uploadDate: "2025-10-09",
        },
        {
          id: "as-micro-cross-elasticity-of-demand-xed-2",
          title: "Lecture 2",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 2,
          youtubeId: "GEdqeu8VrSE",
          uploadDate: "2025-10-22",
        },
        {
          id: "as-micro-cross-elasticity-of-demand-xed-3-1",
          title: "Lecture 3.1",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 3,
          youtubeId: "JCjGuolE6yE",
          uploadDate: "2025-10-22",
        },
        {
          id: "as-micro-cross-elasticity-of-demand-xed-3-2",
          title: "Lecture 3.2",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 3,
          youtubeId: "mXM6B1ISYoQ",
          uploadDate: "2025-10-22",
        },
        {
          id: "as-micro-cross-elasticity-of-demand-xed-4",
          title: "Lecture 4",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 4,
          youtubeId: "y6KcJgbWgCw",
          uploadDate: "2025-10-22",
        },
        {
          id: "as-micro-cross-elasticity-of-demand-xed-6",
          title: "Lecture 6",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 6,
          youtubeId: "o_8jizDmVOc",
          uploadDate: "2025-10-24",
        },
        {
          id: "as-micro-cross-elasticity-of-demand-xed-7",
          title: "Lecture 7",
          topic: "Cross Elasticity of Demand (XED)",
          lectureNo: 7,
          youtubeId: "Om1HcsnIIrY",
          uploadDate: "2025-10-26",
        },
        // Supply — 2 lectures
        {
          id: "as-micro-supply-1",
          title: "Lecture 1",
          topic: "Supply",
          lectureNo: 1,
          youtubeId: "TFNSCzMovws",
          uploadDate: "2025-10-27",
        },
        {
          id: "as-micro-supply-2",
          title: "Lecture 2",
          topic: "Supply",
          lectureNo: 2,
          youtubeId: "fV6_gdYgnrY",
          uploadDate: "2025-10-27",
        },
        // Price Elasticity of Supply (PES) — 4 lectures
        {
          id: "as-micro-price-elasticity-of-supply-pes-1",
          title: "Lecture 1",
          topic: "Price Elasticity of Supply (PES)",
          lectureNo: 1,
          youtubeId: "-zn7Woj6uh0",
          uploadDate: "2025-10-30",
        },
        {
          id: "as-micro-price-elasticity-of-supply-pes-2",
          title: "Lecture 2",
          topic: "Price Elasticity of Supply (PES)",
          lectureNo: 2,
          youtubeId: "2uoBQDbSmUg",
          uploadDate: "2025-10-30",
        },
        {
          id: "as-micro-price-elasticity-of-supply-pes-3",
          title: "Lecture 3",
          topic: "Price Elasticity of Supply (PES)",
          lectureNo: 3,
          youtubeId: "dJIpfUTw4F4",
          uploadDate: "2025-10-30",
        },
        {
          id: "as-micro-price-elasticity-of-supply-pes-4",
          title: "Lecture 4",
          topic: "Price Elasticity of Supply (PES)",
          lectureNo: 4,
          youtubeId: "gYockPiW-8M",
          uploadDate: "2025-11-09",
        },
        // Market — 9 lectures
        {
          id: "as-micro-market-1",
          title: "Equilibrium & Disequilibrium",
          topic: "Market",
          lectureNo: 1,
          youtubeId: "APCy_ifTyNY",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-2",
          title: "Price Controls",
          topic: "Market",
          lectureNo: 2,
          youtubeId: "Mp3Kd4NgOVw",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-3",
          title: "Price Controls",
          topic: "Market",
          lectureNo: 3,
          youtubeId: "BL-rpF7QeJc",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-4",
          title: "Price Controls",
          topic: "Market",
          lectureNo: 4,
          youtubeId: "2MEBAWdV76Q",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-5",
          title: "Changes in Market",
          topic: "Market",
          lectureNo: 5,
          youtubeId: "3QVixqqLbU4",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-6",
          title: "Changes in Market",
          topic: "Market",
          lectureNo: 6,
          youtubeId: "jv-E-PkOe5Y",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-7",
          title: "Incidence of Indirect Tax",
          topic: "Market",
          lectureNo: 7,
          youtubeId: "lujFDZZw4fc",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-8",
          title: "Incidence of Indirect Tax",
          topic: "Market",
          lectureNo: 8,
          youtubeId: "V8_bNtimMo4",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-9",
          title: "Incidence of Subsidy",
          topic: "Market",
          lectureNo: 9,
          youtubeId: "ekWic7MrxUI",
          uploadDate: "2025-07-21",
        },
        // Consumer Surplus — 2 lectures
        {
          id: "as-micro-consumer-surplus-1",
          title: "Lecture 1",
          topic: "Consumer Surplus",
          lectureNo: 1,
          youtubeId: "JtyDAn9JZzI",
          uploadDate: "2025-07-20",
        },
        {
          id: "as-micro-consumer-surplus-2",
          title: "Lecture 2",
          topic: "Consumer Surplus",
          lectureNo: 2,
          youtubeId: "OrbTnJtxKs4",
          uploadDate: "2025-07-20",
        },
        // Producer Surplus — 1 lecture
        {
          id: "as-micro-producer-surplus-1",
          title: "Lecture 1",
          topic: "Producer Surplus",
          lectureNo: 1,
          youtubeId: "0m2uRr_YPks",
          uploadDate: "2025-07-21",
        },
        // Market Failure — 3 lectures
        {
          id: "as-micro-market-failure-1",
          title: "Social Costs & Benefits",
          topic: "Market Failure",
          lectureNo: 1,
          youtubeId: "I-YvLn0oZw0",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-failure-2",
          title: "Type of Goods",
          topic: "Market Failure",
          lectureNo: 2,
          youtubeId: "iuQzybV8mcY",
          uploadDate: "2025-07-21",
        },
        {
          id: "as-micro-market-failure-3",
          title: "Policies to deal with issue of goods",
          topic: "Market Failure",
          lectureNo: 3,
          youtubeId: "S26el4B9Eoc",
          uploadDate: "2025-07-21",
        },
        // Income/Wealth Inequality & Gini Coefficient — 2 lectures
        {
          id: "as-micro-income-wealth-inequality-and-gini-coefficient-1",
          title: "Updated Syllabus/Paper Pattern",
          topic: "Income/Wealth Inequality & Gini Coefficient",
          lectureNo: 1,
          youtubeId: "AS9HW-Psel4",
          uploadDate: "2024-12-18",
        },
        {
          id: "as-micro-income-wealth-inequality-and-gini-coefficient-2",
          title: "How to solve 8 & 12 marks question",
          topic: "Income/Wealth Inequality & Gini Coefficient",
          lectureNo: 2,
          youtubeId: "PrOyXRz2fXc",
          uploadDate: "2024-12-23",
        },
      ],
    },
    {
      id: "macro",
      title: "Macroeconomics",
      blurb:
        "Circular flow, national income, inflation and the balance of payments at AS depth.",
      lectures: [
        // Circular Flow of Income & Wealth — 3 lectures
        {
          id: "as-macro-circular-flow-of-income-and-wealth-1",
          title: "Lecture 1",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 1,
          youtubeId: "6v35FUaTKz4",
          uploadDate: "2024-02-09",
        },
        {
          id: "as-macro-circular-flow-of-income-and-wealth-2",
          title: "Lecture 2",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 2,
          youtubeId: "l4_yCzD4dWU",
          uploadDate: "2024-02-09",
        },
        {
          id: "as-macro-circular-flow-of-income-and-wealth-3",
          title: "Topical 8 Marker Question",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 3,
          youtubeId: "QYmAa8pmEbc",
          uploadDate: "2024-02-10",
        },
        // National Income — 1 lecture
        {
          id: "as-macro-national-income-1",
          title: "How to Calculate National Income/Purpose of National Income",
          topic: "National Income",
          lectureNo: 1,
          youtubeId: "ZgIN5bEwieY",
          uploadDate: "2026-04-28",
        },
        // Inflation — 10 lectures
        {
          id: "as-macro-inflation-1",
          title: "Aggregated Demand & Supply",
          topic: "Inflation",
          lectureNo: 1,
          youtubeId: "6Hp3elhs0Zo",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-2",
          title: "Effects of Inflation",
          topic: "Inflation",
          lectureNo: 2,
          youtubeId: "Ms5UyZ2PuWI",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-3",
          title: "Effects of Inflation",
          topic: "Inflation",
          lectureNo: 3,
          youtubeId: "5Ne0pr6IFEM",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-4",
          title: "Causes of Inflation - Demand Pull Inflation",
          topic: "Inflation",
          lectureNo: 4,
          youtubeId: "V1HNUj-IM4E",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-5",
          title: "Causes of Inflation - Cost Push Inflation",
          topic: "Inflation",
          lectureNo: 5,
          youtubeId: "XUzN0IiT8uo",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-6",
          title: "Causes of Inflation - Monetary Inflation",
          topic: "Inflation",
          lectureNo: 6,
          youtubeId: "R-keDaO1QJk",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-7",
          title: "Inflation, Disinflation & Deflation",
          topic: "Inflation",
          lectureNo: 7,
          youtubeId: "leo7d61_QXI",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-8",
          title: "Fiscal & Monetary Policy of Inflation",
          topic: "Inflation",
          lectureNo: 8,
          youtubeId: "D4IgYlzoEXs",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-9",
          title: "Supply Side Policy",
          topic: "Inflation",
          lectureNo: 9,
          youtubeId: "cK8CPb48aU4",
          uploadDate: "2026-01-26",
        },
        {
          id: "as-macro-inflation-10",
          title: "Fiscal & Monetary Policy for issue of Deflation",
          topic: "Inflation",
          lectureNo: 10,
          youtubeId: "Ha9FhVEnOkc",
          uploadDate: "2026-01-26",
        },
        // Unemployment — 2 lectures
        {
          id: "as-macro-unemployment-1",
          title: "Lecture 1",
          topic: "Unemployment",
          lectureNo: 1,
          youtubeId: "YTzXoUna8hs",
          uploadDate: "2025-07-23",
        },
        {
          id: "as-macro-unemployment-2",
          title: "Lecture 2",
          topic: "Unemployment",
          lectureNo: 2,
          youtubeId: "FabA2FNk0Ew",
          uploadDate: "2025-07-23",
        },
        // Economic Growth — 2 lectures
        {
          id: "as-macro-economic-growth-1",
          title: "Lecture 1",
          topic: "Economic Growth",
          lectureNo: 1,
          youtubeId: "AGWyDlT5Ga8",
          uploadDate: "2025-07-24",
        },
        {
          id: "as-macro-economic-growth-2",
          title: "Lecture 2",
          topic: "Economic Growth",
          lectureNo: 2,
          youtubeId: "yUr5C24EmS0",
          uploadDate: "2025-07-24",
        },
        // International Trade — 3 lectures
        {
          id: "as-macro-international-trade-1",
          title: "Advantages & Disadvtanages of Trade",
          topic: "International Trade",
          lectureNo: 1,
          youtubeId: "P3tvfel_Bx4",
          uploadDate: "2026-01-28",
        },
        {
          id: "as-macro-international-trade-2",
          title: "Absolute & Comparative Advantage",
          topic: "International Trade",
          lectureNo: 2,
          youtubeId: "87O-vq_cSX8",
          uploadDate: "2026-01-28",
        },
        {
          id: "as-macro-international-trade-3",
          title: "Protectionism Tools",
          topic: "International Trade",
          lectureNo: 3,
          youtubeId: "xjfOfom5vPY",
          uploadDate: "2026-01-28",
        },
        // Terms of Trade — 1 lecture
        {
          id: "as-macro-terms-of-trade-1",
          title: "Lecture 1",
          topic: "Terms of Trade",
          lectureNo: 1,
          youtubeId: "2sdPAE7RHco",
          uploadDate: "2025-07-23",
        },
        // Exchange Rate — 2 lectures
        {
          id: "as-macro-exchange-rate-1",
          title: "Lecture 1",
          topic: "Exchange Rate",
          lectureNo: 1,
          youtubeId: "IldpJjxMqE8",
          uploadDate: "2025-07-23",
        },
        {
          id: "as-macro-exchange-rate-2",
          title: "Lecture 2",
          topic: "Exchange Rate",
          lectureNo: 2,
          youtubeId: "mPdQ8a0uRr0",
          uploadDate: "2025-07-23",
        },
        // Balance of Payment — 5 lectures
        {
          id: "as-macro-balance-of-payment-1",
          title: "Lecture 1",
          topic: "Balance of Payment",
          lectureNo: 1,
          youtubeId: "HEmFHX0EiPY",
          uploadDate: "2025-07-22",
        },
        {
          id: "as-macro-balance-of-payment-2",
          title: "Lecture 2",
          topic: "Balance of Payment",
          lectureNo: 2,
          youtubeId: "g8PVuKqi7R0",
          uploadDate: "2025-07-22",
        },
        {
          id: "as-macro-balance-of-payment-3",
          title: "Lecture 3",
          topic: "Balance of Payment",
          lectureNo: 3,
          youtubeId: "4glrjQCnGVA",
          uploadDate: "2025-07-23",
        },
        {
          id: "as-macro-balance-of-payment-4",
          title: "Lecture 4",
          topic: "Balance of Payment",
          lectureNo: 4,
          youtubeId: "sOO4XjsMzUE",
          uploadDate: "2025-07-23",
        },
        {
          id: "as-macro-balance-of-payment-5",
          title: "Lecture 5",
          topic: "Balance of Payment",
          lectureNo: 5,
          youtubeId: "6to9X6POaPM",
          uploadDate: "2025-07-23",
        },
      ],
    },
  ],
};

const a2LevelGroup: LectureLevelGroup = {
  level: "A2",
  label: "A2 Level",
  syllabus: "CAIE 9708",
  blurb:
    "A2 stretch topics — theory-heavy micro and the evaluation-friendly macro chains.",
  strands: [
    {
      id: "micro",
      title: "Microeconomics",
      blurb:
        "Utility and indifference curves, cost theory, market structures and the labour market.",
      lectures: [
        // Theory of Demand (Utility) — 4 lectures
        {
          id: "a2-micro-theory-of-demand-utility-1",
          title: "Lecture 1",
          topic: "Theory of Demand (Utility)",
          lectureNo: 1,
          youtubeId: "j7rjGWT01HA",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-theory-of-demand-utility-2",
          title: "Lecture 2",
          topic: "Theory of Demand (Utility)",
          lectureNo: 2,
          youtubeId: "aME8xzHhJG4",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-theory-of-demand-utility-3",
          title: "Lecture 3",
          topic: "Theory of Demand (Utility)",
          lectureNo: 3,
          youtubeId: "lwi7pDor_s4",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-theory-of-demand-utility-4",
          title: "Lecture 4",
          topic: "Theory of Demand (Utility)",
          lectureNo: 4,
          youtubeId: "8V2i0sxAPKE",
          uploadDate: "2025-07-26",
        },
        // Indifference Curve & Budget Line — 8 lectures
        {
          id: "a2-micro-indifference-curve-and-budget-line-1",
          title: "Lecture 1",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 1,
          youtubeId: "nGt8WdO6O8k",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-2",
          title: "Lecture 2",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 2,
          youtubeId: "Ibw-WrEDNe0",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-3",
          title: "Lecture 3",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 3,
          youtubeId: "SiA4nJNH5ZE",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-4",
          title: "Lecture 4",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 4,
          youtubeId: "9ZYQOrnp95k",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-5",
          title: "Lecture 5",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 5,
          youtubeId: "gNRKOVv1G2M",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-6",
          title: "Lecture 6",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 6,
          youtubeId: "Ez0xI_xXyOY",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-7",
          title: "Lecture 7",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 7,
          youtubeId: "DPOP_0n64Ks",
          uploadDate: "2025-07-26",
        },
        {
          id: "a2-micro-indifference-curve-and-budget-line-8",
          title: "Lecture 8",
          topic: "Indifference Curve & Budget Line",
          lectureNo: 8,
          youtubeId: "pc4fMpGTg2I",
          uploadDate: "2025-07-27",
        },
        // Theory of Supply — 3 lectures
        {
          id: "a2-micro-theory-of-supply-1",
          title: "Shortrun & Longrun production",
          topic: "Theory of Supply",
          lectureNo: 1,
          youtubeId: "sCx2t69aDHg",
          uploadDate: "2025-07-28",
        },
        {
          id: "a2-micro-theory-of-supply-2",
          title: "Shortrun & Longrun production",
          topic: "Theory of Supply",
          lectureNo: 2,
          youtubeId: "-O4S5vSLRKE",
          uploadDate: "2025-07-28",
        },
        {
          id: "a2-micro-theory-of-supply-5",
          title: "Shortrun & Longrun production",
          topic: "Theory of Supply",
          lectureNo: 5,
          youtubeId: "Sfj1s5yzHOg",
          uploadDate: "2025-07-28",
        },
        // Efficiency — 2 lectures
        {
          id: "a2-micro-efficiency-1",
          title: "Lecture 1",
          topic: "Efficiency",
          lectureNo: 1,
          youtubeId: "V8WBeJgNFQI",
          uploadDate: "2025-09-30",
        },
        {
          id: "a2-micro-efficiency-2",
          title: "Lecture 2",
          topic: "Efficiency",
          lectureNo: 2,
          youtubeId: "ILBBlmasjAg",
          uploadDate: "2025-09-30",
        },
        // Perfect Market Structures — 4 lectures
        {
          id: "a2-micro-perfect-market-structures-1",
          title: "Perfect Competition",
          topic: "Perfect Market Structures",
          lectureNo: 1,
          youtubeId: "bTJj7mbCcHc",
          uploadDate: "2025-01-14",
        },
        {
          id: "a2-micro-perfect-market-structures-2",
          title: "Perfect Competition",
          topic: "Perfect Market Structures",
          lectureNo: 2,
          youtubeId: "VMHoPUbRYsE",
          uploadDate: "2025-01-14",
        },
        {
          id: "a2-micro-perfect-market-structures-3",
          title: "Perfect Competition",
          topic: "Perfect Market Structures",
          lectureNo: 3,
          youtubeId: "hjuqFJi1574",
          uploadDate: "2025-01-14",
        },
        {
          id: "a2-micro-perfect-market-structures-4",
          title: "Perfect Competition",
          topic: "Perfect Market Structures",
          lectureNo: 4,
          youtubeId: "N_n-DEutMcQ",
          uploadDate: "2025-01-14",
        },
        // Imperfect Market Structures — 3 lectures
        {
          id: "a2-micro-imperfect-market-structures-1",
          title: "Lecture 1",
          topic: "Imperfect Market Structures",
          lectureNo: 1,
          youtubeId: "BoOBE09ueTs",
          uploadDate: "2025-11-27",
        },
        {
          id: "a2-micro-imperfect-market-structures-7",
          title: "Monopolistic Competition",
          topic: "Imperfect Market Structures",
          lectureNo: 7,
          youtubeId: "VcZ3uSRfMyQ",
          uploadDate: "2025-12-12",
        },
        {
          id: "a2-micro-imperfect-market-structures-10",
          title: "Oligopoly",
          topic: "Imperfect Market Structures",
          lectureNo: 10,
          youtubeId: "yJSSyf2gQpo",
          uploadDate: "2025-12-16",
        },
        // Market Failure — 6 lectures
        {
          id: "a2-micro-market-failure-1",
          title: "Lecture 1",
          topic: "Market Failure",
          lectureNo: 1,
          youtubeId: "r3pOvSZAb5g",
          uploadDate: "2024-12-25",
        },
        {
          id: "a2-micro-market-failure-2",
          title: "Lecture 2",
          topic: "Market Failure",
          lectureNo: 2,
          youtubeId: "ZaMTz5q2oYk",
          uploadDate: "2024-12-25",
        },
        {
          id: "a2-micro-market-failure-3",
          title: "Lecture 3",
          topic: "Market Failure",
          lectureNo: 3,
          youtubeId: "1U1QP9lR37U",
          uploadDate: "2024-12-25",
        },
        {
          id: "a2-micro-market-failure-4",
          title: "Lecture 4",
          topic: "Market Failure",
          lectureNo: 4,
          youtubeId: "6BdNr6qXCxk",
          uploadDate: "2024-12-25",
        },
        {
          id: "a2-micro-market-failure-5",
          title: "Lecture 5",
          topic: "Market Failure",
          lectureNo: 5,
          youtubeId: "UuALJf6TQKA",
          uploadDate: "2024-12-25",
        },
        {
          id: "a2-micro-market-failure-6",
          title: "Lecture 6",
          topic: "Market Failure",
          lectureNo: 6,
          youtubeId: "iJjJUW-m0GM",
          uploadDate: "2024-12-25",
        },
        // Labour Market — 4 lectures
        {
          id: "a2-micro-labour-market-1",
          title: "Wage Determination",
          topic: "Labour Market",
          lectureNo: 1,
          youtubeId: "UVrrplmG7Ek",
          uploadDate: "2025-03-08",
        },
        {
          id: "a2-micro-labour-market-2",
          title: "Perfect Labour Market Structure",
          topic: "Labour Market",
          lectureNo: 2,
          youtubeId: "_gbpcQR47sI",
          uploadDate: "2025-03-08",
        },
        {
          id: "a2-micro-labour-market-3",
          title: "Imperfect Labour Market Structure",
          topic: "Labour Market",
          lectureNo: 3,
          youtubeId: "phAyUHSoxHE",
          uploadDate: "2025-03-11",
        },
        {
          id: "a2-micro-labour-market-4",
          title: "Wage Differntials",
          topic: "Labour Market",
          lectureNo: 4,
          youtubeId: "U1o5Pps1wlc",
          uploadDate: "2025-03-11",
        },
      ],
    },
    {
      id: "macro",
      title: "Macroeconomics",
      blurb:
        "Circular flow, national income accounting and development economics.",
      lectures: [
        // Circular Flow of Income & Wealth — 5 lectures
        {
          id: "a2-macro-circular-flow-of-income-and-wealth-1",
          title: "Lecture 1",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 1,
          youtubeId: "1nn0DFXjEZs",
          uploadDate: "2025-01-19",
        },
        {
          id: "a2-macro-circular-flow-of-income-and-wealth-2",
          title: "Lecture 2",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 2,
          youtubeId: "8qyHqV6-8PE",
          uploadDate: "2025-01-20",
        },
        {
          id: "a2-macro-circular-flow-of-income-and-wealth-3",
          title: "Lecture 3",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 3,
          youtubeId: "OqtYTk3R7zA",
          uploadDate: "2025-01-20",
        },
        {
          id: "a2-macro-circular-flow-of-income-and-wealth-4",
          title: "Lecture 4",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 4,
          youtubeId: "0Enna969Lqo",
          uploadDate: "2025-01-20",
        },
        {
          id: "a2-macro-circular-flow-of-income-and-wealth-5",
          title: "Lecture 5",
          topic: "Circular Flow of Income & Wealth",
          lectureNo: 5,
          youtubeId: "Fb_lFeZ2MP8",
          uploadDate: "2025-01-20",
        },
        // National Income — 4 lectures
        {
          id: "a2-macro-national-income-1",
          title: "How to calculate & measure NY",
          topic: "National Income",
          lectureNo: 1,
          youtubeId: "biuVNguhnjg",
          uploadDate: "2025-03-03",
        },
        {
          id: "a2-macro-national-income-2",
          title: "Measurement of National Income",
          topic: "National Income",
          lectureNo: 2,
          youtubeId: "AN6xe76wEJk",
          uploadDate: "2025-03-04",
        },
        {
          id: "a2-macro-national-income-3",
          title: "Measurement of National Income",
          topic: "National Income",
          lectureNo: 3,
          youtubeId: "qOkgjmid5q0",
          uploadDate: "2025-03-06",
        },
        {
          id: "a2-macro-national-income-4",
          title: "Lecture 4",
          topic: "National Income",
          lectureNo: 4,
          youtubeId: "JP8df16cK10",
          uploadDate: "2025-03-07",
        },
        // Balance of Payment — 3 lectures
        {
          id: "a2-macro-balance-of-payment-1",
          title: "Lecture 1",
          topic: "Balance of Payment",
          lectureNo: 1,
          youtubeId: "aiiaiDWl1Xg",
          uploadDate: "2025-03-12",
        },
        {
          id: "a2-macro-balance-of-payment-2",
          title: "Lecture 2",
          topic: "Balance of Payment",
          lectureNo: 2,
          youtubeId: "WJnT2uSA9qM",
          uploadDate: "2025-03-12",
        },
        {
          id: "a2-macro-balance-of-payment-3",
          title: "Lecture 3",
          topic: "Balance of Payment",
          lectureNo: 3,
          youtubeId: "IbofJb1YWao",
          uploadDate: "2025-03-12",
        },
        // Developed & Developing Economy — 2 lectures
        {
          id: "a2-macro-developed-and-developing-economy-1",
          title: "Lecture 1",
          topic: "Developed & Developing Economy",
          lectureNo: 1,
          youtubeId: "J_opbhr7xeU",
          uploadDate: "2024-05-13",
        },
        {
          id: "a2-macro-developed-and-developing-economy-2",
          title: "Lecture 2",
          topic: "Developed & Developing Economy",
          lectureNo: 2,
          youtubeId: "clQnxYyDsf4",
          uploadDate: "2024-05-14",
        },
      ],
    },
  ],
};

/** Menu order on the site: O Level → AS Level → A2 Level. */
export const recordedLectureGroups: LectureLevelGroup[] = [
  oLevelGroup,
  asLevelGroup,
  a2LevelGroup,
];

export const recordedLecturesByLevel: Record<CourseLevel, LectureLevelGroup> = {
  O: oLevelGroup,
  AS: asLevelGroup,
  A2: a2LevelGroup,
};

export function lectureCount(group: LectureLevelGroup): number {
  return group.strands.reduce((n, s) => n + s.lectures.length, 0);
}

export const totalRecordedLectures = recordedLectureGroups.reduce(
  (n, g) => n + lectureCount(g),
  0
);
