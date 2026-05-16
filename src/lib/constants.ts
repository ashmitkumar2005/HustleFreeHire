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
/**
 * Icon keys allowed for service-detail "Key Benefits" cards. Resolved
 * to Lucide icons by the consuming component.
 */
export type BenefitIconKey =
  | "shield-check"
  | "scale"
  | "wallet"
  | "search"
  | "sparkles"
  | "badge-check"
  | "rocket"
  | "globe"
  | "layers";

export type ServiceLink = {
  label: string;
  /** Tag-line under the service name on cards and hero banners. */
  subtitle: string;
  href: string;
  /** Lucide icon name, resolved by the consuming component. */
  icon: "briefcase" | "user-check" | "users";
  /** Short blurb used in the navbar dropdown. */
  description: string;
  /** Card-length copy used on the home page Services section. */
  cardCopy: string;
  /** Long body copy used at the top of each service detail page. */
  longDescription: string;
  /** 3-card "Key Benefits" grid on the detail page. */
  keyBenefits: ReadonlyArray<{
    iconKey: BenefitIconKey;
    title: string;
    copy: string;
  }>;
  /** Bullet list shown under "Who it's for". */
  whoItsFor: ReadonlyArray<string>;
  /** FAQ entries shown as an accordion. */
  faq: ReadonlyArray<{ q: string; a: string }>;
};

export type NavLink = {
  label: string;
  href: string;
  children?: ReadonlyArray<ServiceLink>;
};

export const serviceLinks: ReadonlyArray<ServiceLink> = [
  {
    label: "Contract Staffing",
    subtitle: "Payroll Management",
    href: "/services/contract-staffing",
    icon: "briefcase",
    description: "Payroll-managed, scalable contract talent.",
    cardCopy:
      "Scalable contract talent with end-to-end payroll, compliance, and lifecycle management — so you focus on growth, not paperwork.",
    longDescription:
      "Hire on contract terms while HustleFreeHire owns the entire employment lifecycle. We surface the talent, manage statutory compliance, run payroll, and stay accountable through the contract — so you get specialist capacity without the overhead of permanent hiring.",
    keyBenefits: [
      {
        iconKey: "shield-check",
        title: "Compliance, handled",
        copy: "PF, ESI, gratuity, statutory deductions, monthly returns — managed end-to-end with audit-ready records.",
      },
      {
        iconKey: "scale",
        title: "Flex capacity",
        copy: "Scale up or down per project, season, or product cycle. Pay only for the months you actually need the seat.",
      },
      {
        iconKey: "wallet",
        title: "Predictable cost",
        copy: "Single monthly invoice covering salary + statutory + service. No surprise placement fees, no liability on your books.",
      },
    ],
    whoItsFor: [
      "Teams scaling for a defined project or season",
      "Organisations entering new markets or geographies",
      "Specialist roles you need without a permanent headcount commitment",
      "Backfills, parallel runs, and capacity bursts",
    ],
    faq: [
      {
        q: "How quickly can you place contract talent?",
        a: "For mid-skill roles, shortlists land in your inbox within 5–7 working days. Specialist roles typically take 10–14 days from briefing to first interview-ready candidate.",
      },
      {
        q: "Who runs payroll for the contract employees?",
        a: "We do. Monthly salary disbursement, payslips, leave, statutory filings, and full Form 16 at year end — all on our books.",
      },
      {
        q: "What contract durations do you support?",
        a: "Anywhere from 3 months to multi-year engagements. We can also convert a contract resource to permanent at any point in the tenure.",
      },
      {
        q: "Can we offer the contractor a permanent role later?",
        a: "Yes — conversion is built into every engagement. We move the resource onto your payroll on the agreed cut-over date.",
      },
    ],
  },
  {
    label: "Permanent Staffing",
    subtitle: "One-Time Placement",
    href: "/services/permanent-staffing",
    icon: "user-check",
    description: "End-to-end search for full-time roles.",
    cardCopy:
      "Targeted search for full-time roles. We surface culture-fit, role-fit candidates so you hire once and hire right.",
    longDescription:
      "Permanent placements run by sector specialists who actually understand the roles they're filling. We map the role, build a pipeline, run structured screening, and deliver a tight shortlist with full context — so you get to a confident hire faster.",
    keyBenefits: [
      {
        iconKey: "search",
        title: "Specialist search depth",
        copy: "Recruiters who hire only in your sector. They know the talent map, the salary bands, and the right questions to ask.",
      },
      {
        iconKey: "sparkles",
        title: "Culture & role fit",
        copy: "We screen for both. Every shortlist comes with context on motivation, working style, and risk areas — not just CVs.",
      },
      {
        iconKey: "badge-check",
        title: "Replacement guarantee",
        copy: "Standard 90-day replacement guarantee on every placement. If the fit isn't right, we re-run the search at no cost.",
      },
    ],
    whoItsFor: [
      "Critical, high-impact roles where fit matters as much as skill",
      "Leadership and senior individual-contributor hires",
      "Specialist functions where in-house recruiting lacks depth",
      "Roles that need a confidential, unpublished search",
    ],
    faq: [
      {
        q: "How is your fee structured?",
        a: "Standard percentage of annual CTC, payable on the candidate's joining date — plus the 90-day replacement guarantee.",
      },
      {
        q: "How many candidates will I see?",
        a: "Usually 3–5 highly qualified profiles. We optimise for tight, decision-ready shortlists — not volume.",
      },
      {
        q: "How long does a search typically take?",
        a: "Mid-senior roles: 2–4 weeks to first shortlist, 4–8 weeks to closure. Leadership searches run 6–12 weeks depending on rarity.",
      },
      {
        q: "Do you handle confidential searches?",
        a: "Yes — most senior searches we run are confidential. Outreach happens under our brand until the candidate is ready to be introduced.",
      },
    ],
  },
  {
    label: "Bulk Hiring",
    subtitle: "Mass Recruitment",
    href: "/services/bulk-hiring",
    icon: "users",
    description: "Mass recruitment across regions and shifts.",
    cardCopy:
      "Multi-region, multi-shift hiring at scale — on-demand workforce delivery for high-volume operational roles.",
    longDescription:
      "When you need 50, 100, or 500 hires fast — across geographies, shifts, and skill levels — we run high-volume drives with the same compliance discipline as individual placements. Walk-in events, structured screening, automated coordination, full delivery accountability.",
    keyBenefits: [
      {
        iconKey: "rocket",
        title: "Speed at scale",
        copy: "Walk-in drives, sourcing campaigns, and dedicated delivery pods that ramp from briefing to onboarding in weeks.",
      },
      {
        iconKey: "globe",
        title: "Pan-India reach",
        copy: "Regional sourcing partners and on-ground recruiters across tier 1, 2, and 3 cities for true national coverage.",
      },
      {
        iconKey: "layers",
        title: "Multi-shift, multi-skill",
        copy: "Operations, customer experience, warehouse, retail, and field roles — on day, evening, or rotational shifts.",
      },
    ],
    whoItsFor: [
      "New site or facility launches needing 100+ hires",
      "Seasonal or peak-demand hiring drives",
      "Network expansion into new geographies",
      "Outsourced contact-centre and BPO ramp-ups",
    ],
    faq: [
      {
        q: "What's the largest drive you've delivered?",
        a: "Multi-hundred hire ramps across multiple cities — see our case studies for representative volumes (real numbers shared under NDA).",
      },
      {
        q: "Do you handle background verification?",
        a: "Yes — we partner with verification providers to run BGV, address checks, and document validation for every onboard.",
      },
      {
        q: "What turnaround time should I plan for?",
        a: "For roles of 100+: 4–6 weeks from briefing to first joinings, with steady-state weekly drops thereafter.",
      },
      {
        q: "Can you run walk-in events at our location?",
        a: "Absolutely — we coordinate the event, screen candidates on-site, and hand over offer-ready shortlists the same day.",
      },
    ],
  },
] as const;

