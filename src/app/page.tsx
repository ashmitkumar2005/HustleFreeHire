import { HeroMain } from "@/components/sections/HeroMain";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatBand } from "@/components/sections/StatBand";

/**
 * Home page (`/`).
 *
 * Sections are mounted in blueprint §8.1 order.
 * Steps 5–7 ship Hero, StatBand, Services. The remaining homepage
 * sections (About snippet, Why Choose Us, Industries, Process, Logo
 * marquee, CTA Banner) ship in step 8.
 */
export default function Home() {
  return (
    <>
      <HeroMain />
      <StatBand />
      <ServicesSection />
    </>
  );
}
