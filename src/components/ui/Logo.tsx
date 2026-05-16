import Link from "next/link";
import { site } from "@/lib/constants";

/**
 * SH StaffHunt monogram + wordmark.
 *
 * The mark is a soft-cornered teal tile with a bold "SH" monogram.
 * This is a placeholder — the final logo asset will be dropped in by
 * the brand team. The component contract (size, inverted, compact)
 * stays stable so swapping the SVG paths later won't ripple.
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
        <linearGradient id="sh-mark-grad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#0F9D94" />
          <stop offset="100%" stopColor="#0A7A72" />
        </linearGradient>
      </defs>
      {/* Soft-cornered tile */}
      <rect width="40" height="40" rx="10" fill="url(#sh-mark-grad)" />
      {/* SH monogram — keep cross-platform by stacking generic display
          fallbacks; the brand will replace this with a vector asset. */}
      <text
        x="20"
        y="27.5"
        textAnchor="middle"
        fontFamily="'Sora', ui-sans-serif, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="18"
        letterSpacing="-0.5"
        fill="#FFFFFF"
      >
        SH
      </text>
      {/* Subtle accent dot — a small premium detail */}
      <circle cx="32" cy="9" r="1.6" fill="#A8EDE8" />
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
