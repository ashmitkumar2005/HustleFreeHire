import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo";
import { contact, site } from "@/lib/constants";

const PAGE_DESC =
  "How HustleFreeHire collects, uses, and protects information from website visitors and applicants.";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: PAGE_DESC,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "May 2026";

/**
 * Privacy Policy — Phase 1 placeholder. The structure is real and
 * crawlable so the footer / sitemap link doesn't 404; the substantive
 * legal text needs review by legal counsel before a hard launch.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        eyebrow="Legal"
        title={
          <>
            Privacy{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              Policy
            </span>
          </>
        }
        subtitle={`How we handle the information you share with us. Last updated ${LAST_UPDATED}.`}
      />

      <article className="bg-bg py-20 md:py-24">
        <div className="mx-auto w-full max-w-[820px] px-6 md:px-10 prose-section">
          <Section title="1. Overview">
            <p>
              {site.name} (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;)
              respects your privacy. This policy describes the information we
              collect through this website, how we use it, and the choices
              you have. By using the site you agree to the practices described
              here.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <ul>
              <li>
                <strong>Contact form submissions:</strong> name, company,
                email, phone, the service you&apos;re interested in, and the
                message you send us.
              </li>
              <li>
                <strong>Technical data:</strong> standard server logs (IP
                address, user agent, referrer, timestamp) used to operate and
                secure the site.
              </li>
              <li>
                <strong>Analytics:</strong> when configured, anonymised usage
                statistics from Google Analytics or Vercel Analytics.
              </li>
            </ul>
          </Section>

          <Section title="3. How we use information">
            <ul>
              <li>To respond to enquiries and deliver the services you request.</li>
              <li>To match candidates with relevant roles when applicable.</li>
              <li>To improve and secure the website.</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </Section>

          <Section title="4. Sharing">
            <p>
              We do not sell or rent personal information. We share data only
              with: (a) service providers who help us operate the site (e.g.
              email delivery, analytics) under appropriate confidentiality
              terms, and (b) parties as required by law.
            </p>
          </Section>

          <Section title="5. Data retention">
            <p>
              We retain submission data only for as long as necessary to
              respond to your enquiry, fulfil services, and meet legal
              record-keeping obligations.
            </p>
          </Section>

          <Section title="6. Your rights">
            <p>
              You can request access to, correction of, or deletion of your
              personal information at any time. To exercise these rights,
              email us at{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-primary hover:text-primary-dark"
              >
                {contact.email}
              </a>
              .
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              We use a minimal set of cookies required for the site to
              function and, where enabled, anonymous analytics cookies. You
              can disable cookies in your browser settings.
            </p>
          </Section>

          <Section title="8. Changes to this policy">
            <p>
              We may update this policy from time to time. The &quot;last
              updated&quot; date at the top of this page reflects the latest
              version.
            </p>
          </Section>

          <Section title="9. Contact us">
            <p>
              Questions about privacy? Email{" "}
              <a
                href={`mailto:${contact.email}`}
                className="text-primary hover:text-primary-dark"
              >
                {contact.email}
              </a>{" "}
              or call {contact.phone}.
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
          url: "/privacy-policy",
          name: `Privacy Policy — ${site.name}`,
          description: PAGE_DESC,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { label: "Home", href: "/" },
          { label: "Privacy Policy", href: "/privacy-policy" },
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
