import { ImageResponse } from "next/og";

/**
 * Default Open Graph image — used by the root layout's metadata
 * unless a page exports its own opengraph-image. Generated at build
 * time as a 1200×630 PNG via next/og.
 */
export const alt =
  "SH StaffHunt LLP — Building Reliable Workforce Solutions";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #0F9D94 0%, #0D7377 50%, #1E293B 100%)",
          color: "#FFFFFF",
        }}
      >
        {/* Top row — wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* Mark tile */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "rgba(255, 255, 255, 0.12)",
              border: "1px solid rgba(168, 237, 232, 0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            SH
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
              SH StaffHunt
            </span>
            <span style={{ fontSize: 16, color: "rgba(168,237,232,0.8)" }}>
              Staffing Services
            </span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <span
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(168,237,232,0.85)",
              fontWeight: 600,
            }}
          >
            Pan India Staffing Solutions
          </span>
          <span
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Building Reliable Workforce Solutions
          </span>
        </div>

        {/* Bottom row — proof points */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 22,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#53D8C9",
              }}
            />
            500+ Placements
          </span>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#53D8C9",
              }}
            />
            10+ Industries
          </span>
          <span style={{ width: 4, height: 4, borderRadius: 999, background: "rgba(255,255,255,0.3)" }} />
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#53D8C9",
              }}
            />
            Pan India Network
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
