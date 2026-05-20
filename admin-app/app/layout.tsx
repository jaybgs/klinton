import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Admin | Nadon Klinton",
  description: "Nadon Klinton private image management admin."
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
