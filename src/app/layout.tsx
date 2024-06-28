import type { Metadata } from "next";
import { Libre_Franklin } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./registry";
const franklin = Libre_Franklin({ style: ["normal", "italic"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RPG Script - By Jean-hanna SALEH",
  description: "RPG Script - By Jean-hanna SALEH",
  icons: [
    {
      rel: 'icon',
      sizes: 'any',
      href: '/favicon.ico',
      url: '/favicon.ico'
    }
  ]
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={franklin.className}>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
