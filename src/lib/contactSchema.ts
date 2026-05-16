import { z } from "zod";

/**
 * Shared contact form schema.
 *
 * Used both by the client form (react-hook-form + zodResolver) and by
 * the API route at /api/contact for server-side validation. Keeping a
 * single source of truth means the rules can never drift between the
 * two layers.
 */

/**
 * Allowed service-interest values.
 *
 * Mirrors `serviceLinks[*].label` from src/lib/constants.ts plus a
 * "Not sure yet" escape hatch. Hardcoded as a literal tuple so zod's
 * `z.enum` infers the values correctly — TypeScript can't narrow a
 * spread of `string[]` into a `[string, ...string[]]` tuple, which is
 * what `z.enum` requires.
 */
const SERVICE_INTERESTS = [
  "Contract Staffing",
  "Permanent Staffing",
  "Bulk Hiring",
  "Not sure yet",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string({ message: "Name is required." })
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(80, "Name is too long."),
  company: z.string().trim().max(120, "Company is too long.").optional().or(z.literal("")),
  email: z
    .string({ message: "Email is required." })
    .trim()
    .email("Enter a valid email address.")
    .max(160, "Email is too long."),
  phone: z
    .string({ message: "Phone is required." })
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(24, "Phone is too long.")
    .regex(/^[+\d\s().-]+$/, "Phone can include digits, spaces, +, -, (, )."),
  serviceInterest: z.enum(SERVICE_INTERESTS, {
    message: "Pick a service.",
  }),
  message: z
    .string({ message: "Message is required." })
    .trim()
    .min(10, "Tell us a bit more — at least 10 characters.")
    .max(2000, "Message is too long."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
