import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Map of Population Density and Employment Structure of Germany",
  description: "Interactive map of Germany showing population density, employment structure by federal state, and east-west territorial differences.",
  keywords: [
    "Germany map",
    "population density",
    "employment structure",
    "federal states",
    "Germany geography",
    "Destatis",
    "interactive map",
  ],
  authors: [{ name: "atrshncv-design" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Map of Population Density and Employment Structure of Germany",
    description: "Interactive analytical map of German federal states with density and employment data.",
    url: "https://claude.ai/public/artifacts/1240a17a-1417-4335-9669-e08b57e1e5e8",
    siteName: "Germany Population Density Map",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Map of Population Density and Employment Structure of Germany",
    description: "Interactive analytical map of German federal states with density and employment data.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
