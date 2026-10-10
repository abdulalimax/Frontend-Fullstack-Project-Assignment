const fs = require("fs");

const navbarCode = `"use client";

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
      {/* টপ নোটিশ বার */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-rose-950 text-slate-300 text-xs py-2 px-4 border-b border-rose-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>জরুরি রক্তদান ও কেন্দ্রীয় ব্লাড ব্যাংক হাব নেটওয়ার্ক — সমগ্র বাংলাদেশ (২৪/৭ সক্রিয়)</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="text-rose-400">হটলাইন: ৯৯৯ / ০১৭০০০০০০০০</span>
            <span className="text-slate-500">|</span>
            <Link href="/requests" className="hover:text-rose-300 text-amber-300">জরুরি রক্তের আবেদন তালিকা &rarr;</Link>
          </div>
        </div>
      </div>

      {/* প্রধান হেডার ও মেন্যু */}
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 to-red-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-rose-500/30 group-hover:scale-105 transition">
              🩸
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1">
                BMHBD <span className="text-rose-600 text-xs px-2 py-0.5 rounded-full bg-rose-50 font-bold border border-rose-200">CENTRAL HUB</span>
              </div>
              <p className="text-[11px] font-bold text-slate-500 tracking-wide">Sharing Blood, Saving Lives Bangladesh</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-slate-700">
            <Link href="/" className="text-rose-600 hover:text-rose-700 transition">হোম</Link>
            <Link href="/requests" className="hover:text-rose-600 transition">রক্তের আবেদনসমূহ</Link>
            <Link href="/services" className="hover:text-rose-600 transition">অর্গানাইজেশন হাব</Link>
            <Link href="/about" className="hover:text-rose-600 transition">আমাদের সম্পর্কে</Link>
            <Link href="/faq" className="hover:text-rose-600 transition">জিজ্ঞাসা (FAQ)</Link>
            <Link href="/contact" className="hover:text-rose-600 transition">যোগাযোগ</Link>
          </nav>

          <div className="flex items-center gap-3">
            {mounted && user ? (
              <>
                <Link
                  href={getDashboard()}
                  className="text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl border transition"
                >
                  ড্যাশবোর্ড
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 px-4 py-2.5 rounded-xl transition shadow-md shadow-rose-600/20"
                >
                  লগআউট
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-bold text-slate-700 hover:text-rose-600 px-4 py-2.5 rounded-xl border hover:bg-slate-50 transition"
                >
                  লগইন
                </Link>
                <Link
                  href="/register"
                  className="text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 px-5 py-2.5 rounded-xl transition shadow-lg shadow-rose-600/30"
                >
                  ডোনার হিসেবে যুক্ত হোন
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
`;

