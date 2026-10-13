import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Provider from "@/providers/provider";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura",
  description: "Get colors used in your image",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased h-screen bg-[#ebebeb] dark:bg-[#141414]`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}


// bg-[#F3F3F3]
// bg-[#E9ECED]
