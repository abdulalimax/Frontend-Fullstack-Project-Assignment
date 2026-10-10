const fs = require("fs");

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
  
  // ইন্টারঅ্যাক্টিভ ব্লাড ক্যালকুলেটর স্টেট
  const [calcGroup, setCalcGroup] = useState("O_POSITIVE");
  const [weight, setWeight] = useState(55);
  const [lastDonationMonths, setLastDonationMonths] = useState(4);
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  // ইন্টারঅ্যাক্টিভ সামঞ্জস্যতা ম্যাট্রিক্স সিলেক্টর
  const [activeMatrixGroup, setActiveMatrixGroup] = useState("O_POSITIVE");

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=8&status=PENDING")
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
    { value: "A_POSITIVE", label: "A+ (এ পজিটিভ)" },
    { value: "A_NEGATIVE", label: "A- (এ নেগেটিভ)" },
    { value: "B_POSITIVE", label: "B+ (বি পজিটিভ)" },
    { value: "B_NEGATIVE", label: "B- (বি নেগেটিভ)" },
    { value: "O_POSITIVE", label: "O+ (ও পজিটিভ)" },
    { value: "O_NEGATIVE", label: "O- (ও নেগেটিভ)" },
    { value: "AB_POSITIVE", label: "AB+ (এবি পজিটিভ)" },
    { value: "AB_NEGATIVE", label: "AB- (এবি নেগেটিভ)" },
  ];

  const bangladeshDistricts = [
    "ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "বরিশাল", "সিলেট", "রংপুর", "ময়মনসিংহ",
    "নেত্রকোণা", "কুমিল্লা", "গাজীপুর", "নারায়ণগঞ্জ", "বগুড়া", "যশোর", "কক্সবাজার",
    "দিনাজপুর", "টাঙ্গাইল", "ফরিদপুর", "পাবনা", "নোয়াখালী", "কুষ্টিয়া"
  ];

  const divisions = [
    { name: "ঢাকা", donors: "৪,২৫০+", units: "৮৫০ ব্যাগ", hot: "০১৭০০-১১২২৩৩" },
    { name: "চট্টগ্রাম", donors: "২,১৮০+", units: "৪২০ ব্যাগ", hot: "০১৮০০-১১২২৩৩" },
    { name: "রাজশাহী", donors: "১,৩৫০+", units: "২৯০ ব্যাগ", hot: "০১৭৫০-১১২২৩৩" },
    { name: "খুলনা", donors: "১,১০০+", units: "২১০ ব্যাগ", hot: "০১৯০০-১১২২৩৩" },
    { name: "বরিশাল", donors: "৭২০+", units: "১৬০ ব্যাগ", hot: "০১৭২০-১১২২৩৩" },
    { name: "সিলেট", donors: "৮৯০+", units: "১৯৫ ব্যাগ", hot: "০১৬০০-১১২২৩৩" },
    { name: "রংপুর", donors: "৯৪০+", units: "২০৫ ব্যাগ", hot: "০১৭৩০-১১২২৩৩" },
    { name: "ময়মনসিংহ", donors: "১,০৫০+", units: "২৪০ ব্যাগ", hot: "০১৯৫০-১১২২৩৩" },
  ];

  const compatibilityData: Record<string, { give: string[]; take: string[]; title: string }> = {
    O_NEGATIVE: {
      title: "O- (সার্বজনীন দাতা / Universal Donor)",
      give: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      take: ["O-"]
    },
    O_POSITIVE: {
      title: "O+ (সবচেয়ে বেশি প্রয়োজন)",
      give: ["O+", "A+", "B+", "AB+"],
      take: ["O+", "O-"]
    },
    A_POSITIVE: {
      title: "A+ (বহুল প্রচলিত রক্তের গ্রুপ)",
      give: ["A+", "AB+"],
      take: ["A+", "A-", "O+", "O-"]
    },
    A_NEGATIVE: {
      title: "A- (জরুরি ও দুর্লভ গ্রুপ)",
      give: ["A+", "A-", "AB+", "AB-"],
      take: ["A-", "O-"]
    },
    B_POSITIVE: {
      title: "B+ (ব্যাপক চাহিদাসম্পন্ন)",
      give: ["B+", "AB+"],
      take: ["B+", "B-", "O+", "O-"]
    },
    B_NEGATIVE: {
      title: "B- (সংকটকালীন দুর্লভ গ্রুপ)",
      give: ["B+", "B-", "AB+", "AB-"],
      take: ["B-", "O-"]
    },
    AB_POSITIVE: {
      title: "AB+ (সার্বজনীন গ্রহীতা / Universal Recipient)",
      give: ["AB+"],
      take: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
    },
    AB_NEGATIVE: {
      title: "AB- (বিরল ও বিশেষায়িত গ্রুপ)",
      give: ["AB+", "AB-"],
      take: ["AB-", "A-", "B-", "O-"]
    }
  };

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight < 50) {
      setEligibilityResult("❌ দুঃখিত! রক্তদানের জন্য সর্বনিম্ন ৫০ কেজি ওজন প্রয়োজন।");
    } else if (lastDonationMonths < 3) {
      setEligibilityResult("⏳ আপনার শেষ রক্তদানের পর কমপক্ষে ৩ মাস (৯০ দিন) অতিবাহিত হতে হবে।");
    } else {
      setEligibilityResult("🎉 অভিনন্দন! আপনি শারীরিকভাবে রক্তদানের জন্য সম্পূর্ণ উপযুক্ত।");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-600 selection:text-white relative">
      <Navbar />

      {/* ১. হিরো সেকশন: জীবন্ত পালস ও ডায়নামিক মেডিক্যাল ব্যাকগ্রাউন্ড */}
      <section className="relative overflow-hidden pt-20 pb-28 border-b border-rose-900/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950 via-slate-950 to-black">
        {/* ব্যাকগ্রাউন্ড পালসিং হার্টবিট লাইট */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-rose-600/15 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/3 left-10 w-96 h-96 bg-red-600/10 rounded-full blur-2xl pointer-events-none animate-ping duration-1000"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-900/60 border border-rose-500/40 text-rose-300 px-4 py-2 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg shadow-rose-950">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>বাংলাদেশ কেন্দ্রীয় ব্লাড ম্যানেজমেন্ট ও মানবিক ইমার্জেন্সি নেটওয়ার্ক</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.12] text-white">
                আপনার এক ব্যাগ রক্তে, <br />
                <span className="bg-gradient-to-r from-rose-400 via-red-500 to-amber-400 bg-clip-text text-transparent">
                  ফিরে পাক একটি নতুন জীবন।
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                বাংলাদেশে প্রতিদিন শত শত মুমূর্ষু রোগীর জরুরি রক্তের প্রয়োজনে হাহাকার তৈরি হয়। রক্ত দেওয়া কোনো কঠিন কাজ নয়, এটি একজন মানুষের শ্রেষ্ঠ উপহার। আজই স্বেচ্ছায় রক্তদানের এই ঐতিহাসিক প্ল্যাটফর্মে যুক্ত হোন।
              </p>

              {/* ফিল্টার ও দ্রুত ডোনার সার্চ ফর্ম */}
              <div className="bg-slate-900/90 border border-rose-500/40 p-5 rounded-3xl shadow-2xl backdrop-blur-xl space-y-3">
                <div className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center gap-2">
                  <span>⚡</span> জরুরি রক্তদাতা ও রক্তের ব্যাগ অনুসন্ধান
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="border border-slate-700 bg-slate-950 text-white rounded-2xl p-3.5 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="">রক্তের গ্রুপ বেছে নিন</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg.value} value={bg.value}>{bg.label}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="border border-slate-700 bg-slate-950 text-white rounded-2xl p-3.5 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="">জেলা বেছে নিন</option>
                    {bangladeshDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <Link
                    href={selectedGroup ? `/requests?bloodGroup=${selectedGroup}` : "/requests"}
                    className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black rounded-2xl p-3.5 text-sm flex items-center justify-center shadow-lg shadow-rose-600/40 transition hover:scale-[1.02]"
                  >
                    ডোনার খুঁজুন 🔍
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl shadow-rose-600/40 transition hover:scale-105"
                >
                  রক্তদাতা হিসেবে নিবন্ধন করুন &rarr;
                </Link>
                <Link
                  href="/recipient"
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-8 py-4 rounded-2xl text-sm font-bold transition hover:border-slate-500"
                >
                  জরুরি রক্তের আবেদন করুন
                </Link>
              </div>
            </div>

            {/* ডানপাশের সেন্ট্রাল নোড ডায়াগ্রাম */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border-2 border-dashed border-rose-500/40 relative flex items-center justify-center animate-[spin_50s_linear_infinite]">
                {divisions.map((div, idx) => {
                  const angle = (idx * 360) / divisions.length;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.round(145 * Math.cos(rad));
                  const y = Math.round(145 * Math.sin(rad));
                  return (
                    <div
                      key={div.name}
                      style={{ transform: `translate(${x}px,${y}px)` }}
                      className="absolute w-16 h-16 rounded-2xl bg-slate-900 border border-rose-500/40 shadow-xl flex flex-col items-center justify-center cursor-pointer hover:scale-125 hover:border-rose-400 transition"
                    >
                      <span className="text-xs font-black text-white">{div.name}</span>
                      <span className="text-[9px] font-bold text-rose-400">{div.donors}</span>
                    </div>
                  );
                })}
              </div>

              <div className="absolute w-44 h-44 rounded-3xl bg-gradient-to-tr from-rose-600 via-red-600 to-rose-700 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/70 border-4 border-slate-950 animate-pulse">
                <span className="text-4xl">🩸</span>
                <span className="font-black text-base tracking-wide mt-1">BMHBD HUB</span>
                <span className="text-[11px] text-rose-200 font-bold uppercase tracking-wider">কেন্দ্রীয় নেটওয়ার্ক</span>
              </div>

              <div className="absolute -top-4 right-0 bg-slate-900/90 border border-slate-700 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="text-xs font-black text-white">৫০+ সংগঠন</p>
                  <p className="text-[10px] text-slate-400 font-semibold">সক্রিয়ভাবে যুক্ত</p>
                </div>
              </div>

              <div className="absolute -bottom-4 left-0 bg-slate-900/90 border border-rose-500/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="text-xs font-black text-rose-400">১২,৪৫০+ ডোনার</p>
                  <p className="text-[10px] text-slate-400 font-semibold">প্রস্তুত আছেন</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ২. জাতীয় ইমপ্যাক্ট মেট্রিক্স বার */}
      <section className="bg-slate-900 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border-r border-slate-800 last:border-none space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-rose-500">২,৪৮০+</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">জীবন রক্ষা প্রাপ্ত</p>
          </div>
          <div className="border-r border-slate-800 last:border-none space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-white">১২,৪৫০+</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">নিবন্ধিত রক্তদাতা</p>
          </div>
          <div className="border-r border-slate-800 last:border-none space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-rose-500">৬৪</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">জেলায় কার্যক্রম</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-emerald-400">২৪/৭</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">জরুরি হটলাইন সেবা</p>
          </div>
        </div>
      </section>

      {/* ৩. লাইভ জরুরি রক্তের রিকোয়েস্ট ফিড */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-400 font-extrabold uppercase tracking-wider text-xs bg-rose-950/60 border border-rose-800 px-3 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> লাইভ জরুরি রক্তের আবেদন
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">বর্তমানে জরুরি রক্ত প্রয়োজন</h2>
            <p className="text-slate-400 text-sm mt-1">হাসপাতাল ও রোগীর স্বজনদের দেওয়া সরাসরি জরুরি তালিকা</p>
          </div>
          <Link href="/requests" className="text-sm font-bold text-rose-400 hover:text-rose-300 bg-rose-950/50 border border-rose-800 px-5 py-2.5 rounded-xl transition">
            সকল উন্মুক্ত আবেদন দেখুন &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div key={r.id} className="bg-slate-900 border border-slate-800 hover:border-rose-500 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-rose-950/50 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-rose-400 bg-rose-950 border border-rose-800 px-3.5 py-1 rounded-2xl group-hover:scale-105 transition">
                      {(r.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-900/60 px-2.5 py-1 rounded-full border border-rose-700">
                      {r.emergencyLevel}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-white text-lg leading-snug">{r.hospitalName}</h3>
                  <p className="text-xs font-semibold text-slate-400 mt-2 flex items-center gap-1">
                    📍 {r.hospitalAddress}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">প্রয়োজন: {r.unitsNeeded} ব্যাগ</span>
                  <a
                    href={"tel:" + (r.contactNumber || "01700000000")}
                    className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1 shadow-md shadow-rose-600/30"
                  >
                    কল দিন 📞
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
              <span className="text-4xl">📡</span>
              <p className="text-slate-400 font-bold text-sm">কেন্দ্রীয় ডাটাবেজ থেকে রিয়েল-টাইম তথ্য লোড হচ্ছে...</p>
            </div>
          )}
        </div>
      </section>

      {/* ৪. লাইভ ইন্টারেক্টিভ ব্লাড সামঞ্জস্যতা সিমুলেটর */}
      <section className="bg-slate-900/80 border-y border-slate-800 py-20">
        <div className="max-w-5xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
              ইন্টারেক্টিভ মেডিকেল টুল
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">রক্তের গ্রুপের সামঞ্জস্যতা সিমুলেটর</h2>
            <p className="text-sm text-slate-400">নিচের যেকোনো রক্ত গ্রুপে ক্লিক করে দেখুন কারা এই রক্ত নিতে ও দিতে পারে</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(compatibilityData).map((k) => (
              <button
                key={k}
                onClick={() => setActiveMatrixGroup(k)}
                className={"px-5 py-2.5 rounded-2xl text-xs font-black transition " + (activeMatrixGroup === k ? "bg-rose-600 text-white shadow-lg shadow-rose-600/40 scale-105" : "bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-600")}
              >
                {k.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
              </button>
            ))}
          </div>

          <div className="bg-slate-950 border border-slate-800 p-8 rounded-3xl grid sm:grid-cols-2 gap-8 shadow-2xl">
            <div className="space-y-4">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-widest">রক্তদাতা হিসেবে</div>
              <h3 className="text-2xl font-black text-white">{compatibilityData[activeMatrixGroup]?.title}</h3>
              <p className="text-sm text-slate-400">এই গ্রুপের ব্যক্তিরা নিম্নলিখিত গ্রুপের রোগীদের রক্ত দিতে পারবেন:</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {compatibilityData[activeMatrixGroup]?.give.map((grp) => (
                  <span key={grp} className="bg-emerald-950 border border-emerald-700 text-emerald-300 font-black px-4 py-1.5 rounded-xl text-sm">
                    {grp}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-4 sm:border-l sm:border-slate-800 sm:pl-8">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-widest">রক্তগ্রহীতা হিসেবে</div>
              <h3 className="text-2xl font-black text-white">যাদের থেকে রক্ত গ্রহণ করতে পারবেন</h3>
              <p className="text-sm text-slate-400">জরুরি প্রয়োজনে এই গ্রুপের ব্যক্তিরা নিচের ডোনারদের রক্ত গ্রহণ করবেন:</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {compatibilityData[activeMatrixGroup]?.take.map((grp) => (
                  <span key={grp} className="bg-rose-950 border border-rose-700 text-rose-300 font-black px-4 py-1.5 rounded-xl text-sm">
                    {grp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ৫. ইন্টারেক্টিভ ডোনেশন এলিজিবিলিটি ক্যালকুলেটর */}
      <section className="max-w-4xl mx-auto px-4 py-20 w-full">
        <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-rose-500/30 p-8 sm:p-12 rounded-3xl shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">স্বয়ংক্রিয় স্বাস্থ্য পরীক্ষা</span>
            <h2 className="text-3xl font-black text-white">আপনি কি আজ রক্তদান করতে পারবেন?</h2>
            <p className="text-xs sm:text-sm text-slate-400">নিচের তথ্যগুলো দিয়ে সাথে সাথে জেনে নিন আপনি রক্তদানের জন্য প্রস্তুত কি না</p>
          </div>

          <form onSubmit={handleCheckEligibility} className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">রক্তের গ্রুপ</label>
              <select
                value={calcGroup}
                onChange={(e) => setCalcGroup(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-rose-500"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg.value} value={bg.value}>{bg.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">ওজন (কেজি)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min={35}
                max={150}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-rose-500"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-300">শেষ রক্তদানের ব্যবধান (মাস)</label>
              <input
                type="number"
                value={lastDonationMonths}
                onChange={(e) => setLastDonationMonths(Number(e.target.value))}
                min={0}
                max={24}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white outline-none focus:border-rose-500"
              />
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-3.5 rounded-xl transition shadow-lg shadow-rose-600/30"
              >
                উপযুক্ততা যাচাই করুন ⚡
              </button>
            </div>
          </form>

          {eligibilityResult && (
            <div className="p-4 rounded-2xl bg-slate-950 border border-rose-500/40 text-center font-bold text-sm text-white animate-bounce">
              {eligibilityResult}
            </div>
          )}
        </div>
      </section>

      {/* ৬. ৮টি বিভাগের জরুরি হটলাইন ও নেটওয়ার্ক */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
              বিভাগীয় হটলাইন ডিরেক্টরি
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">৮ বিভাগের ব্লাড ব্যাংক ও জরুরি হটলাইন</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              জরুরি মুহূর্তে যেকোনো বিভাগের রক্তদাতা ও অ্যাম্বুলেন্স সহায়তার জন্য সরাসরি যোগাযোগ করুন।
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => (
              <div key={div.name} className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 rounded-3xl space-y-4 transition">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-white">{div.name} বিভাগ</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
                    সক্রিয়
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-rose-500">{div.donors}</div>
                  <div className="text-xs text-slate-400 font-semibold">নিবন্ধিত রক্তদাতা</div>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between text-xs font-bold text-slate-300">
                  <span>সংরক্ষিত সক্ষমতা:</span>
                  <span className="text-white">{div.units}</span>
                </div>
                <a
                  href={"tel:" + div.hot}
                  className="block text-center text-xs font-bold bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white py-2.5 rounded-xl transition border border-slate-800"
                >
                  হটলাইন: {div.hot} 📞
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ৭. রক্তদান নিয়ে ভুল ধারণা ও বৈজ্ঞানিক সত্য */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-14 space-y-3">
          <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
            বিজ্ঞানসম্মত সত্য
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">রক্তদান সংক্রান্ত ভুল ধারণা বনাম সত্য</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            ভুল ধারণা দূর করুন, সুস্থ মানুষ হিসেবে নিয়মতান্ত্রিক রক্তদানে নির্ভয়ে অংশ নিন।
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span>❌ ভুল ধারণা:</span> <span>রক্ত দিলে শরীর স্থায়ীভাবে দুর্বল হয়ে যায়।</span>
            </div>
            <div className="flex items-start gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
              <span>✅ বৈজ্ঞানিক সত্য:</span> <span className="text-slate-300 font-normal">রক্তদানের মাত্র ৪৮ ঘণ্টার মধ্যে শরীর নতুন প্লাজমা তৈরি করে শূন্যতা পূরণ করে।</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span>❌ ভুল ধারণা:</span> <span>বছরে কেবল একবার রক্তদান করা নিরাপদ।</span>
            </div>
            <div className="flex items-start gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
              <span>✅ বৈজ্ঞানিক সত্য:</span> <span className="text-slate-300 font-normal">যেকোনো প্রাপ্তবয়স্ক সুস্থ মানুষ প্রতি ৩ থেকে ৪ মাস পর পর নিরাপদে রক্তদান করতে পারেন।</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span>❌ ভুল ধারণা:</span> <span>রক্তদানে মারাত্মক রক্তস্বল্পতা তৈরি হতে পারে।</span>
            </div>
            <div className="flex items-start gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
              <span>✅ বৈজ্ঞানিক সত্য:</span> <span className="text-slate-300 font-normal">রক্তদানের পূর্বে হিমোগ্লোবিন পরীক্ষা করা হয়, উপযুক্ত ব্যক্তি ছাড়া রক্ত গ্রহণ করা হয় না।</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
              <span>❌ ভুল ধারণা:</span> <span>রক্ত দিলে বিভিন্ন সংক্রামক রোগে আক্রান্ত হওয়ার ভয় থাকে।</span>
            </div>
            <div className="flex items-start gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
              <span>✅ বৈজ্ঞানিক সত্য:</span> <span className="text-slate-300 font-normal">প্রতিটি ডোনেশনে সম্পূর্ণ নতুন, ডিসপোজেবল ও জীবাণুমুক্ত সুঁই এবং কিট ব্যবহার করা হয়।</span>
            </div>
          </div>
        </div>
      </section>

      {/* ৮. মোটিভেশনাল কল-টু-অ্যাকশন ব্যানার */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-red-950 to-slate-950 border-t border-rose-900/40 py-24 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            আপনার জীবনের ১ ঘণ্টা সময়, <br />
            <span className="text-rose-400">একটি পরিবারের আজীবনের নির্ভরতা।</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            দেশের হাজারো স্বেচ্ছাসেবী রক্তদাতার দলে যোগ দিন। আজই রক্তদাতা হিসেবে আপনার নাম ও রক্তের গ্রুপ নিবন্ধন করে পাশে থাকুন।
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-rose-600 hover:bg-rose-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-rose-600/40 transition hover:scale-105"
            >
              স্বেচ্ছাসেবী রক্তদাতা হিসেবে নিবন্ধন করুন &rarr;
            </Link>
            <Link
              href="/contact"
              className="bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-bold px-8 py-4 rounded-2xl transition"
            >
              জরুরি হটলাইনে যোগাযোগ
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
`;

fs.writeFileSync("src/app/page.tsx", homeCode, "utf8");

// অপ্রয়োজনীয় ডায়াগনস্টিক ফাইল মুছে ফেলা
if (fs.existsSync("build-ultimate-bmhbd.js")) fs.unlinkSync("build-ultimate-bmhbd.js");

console.log("Mega Dynamic BMHBD Homepage applied successfully!");
