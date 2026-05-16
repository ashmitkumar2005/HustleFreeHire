import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/contactSchema";

/**
 * POST /api/contact
 *
 * Validates the contact submission server-side using the shared zod
 * schema. Phase 1 placeholder behaviour: log a structured record of the
 * lead and return success. Phase 2 (per blueprint §13) will swap the
 * console.log for a Resend / Nodemailer dispatch — leaving the
 * function shape stable so the client form contract stays the same.
 */
export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    // Surface the first Zod issue back to the client as a friendly message.
    const firstIssue = parsed.error.issues[0];
    return NextResponse.json(
      {
        ok: false,
        error: firstIssue?.message ?? "Validation failed.",
        // Include the field path so the client can highlight the offending input.
        field: firstIssue?.path[0],
      },
      { status: 400 },
    );
  }

  const lead = {
    receivedAt: new Date().toISOString(),
    ...parsed.data,
  };

  // Phase 1: structured server-side log so submissions are visible in
  // Vercel function logs while we wait for an email integration.
  // eslint-disable-next-line no-console
  console.info("[contact-form] new lead", lead);

  // TODO (Phase 2): forward `lead` via Resend / Nodemailer to the
  // configured ops inbox, with retry-on-failure semantics.

  return NextResponse.json({ ok: true });
}
