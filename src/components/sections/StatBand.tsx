"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * StatBand — Trust Signal Band (blueprint §8.1 Section 2, §10).
 *
 * 4 stats in a horizontal row with subtle vertical dividers.
 * On enter (40% in view), each stat fades up in stagger and the
 * numeric counters ramp from 0 to target over 1.2s.
 *
 * Layout: 2×2 on mobile, 1×4 on lg (blueprint §11).
 */

type Stat =
  | { kind: "number"; value: number; suffix?: string; label: string }
  | { kind: "text"; value: string; label: string };

const STATS: ReadonlyArray<Stat> = [
  { kind: "number", value: 500, suffix: "+", label: "Placements" },
  { kind: "number", value: 10, suffix: "+", label: "Industries" },
  { kind: "number", value: 3, label: "Core Services" },
  { kind: "text", value: "Pan India", label: "Coverage" },
];

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function StatBand() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section
      ref={ref}
      aria-label="Key statistics"
      className="bg-bg-section py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <ul className="grid grid-cols-2 lg:grid-cols-4 lg:divide-x divide-border/70">
          {STATS.map((stat, i) => (
            <motion.li
              key={stat.label}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={FADE_UP}
              transition={{
                delay: i * 0.08,
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center justify-center px-4 py-4 text-center md:px-6"
            >
              <StatValue stat={stat} start={inView} />
              <p className="mt-2 text-xs font-sans font-semibold uppercase tracking-[0.18em] text-text-muted md:text-sm">
                {stat.label}
              </p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
 * StatValue — renders the big number/text headline of a stat.
 * Hooks are unconditionally called (rules of hooks).
 * ============================================================ */

function StatValue({ stat, start }: { stat: Stat; start: boolean }) {
  const target = stat.kind === "number" ? stat.value : 0;
  const animated = useCountUp(target, 1200, start);

  if (stat.kind === "text") {
    return (
      <span className="font-display text-[clamp(28px,5vw,52px)] font-extrabold leading-none tracking-[-0.018em] text-text-primary">
        {stat.value}
      </span>
    );
  }

  return (
    <span className="font-display text-[clamp(28px,5vw,52px)] font-extrabold leading-none tracking-[-0.018em] text-text-primary">
      {animated.toLocaleString()}
      {stat.suffix && (
        <span className="ml-0.5 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {stat.suffix}
        </span>
      )}
    </span>
  );
}
