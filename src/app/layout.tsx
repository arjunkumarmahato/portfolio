import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LoaderProvider } from "@/context/LoaderContext";
import StyledComponentsRegistry from "@/lib/registry";
import SmoothScroll from "@/components/SmoothScroll";
import FooterWrapper from "@/components/FooterWrapper";

import Cursor from "@/components/Cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arjun Mahato | Portfolio",
  description: "Creative Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StyledComponentsRegistry>
          <LoaderProvider>
            <Cursor /> {/* Custom GSAP Cursor */}
            <SmoothScroll />
            <Navbar />
            {children}
            <FooterWrapper />
          </LoaderProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
