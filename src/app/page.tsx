/**
 * Step 2 — Design system preview page.
 *
 * THROWAWAY: this page exists only to visually verify that fonts,
 * colors, type scale, gradients, radii, and shadows are wired up
 * correctly. It will be replaced by the real Hero in Step 5.
 */

import { colors, gradients, radii, shadows } from "@/lib/constants";

const colorSwatches: Array<{ label: string; value: string; on?: string }> = [
  { label: "primary", value: colors.primary, on: "#fff" },
  { label: "primary-dark", value: colors.primaryDark, on: "#fff" },
  { label: "accent", value: colors.accent, on: "#1E293B" },
  { label: "accent-light", value: colors.accentLight, on: "#1E293B" },
  { label: "bg", value: colors.bg, on: "#1E293B" },
  { label: "bg-section", value: colors.bgSection, on: "#1E293B" },
  { label: "surface", value: colors.surface, on: "#1E293B" },
  { label: "border", value: colors.border, on: "#1E293B" },
  { label: "text-primary", value: colors.textPrimary, on: "#fff" },
  { label: "text-secondary", value: colors.textSecondary, on: "#fff" },
  { label: "text-muted", value: colors.textMuted, on: "#fff" },
  { label: "footer-bg", value: colors.footerBg, on: "#fff" },
  { label: "success", value: colors.success, on: "#fff" },
  { label: "warning", value: colors.warning, on: "#1E293B" },
  { label: "error", value: colors.error, on: "#fff" },
];

