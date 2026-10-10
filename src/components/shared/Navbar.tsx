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

  const handleLogout = () => {
    clearAuth();
    window.location.href = "/login";
  };

  const getDashboard = () => {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "DONOR") return "/donor";
    if (user?.role === "RECIPIENT") return "/recipient";
    return "/login";
  };

  return (
    <>
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-slate-200">National Clinical Blood Registry & Emergency Logistics Network</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-rose-400">Emergency Dispatch: +880 1700-000000</span>
            <span className="text-slate-600">|</span>
            <Link href="/requests" className="text-slate-300 hover:text-white transition">
              Live Patient Queue &rarr;
            </Link>
          </div>
        </div>
      </div>

      <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-rose-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-rose-600/20">
              BP
            </div>
            <div>
              <div className="text-xl font-black text-slate-950 tracking-tight leading-none">
                BloodPulse<span className="text-rose-600">Hub</span>
              </div>
              <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                Centralized Blood Transfusion Infrastructure
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-rose-600 hover:text-rose-700 transition">Overview</Link>
            <Link href="/requests" className="hover:text-slate-950 transition">Emergency Requests</Link>
            <Link href="/services" className="hover:text-slate-950 transition">Hospital Network</Link>
            <Link href="/about" className="hover:text-slate-950 transition">Clinical Protocols</Link>
            <Link href="/contact" className="hover:text-slate-950 transition">Support & Dispatch</Link>
          </nav>

          <div className="flex items-center gap-3">
            {mounted && user ? (
              <>
                <Link
                  href={getDashboard()}
                  className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 px-4 py-2.5 rounded-xl transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  Portal Login
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2.5 rounded-xl shadow-md shadow-rose-600/20 transition"
                >
                  Register Donor
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