const homeCode = `"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";

export default function HomePage() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=4&status=PENDING")
      .then((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          setRequests(res.data);
        }
      })
      .catch(() => {
        setRequests([]);
      });
  }, []);

  const bloodGroups = [
    { value: "A_POSITIVE", label: "A+ (পজিটিভ)" },
    { value: "A_NEGATIVE", label: "A- (নেগেটিভ)" },
    { value: "B_POSITIVE", label: "B+ (পজিটিভ)" },
    { value: "B_NEGATIVE", label: "B- (নেগেটিভ)" },
    { value: "O_POSITIVE", label: "O+ (পজিটিভ)" },
    { value: "O_NEGATIVE", label: "O- (নেগেটিভ)" },
    { value: "AB_POSITIVE", label: "AB+ (পজিটিভ)" },
    { value: "AB_NEGATIVE", label: "AB- (নেগেটিভ)" },
  ];

  const bangladeshDistricts = [
    "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ",
    "নেত্রকোণা", "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ", "বগুড়া", "যশোর", "কক্সবাজার",
    "দিনাজপুর", "টাঙ্গাইল", "ফরিদপুর", "পাবনা", "নোয়াখালী", "কুষ্টিয়া"
  ];

  const divisions = [
    { name: "ঢাকা", donors: "৪,২৫০+", color: "from-blue-500 to-indigo-600" },
    { name: "চট্টগ্রাম", donors: "২,১৮০+", color: "from-emerald-500 to-teal-600" },
    { name: "রাজশাহী", donors: "১,৩৫০+", color: "from-purple-500 to-indigo-600" },
    { name: "খুলনা", donors: "১,১০০+", color: "from-amber-500 to-orange-600" },
    { name: "বরিশাল", donors: "৭২০+", color: "from-sky-500 to-blue-600" },
    { name: "সিলেট", donors: "৮৯০+", color: "from-rose-500 to-pink-600" },
    { name: "রংপুর", donors: "৯৪০+", color: "from-teal-500 to-emerald-600" },
    { name: "ময়মনসিংহ", donors: "১,০৫০+", color: "from-violet-500 to-purple-600" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      {/* ১. হিরো সেকশন: বিএমএইচবিডি স্টাইল সেন্ট্রাল নোড ও ডায়াগ্রাম */}
      <section className="relative overflow-hidden bg-gradient-to-b from-rose-50/50 via-white to-slate-50 py-16 lg:py-24 border-b">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12 items-center">
          
          {/* বামপাশের তথ্য ও বিবরণ */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-700 px-4 py-1.5 rounded-full text-xs font-bold border border-rose-200">
              <span>🩸 এক ফোঁটা রক্ত, এক নতুন জীবনের শুরু</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
              আপনার ব্লাড ব্যাংক <br />
              <span className="text-rose-600 underline decoration-rose-300 decoration-wavy underline-offset-8">
                সাহায্যে এগিয়ে
              </span> আসছে।
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              বাংলাদেশে প্রতিদিন অসংখ্য মানুষ রক্তের অভাবে জীবন হারাচ্ছে — অথচ সামান্য উদ্যোগে সেই জীবনগুলো রক্ষা করা সম্ভব। এই মানবিক দায়িত্ব থেকেই রক্তদান কার্যক্রমকে আরও সহজ, সংগঠিত ও সম্পূর্ণ ডিজিটাল প্ল্যাটফর্ম করতে ব্লাড ম্যানেজমেন্ট হাব (BMHBD) কেন্দ্রীয় নেটওয়ার্ক পরিচালিত হচ্ছে।
            </p>

            <div className="grid sm:grid-cols-2 gap-3 pt-2 text-xs font-bold text-slate-700">
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border shadow-sm">
                <span className="w-7 h-7 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center font-black">✓</span>
                সদস্য ম্যানেজমেন্ট: ডোনার, মেম্বার ও টিম পরিচালনা
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border shadow-sm">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center font-black">🔒</span>
                ডাটা নিরাপত্তা: তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চিত
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border shadow-sm">
                <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-black">⚙️</span>
                সংগঠন ম্যানেজমেন্ট: দ্রুত ও কার্যকর নেটওয়ার্কিং
              </div>
              <div className="flex items-center gap-2 bg-white p-3 rounded-xl border shadow-sm">
                <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center font-black">🌐</span>
                ব্লাড ব্যাংকের নিজস্ব পেজ ও রিয়েল-টাইম তথ্য
              </div>
            </div>

            {/* ফিল্টার ও সার্চ বক্স */}
            <div className="bg-white p-5 rounded-3xl border shadow-xl shadow-slate-200/50 space-y-3">
              <div className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">রক্তের তাৎক্ষণিক অনুসন্ধান</div>
              <div className="grid sm:grid-cols-3 gap-3">
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="border rounded-2xl p-3 text-sm font-semibold bg-slate-50 outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
                  {bloodGroups.map((bg) => (
                    <option key={bg.value} value={bg.value}>{bg.label}</option>
                  ))}
                </select>

                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="border rounded-2xl p-3 text-sm font-semibold bg-slate-50 outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  {bangladeshDistricts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>

                <Link
                  href={selectedGroup ? `/requests?bloodGroup=${selectedGroup}` : "/requests"}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-black rounded-2xl p-3 text-sm flex items-center justify-center shadow-lg shadow-rose-600/30 transition"
                >
                  ডোনার খুঁজুন 🔍
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/register"
                className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3.5 rounded-2xl text-sm font-black shadow-lg shadow-rose-600/30 transition"
              >
                স্বেচ্ছাসেবী অর্গানাইজেশন রেজিস্টার করুন &rarr;
              </Link>
              <Link
                href="/services"
                className="bg-white hover:bg-slate-100 text-slate-800 border px-6 py-3.5 rounded-2xl text-sm font-black transition shadow-sm"
              >
                অর্গানাইজেশনস দেখুন
              </Link>
            </div>
          </div>

          {/* ডানপাশের সেন্ট্রাল নোড ডায়াগ্রাম (বিএমএইচবিডি হাব মডেল) */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border-2 border-dashed border-rose-200 relative flex items-center justify-center animate-[spin_60s_linear_infinite]">
              {divisions.map((div, idx) => {
                const angle = (idx * 360) / divisions.length;
                const rad = (angle * Math.PI) / 180;
                const x = Math.round(140 * Math.cos(rad));
                const y = Math.round(140 * Math.sin(rad));
                return (
                  <div
                    key={div.name}
                    style={{ transform: `translate(${x}px,${y}px)` }}
                    className="absolute w-14 h-14 rounded-2xl bg-white border-2 border-slate-100 shadow-md flex flex-col items-center justify-center cursor-pointer hover:scale-110 transition"
                  >
                    <span className="text-[11px] font-black text-slate-800">{div.name}</span>
                    <span className="text-[8px] font-bold text-rose-600">{div.donors}</span>
                  </div>
                );
              })}
            </div>

            {/* সেন্ট্রাল হাব ব্যাজ */}
            <div className="absolute w-36 h-36 rounded-3xl bg-gradient-to-tr from-rose-600 to-red-600 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/40 border-4 border-white">
              <span className="text-3xl">🩸</span>
              <span className="font-black text-sm tracking-wide mt-1">BMHBD HUB</span>
              <span className="text-[10px] text-rose-100 font-bold">কেন্দ্রীয় নেটওয়ার্ক</span>
            </div>

            {/* ফ্লোটিং স্ট্যাটাস কার্ড */}
            <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl border shadow-xl flex items-center gap-3">
              <span className="text-2xl">👥</span>
              <div>
                <p className="text-sm font-black text-slate-900">৫০+ সক্রিয়</p>
                <p className="text-[10px] text-slate-500 font-semibold">সংগঠন যুক্ত</p>
              </div>
            </div>

            <div className="absolute bottom-4 left-2 bg-white/95 backdrop-blur-md p-3 rounded-2xl border shadow-xl flex items-center gap-3">
              <span className="text-2xl">💧</span>
              <div>
                <p className="text-sm font-black text-rose-600">১০০০+ ডোনার</p>
                <p className="text-[10px] text-slate-500 font-semibold">প্রস্তুত আছেন</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ২. চার স্তম্ভের হাইলাইট ও জাতীয় মেট্রিক্স */}
      <section className="bg-white border-b py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border-r last:border-none">
            <h3 className="text-4xl font-black text-rose-600">২০০০+</h3>
            <p className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">জীবন রক্ষা প্রাপ্ত</p>
          </div>
          <div className="border-r last:border-none">
            <h3 className="text-4xl font-black text-slate-900">১০০০+</h3>
            <p className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">নিবন্ধিত ডোনার</p>
          </div>
          <div className="border-r last:border-none">
            <h3 className="text-4xl font-black text-rose-600">৫০+</h3>
            <p className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">অর্গানাইজেশন</p>
          </div>
          <div>
            <h3 className="text-4xl font-black text-emerald-600">২৪/৭</h3>
            <p className="text-xs font-bold text-slate-600 mt-1 uppercase tracking-wider">লাইভ জরুরি সেবা</p>
          </div>
        </div>
      </section>

      {/* ৩. লাইভ জরুরি রক্তের রিকোয়েস্ট ফিড (সরাসরি আপনার ডাটাবেজ ব্যাকএন্ড থেকে) */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-600 font-extrabold uppercase tracking-wider text-xs bg-rose-50 px-3 py-1 rounded-lg border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> লাইভ জরুরি রক্তের আবেদন
            </div>
            <h2 className="text-3xl font-black text-slate-950 mt-2">বর্তমানে জরুরি রক্ত প্রয়োজন</h2>
          </div>
          <Link href="/requests" className="text-sm font-bold text-rose-600 hover:text-rose-700 bg-rose-50 px-4 py-2 rounded-xl border border-rose-200 transition">
            সকল উন্মুক্ত আবেদন দেখুন &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div key={r.id} className="bg-white border-2 border-slate-100 hover:border-rose-300 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-rose-600 bg-rose-50 border border-rose-100 px-3.5 py-1 rounded-2xl group-hover:scale-105 transition">
                      {(r.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                      {r.emergencyLevel}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">{r.hospitalName}</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-2 flex items-center gap-1">
                    📍 {r.hospitalAddress}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-600">প্রয়োজন: {r.unitsNeeded} ব্যাগ</span>
                  <a
                    href={"tel:" + (r.contactNumber || "01700000000")}
                    className="bg-slate-900 hover:bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1 shadow"
                  >
                    কল দিন 📞
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white border rounded-3xl space-y-3">
              <span className="text-4xl">🔄</span>
              <p className="text-slate-600 font-bold text-sm">কেন্দ্রীয় ডাটাবেজ থেকে রিয়েল-টাইম তথ্য লোড হচ্ছে...</p>
            </div>
          )}
        </div>
      </section>

      {/* ৪. মেডিকেল ব্লাড কম্প্যাটিবিলিটি চার্ট */}
      <section className="bg-slate-100/70 py-16 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10 space-y-2">
            <span className="text-rose-600 text-xs font-extrabold uppercase tracking-widest bg-rose-100/60 px-3 py-1 rounded-full">মেডিকেল স্ট্যান্ডার্ড</span>
            <h2 className="text-3xl font-black text-slate-900">রক্ত গ্রহণ ও দানের সামঞ্জস্যতা প্রোটোকল</h2>
            <p className="text-sm text-slate-600">নিরাপদ রক্ত পরিসঞ্চালনের জন্য অনুমোদিত মেডিকেল গাইডলাইন</p>
          </div>

          <div className="bg-white rounded-3xl border shadow-md overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-white font-bold">
                <tr>
                  <th className="p-4 sm:p-5">রক্তের গ্রুপ</th>
                  <th className="p-4 sm:p-5">যাঁদের রক্ত দিতে পারবেন</th>
                  <th className="p-4 sm:p-5">যাঁদের থেকে রক্ত নিতে পারবেন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr className="hover:bg-rose-50/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-600 text-base">O- (নেগেটিভ)</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700">সকলকে (সার্বজনীন দাতা / Universal Donor)</td>
                  <td className="p-4 sm:p-5">শুধুমাত্র O-</td>
                </tr>
                <tr className="hover:bg-rose-50/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-600 text-base">O+ (পজিটিভ)</td>
                  <td className="p-4 sm:p-5">O+, A+, B+, AB+</td>
                  <td className="p-4 sm:p-5">O+, O-</td>
                </tr>
                <tr className="hover:bg-rose-50/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-600 text-base">A+ (পজিটিভ)</td>
                  <td className="p-4 sm:p-5">A+, AB+</td>
                  <td className="p-4 sm:p-5">A+, A-, O+, O-</td>
                </tr>
                <tr className="hover:bg-rose-50/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-600 text-base">AB+ (পজিটিভ)</td>
                  <td className="p-4 sm:p-5">শুধুমাত্র AB+</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-700">সকলের থেকে (সার্বজনীন গ্রহীতা / Universal Recipient)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ৫. বিএমএইচবিডি অর্গানাইজেশন অংশীদারিত্ব ও রেজিস্ট্রেশন কল-টু-অ্যাকশন */}
      <section className="bg-gradient-to-br from-rose-950 via-slate-900 to-rose-900 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black">আপনার এলাকার ব্লাড ডোনার অর্গানাইজেশন যুক্ত করুন</h2>
          <p className="text-rose-100/80 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            বাংলাদেশের যেকোনো কলেজ, বিশ্ববিদ্যালয়, থানা কিংবা জেলা পর্যায়ের স্বেচ্ছাসেবী রক্তদান সংস্থাকে কেন্দ্রীয় ডিজিটাল নেটওয়ার্কের সাথে যুক্ত করে রোগীদের পাশে দাঁড়ান।
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-rose-600 hover:bg-rose-500 text-white font-extrabold px-8 py-4 rounded-2xl shadow-xl shadow-rose-600/40 transition"
            >
              স্বেচ্ছাসেবী হিসেবে নিবন্ধন করুন
            </Link>
            <Link
              href="/contact"
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold px-8 py-4 rounded-2xl transition"
            >
              জরুরি হেল্পডেস্কে যোগাযোগ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync("src/components/shared/Navbar.tsx", navbarCode, "utf8");
fs.writeFileSync("src/app/page.tsx", homeCode, "utf8");
console.log("BMHBD world-class design successfully injected!");
