import { NextResponse } from "next/server";

/**
 * O site nao usa Server Actions. Robos de varredura mandam chamadas falsas com o
 * cabecalho `next-action`, o que enche o log de erros. Respondemos 404 antes do Next processar.
 */
export function proxy() {
  return new NextResponse(null, { status: 404 });
}

export const config = {
  matcher: [{ source: "/:path*", has: [{ type: "header", key: "next-action" }] }],
};
