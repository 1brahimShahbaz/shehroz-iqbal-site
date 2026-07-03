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
      colors: {
        // Deep ocean blue — dark backgrounds, footer, headings (matches logo).
        navy: {
          900: "#0A2740",
          700: "#12466E",
          500: "#1C6BAA",
        },
        // Brand accent — red. Used as fills/highlights with white text;
        // red text sits on dark (navy) backgrounds. (token name kept as
        // `gold` so existing bg-/border-/ring-gold classes keep working.)
        gold: {
          500: "#DC2626",
          300: "#EF4444",
        },
        // Cool off-white — airy section backgrounds (was warm cream).
        cream: {
          50: "#EEF6FC",
        },
        ink: {
          900: "#0F172A",
        },
        success: "#16A34A",
        whatsapp: "#25D366",
        gray: {
          50: "#F8F9FB",
          200: "#E5E7EB",
          500: "#6B7280",
        },
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)", "Georgia", "serif"],
        inter: ["var(--font-inter)", "system-ui", "sans-serif"],
        space: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
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
        "card-hover": "0 8px 30px rgba(10,39,64,0.12)",
        "header-scrolled": "0 4px 24px rgba(10,39,64,0.08)",
        "cta-glow": "0 12px 32px rgba(220,38,38,0.45)",
        "cta-glow-sm": "0 6px 18px rgba(220,38,38,0.38)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "gold-paper":
          "radial-gradient(ellipse at top, rgba(30,143,206,0.06), transparent 60%)",
        "diag-gold":
          "repeating-linear-gradient(45deg, rgba(30,143,206,0.06) 0 1px, transparent 1px 18px)",
        "grid-gold":
          "linear-gradient(rgba(30,143,206,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(30,143,206,0.08) 1px, transparent 1px)",
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
      },
      animation: {
        "fade-up": "fade-up 600ms ease-out both",
        "pulse-ring": "pulse-ring 2s ease-out infinite",
        "float-up": "float-up 5s ease-in-out infinite",
        "float-up-slow": "float-up-slow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
