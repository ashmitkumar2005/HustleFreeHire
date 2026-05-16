"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Layers,
  Repeat,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * WhyChooseUs — alternating dark-teal section (blueprint §8.1 §5, §19).
 *
 * Left column: section heading + intro paragraph + CTA link.
 * Right column: 2×2 grid of glass-on-dark feature cards, one per pillar.
 *
 * Mobile collapses to a single column with the heading first, cards
 * stacked below (blueprint §11). Background is a dark-teal gradient
 * with the same hex-dot motif used by the hero, but masked with a
 * vertical gradient so it dissolves into the next section cleanly.
 */

type Pillar = {
  icon: LucideIcon;
  title: string;
  copy: string;
};

const PILLARS: ReadonlyArray<Pillar> = [
  {
    icon: Zap,
    title: "Speed to Hire",
    copy: "Reduce time-to-fill with a pre-vetted talent network built for your sector.",
  },
  {
    icon: Layers,
    title: "Industry Depth",
    copy: "Specialized recruiters across 10+ industries who understand your roles.",
  },
  {
    icon: ShieldCheck,
    title: "Full Compliance",
    copy: "From offer letters to payroll — we manage the entire employment lifecycle.",
  },
  {
    icon: Repeat,
    title: "Scalable Models",
    copy: "Contract, permanent, or bulk hiring — one partner for every growth stage.",
  },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="why-heading"
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0F2A2A 0%, #0F4744 55%, #0F2A2A 100%)",
      }}
    >
      <HexBackdrop />
      <CornerGlows />

      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-14 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
        {/* ---------- Left column ---------- */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          <motion.div variants={FADE_UP}>
            <SectionHeading
              tag="Why SH StaffHunt"
              inverted
              title={
                <>
                  The Staffing Partner{" "}
                  <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
                    That Performs
                  </span>
                </>
              }
              subtitle="We're built around the four things that actually move the needle on hiring outcomes — speed, expertise, compliance, and the flexibility to grow with you."
            />
          </motion.div>

          <motion.ul
            variants={FADE_UP}
            className="mt-10 flex flex-col gap-3 text-sm text-white/75"
          >
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Pan-India delivery, single point of contact
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Transparent pricing, no surprise placement fees
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" />
              Quarterly reviews to keep the partnership accountable
            </li>
          </motion.ul>

          <motion.div variants={FADE_UP} className="mt-10">
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-sm font-sans font-semibold text-accent transition-colors hover:text-accent-light"
            >
              Learn more about us
              <ArrowRight
                size={14}
                className="transition-transform duration-300 ease-spring group-hover:translate-x-1.5"
              />
            </Link>
          </motion.div>
        </motion.div>

        {/* ---------- Right column — 2x2 pillar grid ---------- */}
        <motion.ul
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
          }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5"
        >
          {PILLARS.map((p) => (
            <motion.li key={p.title} variants={FADE_UP}>
              <PillarCard pillar={p} />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ============================================================
 * PillarCard — glass-on-dark feature card.
 * ============================================================ */

function PillarCard({ pillar }: { pillar: Pillar }) {
  const Icon = pillar.icon;
  return (
    <article
      className="group relative h-full overflow-hidden rounded-card border border-white/12 bg-white/[0.05] p-6 backdrop-blur-md transition-all duration-300 ease-spring hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.08]"
    >
      {/* Soft hover glow */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.55) 0%, transparent 70%)" }}
      />

      <span className="relative flex h-12 w-12 items-center justify-center rounded-input bg-accent/15 text-accent transition-transform duration-300 ease-spring group-hover:scale-110">
        <Icon size={22} />
      </span>

      <h3 className="relative mt-5 font-display text-h4 font-semibold text-white">
        {pillar.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-white/70">
        {pillar.copy}
      </p>
    </article>
  );
}

/* ============================================================
 * Background overlays
 * ============================================================ */

function HexBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
    >
      <defs>
        <pattern
          id="why-hex-dots"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#A8EDE8" />
          <circle cx="22" cy="22" r="1" fill="#A8EDE8" />
        </pattern>
        <linearGradient id="why-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="35%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="why-mask">
          <rect width="100%" height="100%" fill="url(#why-fade)" />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill="url(#why-hex-dots)" mask="url(#why-mask)" />
    </svg>
  );
}

function CornerGlows() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/4 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.4) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(15,157,148,0.4) 0%, transparent 70%)" }}
      />
    </>
  );
}
