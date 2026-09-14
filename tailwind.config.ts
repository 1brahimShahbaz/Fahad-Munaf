import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
        lg: "3rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      /**
       * Palette sampled from the wordmark (`public/images/fmp-logo.png`):
       * gold #F8A830 and navy #283060 are the two logo inks.
       */
      colors: {
        navy: {
          900: "#1B2145",
          700: "#283060", // logo navy
          500: "#3B4780",
        },
        gold: {
          // 700 is the only gold that clears 4.5:1 on white — use it for body
          // links and small text on light backgrounds; 500 is for fills,
          // icons and text on navy.
          700: "#A66300",
          500: "#F8A830", // logo gold
          300: "#FBC470",
        },
        cream: {
          50: "#FFFAF2",
        },
        /**
         * The single light background for every non-dark section. Change this
         * one value to re-tone the whole site — see `bg-surface` usage.
         * White cards and inputs sit on top of it, so it must stay slightly
         * off-white or they stop reading as raised.
         */
        surface: "#FFFAF2",
        ink: {
          900: "#131834",
        },
        success: "#16A34A",
        whatsapp: "#25D366",
        gray: {
          50: "#F8F9FB",
          200: "#E5E7EB",
          500: "#6B7280",
        },
      },
      /**
       * "Anthropic Sans" leads every stack by request. It has no public
       * webfont, so it only applies where it is installed locally; the
       * `--font-*` entry after it is what actually loads for everyone else.
       */
      fontFamily: {
        display: [
          "Anthropic Sans",
          "var(--font-display)",
          "system-ui",
          "sans-serif",
        ],
        inter: [
          "Anthropic Sans",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
        space: [
          "Anthropic Sans",
          "var(--font-space-grotesk)",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          "Anthropic Sans",
          "var(--font-inter)",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        eyebrow: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.12em" }],
      },
      letterSpacing: {
        eyebrow: "0.12em",
        wider2: "0.08em",
      },
      boxShadow: {
        "card-rest":
          "0 1px 2px rgba(15,23,42,0.04), 0 4px 12px rgba(15,23,42,0.04)",
        "card-hover": "0 8px 30px rgba(27,33,69,0.12)",
        "header-scrolled": "0 4px 24px rgba(27,33,69,0.08)",
        "cta-glow": "0 12px 32px rgba(248,168,48,0.35)",
        "cta-glow-sm": "0 6px 18px rgba(248,168,48,0.28)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "gold-paper":
          "radial-gradient(ellipse at top, rgba(248,168,48,0.06), transparent 60%)",
        "diag-gold":
          "repeating-linear-gradient(45deg, rgba(248,168,48,0.06) 0 1px, transparent 1px 18px)",
        "grid-gold":
          "linear-gradient(rgba(248,168,48,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(248,168,48,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.55" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "btn-ripple": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "80%": { transform: "scale(1.35)", opacity: "0.35" },
          "100%": { transform: "scale(1.5)", opacity: "0" },
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "float-up-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "talk-dock-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.94)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 600ms ease-out both",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "talk-dock-in": "talk-dock-in 260ms cubic-bezier(0.16,1,0.3,1) both",
        "float-up": "float-up 5s ease-in-out infinite",
        "float-up-slow": "float-up-slow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
