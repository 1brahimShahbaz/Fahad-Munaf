"use client";

import { ANALYTICS_ENABLED, GA_ID } from "./constants";

type GtagEventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js" | "set",
      action: string,
      params?: GtagEventParams
    ) => void;
  }
}

export type GAEventName =
  | "register_click"
  | "whatsapp_click"
  | "talk_dock_open"
  | "lecture_play"
  | "youtube_click"
  | "contact_submit"
  | "register_submit"
  | "blog_share";

export function trackEvent(name: GAEventName, params: GtagEventParams = {}) {
  if (!ANALYTICS_ENABLED || !GA_ID) return;
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}
