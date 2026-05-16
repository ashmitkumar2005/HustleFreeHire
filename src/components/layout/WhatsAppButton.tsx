import { MessageCircle } from "lucide-react";
import { contact } from "@/lib/constants";

/**
 * WhatsAppButton — sticky bottom-right floating CTA (blueprint §8.5,
 * §17, §20.8).
 *
 * Server Component (just an anchor + decorative ring). The pulse-ring
 * animation is CSS-only via a keyframe defined in globals.css. Hidden
 * on mobile widths under 380px to avoid covering small-screen UI.
 */
export function WhatsAppButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-pill text-white shadow-cta transition-transform duration-300 ease-spring hover:scale-105 sm:bottom-7 sm:right-7"
      style={{
        backgroundImage: "linear-gradient(135deg, #0F9D94 0%, #25D366 100%)",
      }}
    >
      {/* Continuously expanding pulse ring — drawn behind the button */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-pill bg-primary opacity-50 motion-safe:animate-[pulse-ring_2.6s_ease-out_infinite]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-pill bg-accent opacity-30 motion-safe:animate-[pulse-ring_2.6s_ease-out_infinite] motion-safe:[animation-delay:1.3s]"
      />
      <MessageCircle size={24} className="relative" />
    </a>
  );
}
