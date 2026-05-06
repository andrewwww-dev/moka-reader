import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { Providers } from "@/components/common/Providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MokaReader",
  description: "Tu biblioteca manga, siempre contigo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${bebas.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-bg-primary text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
