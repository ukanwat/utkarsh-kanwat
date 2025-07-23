import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Utkarsh Kanwat",
  description: "Engineer enjoy working on intelligent systems, LLM optimization, and scalable ML platforms. Graduate from IIT Bombay with expertise in deep learning and production systems.",
  keywords: ["Engineer", "Machine Learning", "Deep Learning", "Thought Leadership", "LLM", "AI Systems"],
  authors: [{ name: "Utkarsh Kanwat" }],
  creator: "Utkarsh Kanwat",
  openGraph: {
    title: "Utkarsh Kanwat",
    description: "Engineer enjoy working on intelligent systems, LLM optimization, and scalable Systems.",
    type: "website",
    locale: "en_US",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {children}

        
      </body>
    </html>
  );
}