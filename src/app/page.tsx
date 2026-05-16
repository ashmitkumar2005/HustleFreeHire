import { HeroMain } from "@/components/sections/HeroMain";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatBand } from "@/components/sections/StatBand";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";

/**
 * Home page (`/`).
 *
 * Sections are mounted in blueprint §8.1 order. Process, Logo
 * marquee, and CTA Banner come next.
 */
export default function Home() {
  return (
    <>
      <HeroMain />
      <StatBand />
      <ServicesSection />
      <WhyChooseUs />
      <IndustriesSection />
    </>
  );
}
