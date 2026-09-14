export type BlogBodyBlock = {
  type: "p" | "h2" | "quote" | "callout";
  text: string;
};

export type BlogCategory =
  | "Study Guide"
  | "Exam Technique"
  | "Concept Explainer"
  | "O Level"
  | "Tuition & Learning"
  | "Exam Boards"
  | "Exam Preparation"
  | "Exam Tips"
  | "Concepts"
  | "Past Papers"
  | "News";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  excerpt: string;
  cover: string;
  date: string;
  readingTime: string;
  featured?: boolean;
  keywords?: string[];
  body: BlogBodyBlock[];
};
