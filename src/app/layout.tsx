import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Short Next",
  description: "A simple Next.js application",
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
        <header className="border-b border-white/10 px-6 py-4">
          <div className="flex items-center justify-between">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="h-10"
            />
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-800 font-medium">
                Home
              </Link>
              <Link
                href="/posts"
                className="text-gray-800 font-medium duration-200"
              >
                Posts
              </Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="my-auto border-t border-white/10 px-6 py-4 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()} Short Next. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
