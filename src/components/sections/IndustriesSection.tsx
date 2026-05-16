"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
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
import { SectionHeading } from "@/components/ui/SectionHeading";
import { industries, type IndustryKey } from "@/lib/constants";

/**
 * IndustriesSection — "SECTORS WE COVER" (blueprint §8.1 Section 6, §19).
 *
 * 5×2 grid on lg, 3-up on md, 2×5 on mobile (blueprint §11). Each cell
 * is a clickable card to the Industries page. Hover state per §10:
 * background fills with --color-accent-light, icon scales 1.1×, the
 * label tints toward primary, and a small "Learn more" cue slides in.
 */

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

const FADE_UP = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

export function IndustriesSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      aria-labelledby="industries-heading"
      className="relative overflow-hidden bg-bg py-20 md:py-28"
    >
      {/* Subtle decorative blob */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tag="Sectors we cover"
            title={
              <>
                Serving Diverse Industries{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Across India
                </span>
              </>
            }
            subtitle="Our industry specialists bring contextual knowledge that generalist agencies simply can't match."
          />
          <Link
            href="/industries"
            className="group hidden shrink-0 items-center gap-2 text-sm font-sans font-semibold text-primary transition-colors hover:text-primary-dark lg:inline-flex"
          >
            Browse all sectors
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-spring group-hover:translate-x-1.5"
            />
          </Link>
        </div>

        <h2 id="industries-heading" className="sr-only">
          Industries we serve
        </h2>

        <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {industries.map((industry, i) => {
            const Icon = iconMap[industry.key];
            return (
              <motion.li
                key={industry.key}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={FADE_UP}
                transition={{
                  delay: i * 0.05,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  href="/industries"
                  className="group relative flex h-full flex-col items-start gap-4 overflow-hidden rounded-card border border-border bg-surface p-5 transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-primary/30 hover:bg-accent-light/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  {/* Icon tile */}
                  <span className="flex h-12 w-12 items-center justify-center rounded-input bg-accent-light/60 text-primary transition-all duration-300 ease-spring group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Icon size={22} />
                  </span>

                  {/* Label */}
                  <div className="flex w-full flex-col">
                    <span className="text-body font-sans font-semibold text-text-primary transition-colors group-hover:text-primary-dark">
                      {industry.label}
                    </span>
                    {/* Slide-in "Learn more" cue (blueprint §20.5) */}
                    <span className="mt-0 flex h-0 items-center gap-1 overflow-hidden text-xs font-sans font-medium uppercase tracking-[0.16em] text-primary opacity-0 transition-all duration-300 ease-spring group-hover:mt-1.5 group-hover:h-4 group-hover:opacity-100">
                      Learn more
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Mobile-only browse-all link */}
        <div className="mt-10 flex justify-center lg:hidden">
          <Link
            href="/industries"
            className="group inline-flex items-center gap-2 text-sm font-sans font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Browse all sectors
            <ArrowRight
              size={14}
              className="transition-transform duration-300 ease-spring group-hover:translate-x-1.5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
