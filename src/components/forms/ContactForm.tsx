"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react";
import {
  FormField,
  controlClasses,
  controlClassesError,
} from "@/components/forms/FormField";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contactSchema";
import { serviceLinks } from "@/lib/constants";

/**
 * ContactForm — main lead-capture form (blueprint §8.5 §9 §17).
 *
 * Six fields per blueprint §17 friction-reduction: Name, Company,
 * Email, Phone, Service Needed, Message. Client validation via
 * react-hook-form + zodResolver against the same schema the API route
 * uses, so the failure modes match server-side rejection messages.
 *
 * On success the form swaps to a confirmation state. The user can hit
 * "Send another" to reset and submit again.
 */
export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    reset,
    setError,
  } = useForm<ContactFormValues>({
    mode: "onTouched",
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      // Force a placeholder option so users are nudged to pick one.
      serviceInterest: "" as ContactFormValues["serviceInterest"],
      message: "",
    },
  });

  const [submitState, setSubmitState] = useState<"idle" | "sent" | "failed">(
    "idle",
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string; field?: keyof ContactFormValues };

      if (!res.ok || !data.ok) {
        if (!data.ok && data.field) {
          setError(data.field as keyof ContactFormValues, {
            message: data.error,
          });
        }
        setSubmitError(
          (data as { ok: false; error: string }).error ??
            "Couldn't submit your message. Please try again.",
        );
        setSubmitState("failed");
        return;
      }

      setSubmitState("sent");
    } catch {
      setSubmitError(
        "Network error — please check your connection and try again.",
      );
      setSubmitState("failed");
    }
  }

  if (submitState === "sent") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="rounded-card border border-primary/30 bg-accent-light/30 p-8 text-center"
      >
        <span
          aria-hidden="true"
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-pill bg-primary text-white shadow-cta"
        >
          <CheckCircle2 size={26} />
        </span>
        <h3 className="mt-5 font-display text-h3 font-semibold text-text-primary">
          Thanks — message received.
        </h3>
        <p className="mx-auto mt-3 max-w-md text-body text-text-secondary">
          Our team will reach out within{" "}
          <span className="font-semibold text-text-primary">
            24 business hours.
          </span>{" "}
          For anything urgent, ping us on WhatsApp.
        </p>
        <button
          type="button"
          onClick={() => {
            reset();
            setSubmitState("idle");
          }}
          className="mt-6 inline-flex items-center gap-2 text-sm font-sans font-semibold text-primary transition-colors hover:text-primary-dark"
        >
          Send another message
          <ArrowRight size={14} />
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5"
      aria-label="Contact SH StaffHunt"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          controlId="cf-name"
          label="Name"
          required
          error={errors.name?.message}
        >
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "cf-name-error" : undefined}
            placeholder="Jane Doe"
            className={`${controlClasses} ${errors.name ? controlClassesError : ""}`}
            {...register("name")}
          />
        </FormField>

        <FormField
          controlId="cf-company"
          label="Company"
          error={errors.company?.message}
        >
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            aria-invalid={Boolean(errors.company)}
            aria-describedby={errors.company ? "cf-company-error" : undefined}
            placeholder="Acme Industries"
            className={`${controlClasses} ${errors.company ? controlClassesError : ""}`}
            {...register("company")}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          controlId="cf-email"
          label="Email"
          required
          error={errors.email?.message}
        >
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "cf-email-error" : undefined}
            placeholder="jane@company.com"
            className={`${controlClasses} ${errors.email ? controlClassesError : ""}`}
            {...register("email")}
          />
        </FormField>

        <FormField
          controlId="cf-phone"
          label="Phone"
          required
          error={errors.phone?.message}
        >
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "cf-phone-error" : undefined}
            placeholder="+91 98765 43210"
            className={`${controlClasses} ${errors.phone ? controlClassesError : ""}`}
            {...register("phone")}
          />
        </FormField>
      </div>

      <FormField
        controlId="cf-service"
        label="Service needed"
        required
        error={errors.serviceInterest?.message}
      >
        <select
          id="cf-service"
          aria-invalid={Boolean(errors.serviceInterest)}
          aria-describedby={
            errors.serviceInterest ? "cf-service-error" : undefined
          }
          className={`${controlClasses} ${errors.serviceInterest ? controlClassesError : ""}`}
          defaultValue=""
          {...register("serviceInterest")}
        >
          <option value="" disabled>
            Pick a service…
          </option>
          {serviceLinks.map((s) => (
            <option key={s.label} value={s.label}>
              {s.label}
            </option>
          ))}
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </FormField>

      <FormField
        controlId="cf-message"
        label="Message"
        required
        error={errors.message?.message}
        hint="Tell us a bit about the role(s) you're hiring for, the timeline, and any specifics."
      >
        <textarea
          id="cf-message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "cf-message-error" : undefined}
          placeholder="We're scaling our pharma quality team in Q3 — looking to add 5 mid-level QA roles…"
          className={`${controlClasses} resize-y ${errors.message ? controlClassesError : ""}`}
          {...register("message")}
        />
      </FormField>

      {submitState === "failed" && submitError && (
        <p
          role="alert"
          className="rounded-input border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
        >
          {submitError}
        </p>
      )}

      <div className="mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-text-muted">
          By submitting you agree to be contacted about your enquiry. We
          don&apos;t share details with third parties.
        </p>

        <button
          type="submit"
          disabled={isSubmitting || (!isValid && submitState !== "failed")}
          className="inline-flex items-center justify-center gap-2 rounded-pill px-7 py-3 text-sm font-sans font-semibold text-white shadow-cta transition-all duration-300 ease-spring hover:scale-[1.02] active:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ backgroundImage: "var(--gradient-cta)" }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <Send size={14} />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
