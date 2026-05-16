"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  Menu,
  UserCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { navLinks, type ServiceLink } from "@/lib/constants";
import { MobileMenu } from "@/components/layout/MobileMenu";

/**
 * Navbar — sticky top, blur-backdrop on scroll (blueprint §8.1, §9, §10).
 *
 * Behavior:
 *   • Transparent on the off-white page bg above the fold.
 *   • Once the user scrolls past 12px, a frosted white surface
 *     appears with a subtle border + shadow.
 *   • Each link has a teal underline that slides in from left
 *     on hover (width: 0 → 100%) — blueprint §10.
 *   • Services is a click-to-open dropdown on desktop, an
 *     expandable group inside MobileMenu on mobile.
 *   • Active route gets the underline persistently.
 */

const iconMap: Record<ServiceLink["icon"], React.ComponentType<{ className?: string; size?: number }>> = {
  briefcase: Briefcase,
  "user-check": UserCheck,
  users: Users,
};

function NavUnderlineLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className="group relative inline-flex items-center px-1 py-2 text-sm font-sans font-medium text-text-secondary transition-colors hover:text-text-primary"
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ease-spring ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </Link>
  );
}

function ServicesDropdown({
  active,
}: {
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const services = navLinks.find((l) => l.label === "Services")?.children ?? [];

  // Close when clicking outside.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="group relative inline-flex items-center gap-1 px-1 py-2 text-sm font-sans font-medium text-text-secondary transition-colors hover:text-text-primary"
      >
        <span>Services</span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -bottom-0.5 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ease-spring ${
            active || open ? "w-[calc(100%-18px)]" : "w-0 group-hover:w-[calc(100%-18px)]"
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            role="menu"
            className="absolute left-1/2 top-full z-50 mt-3 w-[360px] -translate-x-1/2 overflow-hidden rounded-card border border-border bg-surface shadow-card-hover"
          >
            <ul className="p-2">
              {services.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <li key={s.href}>
                    <Link
                      href={s.href}
                      role="menuitem"
                      onClick={() => setOpen(false)}
                      className="group/item flex items-start gap-3 rounded-input p-3 transition-colors hover:bg-bg-section"
                    >
                      <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-input bg-accent-light/40 text-primary transition-transform duration-300 group-hover/item:scale-110">
                        <Icon size={18} />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-body font-sans font-semibold text-text-primary">
                          {s.label}
                        </span>
                        <span className="mt-0.5 text-sm text-text-secondary">
                          {s.description}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            <div className="border-t border-border bg-bg-section/40 px-4 py-3">
              <Link
                href="/services"
                onClick={() => setOpen(false)}
                className="text-sm font-sans font-medium text-primary transition-colors hover:text-primary-dark"
              >
                View all services →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ease-spring ${
          scrolled
            ? "bg-surface/80 backdrop-blur-md border-b border-border shadow-[0_2px_12px_rgba(15,32,32,0.04)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-6 md:px-10">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              if (link.children && link.children.length > 0) {
                return (
                  <ServicesDropdown
                    key={link.href}
                    active={isActive(link.href)}
                  />
                );
              }
              return (
                <NavUnderlineLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  active={isActive(link.href)}
                />
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            <Button
              href="/contact"
              variant="gradient"
              size="md"
              className="hidden md:inline-flex"
            >
              Request Talent
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-pill text-text-secondary transition-colors hover:bg-bg-section hover:text-primary lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
