import type { ReactNode } from "react";

/**
 * SectionTag — the small uppercase label that sits above every H2 on
 * the site (blueprint §9: "<SectionTag />" component).
 *
 * Example: WHAT WE DO, WHO WE ARE, HOW IT WORKS.
 */
export function SectionTag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-xs font-sans font-semibold uppercase tracking-[0.22em] text-primary ${
        className ?? ""
      }`}
    >
      {children}
    </p>
  );
}

/**
 * SectionHeading — Tag + H2 + optional subtitle, always left-aligned by
 * default (blueprint §4 typography rule: "Section headings always
 * left-aligned"). `align="center"` available for hero-style heads.
 *
 * `eyebrow` and `title` accept ReactNode so callers can mix gradient
 * spans or accents into the H2 (e.g. highlighted key word).
 */
export function SectionHeading({
  tag,
  title,
  subtitle,
  align = "left",
  inverted = false,
  className,
}: {
  tag?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}) {
  const alignment = align === "center" ? "text-center mx-auto" : "";
  const titleColor = inverted ? "text-white" : "text-text-primary";
  const subColor = inverted ? "text-white/75" : "text-text-secondary";

  return (
    <div className={`${alignment} max-w-3xl ${className ?? ""}`}>
      {tag && <SectionTag>{tag}</SectionTag>}
      <h2
        className={`mt-3 font-display font-semibold leading-[1.2] tracking-[-0.01em] text-[clamp(28px,3.6vw,38px)] ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-body-lg ${subColor}`}>{subtitle}</p>
      )}
    </div>
  );
}
