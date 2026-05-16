"use client";

import { useEffect, useState } from "react";

/**
 * useCountUp — animate a number from 0 to `target` over `duration` ms
 * once `start` flips to true.
 *
 * Pure rAF, ease-out cubic. Light enough to use anywhere a number
 * needs to ramp in — primary user is StatBand (blueprint §10:
 * "number increment from 0 over 1.2s").
 *
 * Respects prefers-reduced-motion: returns the target immediately.
 */
export function useCountUp(
  target: number,
  duration = 1200,
  start = true,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    // Reduced motion: snap to target without animating.
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      // Ease-out cubic — matches our spring-feel motion language.
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, start]);

  return value;
}
