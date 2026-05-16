/**
 * JsonLd — emit a structured-data <script> tag.
 *
 * Server component. Pass any schema.org JSON-LD object via `data` and
 * we'll JSON-stringify it into a `type="application/ld+json"` script.
 * Multiple instances on the same page are fine — Google merges them.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify on a known object can't produce script-breaking
      // characters; the only escape we need is < which we handle to
      // be safe against any string fields containing markup.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
