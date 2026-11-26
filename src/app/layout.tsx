import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import { CONTENT } from "@/lib/content";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono", display: "swap" });
const body = Archivo({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: CONTENT.pt.meta.title,
  description: CONTENT.pt.meta.description,
  authors: [{ name: "Felipe Estrela" }],
  openGraph: {
    title: CONTENT.pt.meta.title,
    description: CONTENT.pt.meta.description,
    type: "website",
    locale: "pt_BR",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0b0b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mono.variable} ${body.variable}`}>
      {/* suppressHydrationWarning: extensoes do navegador costumam injetar atributos no body */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
