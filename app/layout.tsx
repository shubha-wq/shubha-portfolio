import type { Metadata } from "next";
import "./globals.css";
import site from "@/content/site.json";

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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
