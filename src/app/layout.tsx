import type { Metadata } from "next";
import { Geist, Geist_Mono, Crimson_Text } from "next/font/google";
import { baseMetadata } from "./lib/metadata";
import AIChat from "./components/AIChat";  // Add this import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const crimsonText = Crimson_Text({
  variable: "--font-crimson",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${crimsonText.variable} antialiased bg-white text-slate-900`}
      >
        {children}
        <AIChat />  {/* Add this line */}
      </body>
    </html>
  );
}
