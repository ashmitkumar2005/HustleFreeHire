/**
 * Ambient type augmentations.
 *
 * `window.__lenis` is set by <SmoothScroll /> (see
 * src/components/layout/SmoothScroll.tsx) so other components — anchor
 * link handlers, scroll-to-top buttons, scroll-driven animation hooks —
 * can drive scrolling programmatically without re-importing Lenis.
 *
 * The double-underscore prefix avoids a conflict with the `lenis`
 * package's own ambient `Window.lenis` declaration (which types it as
 * a feature-flags object, not the Lenis class instance).
 */
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis: Lenis | null;
  }
}

export {};
