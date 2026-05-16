import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { gradients, shadows } from "@/lib/constants";

/**
 * Button — single source of truth for CTAs across the site.
 *
 * Variants (blueprint §17, §20):
 *   • gradient — teal→aqua gradient pill, used for the primary
 *                "Request Talent" / "Start Hiring Now" CTA.
 *   • primary  — solid teal pill, used for in-section actions like
 *                "Explore Our Services" and "Learn More".
 *   • ghost    — outlined pill on the surface color, used for
 *                secondary actions like "Talk to Us →".
 *
 * Renders as an <a> when `href` is provided (uses next/link for
 * internal routes and a plain <a target="_blank"> for external),
 * otherwise renders a <button>.
 */

type Variant = "gradient" | "primary" | "ghost";
type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-body",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-pill font-sans font-semibold transition-all duration-300 ease-spring will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-60 disabled:cursor-not-allowed";

const variantClasses: Record<Variant, string> = {
  gradient: "text-white hover:scale-[1.02] active:scale-100",
  primary: "bg-primary text-white hover:bg-primary-dark hover:scale-[1.02] active:scale-100",
  ghost:
    "border border-border bg-surface text-text-primary hover:border-primary/40 hover:bg-bg-section",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  /** Lucide icon node, rendered before the label. */
  iconLeft?: ReactNode;
  /** Lucide icon node or arrow glyph rendered after the label. */
  iconRight?: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps | "href"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | "href"> & {
    href: string;
    /** Force-open in a new tab. Auto-detected for absolute URLs. */
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function inlineStyleFor(variant: Variant) {
  if (variant === "gradient") {
    return { backgroundImage: gradients.cta, boxShadow: shadows.cta };
  }
  return undefined;
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    children,
    className,
    iconLeft,
    iconRight,
  } = props;

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className ?? ""}`;
  const style = inlineStyleFor(variant);

  const inner = (
    <>
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external, target, rel, ...rest } = props as ButtonAsLink;
    const isExternal = external ?? /^https?:\/\//i.test(href);
    if (isExternal) {
      return (
        <a
          {...rest}
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          className={classes}
          style={style}
        >
          {inner}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} style={style}>
        {inner}
      </Link>
    );
  }

  const { type, ...rest } = props as ButtonAsButton;
  return (
    <button
      {...rest}
      type={type ?? "button"}
      className={classes}
      style={style}
    >
      {inner}
    </button>
  );
}
