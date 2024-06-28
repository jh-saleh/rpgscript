import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Maintenance - RPGScript",
    description: "RPG Script - By Jean-hanna SALEH",
    icons: [
        {
            rel: 'icon',
            sizes: 'any',
            href: '/favicon.ico',
            url: '/favicon.ico'
        }
    ]
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const isMaintained = process.env.IS_MAINTAINED === "true";
    if (!isMaintained) {
        redirect("/home");
    }

    return children;
}