/**
 * Schema.org JSON-LD builders.
 *
 * Each function returns a plain JSON-LD object shape. The <JsonLd />
 * component (src/components/seo/JsonLd.tsx) handles serialisation.
 * Centralising data here keeps page files clean and lets us tune
 * structured data in one place.
 *
 * References:
 *   - schema.org/EmploymentAgency
 *   - schema.org/Organization
 *   - schema.org/Service
 *   - schema.org/BreadcrumbList
 *   - schema.org/FAQPage
 */

import {
  contact,
  serviceLinks,
  site,
  SITE_URL,
  type ServiceLink,
} from "@/lib/constants";

const ABS = (path: string): string =>
  `${SITE_URL.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    alternateName: site.shortName,
    url: SITE_URL,
    description:
      "Connecting organizations with the right talent through streamlined recruitment and scalable staffing solutions across India.",
    logo: ABS("/opengraph-image"),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["en", "hi"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
  };
}

export function employmentAgencyJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: site.name,
    description:
      "Connecting organizations with the right talent through streamlined recruitment and scalable staffing solutions.",
    url: SITE_URL,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ludhiana",
      addressRegion: "Punjab",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: serviceLinks.map((s) => s.label),
    priceRange: "$$",
  };
}

export function serviceJsonLd(service: ServiceLink) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.label,
    name: service.label,
    description: service.longDescription,
    url: ABS(service.href),
    provider: {
      "@type": "EmploymentAgency",
      name: site.name,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };
}

export function breadcrumbJsonLd(
  items: ReadonlyArray<{ label: string; href: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: ABS(item.href),
    })),
  };
}

export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((entry) => ({
      "@type": "Question",
      name: entry.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.a,
      },
    })),
  };
}

export function webPageJsonLd({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: ABS(url),
    isPartOf: {
      "@type": "WebSite",
      name: site.name,
      url: SITE_URL,
    },
  };
}
