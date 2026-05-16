import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  CheckCircle2,
  Minus,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  serviceLinks,
  site,
  type ServiceLink,
} from "@/lib/constants";

export const metadata: Metadata = {
  title: `Services — ${site.name}`,
  description:
    "Three staffing models built for modern hiring: contract, permanent, and bulk. Compare and pick the right partnership.",
};

const iconMap: Record<ServiceLink["icon"], LucideIcon> = {
  briefcase: Briefcase,
  "user-check": UserCheck,
  users: Users,
};

/**
 * Services overview page (`/services`) — blueprint §8.3.
 */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
        eyebrow="What we do"
        title={
          <>
            Our{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              staffing solutions
            </span>
          </>
        }
        subtitle="Three operating models, one accountable partner. Pick the engagement shape that fits your hiring need today, and switch as your business changes."
      />

      <ServiceOverviewIntro />

      {serviceLinks.map((service, i) => (
        <ServiceBlock
          key={service.href}
          service={service}
          flip={i % 2 === 1}
        />
      ))}

      <ComparisonTable />

      <ProcessSection />

      <CTABanner />
    </>
  );
}

/* ============================================================
 * Service overview intro — short framing paragraph.
 * ============================================================ */

function ServiceOverviewIntro() {
  return (
    <section className="bg-bg py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1080px] px-6 md:px-10">
        <p className="text-body-lg text-text-secondary">
          Whether you need a single specialist hire, a contract team to ship
          a project, or 500 hires across geographies, our portfolio is built
          to flex with you. Three engagement models, the same delivery
          discipline.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 * Alternating service block.
 * ============================================================ */

function ServiceBlock({
  service,
  flip,
}: {
  service: ServiceLink;
  flip: boolean;
}) {
  const Icon = iconMap[service.icon];

  return (
    <section
      id={service.href.split("/").pop()}
      aria-labelledby={`${service.icon}-heading`}
      className={`relative overflow-hidden py-20 md:py-24 ${
        flip ? "bg-bg-section" : "bg-bg"
      }`}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-[420px] w-[420px] rounded-full opacity-25 blur-3xl ${
          flip ? "-right-32 top-1/4" : "-left-32 bottom-1/4"
        }`}
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.22) 0%, transparent 70%)" }}
      />

      <div
        className={`relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:px-10 lg:grid-cols-2 lg:gap-16 ${
          flip ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        {/* ---------- Text column ---------- */}
        <div>
          <SectionHeading
            tag={service.subtitle}
            title={service.label}
            subtitle={service.longDescription}
          />
          <h2 id={`${service.icon}-heading`} className="sr-only">
            {service.label}
          </h2>

          <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {service.whoItsFor.slice(0, 4).map((line) => (
              <li
                key={line}
                className="flex items-start gap-2.5 text-sm text-text-secondary"
              >
                <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-pill bg-accent-light/60 text-primary">
                  <Check size={12} />
                </span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <Link
            href={service.href}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-sans font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Explore {service.label.toLowerCase()}
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-spring group-hover:translate-x-1.5"
            />
          </Link>
        </div>

        {/* ---------- Visual column ---------- */}
        <ServiceVisual icon={Icon} title={service.label} subtitle={service.subtitle} />
      </div>
    </section>
  );
}

/**
 * Decorative visual for each service block. A glassmorphism tile with
 * the service icon at large size + 3 floating mini badges referencing
 * the keyBenefits — gives each block a hero-like feel without needing
 * stock photography.
 */
function ServiceVisual({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="relative mx-auto h-[320px] w-full max-w-[480px] sm:h-[380px]">
      {/* Background card */}
      <div
        className="absolute inset-6 rounded-card border border-primary/15 shadow-card"
        style={{
          backgroundImage: "var(--gradient-card)",
        }}
      />

      {/* Center icon disc */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
          className="flex h-32 w-32 items-center justify-center rounded-pill text-white shadow-cta"
          style={{
            backgroundImage: "linear-gradient(135deg, #0F9D94 0%, #53D8C9 100%)",
          }}
        >
          <Icon size={48} />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-pill blur-2xl"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(83,216,201,0.5) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Floating mini badges */}
      <span className="absolute left-2 top-6 rounded-pill border border-primary/15 bg-white/80 px-3 py-1.5 text-xs font-sans font-medium text-text-primary shadow-card backdrop-blur">
        {subtitle}
      </span>
      <span className="absolute right-2 top-1/2 rounded-pill border border-primary/15 bg-white/80 px-3 py-1.5 text-xs font-sans font-medium text-primary shadow-card backdrop-blur">
        {title}
      </span>
      <span className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-pill border border-primary/15 bg-white/80 px-3 py-1.5 text-xs font-sans font-medium text-text-secondary shadow-card backdrop-blur">
        Compliance · Speed · Scale
      </span>
    </div>
  );
}

/* ============================================================
 * Comparison Table (blueprint §8.3 Section 6).
 * ============================================================ */

type ComparisonFeature = {
  feature: string;
  // truthy = supported, "ideal" = primary use case, false = not the right fit
  values: [boolean | "ideal", boolean | "ideal", boolean | "ideal"];
};

const COMPARISON: ReadonlyArray<ComparisonFeature> = [
  {
    feature: "Time-to-fill",
    values: ["ideal", true, "ideal"],
  },
  {
    feature: "Single-role specialist depth",
    values: [true, "ideal", false],
  },
  {
    feature: "Volume hiring (50+)",
    values: [true, false, "ideal"],
  },
  {
    feature: "Payroll & statutory compliance",
    values: ["ideal", false, true],
  },
  {
    feature: "Replacement guarantee",
    values: [false, "ideal", false],
  },
  {
    feature: "Multi-shift / multi-region",
    values: [true, false, "ideal"],
  },
  {
    feature: "Engagement type",
    values: [true, true, true],
  },
];

function ComparisonTable() {
  const cols = serviceLinks.map((s) => ({
    label: s.label,
    icon: iconMap[s.icon],
  }));

  return (
    <section
      aria-labelledby="comparison-heading"
      className="bg-bg py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="Compare at a glance"
          title={
            <>
              Pick the model that{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                matches your need
              </span>
            </>
          }
          subtitle="Every business has a different shape. This is the quick-look guide to where each engagement model performs best."
        />
        <h2 id="comparison-heading" className="sr-only">
          Service comparison
        </h2>

        <div className="mt-10 overflow-x-auto rounded-card border border-border bg-surface shadow-card">
          <table className="w-full min-w-[640px] text-left">
            <thead>
              <tr className="border-b border-border bg-bg-section/40">
                <th className="px-6 py-5 text-sm font-sans font-semibold uppercase tracking-[0.16em] text-text-muted">
                  Capability
                </th>
                {cols.map((c) => (
                  <th
                    key={c.label}
                    className="px-6 py-5 text-center text-sm font-sans font-semibold text-text-primary"
                  >
                    <span className="inline-flex items-center gap-2">
                      <c.icon size={16} className="text-primary" />
                      {c.label}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.feature} className="border-b border-border last:border-0">
                  <td className="px-6 py-4 text-sm font-sans font-medium text-text-primary">
                    {row.feature}
                  </td>
                  {row.values.map((v, i) => (
                    <td key={i} className="px-6 py-4 text-center">
                      <ComparisonCell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-xs text-text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 size={12} className="text-primary" />
            Ideal fit
          </span>
          <span className="mx-3">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Check size={12} className="text-text-secondary" />
            Supported
          </span>
          <span className="mx-3">·</span>
          <span className="inline-flex items-center gap-1.5">
            <Minus size={12} className="text-text-muted" />
            Not the primary use case
          </span>
        </p>
      </div>
    </section>
  );
}

function ComparisonCell({ value }: { value: boolean | "ideal" }) {
  if (value === "ideal") {
    return (
      <span
        className="inline-flex h-7 w-7 items-center justify-center rounded-pill text-white"
        style={{
          backgroundImage: "linear-gradient(135deg, #0F9D94 0%, #53D8C9 100%)",
        }}
      >
        <CheckCircle2 size={14} />
      </span>
    );
  }
  if (value === true) {
    return (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-pill bg-accent-light/50 text-primary">
        <Check size={14} />
      </span>
    );
  }
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-pill bg-bg-section text-text-muted">
      <Minus size={14} />
    </span>
  );
}
