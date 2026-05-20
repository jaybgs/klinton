import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nadon Klinton | Photographer & Filmmaker",
  description:
    "A cinematic photography landing page for portraits, weddings, brand campaigns, and editorial stories.",
  openGraph: {
    title: "Nadon Klinton | Photographer & Filmmaker",
    description:
      "Cinematic photography and film for portraits, weddings, campaigns, and meaningful stories.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
