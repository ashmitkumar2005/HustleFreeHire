import { HeroMain } from "@/components/sections/HeroMain";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatBand } from "@/components/sections/StatBand";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

/**
 * Home page (`/`).
 *
 * Sections are mounted in blueprint §8.1 order. Steps 5–8 (in
 * progress) ship the home flow. Industries, Process, Logo marquee,
 * and CTA Banner come next.
 */
export default function Home() {
  return (
    <>
      <HeroMain />
      <StatBand />
      <ServicesSection />
      <WhyChooseUs />
    </>
  );
}
