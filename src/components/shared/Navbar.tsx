"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getAuthUser, clearAuth } from "@/lib/auth";
import { HeartPulse, User, LogOut, ChevronDown, Menu, X, Shield } from "lucide-react";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ role?: string; name?: string; email?: string } | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      setUser(getAuthUser() as { role?: string; name?: string; email?: string });
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
      <div className="bg-rose-950 text-rose-200 text-xs py-2 px-4 border-b border-rose-900/50">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>National 24/7 Emergency Blood Resuscitation & Clinical Network</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-amber-300">Hotline: 999 / +880 1700-000000</span>
            <span className="text-slate-600">|</span>
            <Link href="/requests" className="hover:text-white transition">Active Triage Feed &rarr;</Link>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 text-slate-100 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-600 to-red-600 flex items-center justify-center text-white font-black shadow-lg shadow-rose-600/30">
              <HeartPulse className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                BloodPulse<span className="text-rose-500">Hub</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800 font-bold uppercase">PRO</span>
              </div>
              <p className="text-[10px] text-slate-400 font-semibold tracking-wider">Sharing Blood &bull; Saving Lives</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-300">
            <Link href="/" className="hover:text-rose-400 transition">Home</Link>
            <Link href="/requests" className="hover:text-rose-400 transition">Emergency Feed</Link>
            <Link href="/services" className="hover:text-rose-400 transition">Hospital Network</Link>
            <Link href="/about" className="hover:text-rose-400 transition">About Us</Link>
            {mounted && user && (
              <>
                <Link href={getDashboard()} className="hover:text-rose-400 transition">Dashboard</Link>
                <Link href="/recipient" className="hover:text-rose-400 transition">Post Request</Link>
              </>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {mounted && user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-slate-900 border border-slate-700 hover:border-slate-500 py-2 px-3.5 rounded-xl transition text-xs font-bold"
                >
                  <div className="w-6 h-6 rounded-lg bg-rose-600 text-white flex items-center justify-center text-xs">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                  <span className="text-slate-200 hidden sm:inline">{user.name || "My Account"}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-2 space-y-1 z-50 text-xs font-medium">
                    <div className="px-3 py-2 border-b border-slate-800">
                      <p className="font-bold text-white truncate">{user.name || "Authenticated User"}</p>
                      <p className="text-slate-400 text-[10px]">{user.role}</p>
                    </div>
                    <Link
                      href={getDashboard()}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-800 rounded-xl transition"
                    >
                      <Shield className="w-4 h-4 text-rose-500" /> Control Dashboard
                    </Link>
                    <Link
                      href="/donor/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-slate-200 hover:bg-slate-800 rounded-xl transition"
                    >
                      <User className="w-4 h-4 text-emerald-500" /> Profile & Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-rose-950/50 rounded-xl transition text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl border border-slate-800 hover:bg-slate-900 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 px-4 py-2 rounded-xl transition shadow-lg shadow-rose-600/30"
                >
                  Join as Donor
                </Link>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950 px-4 py-4 space-y-3 text-sm font-semibold">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-rose-400">Home</Link>
            <Link href="/requests" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-rose-400">Emergency Requests</Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-rose-400">Hospital Network</Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-rose-400">About Us</Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block py-1.5 hover:text-rose-400">Contact</Link>
          </div>
        )}
      </header>
    </>
  );
}
