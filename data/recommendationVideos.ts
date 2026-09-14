/** Student recommendation clips (About page carousel). Paths are under `public/videos/recommendations/`. */

export type RecommendationVideo = {
  id: string;
  src: string;
};

export const recommendationVideos: RecommendationVideo[] = [
  { id: "r1", src: "/videos/recommendations/reco1.mp4" },
  { id: "r2", src: "/videos/recommendations/reco2.mp4" },
  { id: "r3", src: "/videos/recommendations/reco3.mp4" },
  { id: "r4", src: "/videos/recommendations/reco4.mp4" },
  { id: "r5", src: "/videos/recommendations/reco5.mp4" },
];
