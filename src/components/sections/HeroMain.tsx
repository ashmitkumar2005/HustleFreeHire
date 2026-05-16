"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Layers, MapPin, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";

/**
 * HeroMain — Home page hero (blueprint §8.1 Section 1, §19, §20).
 *
 * Layout:
 *   - ~90vh, full-width dark teal gradient.
 *   - SVG hex-dot pattern overlay (blueprint §6 visual motif).
 *   - Two-column on lg: copy on the left, network illustration with
 *     three floating glass stat cards on the right.
 *   - Single column on mobile (illustration drops below copy per §11).
 *
 * The section uses negative top margin so the dark gradient extends
 * underneath the sticky navbar — the navbar goes from inverted (white
 * text, transparent) at the top to the standard frosted state on
 * scroll, controlled by the Navbar component itself.
 */

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const STAGGER = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export function HeroMain() {
  const reduce = useReducedMotion();

  // Disable continuous float when the user prefers reduced motion.
  const floatTransition = reduce
    ? undefined
    : {
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut" as const,
      };

  return (
    <section
      aria-labelledby="hero-headline"
      className="relative isolate overflow-hidden text-white -mt-[72px] pt-[72px]"
      style={{
        background: "var(--gradient-hero)",
        minHeight: "min(900px, 92vh)",
      }}
    >
      {/* Background layers */}
      <HexPattern />
      <GlowOrbs />

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-6 pb-20 pt-12 md:px-10 md:pt-16 lg:flex-row lg:items-center lg:gap-16 lg:py-24">
        {/* ---------- Left column ---------- */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={STAGGER}
          className="relative z-10 flex-1"
        >
          {/* Badge */}
          <motion.div variants={FADE_UP}>
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/[0.06] px-4 py-1.5 text-sm font-sans font-medium text-accent-light backdrop-blur-sm">
              <Sparkles size={14} className="text-accent" />
              Pan India Staffing Solutions
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            id="hero-headline"
            variants={FADE_UP}
            className="mt-6 font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(40px,6.4vw,72px)]"
          >
            Building Reliable{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              Workforce Solutions
            </span>
            <br className="hidden sm:block" /> for Modern Businesses
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={FADE_UP}
            className="mt-6 max-w-xl text-body-lg text-white/75"
          >
            We connect organizations with the right talent through streamlined
            recruitment and scalable staffing solutions —{" "}
            <span className="text-white">faster, smarter, compliance-first.</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={FADE_UP}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              href="/services"
              variant="gradient"
              size="lg"
              iconRight={<ArrowRight size={16} />}
            >
              Explore Our Services
            </Button>
            <Button
              href="/contact"
              size="lg"
              className="border border-white/20 bg-white/[0.04] text-white hover:border-white/40 hover:bg-white/[0.08]"
              iconRight={<ArrowRight size={16} />}
            >
              Talk to Us
            </Button>
          </motion.div>

          {/* Trust micro-stat row */}
          <motion.ul
            variants={FADE_UP}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/70"
          >
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>
                <span className="font-semibold text-white">500+</span> Placements
              </span>
            </li>
            <li className="hidden h-3 w-px bg-white/15 sm:block" />
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>
                <span className="font-semibold text-white">10+</span> Industries
              </span>
            </li>
            <li className="hidden h-3 w-px bg-white/15 sm:block" />
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>Pan India Network</span>
            </li>
          </motion.ul>
        </motion.div>

        {/* ---------- Right column — illustration ---------- */}
        <div className="relative h-[420px] w-full flex-1 lg:h-[520px]">
          <NetworkIllustration />

          {/* Floating stat cards — positioned absolutely within the right col */}
          <FloatingCard
            delay={0.6}
            floatTransition={floatTransition}
            position="top-4 right-2 lg:top-6 lg:right-4"
            icon={<TrendingUp size={18} />}
            value="500+"
            label="Successful Placements"
          />
          <FloatingCard
            delay={0.8}
            floatTransition={floatTransition}
            position="bottom-12 left-0 lg:bottom-20 lg:left-2"
            icon={<Layers size={18} />}
            value="10+"
            label="Industries Served"
          />
          <FloatingCard
            delay={1.0}
            floatTransition={floatTransition}
            position="bottom-0 right-6 lg:bottom-6 lg:right-12"
            icon={<MapPin size={18} />}
            value="Pan"
            valueSuffix="India"
            label="Coverage Network"
          />
        </div>
      </div>

      {/* Bottom soft fade into the next section */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--color-bg) 95%)",
        }}
      />
    </section>
  );
}

