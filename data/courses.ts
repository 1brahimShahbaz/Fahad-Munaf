export type CourseLevel = "AS" | "A2" | "O";

export type CourseContent = {
  level: CourseLevel;
  slug: string;
  syllabus: string;
  badgeLabel: string;
  badgeSubLabel: string;
  duration: string;
  format: string;
  start: string;
  headline: string;
  subhead: string;
  description: string;
  heroImage: string;
  ctaTitle: string;
  ctaSubhead: string;
};

export const courses: Record<CourseLevel, CourseContent> = {
  AS: {
    level: "AS",
    slug: "as-level",
    syllabus: "CAIE 9708",
    badgeLabel: "AS LEVEL",
    badgeSubLabel: "CAIE 9708",
    duration: "9 Months",
    format: "Online + Recorded",
    start: "Now enrolling",
    headline: "AS Level Economics with",
    subhead:
      "Master the CAIE 9708 AS Level Economics syllabus — build a solid analytical foundation, perfect your diagrams, and walk into Papers 1 & 2 exam-ready.",
    description:
      "A complete 9-month walkthrough of the CAIE 9708 AS Level Economics syllabus — from the basic economic problem to elasticities, market failure and macroeconomic indicators. Every concept is built from intuition before a single formula, with live online classes, recorded backups and a full notes pack. Ideal for students across Karachi and Pakistan targeting A and A* in AS Papers 1 and 2.",
    heroImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Ready to start AS Economics?",
    ctaSubhead:
      "Join the May/June 2027 session — limited seats. Live classes, recorded backups and a full notes pack.",
  },
  A2: {
    level: "A2",
    slug: "a2-level",
    syllabus: "CAIE 9708",
    badgeLabel: "A2 LEVEL",
    badgeSubLabel: "CAIE 9708",
    duration: "9 Months",
    format: "Online + Recorded",
    start: "Now enrolling",
    headline: "A2 Level Economics with",
    subhead:
      "Take CAIE 9708 A2 Level Economics from A to A* — sharpen evaluation, drill the 25-mark essay, and master Papers 3 & 4.",
    description:
      "Advanced A2 Level microeconomic theory, macroeconomic policy and international economics for CAIE 9708 — built around Cambridge mark schemes and examiner reports. Weekly past-paper marking and personalised feedback turn solid understanding into A* answers in Papers 3 and 4. Live online tuition for students in Karachi and across Pakistan.",
    heroImage:
      "https://images.unsplash.com/photo-1543286386-2e659306cd6c?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Ready to push from A to A*?",
    ctaSubhead:
      "Join the May/June 2027 A2 session — small batches, intensive past-paper drilling.",
  },
  O: {
    level: "O",
    slug: "o-level",
    syllabus: "CAIE 2281",
    badgeLabel: "O LEVEL",
    badgeSubLabel: "CAIE 2281",
    duration: "12 Months",
    format: "Online + Recorded",
    start: "Now enrolling",
    headline: "O Level Economics with",
    subhead:
      "Start CAIE 2281 O Level Economics the right way — clear micro and macro foundations and the study habits that produce A* students at A Level.",
    description:
      "A patient, structured introduction to O Level Economics for CAIE 2281 — every topic taught with worked examples, real-world stories and printable revision sheets. Live online and in-person classes in Karachi build the strong micro and macro fundamentals that set students up for AS and A2 success.",
    heroImage:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1400&q=80",
    ctaTitle: "Ready to start O Level Economics?",
    ctaSubhead:
      "Join the May/June 2027 O Level batch — friendly pace, strong fundamentals.",
  },
};
