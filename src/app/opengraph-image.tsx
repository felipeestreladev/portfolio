import { ImageResponse } from "next/og";

export const alt = "Felipe Estrela | Backend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLACK = "#0b0b0b";
const WHITE = "#f4f4ee";
const LIME = "#c8ff00";

/** Baixa so os glifos usados da Anton. Se falhar, cai na fonte padrao. */
async function loadAnton(text: string): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Anton&text=${encodeURIComponent(text)}`,
    ).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const font = await loadAnton("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ./<>-");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BLACK,
          color: WHITE,
          padding: 56,
          border: `10px solid ${WHITE}`,
          fontFamily: font ? "Anton" : "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 178,
              height: 130,
              background: LIME,
              color: BLACK,
              borderRight: `10px solid ${WHITE}`,
              borderBottom: `10px solid ${WHITE}`,
            }}
          >
            <svg width="112" height="66" viewBox="0 0 48 28" fill="none" stroke={BLACK} strokeWidth="5.4">
              <path d="M15 4L5 14l10 10" />
              <path d="M29 2L20 26" />
              <path d="M33 4l10 10-10 10" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 30, letterSpacing: 4, color: LIME }}>felipeestrela.com.br</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", lineHeight: 0.92 }}>
          <div style={{ display: "flex", fontSize: 190, textTransform: "uppercase" }}>Felipe</div>
          <div style={{ display: "flex", fontSize: 190, textTransform: "uppercase", color: LIME }}>Estrela</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 34, letterSpacing: 3, textTransform: "uppercase" }}>
          <div style={{ display: "flex" }}>Backend Developer</div>
          <div style={{ display: "flex", color: LIME }}>Node.js / TypeScript / Next.js / AI</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "Anton", data: font, style: "normal", weight: 400 }] : undefined,
    },
  );
}
