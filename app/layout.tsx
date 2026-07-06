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

import Script from "next/script";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script 
          src="https://www.nibgate.xyz/widget.js" 
          strategy="afterInteractive"
          data-nibgate-site="87f387c0-cff5-4deb-b8aa-c23cfd229d09" 
          data-nibgate-token="67a4386e4c377734a27e759d42502d5c" 
          data-nibgate-api="https://api.nibgate.xyz" 
        />
      </body>
    </html>
  );
}
