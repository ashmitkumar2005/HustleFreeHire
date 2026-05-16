import type { Metadata } from "next";
import {
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHero } from "@/components/sections/PageHero";
import { contact, site } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Contact — ${site.name}`,
  description:
    "Tell us about your hiring needs. We respond within 24 business hours, or chat with us directly on WhatsApp.",
};

/**
 * Contact page (`/contact`) — blueprint §8.5.
 */
export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
        eyebrow="Let's talk"
        title={
          <>
            Let&apos;s talk{" "}
            <span className="bg-gradient-to-r from-accent-light via-accent to-white bg-clip-text text-transparent">
              workforce
            </span>
          </>
        }
        subtitle="Tell us what you're hiring for, the timelines, and the constraints. Our team will reach out within 24 business hours with a tailored plan."
      />

      <ContactBody />
      <QuickResponsePromise />
    </>
  );
}

/* ============================================================
 * Contact body — form left, info right
 * ============================================================ */

function ContactBody() {
  return (
    <section
      aria-labelledby="contact-heading"
      className="relative bg-bg py-20 md:py-28"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
        {/* ---------- Form column ---------- */}
        <div className="lg:col-span-7">
          <h2
            id="contact-heading"
            className="font-display text-h2 font-semibold leading-tight tracking-[-0.01em] text-text-primary"
          >
            Send us a message
          </h2>
          <p className="mt-3 text-body text-text-secondary">
            We read every message. Six fields, one team, no autoresponders.
          </p>
          <div className="mt-8 rounded-card border border-border bg-surface p-6 shadow-card md:p-8">
            <ContactForm />
          </div>
        </div>

        {/* ---------- Info column ---------- */}
        <aside className="lg:col-span-5">
          <h2 className="font-display text-h3 font-semibold text-text-primary">
            Or reach us directly
          </h2>
          <p className="mt-3 text-body text-text-secondary">
            Prefer a call, an email, or a quick WhatsApp ping? Pick whatever
            channel works best for you.
          </p>

          <ul className="mt-8 flex flex-col gap-4">
            <ContactRow
              icon={<Mail size={18} />}
              label="Email"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <ContactRow
              icon={<Phone size={18} />}
              label="Phone"
              value={contact.phone}
              href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}
            />
            <ContactRow
              icon={<MessageCircle size={18} />}
              label="WhatsApp"
              value="Chat with us"
              href={contact.whatsapp}
              external
            />
            <ContactRow
              icon={<MapPin size={18} />}
              label="Office"
              value={contact.city}
            />
            <ContactRow
              icon={<Clock size={18} />}
              label="Hours"
              value="Mon–Sat · 10:00 to 19:00 IST"
            />
          </ul>

          {/* Map placeholder — Phase 1 stand-in for the eventual Google
              Maps embed. Stylized teal grid + central pin so the column
              doesn't look empty. */}
          <div className="mt-8 overflow-hidden rounded-card border border-border bg-surface shadow-card">
            <div className="relative h-56 w-full">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage: "var(--gradient-section)",
                }}
              />
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full opacity-40"
              >
                <defs>
                  <pattern
                    id="map-grid"
                    width="32"
                    height="32"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 32 0 L 0 0 0 32"
                      fill="none"
                      stroke="rgba(15,157,148,0.18)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#map-grid)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-pill text-white shadow-cta">
                  <span
                    className="absolute inset-0 rounded-pill"
                    style={{
                      backgroundImage:
                        "linear-gradient(135deg, #0F9D94 0%, #53D8C9 100%)",
                    }}
                  />
                  <MapPin size={20} className="relative" />
                </span>
              </div>
            </div>
            <div className="border-t border-border bg-surface px-4 py-3 text-xs text-text-muted">
              Map embed coming soon · {contact.city}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
  external,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
}) {
  const inner = (
    <span className="flex items-start gap-3">
      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-input bg-accent-light/60 text-primary">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="text-xs font-sans font-semibold uppercase tracking-[0.16em] text-text-muted">
          {label}
        </span>
        <span className="mt-0.5 text-body font-medium text-text-primary group-hover:text-primary-dark">
          {value}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <li>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="group block rounded-card border border-border bg-surface p-4 transition-colors hover:border-primary/30 hover:bg-bg-section/40"
        >
          {inner}
        </a>
      </li>
    );
  }

  return (
    <li className="rounded-card border border-border bg-surface p-4">
      {inner}
    </li>
  );
}

/* ============================================================
 * Quick response promise band
 * ============================================================ */

function QuickResponsePromise() {
  return (
    <section className="bg-bg-section py-14">
      <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-5 px-6 text-center md:flex-row md:items-center md:justify-between md:text-left md:px-10">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent-light/60 text-primary">
            <Clock size={20} />
          </span>
          <div>
            <p className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-primary">
              Quick response promise
            </p>
            <p className="mt-1 text-body font-medium text-text-primary">
              We respond within 24 business hours — every single message.
            </p>
          </div>
        </div>
        <p className="text-sm text-text-secondary">
          Need it faster?{" "}
          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            Ping us on WhatsApp
          </a>{" "}
          for an immediate reply.
        </p>
      </div>
    </section>
  );
}
