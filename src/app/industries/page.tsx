import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Code2,
  Construction,
  Cpu,
  Factory,
  HardHat,
  Headset,
  Landmark,
  Megaphone,
  Pill,
  RadioTower,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import {
  industries,
  site,
  type IndustryKey,
} from "@/lib/constants";

const PAGE_DESC =
  "Specialist staffing across 10+ sectors — manufacturing, automobile, pharma, construction, logistics, IT, telecom, banking, BPO, and advertising.";

export const metadata: Metadata = {
  title: "Industries",
  description: PAGE_DESC,
  alternates: { canonical: "/industries" },
  openGraph: {
    title: `Industries — ${site.name}`,
    description: PAGE_DESC,
    url: "/industries",
    type: "website",
  },
};

const iconMap: Record<IndustryKey, LucideIcon> = {
  manufacturing: Factory,
  automobile: Car,
  pharmaceuticals: Pill,
  construction: HardHat,
  logistics: Truck,
  "it-non-it": Cpu,
  telecom: RadioTower,
  banking: Landmark,
  bpo: Headset,
  advertising: Megaphone,
};

/**
 * Industries page (`/industries`) — blueprint §8.4.
 */
export default function IndustriesPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Industries" },
        ]}
        eyebrow="Sectors we cover"
        title={
          <>
            Industries we{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              serve
            </span>
          </>
        }
        subtitle="Sector specialism beats generalist hiring every time. Our recruiters work in deep, focused verticals — they know the talent maps, salary bands, and the questions that actually predict on-the-job success."
      />

      <Intro />
      <IndustryGrid />
      <ExpertiseNote />
      <CTABanner />

      <JsonLd
        data={webPageJsonLd({
          url: "/industries",
          name: `Industries — ${site.name}`,
          description: PAGE_DESC,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Industries", href: "/industries" },
        ])}
      />
    </>
  );
}

/* ============================================================
 * Intro
 * ============================================================ */

function Intro() {
  return (
    <section className="bg-bg py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1080px] px-6 md:px-10">
        <p className="text-body-lg text-text-secondary">
          We understand that{" "}
          <span className="text-text-primary">
            sector-specific hiring challenges
          </span>{" "}
          require sector-specific knowledge. From compliance-heavy
          regulated industries to high-volume operational roles, we have
          dedicated delivery pods who eat, sleep, and breathe your
          vertical.
        </p>
      </div>
    </section>
  );
}

/* ============================================================
 * Industry Grid — richer than the home version
 * ============================================================ */

function IndustryGrid() {
  return (
    <section
      aria-labelledby="industries-grid-heading"
      className="relative overflow-hidden bg-bg-section py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/4 h-[420px] w-[420px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(15,157,148,0.18) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="Vertical depth"
          title={
            <>
              10+ sectors,{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                one accountable partner
              </span>
            </>
          }
          subtitle="Hover or tap any sector to see how we approach hiring in that vertical."
        />
        <h2 id="industries-grid-heading" className="sr-only">
          Industries we serve
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry) => {
            const Icon = iconMap[industry.key];
            return (
              <li key={industry.key}>
                <Link
                  href="/contact"
                  className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-card border border-border bg-surface p-6 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary/30 hover:bg-accent-light/40 hover:shadow-card-hover"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                    style={{ background: "radial-gradient(circle, rgba(83,216,201,0.45) 0%, transparent 70%)" }}
                  />

                  <span className="relative flex h-12 w-12 items-center justify-center rounded-input bg-accent-light/60 text-primary transition-all duration-300 ease-spring group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon size={22} />
                  </span>

                  <div className="relative">
                    <h3 className="font-display text-h4 font-semibold leading-tight text-text-primary transition-colors group-hover:text-primary-dark">
                      {industry.label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {industry.blurb}
                    </p>
                  </div>

                  <span className="relative mt-auto inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.16em] text-primary opacity-0 transition-all duration-300 ease-spring group-hover:opacity-100">
                    Talk to us about {industry.label}
                    <ArrowRight size={11} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
 * Sector expertise note
 * ============================================================ */

function ExpertiseNote() {
  return (
    <section className="bg-bg py-20 md:py-24">
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tag="Cross-industry advantage"
            title={
              <>
                Vertical depth,{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  horizontal scale
                </span>
              </>
            }
          />
        </div>
        <div className="lg:col-span-7 space-y-5 text-body-lg text-text-secondary">
          <p>
            Our delivery pods are sector-specialised, but our process,
            compliance, and reporting infrastructure are shared. That means
            you get the contextual judgement of a niche recruiter combined
            with the operational discipline of a national platform — at
            every scale, in every geography.
          </p>
          <p>
            Don&apos;t see your sector listed? We routinely expand into
            adjacent verticals — tell us what you&apos;re hiring for and
            we&apos;ll let you know honestly whether we&apos;re the right
            partner for it.
          </p>
        </div>
      </div>
    </section>
  );
}
