import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Compass,
  Eye,
  Gauge,
  Handshake,
  Sparkles,
  Target,
  User,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/lib/constants";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description:
    "We connect organizations with the right talent through streamlined recruitment and scalable staffing solutions. Learn what HustleFreeHire stands for.",
};

/**
 * About page (`/about`) — blueprint §8.2.
 *
 * Composition:
 *   1. PageHero
 *   2. Mission Statement
 *   3. Who We Are
 *   4. Our Values  (3 cards)
 *   5. Leadership   (2x2 placeholder grid)
 *   6. Our Vision   (split layout)
 *   7. Why Work With Us
 *   8. CTA — reuses <CTABanner /> from the home flow
 */
export default function AboutPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
        eyebrow="Who we are"
        title={
          <>
            Workforce experts built for the{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              modern enterprise
            </span>
          </>
        }
        subtitle="HustleFreeHire is a recruitment and staffing partner built around a simple promise — hiring without the hustle. Here's what we stand for and how we work."
      />

      <MissionStatement />
      <WhoWeAre />
      <OurValues />
      <Leadership />
      <OurVision />
      <WhyWorkWithUs />
      <CTABanner />
    </>
  );
}

/* ============================================================
 * 2 — Mission Statement
 * Large typographic quote with a vertical teal accent line.
 * ============================================================ */

