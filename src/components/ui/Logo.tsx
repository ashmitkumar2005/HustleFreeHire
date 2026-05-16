import Link from "next/link";
import { site } from "@/lib/constants";

/**
 * HFH monogram + wordmark.
 *
 * Blueprint §3: "Wordmark + icon monogram (initials 'HFH' in geometric form).
 * Navbar: Icon left + 'HustleFreeHire' wordmark, 'Staffing Services' in
 * lighter weight below."
 *
 * The mark is a soft-cornered teal tile with three vertical strokes that read
 * as "H | F | H" — a geometric reduction of the brand initials. Pure inline
 * SVG, zero asset dependency, scales cleanly to favicon size.
 */
export function LogoMark({
  size = 36,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id="hfh-mark-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#0F9D94" />
          <stop offset="100%" stopColor="#0A7A72" />
        </linearGradient>
      </defs>
      {/* Soft-cornered tile */}
      <rect width="40" height="40" rx="10" fill="url(#hfh-mark-grad)" />
      {/* Left H stem */}
      <rect x="8" y="11" width="3" height="18" rx="1.2" fill="#FFFFFF" />
      {/* H crossbar (left) */}
      <rect x="8" y="18.5" width="9" height="3" rx="1.2" fill="#FFFFFF" />
      {/* Right H stem (left) */}
      <rect x="14" y="11" width="3" height="18" rx="1.2" fill="#FFFFFF" />
      {/* F middle stem */}
      <rect x="20" y="11" width="3" height="18" rx="1.2" fill="#A8EDE8" />
      <rect x="20" y="11" width="8" height="3" rx="1.2" fill="#A8EDE8" />
      <rect x="20" y="18.5" width="6" height="3" rx="1.2" fill="#A8EDE8" />
      {/* Right H */}
      <rect x="29" y="11" width="3" height="18" rx="1.2" fill="#FFFFFF" />
      <rect x="29" y="18.5" width="9" height="3" rx="1.2" fill="#FFFFFF" />
      <rect x="35" y="11" width="3" height="18" rx="1.2" fill="#FFFFFF" />
    </svg>
  );
}

export function Logo({
  /** When true, the wordmark color flips to white — for use on dark backgrounds (footer, hero overlay). */
  inverted = false,
  /** Hide the "Staffing Services" sub-line — useful in tight footers. */
  compact = false,
  className,
}: {
  inverted?: boolean;
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-3 ${className ?? ""}`}
      aria-label={`${site.name} — home`}
    >
      <LogoMark
        size={36}
        className="transition-transform duration-300 group-hover:rotate-[-4deg]"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[18px] font-bold tracking-tight ${
            inverted ? "text-white" : "text-text-primary"
          }`}
        >
          {site.shortName}
        </span>
        {!compact && (
          <span
            className={`mt-1 text-xs font-sans font-medium tracking-wide ${
              inverted ? "text-accent-light" : "text-text-muted"
            }`}
          >
            Staffing Services
          </span>
        )}
      </span>
    </Link>
  );
}
