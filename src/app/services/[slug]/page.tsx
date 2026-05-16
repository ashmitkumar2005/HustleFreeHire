import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BadgeCheck,
  Briefcase,
  Check,
  Globe,
  Layers,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { CTABanner } from "@/components/sections/CTABanner";
import { PageHero } from "@/components/sections/PageHero";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { Accordion } from "@/components/ui/Accordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  serviceLinks,
  site,
  type BenefitIconKey,
  type ServiceLink,
} from "@/lib/constants";

/* ============================================================
 * Static params + metadata
 * ============================================================ */

export function generateStaticParams() {
  return serviceLinks.map((s) => ({
    slug: s.href.replace("/services/", ""),
  }));
}

function findService(slug: string): ServiceLink | undefined {
  return serviceLinks.find(
    (s) => s.href.replace("/services/", "") === slug,
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return { title: `Services — ${site.name}` };
  return {
    title: `${service.label} — ${site.name}`,
    description: service.longDescription,
  };
}

/* ============================================================
 * Icon maps
 * ============================================================ */

const heroIconMap: Record<ServiceLink["icon"], LucideIcon> = {
  briefcase: Briefcase,
  "user-check": UserCheck,
  users: Users,
};

const benefitIconMap: Record<BenefitIconKey, LucideIcon> = {
  "shield-check": ShieldCheck,
  scale: Scale,
  wallet: Wallet,
  search: Search,
  sparkles: Sparkles,
  "badge-check": BadgeCheck,
  rocket: Rocket,
  globe: Globe,
  layers: Layers,
};

/* ============================================================
 * Page
 * ============================================================ */

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();

  const HeroIcon = heroIconMap[service.icon];

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.label },
        ]}
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <HeroIcon size={14} className="text-accent" />
            {service.subtitle}
          </span>
        }
        title={
          <>
            {service.label.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              {service.label.split(" ").slice(-1)[0]}
            </span>
          </>
        }
        subtitle={service.longDescription}
      />

      <KeyBenefits service={service} />
      <WhoItsFor service={service} />
      <ProcessSection />
      <FAQ service={service} />
      <CTABanner />
    </>
  );
}

/* ============================================================
 * Key Benefits — 3 cards
 * ============================================================ */

function KeyBenefits({ service }: { service: ServiceLink }) {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="relative overflow-hidden bg-bg py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.22) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="Why this model"
          title={
            <>
              Built around the things that{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                actually matter
              </span>
            </>
          }
          subtitle={`Three reasons ${service.label.toLowerCase()} works for the businesses that pick it.`}
        />
        <h2 id="benefits-heading" className="sr-only">
          Key benefits
        </h2>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {service.keyBenefits.map((b) => {
            const Icon = benefitIconMap[b.iconKey];
            return (
              <li
                key={b.title}
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
                  {b.title}
                </h3>
                <p className="relative mt-3 text-body text-text-secondary">
                  {b.copy}
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
 * Who It's For — left heading + right checklist
 * ============================================================ */

function WhoItsFor({ service }: { service: ServiceLink }) {
  return (
    <section
      aria-labelledby="who-heading"
      className="bg-bg-section py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-10 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            tag="Who it's for"
            title={
              <>
                The teams that get the most{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  out of this
                </span>
              </>
            }
            subtitle="A short checklist to help you decide if this is the right engagement shape for your hiring need."
          />
        </div>
        <ul className="lg:col-span-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {service.whoItsFor.map((line) => (
            <li
              key={line}
              className="flex items-start gap-3 rounded-card border border-border bg-surface p-4 transition-colors hover:border-primary/30"
            >
              <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-pill bg-accent-light/60 text-primary">
                <Check size={14} />
              </span>
              <span className="text-sm text-text-primary">{line}</span>
            </li>
          ))}
        </ul>
        <h2 id="who-heading" className="sr-only">
          Who it&apos;s for
        </h2>
      </div>
    </section>
  );
}

/* ============================================================
 * FAQ
 * ============================================================ */

function FAQ({ service }: { service: ServiceLink }) {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-bg py-20 md:py-28"
    >
      <div className="mx-auto w-full max-w-[960px] px-6 md:px-10">
        <SectionHeading
          tag="FAQ"
          title={
            <>
              Common questions{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                answered
              </span>
            </>
          }
          subtitle={`Quick answers about how ${service.label.toLowerCase()} works in practice.`}
        />
        <h2 id="faq-heading" className="sr-only">
          Frequently asked questions
        </h2>
        <div className="mt-10">
          <Accordion items={service.faq} />
        </div>
      </div>
    </section>
  );
}
