import { CTABanner } from "@/components/sections/CTABanner";
import { HeroMain } from "@/components/sections/HeroMain";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StatBand } from "@/components/sections/StatBand";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

/**
 * Home page (`/`).
 *
 * Section flow per blueprint §8.1.
 */
export default function Home() {
  return (
    <>
      <HeroMain />
      <StatBand />
      <ServicesSection />
      <WhyChooseUs />
      <IndustriesSection />
      <ProcessSection />
      <LogoMarquee />
      <CTABanner />

      <JsonLd
        data={breadcrumbJsonLd([{ label: "Home", href: "/" }])}
      />
    </>
  );
}
