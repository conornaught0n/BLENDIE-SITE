import type { Metadata } from "next";
import { Cormorant_Garamond, Mulish } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BlendieAgent } from "@/components/BlendieAgent";
import PageTransition from "@/components/PageTransition";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const mulish = Mulish({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLENDIE",
  description: "High-end experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${mulish.variable} antialiased overflow-x-hidden`}
      >
        <Header />
        <PageTransition>
          {children}
        </PageTransition>
        <BlendieAgent />
      </body>
    </html>
  );
}