export const navLinks: ReadonlyArray<NavLink> = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", children: serviceLinks },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Social links — placeholder URLs. Replace with real accounts when ready.
 * `kind` maps to a Lucide icon name in the footer component.
 */
export type SocialKind = "linkedin" | "twitter" | "instagram" | "facebook";

export const socials: ReadonlyArray<{
  kind: SocialKind;
  label: string;
  href: string;
}> = [
  { kind: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/" },
  { kind: "twitter", label: "X / Twitter", href: "https://x.com/" },
  { kind: "instagram", label: "Instagram", href: "https://www.instagram.com/" },
  { kind: "facebook", label: "Facebook", href: "https://www.facebook.com/" },
] as const;

/**
 * Legal pages — slugs match blueprint §7.
 */
export const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;

/**
 * Industries served (blueprint §8.1 Section 6, §8.4).
 *
 * Order matches the blueprint copy. `iconKey` is resolved to a Lucide
 * icon by the consuming component so this module stays free of JSX.
 */
export type IndustryKey =
  | "manufacturing"
  | "automobile"
  | "pharmaceuticals"
  | "construction"
  | "logistics"
  | "it-non-it"
  | "telecom"
  | "banking"
  | "bpo"
  | "advertising";

export type Industry = {
  key: IndustryKey;
  label: string;
  /** Used on the dedicated Industries page (blueprint §8.4). */
  blurb: string;
};

export const industries: ReadonlyArray<Industry> = [
  {
    key: "manufacturing",
    label: "Manufacturing",
    blurb:
      "Plant operators, supervisors, quality, and skilled-trade roles staffed at speed.",
  },
  {
    key: "automobile",
    label: "Automobile Engineering",
    blurb:
      "Design, manufacturing, and service technicians for OEMs and tier-1/2 suppliers.",
  },
  {
    key: "pharmaceuticals",
    label: "Pharmaceuticals",
    blurb:
      "GMP-aware production, R&D, regulatory, and field-force placements.",
  },
  {
    key: "construction",
    label: "Construction",
    blurb:
      "Site engineers, project managers, and skilled labour for infrastructure builds.",
  },
  {
    key: "logistics",
    label: "Logistics",
    blurb:
      "Warehouse leadership, last-mile staffing, and fleet operations roles at scale.",
  },
  {
    key: "it-non-it",
    label: "IT & Non-IT",
    blurb:
      "Tech and corporate-function hiring across product, engineering, and operations.",
  },
  {
    key: "telecom",
    label: "Telecom",
    blurb:
      "Network engineering, field operations, and customer-experience roles pan-India.",
  },
  {
    key: "banking",
    label: "Banking",
    blurb:
      "Retail banking, NBFC, and back-office talent with compliance-grade vetting.",
  },
  {
    key: "bpo",
    label: "BPO",
    blurb:
      "Voice and non-voice teams ramped quickly with multi-shift coverage.",
  },
  {
    key: "advertising",
    label: "Advertising",
    blurb:
      "Creative, account, and digital-media roles across agencies and in-house teams.",
  },
] as const;