/* ============================================================
 * Floating glassmorphism stat card
 * ============================================================ */

function FloatingCard({
  delay,
  floatTransition,
  position,
  icon,
  value,
  valueSuffix,
  label,
}: {
  delay: number;
  floatTransition: object | undefined;
  position: string;
  icon: React.ReactNode;
  value: string;
  valueSuffix?: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute ${position} z-10`}
    >
      <motion.div
        animate={floatTransition ? { y: [0, -6, 0] } : undefined}
        transition={floatTransition}
        className="flex items-center gap-3 rounded-card border border-white/15 bg-white/[0.08] px-4 py-3 backdrop-blur-md shadow-[0_8px_32px_rgba(15,32,32,0.32)]"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-input bg-accent/15 text-accent">
          {icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="font-display text-h4 font-bold text-white">
            {value}
            {valueSuffix && (
              <span className="ml-1 text-body font-medium text-accent-light">
                {valueSuffix}
              </span>
            )}
          </span>
          <span className="text-xs font-sans text-white/70">{label}</span>
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================
 * Network illustration
 * Abstract people-as-nodes graph (blueprint §8.1).
 * ============================================================ */

function NetworkIllustration() {
  // Pre-computed node coordinates on a 400x400 viewBox.
  const nodes = [
    { x: 80, y: 90, r: 7 },
    { x: 200, y: 60, r: 9 },
    { x: 320, y: 110, r: 6 },
    { x: 60, y: 220, r: 6 },
    { x: 200, y: 200, r: 12 }, // central hub
    { x: 340, y: 240, r: 7 },
    { x: 110, y: 340, r: 8 },
    { x: 250, y: 340, r: 6 },
  ];

  // Lines connect every outer node to the central hub plus a few extras.
  const lines: Array<[number, number]> = [
    [0, 4],
    [1, 4],
    [2, 4],
    [3, 4],
    [5, 4],
    [6, 4],
    [7, 4],
    [0, 1],
    [1, 2],
    [3, 6],
    [5, 7],
  ];

  return (
    <motion.svg
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      viewBox="0 0 400 400"
      className="absolute inset-0 m-auto h-full w-full"
      role="img"
      aria-label="Network of connected talent nodes"
    >
      <defs>
        <radialGradient id="hub-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#53D8C9" stopOpacity="0.7" />
          <stop offset="60%" stopColor="#0F9D94" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0F9D94" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="node-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A8EDE8" />
          <stop offset="100%" stopColor="#53D8C9" />
        </radialGradient>
      </defs>

      {/* Soft glow behind central hub */}
      <circle cx="200" cy="200" r="160" fill="url(#hub-glow)" />

      {/* Connecting lines */}
      {lines.map(([a, b], i) => {
        const A = nodes[a];
        const B = nodes[b];
        return (
          <motion.line
            key={`l-${i}`}
            x1={A.x}
            y1={A.y}
            x2={B.x}
            y2={B.y}
            stroke="rgba(168, 237, 232, 0.35)"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.05, duration: 0.6 }}
          />
        );
      })}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.g
          key={`n-${i}`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.7 + i * 0.06,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* Outer halo */}
          <motion.circle
            cx={n.x}
            cy={n.y}
            r={n.r + 8}
            fill="rgba(83, 216, 201, 0.12)"
            animate={{
              r: [n.r + 6, n.r + 12, n.r + 6],
              opacity: [0.4, 0.15, 0.4],
            }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          {/* Solid node */}
          <circle cx={n.x} cy={n.y} r={n.r} fill="url(#node-grad)" />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="1"
          />
        </motion.g>
      ))}
    </motion.svg>
  );
}

/* ============================================================
 * Hex pattern background overlay (blueprint §6)
 * ============================================================ */

function HexPattern() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="hex-dots"
          x="0"
          y="0"
          width="48"
          height="48"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#A8EDE8" />
          <circle cx="26" cy="26" r="1" fill="#A8EDE8" />
        </pattern>
        <linearGradient id="hex-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="80%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="hex-mask">
          <rect width="100%" height="100%" fill="url(#hex-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#hex-dots)"
        mask="url(#hex-mask)"
      />
    </svg>
  );
}

/* ============================================================
 * Atmospheric glow orbs — soft teal/aqua bokeh spots
 * ============================================================ */

function GlowOrbs() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #53D8C9 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-[360px] w-[360px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #0F9D94 0%, transparent 70%)" }}
      />
    </>
  );
}
