"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Briefcase, UserCheck, Users } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { serviceLinks, type ServiceLink } from "@/lib/constants";

/**
 * ServicesSection — "WHAT WE DO" cards (blueprint §8.1 Section 4, §19, §20).
 *
 * Three glassmorphism cards in a horizontal row on lg, stacked on
 * mobile (blueprint §11). Each card lifts -6px on hover, the shadow
 * deepens, and the teal border opacity ramps up — exactly the §10
 * microinteraction spec.
 */

const iconMap: Record<ServiceLink["icon"], React.ComponentType<{ size?: number; className?: string }>> = {
  briefcase: Briefcase,
  "user-check": UserCheck,
  users: Users,
};

export function ServicesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-bg py-20 md:py-28"
    >
      {/* Soft atmospheric blob behind the cards so the glass blur has
          something to layer over. Subtle, not a focal point. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-1/4 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.25) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-0 h-[360px] w-[360px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(15,157,148,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="What we do"
          title={
            <>
              End-to-End{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Staffing Solutions
              </span>
            </>
          }
          subtitle="Whether you need a single specialist or a team of 500, we have the model for you."
        />

        <h2 id="services-heading" className="sr-only">
          End-to-End Staffing Solutions
        </h2>

        <ul className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {serviceLinks.map((service, i) => (
            <motion.li
              key={service.href}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="h-full"
            >
              <ServiceCard service={service} />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
 * ServiceCard — clickable glassmorphism card.
 * The whole card is a single Link; the "Explore →" footer is just
 * a visual cue.
 * ============================================================ */

function ServiceCard({ service }: { service: ServiceLink }) {
  const Icon = iconMap[service.icon];
  return (
    <Link
      href={service.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-card border border-primary/15 bg-white/60 p-7 backdrop-blur-md shadow-card transition-all duration-300 ease-spring hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
      style={{ backgroundImage: "var(--gradient-card)" }}
    >
      {/* Subtle radial glow that fades in on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.45) 0%, transparent 70%)" }}
      />

      {/* Icon */}
      <span className="relative flex h-14 w-14 items-center justify-center rounded-card bg-accent-light/40 text-primary transition-transform duration-300 ease-spring group-hover:scale-110">
        <Icon size={26} />
      </span>

      {/* Title + subtitle */}
      <div className="relative mt-6">
        <h3 className="font-display text-h3 font-semibold leading-tight text-text-primary">
          {service.label}
        </h3>
        <p className="mt-2 inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.18em] text-primary">
          <span className="h-1 w-4 rounded-full bg-gradient-to-r from-primary to-accent" />
          {service.subtitle}
        </p>
      </div>

      {/* Description */}
      <p className="relative mt-5 text-body text-text-secondary">
        {service.cardCopy}
      </p>

      {/* CTA — pinned to bottom of the card */}
      <div className="relative mt-auto pt-6">
        <span className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-primary transition-colors group-hover:text-primary-dark">
          Explore
          <ArrowRight
            size={14}
            className="transition-transform duration-300 ease-spring group-hover:translate-x-1.5"
          />
        </span>
      </div>
    </Link>
  );
}
