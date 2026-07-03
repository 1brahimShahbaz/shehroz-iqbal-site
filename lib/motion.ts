export type AnimateDirection = "up" | "down" | "left" | "right" | "fade";

/**
 * Cycle directions so sections feel varied as you scroll.
 * No "down" entries — content moving against the scroll direction reads as jumpy.
 */
export const SECTION_DIRECTION_CYCLE: AnimateDirection[] = [
  "up",
  "right",
  "left",
  "up",
  "fade",
  "up",
];

export function directionAt(index: number): AnimateDirection {
  return SECTION_DIRECTION_CYCLE[index % SECTION_DIRECTION_CYCLE.length];
}

/** Entrance easing — decelerate into place (ease-out). Matches CSS `ease-smooth`. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/**
 * Section reveals are "complex" transitions — kept under the 500ms ceiling so
 * they read as crisp rather than sluggish (UX guideline: ≤400ms ideal).
 */
export const SECTION_TRANSITION = {
  duration: 0.5,
  ease: EASE_OUT,
} as const;

export const STAGGER_TRANSITION = {
  duration: 0.45,
  ease: EASE_OUT,
} as const;

/**
 * Spring preset for entrances that benefit from a touch of physics
 * (cards, list items). Critically-ish damped — settles without bounce.
 */
export const SPRING = {
  type: "spring",
  stiffness: 230,
  damping: 26,
  mass: 0.9,
} as const;

/** Snappy press feedback for buttons and tappable cards */
export const TAP_SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 28,
} as const;

export const CARD_HOVER = {
  y: -6,
  transition: { duration: 0.28, ease: EASE_OUT },
} as const;

export const STAGGER_ITEM = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...STAGGER_TRANSITION, type: "spring", stiffness: 260, damping: 24 },
  },
} as const;

export const TEXT_REVEAL_CONTAINER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.04 },
  },
} as const;

export const TEXT_REVEAL_ITEM = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_OUT },
  },
} as const;

/**
 * Trigger as soon as a sliver of the section enters the viewport — the
 * animation is already underway by the time the user can see it, which
 * reads as smooth instead of content visibly "popping" mid-screen.
 */
export const VIEWPORT = {
  once: true,
  amount: 0.08,
  margin: "0px",
} as const;

/**
 * Offsets for the hidden state. Small enough to read as a settle-into-place,
 * large enough to register now that the fade is paired with them.
 */
export function motionOffset(direction: AnimateDirection) {
  switch (direction) {
    case "up":
      return { y: 22 };
    case "down":
      return { y: -22 };
    case "left":
      return { x: 26 };
    case "right":
      return { x: -26 };
    case "fade":
      return { scale: 0.97 };
    default:
      return {};
  }
}

/** Shared class on every reveal wrapper — see the no-JS fallback in globals.css. */
export const REVEAL_CLASS = "motion-reveal";
