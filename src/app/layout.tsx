import type { Metadata, Viewport } from "next";
import { Anton, Archivo, Space_Mono } from "next/font/google";
import { CONTENT } from "@/lib/content";
import "./globals.css";

const display = Anton({ weight: "400", subsets: ["latin"], variable: "--font-display", display: "swap" });
const mono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-mono", display: "swap" });
const body = Archivo({ subsets: ["latin"], variable: "--font-body", display: "swap" });

// Previa de link (WhatsApp, Discord, etc.) sempre em ingles, com o banner estatico public/og.png.
export const metadata: Metadata = {
  metadataBase: new URL("https://felipeestrela.com.br"),
  title: CONTENT.pt.meta.title,
  description: CONTENT.pt.meta.description,
  authors: [{ name: "Felipe Estrela" }],
  openGraph: {
    title: CONTENT.en.meta.title,
    description: CONTENT.en.meta.description,
    siteName: "Felipe Estrela",
    url: "/",
    type: "website",
    locale: "en_US",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Felipe Estrela, Full Stack Developer" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
    title: CONTENT.en.meta.title,
    description: CONTENT.en.meta.description,
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
