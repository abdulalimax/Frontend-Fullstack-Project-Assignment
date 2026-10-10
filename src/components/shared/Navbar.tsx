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
    } catch {
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
      {/* Top Critical Status Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-950 to-red-950 text-slate-300 text-xs py-2.5 px-4 border-b border-rose-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2.5 font-semibold text-rose-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
            </span>
            <span>National Emergency Transfusion & Trauma Logistics Infrastructure</span>
          </div>
          <div className="flex items-center gap-5 text-xs font-bold">
            <span className="text-amber-400">24/7 Hotline: +880 1700-000000</span>
            <span className="text-slate-700">|</span>
            <Link href="/requests" className="text-rose-300 hover:text-white transition flex items-center gap-1">
              Active Patient Queue &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-600 via-red-500 to-amber-500 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-rose-600/30 group-hover:scale-105 transition">
              🩸
            </div>
            <div>
              <div className="text-xl font-black text-white tracking-tight flex items-center gap-2">
                BloodPulse<span className="text-rose-500">Hub</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Live
                </span>
              </div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                Central Clinical Transfusion Network
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-300">
            <Link href="/" className="hover:text-rose-400 transition">Overview</Link>
            <Link href="/requests" className="hover:text-rose-400 transition">Emergency Requests</Link>
            <Link href="/services" className="hover:text-rose-400 transition">Hospital Network</Link>
            <Link href="/about" className="hover:text-rose-400 transition">Clinical Protocols</Link>
            <Link href="/contact" className="hover:text-rose-400 transition">Support & Dispatch</Link>
          </nav>

          <div className="flex items-center gap-3">
            {mounted && user ? (
              <>
                <Link
                  href={getDashboard()}
                  className="text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 px-4 py-2.5 rounded-xl border border-slate-700 transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2.5 rounded-xl shadow-lg shadow-rose-600/30 transition"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-300 hover:text-white px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
                >
                  Portal Login
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-black text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 px-5 py-2.5 rounded-xl shadow-lg shadow-rose-600/40 transition hover:scale-105"
                >
                  Enroll Donor
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
