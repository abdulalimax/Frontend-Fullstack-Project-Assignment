import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BloodPulse | Central Emergency Blood Donation Network",
  description: "Humanitarian blood donation and emergency registry platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900 font-sans">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
