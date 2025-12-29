import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Grimoire - Novel Writing Platform",
  description: "A modern, Notion-style novel writing platform with world-building capabilities",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.variable} antialiased bg-zinc-950 text-zinc-100`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
