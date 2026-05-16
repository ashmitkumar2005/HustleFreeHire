import { HeroMain } from "@/components/sections/HeroMain";
import { StatBand } from "@/components/sections/StatBand";

/**
 * Home page (`/`).
 *
 * Sections are mounted in blueprint §8.1 order. Steps 5 & 6 ship Hero +
 * StatBand. Services (step 7) and the rest (step 8) will be appended
 * below as we go.
 */
export default function Home() {
  return (
    <>
      <HeroMain />
      <StatBand />
    </>
  );
}
