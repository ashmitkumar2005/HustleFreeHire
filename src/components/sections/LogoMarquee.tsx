"use client";

import {
  Aperture,
  Atom,
  Boxes,
  Building2,
  Compass,
  Crown,
  Gem,
  Hexagon,
  Layers3,
  Pyramid,
  type LucideIcon,
} from "lucide-react";
import { SectionTag } from "@/components/ui/SectionHeading";

/**
 * LogoMarquee — "TRUSTED BY" auto-scrolling logo strip
 * (blueprint §8.1 Section 8).
 *
 * Phase 1: greyscale placeholder marks. Phase 2 swaps in real client
 * logos. The track is 2× the placeholder set so the CSS marquee
 * animation can translate -50% and loop seamlessly. Hovering the
 * strip pauses the animation. The left and right edges fade out into
 * the section background so logos appear/disappear gracefully.
 */

type Placeholder = {
  name: string;
  icon: LucideIcon;
};

const PLACEHOLDERS: ReadonlyArray<Placeholder> = [
  { name: "Northwind Industries", icon: Hexagon },
  { name: "Vertex Logistics", icon: Pyramid },
  { name: "Helix Pharma", icon: Atom },
  { name: "Caelum Telecom", icon: Compass },
  { name: "Forge & Co.", icon: Layers3 },
  { name: "Auriga Banking", icon: Crown },
  { name: "Polaris BPO", icon: Aperture },
  { name: "Ember Construction", icon: Building2 },
  { name: "Strata Advertising", icon: Gem },
  { name: "Iridium Engineering", icon: Boxes },
];

export function LogoMarquee() {
  // Duplicate the set so the -50% translation loops cleanly.
  const track = [...PLACEHOLDERS, ...PLACEHOLDERS];

  return (
    <section
      aria-label="Trusted partners"
      className="relative overflow-hidden bg-bg py-14"
    >
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="flex justify-center">
          <SectionTag>Trusted by</SectionTag>
        </div>

        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-text-muted">
          Logos shown are placeholder marks while we onboard verified client
          partners.
        </p>
      </div>

      {/* Track + edge fades */}
      <div className="group relative mt-10">
        {/* Left fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-32"
          style={{
            background:
              "linear-gradient(to right, var(--color-bg) 10%, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-32"
          style={{
            background:
              "linear-gradient(to left, var(--color-bg) 10%, transparent)",
          }}
        />

        <ul
          className="flex w-max items-center gap-12 animate-marquee md:gap-16 group-hover:[animation-play-state:paused]"
          style={{ animation: "marquee 35s linear infinite" }}
        >
          {track.map((p, i) => {
            const Icon = p.icon;
            return (
              <li
                key={`${p.name}-${i}`}
                className="flex flex-none items-center gap-3 text-text-muted opacity-60 grayscale transition-all duration-300 ease-spring hover:text-primary hover:opacity-100 hover:grayscale-0"
              >
                <Icon size={22} className="flex-none" />
                <span className="font-display text-h4 font-semibold tracking-tight">
                  {p.name}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
