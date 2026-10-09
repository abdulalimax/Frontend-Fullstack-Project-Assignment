"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuth, getAuthUser } from "@/lib/auth";
import { HeartPulse, PhoneCall } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ role?: string; name?: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setUser(getAuthUser() as { role?: string; name?: string });
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "DONOR") return "/donor";
    if (user?.role === "RECIPIENT") return "/recipient";
    return "/login";
  };

  return (
    <>
      <div className="bg-slate-950 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Central Blood Registry Active 24/7</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-rose-400 font-semibold">
              <PhoneCall className="w-3 h-3" /> Emergency Call: 999
            </span>
          </div>
        </div>
      </div>

      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-rose-600 text-white p-2 rounded-xl">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight">BloodPulse</span>
              <span className="text-[10px] block font-bold text-rose-600 -mt-1 tracking-widest uppercase">Foundation</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="hover:text-rose-600 transition">Home</Link>
            <Link href="/requests" className="hover:text-rose-600 transition">Emergency Requests</Link>
            <Link href="/about" className="hover:text-rose-600 transition">About Foundation</Link>
            <Link href="/services" className="hover:text-rose-600 transition">Services</Link>
            <Link href="/faq" className="hover:text-rose-600 transition">FAQ</Link>
            <Link href="/contact" className="hover:text-rose-600 transition">Contact</Link>
          </nav>

          <div className="flex items-center gap-3">
            {mounted && user ? (
              <>
                <Link
                  href={getDashboardLink()}
                  className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-3.5 py-2 rounded-xl transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-3.5 py-2 rounded-xl transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 hover:text-rose-600 px-3 py-2 transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2 rounded-xl transition shadow-sm"
                >
                  Join as Donor
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
