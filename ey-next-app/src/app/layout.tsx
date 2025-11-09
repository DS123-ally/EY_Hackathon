
'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/core/state";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        <AppProvider>
          <div className="min-h-screen flex">
            <Sidebar />
            <main className="flex-1 flex flex-col">
              <Header />
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
