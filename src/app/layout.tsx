import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { employmentAgencyJsonLd, organizationJsonLd } from "@/lib/seo";
import { SITE_URL, site } from "@/lib/constants";

/**
 * Inter — body, UI labels, captions.
 * Variable font, so we don't pin weights.
 * Blueprint §4: weights 400, 500, 600, 700.
 */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/**
 * Sora — display, headings, stat counters.
 * Variable font, so we don't pin weights.
 * Blueprint §4: weights 600, 700, 800.
 */
const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const DEFAULT_TITLE =
  "HustleFreeHire Staffing Services | Recruitment & Staffing Agency India";
const DEFAULT_DESC =
  "HustleFreeHire connects businesses with top talent through contract staffing, permanent placement, and bulk hiring solutions across India.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: "%s — HustleFreeHire",
  },
  description: DEFAULT_DESC,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  category: "Recruitment & Staffing",
  keywords: [
    "staffing services India",
    "recruitment agency",
    "contract staffing",
    "permanent staffing",
    "bulk hiring",
    "HR solutions",
    "manpower solutions",
    "staffing agency Ludhiana",
    "manufacturing staffing India",
    "IT staffing agency India",
    "BPO recruitment",
    "pharma staffing",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: site.name,
    title: DEFAULT_TITLE,
    description:
      "Connecting right people with the right jobs. Pan-India staffing and recruitment solutions.",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description:
      "Connecting right people with the right jobs. Pan-India staffing and recruitment.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-bg text-text-primary">
        <SmoothScroll />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />

        {/* Site-wide structured data — Organization + EmploymentAgency
            (blueprint §12). Page-specific JSON-LD (BreadcrumbList,
            Service, FAQPage, etc.) is rendered inside individual pages. */}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={employmentAgencyJsonLd()} />
      </body>
    </html>
  );
}
