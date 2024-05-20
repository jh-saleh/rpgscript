import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

const font = localFont({ src: './Consolas.ttf' });

export const metadata: Metadata = {
  title: "RPG Script - By Jean-hanna SALEH",
  description: "RPG Script - By Jean-hanna SALEH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
