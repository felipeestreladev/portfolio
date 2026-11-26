import { CONTENT } from "@/lib/content";

// Lista fixa vinda do proprio conteudo: nada de URL vinda do visitante (sem risco de SSRF).
const SITES = CONTENT.pt.projects.items.map((p) => p.url);

type SiteStatus = { url: string; online: boolean; status: number; ms: number };

async function check(url: string): Promise<SiteStatus> {
  const started = Date.now();
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      cache: "no-store",
      signal: AbortSignal.timeout(7000),
      headers: { "user-agent": "portfolio-status-check/1.0" },
    });
    // Qualquer resposta abaixo de 500 significa que o site respondeu.
    return { url, online: res.status < 500, status: res.status, ms: Date.now() - started };
  } catch {
    return { url, online: false, status: 0, ms: Date.now() - started };
  }
}

export async function GET() {
  const results = await Promise.all(SITES.map(check));
  return Response.json(results, { headers: { "cache-control": "no-store" } });
}
