"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ClipboardCheck,
  Filter,
  ListChecks,
  Search,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * ProcessSection — "HOW IT WORKS" 4-step timeline (blueprint §8.1
 * Section 7, §6 visual motif: connecting lines, §19 copy).
 *
 * Layout:
 *   • lg+: 4-column horizontal timeline; badges sit at the top of each
 *     column with a single faded connecting line passing through them.
 *   • mobile: vertical stack with a vertical line through the badges
 *     on the left, and content laid out to the right.
 */

type Step = {
  number: string;
  icon: LucideIcon;
  title: string;
  copy: string;
};

const STEPS: ReadonlyArray<Step> = [
  {
    number: "01",
    icon: Search,
    title: "Understand",
    copy: "We start by deeply understanding your role requirements, culture fit, and urgency.",
  },
  {
    number: "02",
    icon: Filter,
    title: "Source & Screen",
    copy: "We tap our network and run structured screening to surface only qualified candidates.",
  },
  {
    number: "03",
    icon: ListChecks,
    title: "Match & Present",
    copy: "Shortlisted profiles are delivered with full context within your timeline.",
  },
  {
    number: "04",
    icon: ClipboardCheck,
    title: "Onboard & Support",
    copy: "We handle documentation, compliance, and remain your point of contact post-placement.",
  },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      ref={ref}
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-bg-section py-20 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 h-[400px] w-[400px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(15,157,148,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <SectionHeading
          tag="How it works"
          title={
            <>
              Our 4-Step{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Hiring Process
              </span>
            </>
          }
          subtitle="Predictable, transparent, and built around the way modern teams actually hire."
          align="center"
          className="mx-auto"
        />

        <h2 id="process-heading" className="sr-only">
          Our 4-Step Hiring Process
        </h2>

        {/* Timeline grid */}
        <div className="relative mt-16">
          {/* Horizontal connecting line — desktop only.
              Sits at y = 28px (badge center) within the grid track,
              fades at both ends so it dissolves into whitespace. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] top-7 hidden h-px lg:block"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--color-primary) 8%, var(--color-accent) 50%, var(--color-primary) 92%, transparent)",
              opacity: 0.4,
            }}
          />

          {/* Vertical connecting line — mobile only.
              x = 28px (badge horizontal center). */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-7 top-7 bottom-7 w-px lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, var(--color-primary) 0%, var(--color-accent) 50%, var(--color-primary) 100%)",
              opacity: 0.35,
            }}
          />

          <ol className="grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
            {STEPS.map((step, i) => (
              <motion.li
                key={step.number}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                variants={FADE_UP}
                transition={{
                  delay: i * 0.12,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex flex-row items-start gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                <Badge step={step} />

                <div className="flex-1 lg:flex-none lg:max-w-[260px]">
                  <h3 className="font-display text-h4 font-semibold leading-tight text-text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {step.copy}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * Badge — circular gradient marker with the step number front and
 * a small icon corner badge. Sits on the connecting line.
 * ============================================================ */

function Badge({ step }: { step: Step }) {
  const Icon = step.icon;
  return (
    <span
      aria-hidden="true"
      className="relative z-10 flex h-14 w-14 flex-none items-center justify-center rounded-pill text-white shadow-[0_8px_24px_rgba(15,157,148,0.32)] ring-4 ring-bg-section"
      style={{
        backgroundImage: "linear-gradient(135deg, #0F9D94 0%, #53D8C9 100%)",
      }}
    >
      <span className="font-display text-h4 font-bold">{step.number}</span>
      {/* Icon mini-badge attached to the bottom-right of the number badge */}
      <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-pill border-2 border-bg-section bg-surface text-primary shadow-[0_4px_12px_rgba(15,32,32,0.12)]">
        <Icon size={13} />
      </span>
    </span>
  );
}
