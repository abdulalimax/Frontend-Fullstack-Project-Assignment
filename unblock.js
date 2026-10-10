const fs = require("fs");

// ১. error.tsx নিরাপদ ও সহনশীল করা
const safeError = `"use client";
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8 text-center">
      <h2 className="text-rose-600 font-bold">Client Notice: {error?.message}</h2>
      <button onClick={() => reset()} className="mt-4 px-4 py-2 bg-rose-600 text-white rounded">Retry</button>
    </div>
  );
}
`;
fs.writeFileSync("src/app/error.tsx", safeError, "utf8");

// ২. Navbar-এ কোনো আইকন বা কুকি ক্র্যাশ থাকলে তা সম্পূর্ণ নিরাপদ করা
const cleanNavbar = `"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuthUser, clearAuth } from "@/lib/auth";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ role?: string; name?: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    try {
      setUser(getAuthUser() as { role?: string; name?: string });
    } catch (e) {
      setUser(null);
    }
  }, []);

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="bg-rose-600 text-white font-black px-2.5 py-1 rounded-lg text-lg">BP</span>
          <span className="text-xl font-black text-slate-900 tracking-tight">BloodPulse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <Link href="/" className="hover:text-rose-600">Home</Link>
          <Link href="/requests" className="hover:text-rose-600">Requests</Link>
          <Link href="/about" className="hover:text-rose-600">About</Link>
          <Link href="/services" className="hover:text-rose-600">Services</Link>
          <Link href="/contact" className="hover:text-rose-600">Contact</Link>
        </nav>
        <div className="flex items-center gap-3">
          {mounted && user ? (
            <button onClick={() => { clearAuth(); window.location.href = "/login"; }} className="text-xs font-bold text-white bg-rose-600 px-3.5 py-2 rounded-lg">
              Logout
            </button>
          ) : (
            <>
              <Link href="/login" className="text-xs font-bold text-slate-700 px-3 py-2">Sign In</Link>
              <Link href="/register" className="text-xs font-bold text-white bg-rose-600 px-4 py-2 rounded-lg">Join</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
`;
fs.writeFileSync("src/components/shared/Navbar.tsx", cleanNavbar, "utf8");

// ৩. Footer সম্পূর্ণ ক্র্যাশ-প্রুফ করা
const cleanFooter = `import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 py-12 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <p className="font-bold text-white text-lg">BloodPulse Foundation</p>
        <p className="text-xs text-slate-500">Voluntary Emergency Blood Donation Registry Bangladesh</p>
        <div className="flex justify-center gap-6 text-xs text-slate-400 pt-2">
          <Link href="/about" className="hover:text-rose-400">About</Link>
          <Link href="/requests" className="hover:text-rose-400">Requests</Link>
          <Link href="/contact" className="hover:text-rose-400">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
`;
fs.writeFileSync("src/components/shared/Footer.tsx", cleanFooter, "utf8");

if (fs.existsSync("solve-complete.js")) fs.unlinkSync("solve-complete.js");
console.log("Components stabilized successfully!");
