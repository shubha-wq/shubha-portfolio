import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import site from "@/content/site.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.role}`,
  description: site.hero.subhead,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
