import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "BloodPulse | Emergency Blood Donation Platform",
  description: "Next-generation Emergency Trauma & Critical Logistics Infrastructure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen bg-slate-950 text-slate-100 antialiased overflow-x-hidden selection:bg-rose-500 selection:text-white`}>
        <div className="relative flex min-h-screen flex-col overflow-x-hidden">
          {children}
        </div>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
