import type { ReactNode } from "react";

/**
 * FormField — visual wrapper for a labelled form control.
 *
 * Wraps any input/textarea/select with a consistent label, optional
 * "required" asterisk, and an error region linked via aria-describedby.
 * Apply the supplied controlId to the control inside `children`.
 */
export function FormField({
  controlId,
  label,
  required,
  error,
  hint,
  children,
}: {
  controlId: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={controlId}
        className="text-sm font-sans font-medium text-text-primary"
      >
        {label}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-primary">
            *
          </span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="text-xs text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-sans font-medium text-error">
          {error}
        </p>
      )}
    </div>
  );
}

/**
 * Shared classnames for input/select/textarea controls so visual
 * styling stays consistent.
 */
export const controlClasses =
  "w-full rounded-input border border-border bg-surface px-4 py-2.5 text-body text-text-primary placeholder:text-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] transition-colors focus:border-primary/60 focus:outline-none focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-60";

export const controlClassesError =
  "border-error/60 focus:border-error focus:ring-error/15";
