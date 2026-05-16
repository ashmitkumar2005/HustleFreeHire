"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  ChevronDown,
  Mail,
  Phone,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { contact, navLinks, type ServiceLink } from "@/lib/constants";

/**
 * MobileMenu — full-screen slide-in drawer (blueprint §11).
 *
 * Slides in from the right with a fade backdrop. Lock body scroll while
 * open. Services group is expandable. Sticky CTA pinned at the bottom.
 */

const iconMap: Record<ServiceLink["icon"], React.ComponentType<{ className?: string; size?: number }>> = {
  briefcase: Briefcase,
  "user-check": UserCheck,
  users: Users,
};

const drawerVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [servicesOpen, setServicesOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-text-primary/40 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={drawerVariants}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-surface shadow-2xl lg:hidden"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <Logo />
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center rounded-pill text-text-secondary transition-colors hover:bg-bg-section hover:text-primary"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-6 py-6">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const hasChildren = link.children && link.children.length > 0;
                  if (hasChildren) {
                    return (
                      <li key={link.href}>
                        <button
                          type="button"
                          onClick={() => setServicesOpen((v) => !v)}
                          className="flex w-full items-center justify-between rounded-input px-4 py-3 text-left text-h4 font-display font-medium text-text-primary transition-colors hover:bg-bg-section"
                          aria-expanded={servicesOpen}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            size={18}
                            className={`text-text-muted transition-transform duration-300 ${
                              servicesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {servicesOpen && (
                            <motion.ul
                              key="services-sub"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              className="ml-2 overflow-hidden border-l border-border pl-4"
                            >
                              {link.children!.map((s) => {
                                const Icon = iconMap[s.icon];
                                return (
                                  <li key={s.href}>
                                    <Link
                                      href={s.href}
                                      onClick={onClose}
                                      className="flex items-start gap-3 rounded-input px-3 py-3 transition-colors hover:bg-bg-section"
                                    >
                                      <span className="mt-0.5 flex h-9 w-9 flex-none items-center justify-center rounded-input bg-accent-light/40 text-primary">
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
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    );
                  }
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onClose}
                        className="block rounded-input px-4 py-3 text-h4 font-display font-medium text-text-primary transition-colors hover:bg-bg-section hover:text-primary"
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Contact mini-block */}
              <div className="mt-8 border-t border-border pt-6">
                <p className="text-xs font-sans uppercase tracking-widest text-text-muted">
                  Get in touch
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-text-secondary">
                  <li className="flex items-center gap-2">
                    <Mail size={14} className="text-primary" />
                    <a href={`mailto:${contact.email}`} className="hover:text-primary">
                      {contact.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone size={14} className="text-primary" />
                    <a href={`tel:${contact.phone}`} className="hover:text-primary">
                      {contact.phone}
                    </a>
                  </li>
                </ul>
              </div>
            </nav>

            {/* Sticky CTA */}
            <div className="border-t border-border bg-bg-section/40 px-6 py-4">
              <Button
                href="/contact"
                variant="gradient"
                size="lg"
                className="w-full"
              >
                Request Talent
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
