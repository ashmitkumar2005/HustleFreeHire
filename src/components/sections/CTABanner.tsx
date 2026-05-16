"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SectionTag } from "@/components/ui/SectionHeading";
import { contact } from "@/lib/constants";

/**
 * CTABanner — full-width teal gradient closer (blueprint §8.1 Section 9, §19).
 *
 * Sits just above the footer. Hex-dot pattern overlay matches the hero
 * for visual continuity, but the gradient is brighter (90° primary →
 * accent → primary) so it reads as an invitation rather than a hero.
 */

const FADE_UP = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function CTABanner() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      ref={ref}
      aria-labelledby="cta-heading"
      className="relative isolate overflow-hidden text-white"
      style={{
        backgroundImage:
          "linear-gradient(135deg, #0F9D94 0%, #0A7A72 45%, #0F2A2A 100%)",
      }}
    >
      <HexBackdrop />
      <SideGlows />

      <div className="relative mx-auto w-full max-w-[1280px] px-6 py-20 text-center md:px-10 md:py-28">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          <motion.div variants={FADE_UP} className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/[0.08] px-4 py-1.5 text-sm text-accent-light backdrop-blur-sm">
              <SectionTag className="text-accent-light">
                Let&apos;s build together
              </SectionTag>
            </span>
          </motion.div>

          <motion.h2
            id="cta-heading"
            variants={FADE_UP}
            className="mt-6 mx-auto max-w-3xl font-display font-extrabold leading-[1.1] tracking-[-0.018em] text-[clamp(34px,5vw,52px)] text-white"
          >
            Ready to Build a{" "}
            <span className="bg-gradient-to-r from-white via-accent-light to-white bg-clip-text text-transparent">
              Stronger Workforce
            </span>
            ?
          </motion.h2>

          <motion.p
            variants={FADE_UP}
            className="mx-auto mt-5 max-w-2xl text-body-lg text-white/80"
          >
            Tell us your hiring needs and our team will reach out within
            <span className="font-semibold text-white"> 24 hours.</span>
          </motion.p>

          <motion.div
            variants={FADE_UP}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button
              href="/contact"
              variant="gradient"
              size="lg"
              iconRight={<ArrowRight size={16} />}
            >
              Start Hiring Now
            </Button>
            <Button
              href={contact.whatsapp}
              external
              size="lg"
              className="border border-white/30 bg-white/[0.06] text-white hover:border-white/60 hover:bg-white/[0.12]"
              iconLeft={<MessageCircle size={16} />}
            >
              Reach Out on WhatsApp
            </Button>
          </motion.div>

          <motion.p
            variants={FADE_UP}
            className="mt-8 text-xs uppercase tracking-[0.18em] text-white/55"
          >
            No obligation · Free consultation · Pan-India coverage
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
 * Background overlays
 * ============================================================ */

function HexBackdrop() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.16]"
    >
      <defs>
        <pattern
          id="cta-hex-dots"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="#FFFFFF" />
          <circle cx="22" cy="22" r="1" fill="#FFFFFF" />
        </pattern>
        <linearGradient id="cta-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="cta-mask">
          <rect width="100%" height="100%" fill="url(#cta-fade)" />
        </mask>
      </defs>
      <rect
        width="100%"
        height="100%"
        fill="url(#cta-hex-dots)"
        mask="url(#cta-mask)"
      />
    </svg>
  );
}

function SideGlows() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(83,216,201,0.5) 0%, transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 bottom-0 h-[360px] w-[360px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,237,232,0.45) 0%, transparent 70%)" }}
      />
    </>
  );
}
