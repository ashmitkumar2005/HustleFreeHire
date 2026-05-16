import Link from "next/link";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import {
  contact,
  legalLinks,
  navLinks,
  serviceLinks,
  site,
  socials,
  type SocialKind,
} from "@/lib/constants";

/**
 * Footer — 4-column dark anchor (blueprint §8.1 §10, §9, §20.9).
 *
 * Background uses the deepest dark-teal token (--color-footer-bg, #0F2020)
 * to create an intentional "bottom of page" surface. Mobile collapses to a
 * single stacked column per blueprint §11.
 *
 * Social icons follow blueprint §10: scale(1.15) + teal color on hover.
 *
 * Note on social glyphs: lucide-react v1.x removed brand icons due to
 * trademark policy, so we ship our own inline SVGs below — small, sharp,
 * and currentColor-aware so they inherit hover state.
 */

type IconProps = { size?: number; className?: string };

function LinkedInGlyph({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function XGlyph({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
    </svg>
  );
}

function InstagramGlyph({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63 3.35.94 2.68 1.36 2.01 2.03 1.34 2.7.92 3.37.61 4.16.31 4.92.11 5.8.05 7.07.01 8.34 0 8.75 0 12s.01 3.66.07 4.93c.06 1.27.26 2.15.56 2.91.31.79.73 1.46 1.4 2.13.67.67 1.34 1.09 2.13 1.4.76.3 1.64.5 2.91.56C8.34 23.99 8.75 24 12 24s3.66-.01 4.93-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.73 2.13-1.4.67-.67 1.09-1.34 1.4-2.13.3-.76.5-1.64.56-2.91.06-1.27.07-1.68.07-4.93s-.01-3.66-.07-4.93c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.4-2.13 5.86 5.86 0 0 0-2.13-1.4C19.08.33 18.2.13 16.93.07 15.66.01 15.25 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 12 8a4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  );
}

function FacebookGlyph({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.96h-1.51c-1.49 0-1.96.93-1.96 1.89v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}

const socialIcons: Record<SocialKind, React.ComponentType<{ size?: number; className?: string }>> = {
  linkedin: LinkedInGlyph,
  twitter: XGlyph,
  instagram: InstagramGlyph,
  facebook: FacebookGlyph,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative mt-24 text-white/80"
      style={{ backgroundColor: "var(--color-footer-bg)" }}
    >
      {/* Subtle teal top accent line (premium detail) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(83,216,201,0.4), transparent)" }}
      />

      <div className="mx-auto w-full max-w-[1280px] px-6 py-16 md:px-10 md:py-20">
        {/* 4-column grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Col 1 — Brand */}
          <div className="lg:col-span-4">
            <Logo inverted />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              {site.tagline}. Pan-India staffing and recruitment solutions —
              contract, permanent, and bulk hiring for modern enterprises.
            </p>
            <ul className="mt-6 flex items-center gap-3">
              {socials.map((s) => {
                const Icon = socialIcons[s.kind];
                return (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="group flex h-10 w-10 items-center justify-center rounded-pill border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 ease-spring hover:scale-[1.15] hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                    >
                      <Icon size={16} className="transition-colors" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 2 — Quick Links */}
          <div className="lg:col-span-2">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div className="lg:col-span-3">
            <FooterHeading>Services</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3">
              {serviceLinks.map((s) => (
                <li key={s.href}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
              <li>
                <FooterLink href="/services">All services →</FooterLink>
              </li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div className="lg:col-span-3">
            <FooterHeading>Get in Touch</FooterHeading>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 flex-none text-accent" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 flex-none text-accent" />
                <a
                  href={`tel:${contact.phone.replace(/[^+0-9]/g, "")}`}
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-none text-accent" />
                <span className="text-white/70">{contact.city}</span>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle size={16} className="mt-0.5 flex-none text-accent" />
                <a
                  href={contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 transition-colors hover:text-accent"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-14 h-px w-full bg-white/10" />

        {/* Copyright bar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-white/50 md:flex-row md:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
 * Internal helpers
 * ============================================================ */

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-sans font-semibold uppercase tracking-[0.18em] text-white">
      {children}
    </h3>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center text-sm text-white/70 transition-colors hover:text-accent"
    >
      <span className="relative">
        {children}
        <span
          aria-hidden="true"
          className="absolute -bottom-0.5 left-0 h-px w-0 bg-accent transition-all duration-300 ease-spring group-hover:w-full"
        />
      </span>
    </Link>
  );
}
