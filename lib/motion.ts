/**
 * framer-motion presets.
 *
 * Scroll reveals no longer use framer-motion — see `lib/reveal.ts` (shared
 * IntersectionObserver + CSS transitions). What's left here is only for the
 * animated ecosystem diagram on /about, which is the one place a physics
 * library still earns its bytes.
 */

/** Entrance easing — decelerate into place (ease-out). Matches CSS `ease-smooth`. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