const typeSamples: Array<{ cls: string; label: string; sample: string }> = [
  { cls: "text-display font-display font-extrabold", label: "display / 72 / Sora 800", sample: "Building Reliable Workforce Solutions" },
  { cls: "text-h1 font-display font-bold", label: "h1 / 52 / Sora 700", sample: "End-to-End Staffing Solutions" },
  { cls: "text-h2 font-display font-semibold", label: "h2 / 38 / Sora 600", sample: "Workforce Experts for the Modern Enterprise" },
  { cls: "text-h3 font-display font-semibold", label: "h3 / 26 / Sora 600", sample: "Speed-to-hire without compromise" },
  { cls: "text-h4 font-display font-medium", label: "h4 / 20 / Sora 500", sample: "Compliance-First Approach" },
  { cls: "text-body-lg font-sans", label: "body-lg / 17 / Inter 400", sample: "We connect organizations with the right talent through streamlined recruitment and scalable staffing solutions." },
  { cls: "text-body font-sans", label: "body / 15 / Inter 400", sample: "Specialized recruiters across 10+ industries who understand your roles." },
  { cls: "text-sm font-sans text-text-secondary", label: "sm / 13 / Inter 400", sample: "From offer letters to payroll — we manage the entire employment lifecycle." },
  { cls: "text-xs font-sans uppercase tracking-widest text-text-muted", label: "xs / 11 / Inter 400 caps", sample: "What we do" },
];

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 py-20 md:px-10 md:py-28">
      {/* Header */}
      <header className="mb-16">
        <p className="text-xs font-sans uppercase tracking-[0.2em] text-primary">
          Step 2 — Design System
        </p>
        <h1 className="mt-3 text-display font-display font-extrabold">
          HustleFreeHire <span className="text-primary">Tokens</span>
        </h1>
        <p className="mt-4 max-w-2xl text-body-lg text-text-secondary">
          Throwaway preview page. Verifies the blueprint&apos;s design system is
          wired into Tailwind v4. Step 5 replaces this with the real Hero.
        </p>
      </header>

      {/* Typography */}
      <section className="mb-20">
        <h2 className="text-h2 font-display font-semibold">Typography</h2>
        <p className="mt-2 text-body text-text-secondary">
          Sora for display, Inter for body. Loaded via{" "}
          <code className="rounded bg-bg-section px-1.5 py-0.5 text-sm">
            next/font/google
          </code>
          .
        </p>
        <div className="mt-8 space-y-8">
          {typeSamples.map((row) => (
            <div
              key={row.label}
              className="border-l-2 border-accent-light pl-6"
            >
              <p className="text-xs font-sans uppercase tracking-widest text-text-muted">
                {row.label}
              </p>
              <p className={`mt-1 ${row.cls}`}>{row.sample}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Color palette */}
      <section className="mb-20">
        <h2 className="text-h2 font-display font-semibold">Color Palette</h2>
        <p className="mt-2 text-body text-text-secondary">
          Every named color from blueprint §5. Hover to read the hex.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {colorSwatches.map((s) => (
            <div
              key={s.label}
              className="rounded-card overflow-hidden border border-border shadow-card transition-shadow hover:shadow-card-hover"
            >
              <div
                className="flex h-24 items-end p-3"
                style={{ background: s.value, color: s.on }}
              >
                <span className="text-xs font-sans font-medium">{s.label}</span>
              </div>
              <div className="flex items-center justify-between bg-surface px-3 py-2">
                <code className="text-xs text-text-secondary">{s.value}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gradients */}
      <section className="mb-20">
        <h2 className="text-h2 font-display font-semibold">Gradients</h2>
        <p className="mt-2 text-body text-text-secondary">
          Used for hero, CTA buttons, card surfaces, and section transitions.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {(Object.entries(gradients) as Array<[keyof typeof gradients, string]>).map(([name, value]) => (
            <div
              key={name}
              className="overflow-hidden rounded-card border border-border"
            >
              <div className="h-32" style={{ backgroundImage: value }} />
              <div className="bg-surface px-4 py-3">
                <p className="text-sm font-sans font-medium">gradient-{name}</p>
                <code className="text-xs text-text-muted">{value}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Radii + Shadows */}
      <section className="mb-20 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-h2 font-display font-semibold">Radii</h2>
          <p className="mt-2 text-body text-text-secondary">
            Cards 16px, inputs 8px, pills 999px.
          </p>
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-24 w-24 bg-primary"
                style={{ borderRadius: radii.card }}
              />
              <span className="text-xs text-text-secondary">card · 16</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-24 w-24 bg-accent"
                style={{ borderRadius: radii.input }}
              />
              <span className="text-xs text-text-secondary">input · 8</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className="h-12 w-32 bg-primary-dark"
                style={{ borderRadius: radii.pill }}
              />
              <span className="text-xs text-text-secondary">pill · 999</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-h2 font-display font-semibold">Shadows</h2>
          <p className="mt-2 text-body text-text-secondary">
            Micro-elevation, never heavy drop shadows.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4">
            {(Object.entries(shadows) as Array<[keyof typeof shadows, string]>).map(([name, value]) => (
              <div key={name} className="text-center">
                <div
                  className="mx-auto h-20 w-20 rounded-card bg-surface"
                  style={{ boxShadow: value }}
                />
                <span className="mt-3 block text-xs text-text-secondary">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buttons preview */}
      <section className="mb-20">
        <h2 className="text-h2 font-display font-semibold">Button Recipe</h2>
        <p className="mt-2 text-body text-text-secondary">
          Preview of how the gradient CTA, primary, and secondary will look.
          Real components ship in Step 3.
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <button
            className="rounded-pill px-6 py-3 text-sm font-sans font-semibold text-white transition-transform hover:scale-[1.02]"
            style={{
              backgroundImage: gradients.cta,
              boxShadow: shadows.cta,
            }}
          >
            Request Talent
          </button>
          <button className="rounded-pill bg-primary px-6 py-3 text-sm font-sans font-semibold text-white transition-colors hover:bg-primary-dark">
            Explore Services
          </button>
          <button className="rounded-pill border border-border bg-surface px-6 py-3 text-sm font-sans font-semibold text-text-primary transition-colors hover:bg-bg-section">
            Talk to Us →
          </button>
        </div>
      </section>

      <footer className="border-t border-border pt-8 text-sm text-text-muted">
        Tokens loaded from{" "}
        <code className="text-text-secondary">src/app/globals.css</code> (Tailwind v4 @theme) and{" "}
        <code className="text-text-secondary">src/lib/constants.ts</code>.
      </footer>
    </main>
  );
}
