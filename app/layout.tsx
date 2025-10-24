import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ritechoice23 Appwrite + Next.js starter kit",
  description: "Skip the auth boilerplate and start building your product. A complete authentication system built with Next.js 16, Appwrite, and TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex justify-center w-full">
          <div className="w-full max-w-[1920px]">
            {children}
          </div>
        </div>

        <Toaster dir="auto" position="top-center" richColors={true} />
      </body>
    </html>
  );
}
