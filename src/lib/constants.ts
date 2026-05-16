/**
 * Design tokens — TypeScript mirror of src/app/globals.css.
 *
 * Tailwind v4's @theme block is the runtime source of truth; this file
 * exists for cases where we need token values in JS land (Framer Motion
 * configs, programmatic style objects, JSON-LD, etc.).
 *
 * Keep both in sync. If you change a hex here, update globals.css too.
 * Source: HustleFreeHire_Website_Blueprint.md §4–§6.
 */

export const colors = {
  // Brand
  primary: "#0F9D94",
  primaryDark: "#0A7A72",
  accent: "#53D8C9",
  accentLight: "#A8EDE8",

  // Surfaces
  bg: "#F8FBFB",
  bgSection: "#EEF6F6",
  surface: "#FFFFFF",
  border: "#D6ECEB",

  // Text
  textPrimary: "#1E293B",
  textSecondary: "#475569",
  textMuted: "#94A3B8",

  // Semantic
  success: "#10B981",
  warning: "#F59E0B",
  error: "#EF4444",

  // Anchors
  footerBg: "#0F2020",
} as const;

export const gradients = {
  hero: "linear-gradient(135deg, #0F9D94 0%, #0D7377 50%, #1E293B 100%)",
  card: "linear-gradient(135deg, #F0FAFA 0%, #FFFFFF 100%)",
  cta: "linear-gradient(90deg, #0F9D94 0%, #53D8C9 100%)",
  section: "linear-gradient(180deg, #F8FBFB 0%, #EEF6F6 100%)",
} as const;

export const radii = {
  card: 16,
  input: 8,
  pill: 999,
} as const;

export const shadows = {
  card: "0 4px 24px rgba(15, 157, 148, 0.08)",
  cardHover: "0 12px 40px rgba(15, 157, 148, 0.16)",
  cta: "0 8px 24px rgba(15, 157, 148, 0.24)",
} as const;

/**
 * Animation primitives (blueprint §10).
 * Spring easing: cubic-bezier(0.16, 1, 0.3, 1) — used for all reveals.
 */
export const motion = {
  easeSpring: [0.16, 1, 0.3, 1] as const,
  durations: {
    micro: 0.3,
    standard: 0.5,
    section: 0.8,
  },
  stagger: 0.08, // 80ms between children (blueprint §10)
} as const;

/**
 * Type scale — pixel values mirrored from globals.css.
 * Useful when computing heights, line counts, or non-Tailwind layouts.
 */
export const typeScale = {
  display: { size: 72, lineHeight: 1.1, tracking: -0.02 },
  h1: { size: 52, lineHeight: 1.15, tracking: -0.018 },
  h2: { size: 38, lineHeight: 1.25, tracking: -0.01 },
  h3: { size: 26, lineHeight: 1.35 },
  h4: { size: 20, lineHeight: 1.45 },
  bodyLg: { size: 17, lineHeight: 1.7 },
  body: { size: 15, lineHeight: 1.7 },
  sm: { size: 13, lineHeight: 1.6 },
  xs: { size: 11, lineHeight: 1.5 },
} as const;

/**
 * Site-wide constants. These will grow as we build pages.
 */
export const site = {
  name: "HustleFreeHire Staffing Services",
  shortName: "HustleFreeHire",
  tagline: "Connecting Right People with the Right Jobs",
  url: "https://www.hustlefreehire.com",
} as const;

/**
 * Contact channels — placeholders until real numbers/emails are provided.
 * Update these values when the production details are confirmed.
 */
export const contact = {
  email: "hello@hustlefreehire.com",
  phone: "+91-00000-00000",
  whatsapp: "https://wa.me/910000000000",
  city: "Ludhiana, Punjab, India",
} as const;

/**
 * Primary navigation (blueprint §7).
 *
 * Each link can optionally declare `children` — used to surface the
 * Services mega-dropdown on desktop and an expandable group on mobile.
 */
export type ServiceLink = {
  label: string;
  href: string;
  /** Lucide icon name, resolved by the consuming component. */
  icon: "briefcase" | "user-check" | "users";
  description: string;
};

export type NavLink = {
  label: string;
  href: string;
  children?: ReadonlyArray<ServiceLink>;
};

export const serviceLinks: ReadonlyArray<ServiceLink> = [
  {
    label: "Contract Staffing",
    href: "/services/contract-staffing",
    icon: "briefcase",
    description: "Payroll-managed, scalable contract talent.",
  },
  {
    label: "Permanent Staffing",
    href: "/services/permanent-staffing",
    icon: "user-check",
    description: "End-to-end search for full-time roles.",
  },
  {
    label: "Bulk Hiring",
    href: "/services/bulk-hiring",
    icon: "users",
    description: "Mass recruitment across regions and shifts.",
  },
] as const;

export const navLinks: ReadonlyArray<NavLink> = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
] as const;
