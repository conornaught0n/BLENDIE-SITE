import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { BlendieAgent } from "@/components/BlendieAgent";
import PageTransition from "@/components/PageTransition";

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"], // Enable Softness axis
});

const dmSans = DM_Sans({
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
        className={`${fraunces.variable} ${dmSans.variable} antialiased overflow-x-hidden`}
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
