import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumio Store — Discover What You Love",
  description:
    "Shop the latest trends in fashion, electronics, and lifestyle. Curated collections, unbeatable prices.",
  keywords: ["shop", "ecommerce", "fashion", "electronics", "lifestyle"],
  openGraph: {
    title: "Lumio Store — Discover What You Love",
    description: "Shop the latest trends. Curated collections, unbeatable prices.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body className="bg-[#f5f5f5] text-[#1a1a2e] antialiased font-sans">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}