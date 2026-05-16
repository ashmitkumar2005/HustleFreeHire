import { HeroMain } from "@/components/sections/HeroMain";

/**
 * Home page (`/`).
 *
 * Sections are mounted in blueprint §8.1 order. Step 5 ships the Hero
 * only — StatBand (step 6), Services (step 7), and the rest (step 8)
 * will be appended below as we go.
 */
export default function Home() {
  return (
    <>
      <HeroMain />
    </>
  );
}
