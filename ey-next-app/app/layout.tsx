'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/core/state.tsx";
import { LimelightNav } from "@/components/ui/limelight-nav";
import { Home, Car, BrainCircuit, Calendar, MessageCircle, ShieldCheck, Wrench } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  
  const navItems = [
    { id: 'dashboard', icon: <Home />, label: "Dashboard", onClick: () => router.push('/') },
    { id: 'vehicles', icon: <Car />, label: "Vehicles", onClick: () => router.push('/vehicles') },
    { id: 'predictions', icon: <BrainCircuit />, label: "Predictions", onClick: () => router.push('/predictions') },
    { id: 'scheduling', icon: <Calendar />, label: "Scheduling", onClick: () => router.push('/scheduling') },
    { id: 'insights', icon: <Wrench />, label: "Insights", onClick: () => router.push('/rca-capa') },
    { id: 'ueba', icon: <ShieldCheck />, label: "UEBA", onClick: () => router.push('/ueba') },
    { id: 'engagement', icon: <MessageCircle />, label: "Engagement", onClick: () => router.push('/communications') },
  ];

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0a0a0a] text-white min-h-screen`}>
        <AppProvider>
          <div className="min-h-screen flex flex-col pb-24">
            {children}
          </div>
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <LimelightNav items={navItems} />
          </div>
        </AppProvider>
      </body>
    </html>
  );
}