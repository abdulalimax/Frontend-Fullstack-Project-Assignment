"use client";
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
