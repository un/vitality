import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Augment",
  description: "Augment makes you live Longer + Sharper + Better",
  openGraph: {
    title: "Augment",
    description: "The Open Source system to live Longer + Sharper + Better",
    url: "https://augment.day",
    siteName: "Augment",
    images: [
      {
        url: "./og.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-2 font-[family-name:var(--font-geist-mono)]`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
        >
          <div className="w-full m-auto grid place-items-center">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
