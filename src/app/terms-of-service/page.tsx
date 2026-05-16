import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { contact, site } from "@/lib/constants";

const PAGE_DESC =
  "The terms that govern use of this website and the services HustleFreeHire provides.";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: PAGE_DESC,
  alternates: { canonical: "/terms-of-service" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 2026";

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Terms of Service" },
        ]}
        eyebrow="Legal"
        title={
          <>
            Terms of{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              Service
            </span>
          </>
        }
        subtitle={`The agreement between you and ${site.name}. Last updated ${LAST_UPDATED}.`}
      />

      <article className="bg-bg py-20 md:py-24">
        <div className="mx-auto w-full max-w-[820px] px-6 md:px-10">
          <Section title="1. Acceptance of terms">
            <p>
              By accessing or using {site.name} (&quot;the site&quot;) you
              agree to be bound by these terms. If you do not agree, please
              do not use the site.
            </p>
          </Section>

          <Section title="2. Use of the site">
            <p>
              You agree to use the site only for lawful purposes and in a
              manner that does not infringe the rights of, restrict, or
              inhibit anyone else&apos;s use of the site.
            </p>
          </Section>

          <Section title="3. Intellectual property">
            <p>
              All content on the site — copy, design, code, and brand assets
              — is the property of {site.name} unless otherwise indicated.
              You may not reproduce, modify, or distribute any portion of
              the site without prior written consent.
            </p>
          </Section>

          <Section title="4. Services">
            <p>
              Services described on the site are subject to a separate
              engagement letter or master services agreement signed between
              you and {site.name}. Nothing on this site constitutes a binding
              offer absent such a written agreement.
            </p>
          </Section>

          <Section title="5. Disclaimer">
            <p>
              The site and its content are provided &quot;as is&quot;
              without warranty of any kind. We do our best to keep the
              content accurate, but we do not guarantee that the site will
              be uninterrupted, secure, or error-free.
            </p>
          </Section>

          <Section title="6. Limitation of liability">
            <p>
              To the fullest extent permitted by applicable law,{" "}
              {site.name} shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising out of
              your use of the site.
            </p>
          </Section>

          <Section title="7. Governing law">
            <p>
              These terms are governed by the laws of India. Any disputes
              shall be subject to the exclusive jurisdiction of the courts
              at Ludhiana, Punjab.
            </p>
          </Section>

          <Section title="8. Changes to these terms">
            <p>
              We may update these terms from time to time. The &quot;last
              updated&quot; date reflects the latest revision. Continued use
              of the site after a change constitutes acceptance of the new
              terms.
            </p>
          </Section>

          <Section title="9. Contact">
            <p>
              Questions about these terms? Email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-primary hover:text-primary-dark"
              >
                {contact.email}
              </a>
              .
            </p>
          </Section>

          <p className="mt-12 text-sm text-text-muted">
            This page is a Phase 1 placeholder. Legal text should be reviewed
            by qualified counsel prior to public launch.
          </p>
        </div>
      </article>

      <JsonLd
        data={webPageJsonLd({
          url: "/terms-of-service",
          name: `Terms of Service — ${site.name}`,
          description: PAGE_DESC,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Terms of Service", href: "/terms-of-service" },
        ])}
      />
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="font-display text-h3 font-semibold leading-tight text-text-primary">
        {title}
      </h2>
      <div className="mt-4 space-y-3 text-body text-text-secondary [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-text-primary [&_ul]:list-disc [&_ul]:pl-5 [&_ul>li]:marker:text-primary">
        {children}
      </div>
    </section>
  );
}
