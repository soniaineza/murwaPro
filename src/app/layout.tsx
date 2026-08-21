import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SessionProvider } from "@/components/layout/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MurwaPro — Reba. Soma. Umva. Menya.",
    template: "%s | MurwaPro",
  },
  description:
    "A digital home for African entertainment, literature and knowledge. Watch. Read. Listen. Discover.",
  keywords: [
    "MurwaPro",
    "African movies",
    "Rwandan films",
    "books",
    "inganzo",
    "poetry",
    "streaming",
    "Kinyarwanda",
    "African literature",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SessionProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileBottomNav />
        </SessionProvider>
      </body>
    </html>
  );
}
