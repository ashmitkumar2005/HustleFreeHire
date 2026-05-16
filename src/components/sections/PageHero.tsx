"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

/**
 * PageHero — inner-page banner (blueprint §9 component, §8.2 §8.3
 * §8.4 §8.5 page heroes).
 *
 * Mirrors the homepage hero's visual language (teal gradient + hex
 * pattern + side glow) at a more compact ~40vh height. Every inner
 * page mounts this at the top, which is also why the navbar's
 * "transparent over dark" state continues to work on these pages.
 */

export type Crumb = {
  label: string;
  href?: string;
};

const FADE_UP = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function PageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  align = "left",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  breadcrumb?: ReadonlyArray<Crumb>;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <section
      aria-labelledby="page-hero-title"
      className="relative isolate overflow-hidden text-white -mt-[72px] pt-[72px]"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0F2A2A 0%, #0F4744 60%, #0F2A2A 100%)",
        minHeight: "min(560px, 60vh)",
      }}
    >
      <HexBackdrop />
      <CornerGlow />

      <div
        className={`relative mx-auto flex w-full max-w-[1280px] flex-col gap-5 px-6 py-16 md:px-10 md:py-24 ${
          isCenter ? "items-center text-center" : ""
        }`}
      >
        {breadcrumb && breadcrumb.length > 0 && (
          <motion.nav
            aria-label="Breadcrumb"
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            transition={{ duration: 0.4 }}
            className={`text-xs font-sans text-white/65 ${isCenter ? "mx-auto" : ""}`}
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumb.map((crumb, i) => {
                const isLast = i === breadcrumb.length - 1;
                return (
                  <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link
                        href={crumb.href}
                        className="transition-colors hover:text-white"
                      >
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white">{crumb.label}</span>
                    )}
                    {!isLast && (
                      <ChevronRight size={12} className="text-white/40" />
                    )}
                  </li>
                );
              })}
            </ol>
          </motion.nav>
        )}

        {eyebrow && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-sans font-medium text-accent-light backdrop-blur-sm">
              {eyebrow}
            </span>
          </motion.div>
        )}

        <motion.h1
          id="page-hero-title"
          initial="hidden"
          animate="visible"
          variants={FADE_UP}
          transition={{ delay: 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`font-display font-extrabold leading-[1.08] tracking-[-0.018em] text-[clamp(36px,5.4vw,60px)] ${
            isCenter ? "max-w-3xl" : "max-w-4xl"
          }`}
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial="hidden"
            animate="visible"
            variants={FADE_UP}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={`text-body-lg text-white/75 ${isCenter ? "max-w-2xl" : "max-w-2xl"}`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      {/* Soft fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-bg) 95%)",
        }}
      />
    </section>
  );
}

/* ============================================================
 * Background overlays — lighter density than the home hero so
 * the inner-page banner reads as a quieter sibling.
 * ============================================================ */

function HexBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]"
    >
      <defs>
        <pattern
          id="page-hero-hex"
          x="0"
          y="0"
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#A8EDE8" />
          <circle cx="24" cy="24" r="1" fill="#A8EDE8" />
        </pattern>
        <linearGradient id="page-hero-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="page-hero-mask">
          <rect width="100%" height="100%" fill="url(#page-hero-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#page-hero-hex)"
        mask="url(#page-hero-mask)"
      />
    </svg>
  );
}

function CornerGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full opacity-30 blur-3xl"
      style={{ background: "radial-gradient(circle, rgba(83,216,201,0.4) 0%, transparent 70%)" }}
    />
  );
}