function MissionStatement() {
  return (
    <section
      aria-label="Our mission"
      className="relative bg-bg py-24 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1080px] px-6 md:px-10">
        <div className="relative pl-6 md:pl-10">
          {/* Vertical accent line */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-1 h-[calc(100%-8px)] w-1 rounded-full"
            style={{
              backgroundImage: "linear-gradient(180deg, #0F9D94 0%, #53D8C9 100%)",
            }}
          />
          <p className="text-xs font-sans font-semibold uppercase tracking-[0.22em] text-primary">
            Our mission
          </p>
          <blockquote className="mt-6 font-display font-bold leading-[1.18] tracking-[-0.018em] text-[clamp(28px,3.6vw,42px)] text-text-primary">
            “To make hiring effortless for businesses and meaningful for
            candidates — by being the staffing partner that combines speed,
            depth, and lifecycle ownership in equal measure.”
          </blockquote>
          <footer className="mt-6 text-sm text-text-secondary">
            — The HustleFreeHire team
          </footer>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 3 — Who We Are
 * Split: heading on the left, body paragraphs on the right.
 * ============================================================ */

function WhoWeAre() {
  return (
    <section
      aria-labelledby="who-we-are-heading"
      className="bg-bg-section py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tag="Who we are"
            title={<>The story behind the brand</>}
          />
        </div>
        <div className="lg:col-span-7 space-y-5 text-body-lg text-text-secondary">
          <p id="who-we-are-heading">
            HustleFreeHire Staffing Services focuses on enhancing workforce
            performance by connecting organizations with the right talent and
            efficient HR solutions. We streamline recruitment processes,
            support businesses with scalable staffing solutions, and help
            professionals find meaningful career opportunities.
          </p>
          <p>
            Founded with a singular mission — to remove the friction from how
            India hires — we work as an extension of your in-house team. From
            shortlisting and interviewing to documentation, payroll, and
            post-placement support, we own every step of the talent journey
            so you can focus on building your business.
          </p>
          <p>
            Our recruiters specialise by sector, our processes are
            compliance-first by default, and our delivery model scales from a
            single key hire to teams of hundreds — without losing the human
            judgement that great staffing requires.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * 4 — Our Values
 * Three value cards: Trust, Expertise, Speed.
 * ============================================================ */

const VALUES = [
  {
    icon: Handshake,
    title: "Trust",
    copy: "We say what we mean and deliver what we promise. Transparency at every step builds the foundation businesses build their teams on.",
  },
  {
    icon: Award,
    title: "Expertise",
    copy: "Specialists, not generalists. Our recruiters bring contextual sector knowledge that speeds up the right matches and eliminates the wrong ones.",
  },
  {
    icon: Gauge,
    title: "Speed",
    copy: "Modern hiring moves fast. Our process is built around shortened time-to-fill — without compromising quality, fit, or compliance.",
  },
] as const;

function OurValues() {
  return (
    <section
      aria-labelledby="values-heading"
      className="relative overflow-hidden bg-bg py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-1/4 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.25) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="What we stand for"
          title={
            <>
              Three values, applied{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                relentlessly
              </span>
            </>
          }
          subtitle="Every process, every conversation, every placement is filtered through these three lenses."
        />
        <h2 id="values-heading" className="sr-only">
          Our values
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {VALUES.map((v) => {
            const Icon = v.icon;
            return (
              <li
                key={v.title}
                className="group relative flex h-full flex-col overflow-hidden rounded-card border border-primary/15 bg-white/60 p-7 backdrop-blur-md shadow-card transition-all duration-300 ease-spring hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-hover"
                style={{ backgroundImage: "var(--gradient-card)" }}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ background: "radial-gradient(circle, rgba(83,216,201,0.45) 0%, transparent 70%)" }}
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-card bg-accent-light/40 text-primary transition-transform duration-300 ease-spring group-hover:scale-110">
                  <Icon size={26} />
                </span>
                <h3 className="relative mt-6 font-display text-h3 font-semibold leading-tight text-text-primary">
                  {v.title}
                </h3>
                <p className="relative mt-3 text-body text-text-secondary">
                  {v.copy}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
 * 5 — Leadership Placeholder
 * 2×2 grid of placeholder team cards.
 * ============================================================ */

const LEADERS = [
  { initials: "PS", name: "Founder & CEO", role: "Leadership · Strategy" },
  { initials: "OL", name: "Head of Operations", role: "Delivery · Process" },
  { initials: "TL", name: "Head of Talent", role: "Recruitment · Sourcing" },
  { initials: "CL", name: "Head of Compliance", role: "Payroll · HR Lifecycle" },
] as const;

function Leadership() {
  return (
    <section
      aria-labelledby="leadership-heading"
      className="bg-bg-section py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="Leadership"
          title={<>The people behind the partnership</>}
          subtitle="Real names and photos coming soon — building trust starts with knowing who you'll work with."
        />
        <h2 id="leadership-heading" className="sr-only">
          Leadership team
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LEADERS.map((leader) => (
            <li key={leader.name}>
              <article className="group h-full rounded-card border border-border bg-surface p-6 text-center shadow-card transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary/30 hover:shadow-card-hover">
                <span
                  aria-hidden="true"
                  className="mx-auto flex h-20 w-20 items-center justify-center rounded-pill text-h3 font-display font-bold text-white transition-transform duration-300 ease-spring group-hover:scale-105"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #0F9D94 0%, #53D8C9 100%)",
                    boxShadow: "0 8px 24px rgba(15,157,148,0.32)",
                  }}
                >
                  {leader.initials}
                </span>
                <h3 className="mt-5 font-display text-h4 font-semibold text-text-primary">
                  {leader.name}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {leader.role}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.18em] text-text-muted"
                >
                  <User size={12} className="opacity-50" />
                  Profile coming soon
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
 * 6 — Our Vision
 * Split: vision text on the left, abstract visual on the right.
 * ============================================================ */

function OurVision() {
  return (
    <section
      aria-labelledby="vision-heading"
      className="relative overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0F2A2A 0%, #0F4744 60%, #0F2A2A 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.4) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            tag="Our vision"
            inverted
            title={
              <>
                Building India&apos;s most reliable{" "}
                <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
                  staffing platform
                </span>
              </>
            }
            subtitle={
              <span className="text-white/75">
                One where data, expertise, and human relationships work
                together. Phase by phase we&apos;re growing into a full-stack
                hiring partner — adding AI-powered matching, candidate
                portals, and real-time hiring dashboards. The mission stays
                the same: hiring without the hustle.
              </span>
            }
          />
          <h2 id="vision-heading" className="sr-only">
            Our vision
          </h2>

          <ul className="mt-10 space-y-4 text-body text-white/80">
            {[
              { icon: Eye, line: "Transparent partnership built on accountable delivery" },
              { icon: Compass, line: "Sector specialism over generalist breadth" },
              { icon: Target, line: "Data-driven matching with human judgement" },
              { icon: Sparkles, line: "AI-augmented tooling without losing the human touch" },
            ].map((item) => (
              <li key={item.line} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-pill bg-accent/15 text-accent">
                  <item.icon size={14} />
                </span>
                <span>{item.line}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Abstract visual: layered orbital rings + central mark */}
        <div className="relative flex h-[400px] items-center justify-center lg:h-[480px]">
          <VisionVisual />
        </div>
      </div>
    </section>
  );
}

function VisionVisual() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      role="img"
      aria-label="Abstract orbital diagram representing forward direction"
    >
      <defs>
        <radialGradient id="vision-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#53D8C9" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#0F9D94" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0F9D94" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vision-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#A8EDE8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0F9D94" stopOpacity="0" />
        </linearGradient>
      </defs>

      <circle cx="200" cy="200" r="180" fill="url(#vision-glow)" />

      {/* Orbital rings */}
      {[80, 120, 160].map((r) => (
        <ellipse
          key={r}
          cx="200"
          cy="200"
          rx={r}
          ry={r * 0.55}
          fill="none"
          stroke="url(#vision-arc)"
          strokeWidth="1"
        />
      ))}
      {[80, 120, 160].map((r, i) => (
        <ellipse
          key={`v-${r}`}
          cx="200"
          cy="200"
          rx={r * 0.55}
          ry={r}
          fill="none"
          stroke="rgba(168,237,232,0.18)"
          strokeWidth="1"
          transform={`rotate(${20 + i * 20} 200 200)`}
        />
      ))}

      {/* Orbiting dots */}
      <circle cx="280" cy="200" r="5" fill="#A8EDE8" />
      <circle cx="200" cy="90" r="6" fill="#53D8C9" />
      <circle cx="120" cy="220" r="4" fill="#A8EDE8" />
      <circle cx="240" cy="320" r="5" fill="#A8EDE8" opacity="0.6" />

      {/* Central mark */}
      <circle cx="200" cy="200" r="22" fill="#0F9D94" />
      <circle cx="200" cy="200" r="22" fill="none" stroke="#A8EDE8" strokeWidth="2" />
      <path
        d="M188 198 L198 208 L214 192"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ============================================================
 * 7 — Why Work With Us
 * Heading on the left, bullet list on the right.
 * ============================================================ */

const WHY_WORK_WITH = [
  "Pan-India delivery network across 10+ industries",
  "Compliance-first approach to every employment lifecycle",
  "Single accountable point of contact, no hand-offs",
  "Transparent reporting and real-time hiring updates",
  "Quarterly business reviews to keep the partnership accountable",
  "Scalable model — one specialist or a team of 500, same partner",
];

function WhyWorkWithUs() {
  return (
    <section
      aria-labelledby="why-work-heading"
      className="bg-bg py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tag="Why partner with us"
            title={
              <>
                A staffing partner you can{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  actually plan around
                </span>
              </>
            }
            subtitle="Built around predictable delivery, accountability, and the kind of human judgement that good staffing always requires."
          />
          <Link
            href="/contact"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-sans font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Talk to our team
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-spring group-hover:translate-x-1.5"
            />
          </Link>
        </div>

        <ul className="lg:col-span-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {WHY_WORK_WITH.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-card border border-border bg-surface p-4 transition-colors hover:border-primary/30"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-pill bg-accent-light/60 text-primary">
                <CheckCircle2 size={14} />
              </span>
              <span className="text-sm text-text-primary">{line}</span>
            </li>
          ))}
        </ul>

        <h2 id="why-work-heading" className="sr-only">
          Why work with us
        </h2>
      </div>
    </section>
  );
}
