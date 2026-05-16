"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — global Lenis-powered scrolling.
 *
 * Mounted once in the root layout. It:
 *   1. Initializes a single Lenis instance with the easing curve tuned
 *      for our spring-feel motion language (blueprint §10).
 *   2. Drives the rAF loop for the lifetime of the app.
 *   3. Exposes `window.__lenis` so any component (Navbar, anchor links,
 *      "back to top" buttons) can call `window.__lenis?.scrollTo(...)`.
 *      Note: the property is prefixed `__lenis` because the lenis
 *      package itself ships an ambient `Window.lenis` typed as a
 *      feature-flags object that conflicts with the instance type.
 *   4. Bails out entirely when the user prefers reduced motion — Lenis
 *      should never fight an accessibility preference.
 *
 * Returns null; this is a side-effect-only component.
 */
export default function SmoothScroll() {
  useEffect(() => {
    // Respect prefers-reduced-motion: reduce — no smooth-scroll override.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
    });

    // Expose lenis instance globally for programmatic scrolling.
    window.__lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      window.__lenis = null;
      lenis.destroy();
    };
  }, []);

  return null;
}
