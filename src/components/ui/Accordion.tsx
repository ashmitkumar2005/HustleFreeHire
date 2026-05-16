"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

/**
 * Accordion — accessible expand/collapse list with a single
 * controlled item open at a time.
 *
 * Used on service detail pages for FAQs (blueprint §8.3 service
 * detail FAQ). Animates height + opacity via framer-motion. Respects
 * the global prefers-reduced-motion CSS reset, which zeroes the
 * transition duration so it snaps without jank.
 */

export type AccordionItem = {
  q: string;
  a: string;
};

export function Accordion({ items }: { items: ReadonlyArray<AccordionItem> }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className="divide-y divide-border rounded-card border border-border bg-surface">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <li key={item.q}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              id={`faq-trigger-${i}`}
              className="group flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-section"
            >
              <span className="font-display text-h4 font-semibold text-text-primary">
                {item.q}
              </span>
              <span
                className={`flex h-9 w-9 flex-none items-center justify-center rounded-pill border border-border bg-bg text-primary transition-all duration-300 ease-spring ${
                  isOpen ? "rotate-45 border-primary/40 bg-primary/10" : ""
                }`}
                aria-hidden="true"
              >
                <Plus size={16} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-body text-text-secondary">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
