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
  const [activeTab, setActiveTab] = useState("all");

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
    { value: "A_POSITIVE", label: "A+ (A Positive)" },
    { value: "A_NEGATIVE", label: "A- (A Negative)" },
    { value: "B_POSITIVE", label: "B+ (B Positive)" },
    { value: "B_NEGATIVE", label: "B- (B Negative)" },
    { value: "O_POSITIVE", label: "O+ (O Positive)" },
    { value: "O_NEGATIVE", label: "O- (O Negative)" },
    { value: "AB_POSITIVE", label: "AB+ (AB Positive)" },
    { value: "AB_NEGATIVE", label: "AB- (AB Negative)" },
  ];

  const bangladeshDistricts = [
    "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
    "Netrokona", "Cumilla", "Gazipur", "Narayanganj", "Bogura", "Jashore", "Cox's Bazar",
    "Dinajpur", "Tangail", "Faridpur", "Pabna", "Noakhali", "Kushtia"
  ];

  const divisions = [
    { name: "Dhaka", donors: "4,250+", units: "850 Bags", color: "from-rose-500 to-red-600" },
    { name: "Chattogram", donors: "2,180+", units: "420 Bags", color: "from-blue-500 to-indigo-600" },
    { name: "Rajshahi", donors: "1,350+", units: "290 Bags", color: "from-emerald-500 to-teal-600" },
    { name: "Khulna", donors: "1,100+", units: "210 Bags", color: "from-amber-500 to-orange-600" },
    { name: "Barishal", donors: "720+", units: "160 Bags", color: "from-cyan-500 to-blue-600" },
    { name: "Sylhet", donors: "890+", units: "195 Bags", color: "from-purple-500 to-pink-600" },
    { name: "Rangpur", donors: "940+", units: "205 Bags", color: "from-teal-500 to-emerald-600" },
    { name: "Mymensingh", donors: "1,050+", units: "240 Bags", color: "from-violet-500 to-purple-600" },
  ];

  const donationSteps = [
    {
      step: "01",
      title: "Registration & Profile Setup",
      desc: "Register in under 2 minutes with your blood group, district, and last donation date.",
      icon: "📋"
    },
    {
      step: "02",
      title: "Medical Eligibility Screening",
      desc: "Our automated safety checks verify minimum interval (90-120 days) and physical wellness.",
      icon: "🩺"
    },
    {
      step: "03",
      title: "Instant Emergency Matching",
      desc: "Nearby patients and hospitals receive instant notifications when your group is critically needed.",
      icon: "⚡"
    },
    {
      step: "04",
      title: "Donate & Save a Human Life",
      desc: "Direct contact with patient liaisons, certified hospital donation, and track your humanitarian impact.",
      icon: "❤️"
    }
  ];

  const mythsVsFacts = [
    {
      myth: "Blood donation makes the donor weak or sick.",
      fact: "The human body replenishes plasma volume within 24-48 hours and red blood cells within weeks."
    },
    {
      myth: "I can only donate once a year.",
      fact: "Healthy adults can safely donate whole blood every 3 to 4 months."
    },
    {
      myth: "Blood donation is painful and time-consuming.",
      fact: "The actual blood collection takes only 8-10 minutes with minimal prick sensation."
    },
    {
      myth: "Rare blood groups cannot find donors in emergency.",
      fact: "BMHBD Central Network links donors nationwide for critical rare group transfusions."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION WITH MEDICAL PULSE & DYNAMIC LIFE-SAVING GLOW */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-rose-900/40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-950/80 via-slate-950 to-black">
        {/* Animated Background Pulse Circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-red-600/15 rounded-full blur-2xl pointer-events-none animate-ping duration-1000"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-rose-900/50 border border-rose-500/40 text-rose-300 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg shadow-rose-950">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>Central Emergency Blood Management Network Bangladesh</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.15] text-white">
                Be The Reason Someone <br />
                <span className="bg-gradient-to-r from-rose-400 via-red-500 to-amber-400 bg-clip-text text-transparent">
                  Celebrates Tomorrow.
                </span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Every 2 seconds, someone in Bangladesh needs emergency blood. BMHBD Central Hub bridges verified blood donors, volunteer networks, and intensive care units across 64 districts in real time.
              </p>

              {/* Quick Donor Search Form */}
              <div className="bg-slate-900/90 border border-rose-500/30 p-4 sm:p-5 rounded-3xl shadow-2xl backdrop-blur-xl space-y-3">
                <div className="text-xs font-bold uppercase text-rose-400 tracking-wider flex items-center gap-2">
                  <span>⚡</span> Instant Blood Donor & Emergency Unit Finder
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="border border-slate-700 bg-slate-950 text-white rounded-2xl p-3 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="">Select Blood Group</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg.value} value={bg.value}>{bg.label}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="border border-slate-700 bg-slate-950 text-white rounded-2xl p-3 text-sm font-semibold outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  >
                    <option value="">Select District</option>
                    {bangladeshDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <Link
                    href={selectedGroup ? `/requests?bloodGroup=${selectedGroup}` : "/requests"}
                    className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black rounded-2xl p-3 text-sm flex items-center justify-center shadow-lg shadow-rose-600/40 transition hover:scale-[1.02]"
                  >
                    Search Donors 🔍
                  </Link>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/register"
                  className="bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white px-7 py-4 rounded-2xl text-sm font-black shadow-xl shadow-rose-600/30 transition hover:scale-105"
                >
                  Join as Life-Saving Donor &rarr;
                </Link>
                <Link
                  href="/recipient"
                  className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 px-7 py-4 rounded-2xl text-sm font-bold transition hover:border-slate-500"
                >
                  Post Emergency Request
                </Link>
              </div>
            </div>

            {/* Right Interactive Medical Node Animation */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-dashed border-rose-500/40 relative flex items-center justify-center animate-[spin_45s_linear_infinite]">
                {divisions.map((div, idx) => {
                  const angle = (idx * 360) / divisions.length;
                  const rad = (angle * Math.PI) / 180;
                  const x = Math.round(145 * Math.cos(rad));
                  const y = Math.round(145 * Math.sin(rad));
                  return (
                    <div
                      key={div.name}
                      style={{ transform: `translate(${x}px,${y}px)` }}
                      className="absolute w-16 h-16 rounded-2xl bg-slate-900 border border-rose-500/30 shadow-lg flex flex-col items-center justify-center cursor-pointer hover:scale-125 hover:border-rose-400 transition"
                    >
                      <span className="text-xs font-black text-white">{div.name}</span>
                      <span className="text-[9px] font-bold text-rose-400">{div.donors}</span>
                    </div>
                  );
                })}
              </div>

              {/* Central Glowing BMHBD Core Node */}
              <div className="absolute w-40 h-40 rounded-3xl bg-gradient-to-tr from-rose-600 via-red-600 to-rose-700 text-white flex flex-col items-center justify-center shadow-2xl shadow-rose-600/60 border-4 border-slate-950 animate-pulse">
                <span className="text-4xl">🩸</span>
                <span className="font-black text-sm tracking-wide mt-1">BMHBD CENTRAL</span>
                <span className="text-[10px] text-rose-200 font-bold uppercase tracking-wider">National Hub</span>
              </div>

              {/* Floating Stat Badges */}
              <div className="absolute -top-4 right-0 bg-slate-900/90 border border-slate-700 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                <span className="text-2xl">👥</span>
                <div>
                  <p className="text-xs font-black text-white">50+ Organizations</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Active Across BD</p>
                </div>
              </div>

              <div className="absolute -bottom-4 left-0 bg-slate-900/90 border border-rose-500/40 p-3 rounded-2xl shadow-xl flex items-center gap-3 backdrop-blur-md">
                <span className="text-2xl">❤️</span>
                <div>
                  <p className="text-xs font-black text-rose-400">12,450+ Verified</p>
                  <p className="text-[10px] text-slate-400 font-semibold">Ready Donors</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. REAL-TIME IMPACT STATS BAR */}
      <section className="bg-slate-900 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="border-r border-slate-800 last:border-none space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-rose-500">2,480+</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Lives Saved</p>
          </div>
          <div className="border-r border-slate-800 last:border-none space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-white">12,450+</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Donors</p>
          </div>
          <div className="border-r border-slate-800 last:border-none space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-rose-500">64</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Districts Synced</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-4xl sm:text-5xl font-black text-emerald-400">24/7</h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Emergency Response</p>
          </div>
        </div>
      </section>

      {/* 3. LIVE EMERGENCY BLOOD REQUEST FEED */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-rose-400 font-extrabold uppercase tracking-wider text-xs bg-rose-950/60 border border-rose-800 px-3 py-1 rounded-lg">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span> Live Critical Emergency Feed
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">Urgent Blood Requests Right Now</h2>
            <p className="text-slate-400 text-sm mt-1">Directly synced with hospitals and patient coordinators</p>
          </div>
          <Link href="/requests" className="text-sm font-bold text-rose-400 hover:text-rose-300 bg-rose-950/50 border border-rose-800 px-5 py-2.5 rounded-xl transition">
            View All Open Requests &rarr;
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
                  <span className="text-xs font-bold text-slate-300">Needed: {r.unitsNeeded} Bag(s)</span>
                  <a
                    href={"tel:" + (r.contactNumber || "01700000000")}
                    className="bg-rose-600 hover:bg-rose-500 text-white px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1 shadow-md shadow-rose-600/30"
                  >
                    Call Now 📞
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-slate-900 border border-slate-800 rounded-3xl space-y-3">
              <span className="text-4xl">📡</span>
              <p className="text-slate-400 font-bold text-sm">Synchronizing with live national emergency database...</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. 8 DIVISIONAL EMERGENCY INVENTORY & DONOR DIRECTORY */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
              National Coverage Matrix
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">8 Divisions Blood Bank Readiness</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Real-time regional volunteer readiness ensuring zero patient mortality due to supply delays.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisions.map((div) => (
              <div key={div.name} className="bg-slate-950 border border-slate-800 hover:border-slate-700 p-6 rounded-3xl space-y-4 transition">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-white">{div.name}</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-black text-rose-500">{div.donors}</div>
                  <div className="text-xs text-slate-400 font-semibold">Registered Active Donors</div>
                </div>
                <div className="pt-2 border-t border-slate-900 flex justify-between text-xs font-bold text-slate-300">
                  <span>Available Reserve:</span>
                  <span className="text-white">{div.units}</span>
                </div>
                <Link
                  href={"/requests?district=" + div.name}
                  className="block text-center text-xs font-bold bg-slate-900 hover:bg-rose-600 text-slate-200 hover:text-white py-2 rounded-xl transition border border-slate-800"
                >
                  Explore Divisional Donors &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 4-STEP HOW IT WORKS & MOTIVATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-14 space-y-3">
          <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
            Life-Saving Procedure
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">How You Save a Life in 4 Simple Steps</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Transparent, secure, and digitally monitored process from registration to donation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {donationSteps.map((step) => (
            <div key={step.step} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative space-y-4 hover:border-rose-500/50 transition">
              <div className="flex justify-between items-center">
                <span className="text-4xl">{step.icon}</span>
                <span className="text-2xl font-black text-slate-800 font-mono">{step.step}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{step.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. MEDICAL BLOOD COMPATIBILITY PROTOCOL */}
      <section className="bg-slate-900/60 border-y border-slate-800 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12 space-y-2">
            <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
              Medical Standards
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">Blood Compatibility Protocol</h2>
            <p className="text-sm text-slate-400">Certified clinical matrix for emergency blood transfusion</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900 text-slate-300 font-bold border-b border-slate-800">
                <tr>
                  <th className="p-4 sm:p-5">Blood Group</th>
                  <th className="p-4 sm:p-5">Can Donate Blood To</th>
                  <th className="p-4 sm:p-5">Can Receive Blood From</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-slate-300 font-medium">
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-500 text-base">O- (Negative)</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400">Everyone (Universal Donor)</td>
                  <td className="p-4 sm:p-5">O- only</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-500 text-base">O+ (Positive)</td>
                  <td className="p-4 sm:p-5">O+, A+, B+, AB+</td>
                  <td className="p-4 sm:p-5">O+, O-</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-500 text-base">A+ (Positive)</td>
                  <td className="p-4 sm:p-5">A+, AB+</td>
                  <td className="p-4 sm:p-5">A+, A-, O+, O-</td>
                </tr>
                <tr className="hover:bg-slate-900/50 transition">
                  <td className="p-4 sm:p-5 font-black text-rose-500 text-base">AB+ (Positive)</td>
                  <td className="p-4 sm:p-5">AB+ only</td>
                  <td className="p-4 sm:p-5 font-bold text-emerald-400">Everyone (Universal Recipient)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. MYTHS VS FACTS (DONOR INSPIRATION) */}
      <section className="max-w-6xl mx-auto px-4 py-20 w-full">
        <div className="text-center mb-14 space-y-3">
          <span className="text-rose-400 text-xs font-extrabold uppercase tracking-widest bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
            Awareness & Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Debunking Blood Donation Myths</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Science-backed facts to eliminate fear and inspire regular donations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {mythsVsFacts.map((item, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                <span>❌ Myth:</span> <span>{item.myth}</span>
              </div>
              <div className="flex items-start gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                <span>✅ Fact:</span> <span className="text-slate-300 font-normal">{item.fact}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. MOTIVATIONAL CALL TO ACTION BANNER */}
      <section className="relative overflow-hidden bg-gradient-to-r from-rose-950 via-red-950 to-slate-950 border-t border-rose-900/40 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            1 Hour of Your Time. <br />
            <span className="text-rose-400">A Lifetime of Someone's Smile.</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            Join thousands of voluntary blood heroes across Bangladesh. Register your donor profile or affiliate your campus organization today.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-rose-600 hover:bg-rose-500 text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-rose-600/40 transition hover:scale-105"
            >
              Register as Volunteer Donor &rarr;
            </Link>
            <Link
              href="/contact"
              className="bg-slate-900/90 hover:bg-slate-800 text-white border border-slate-700 font-bold px-8 py-4 rounded-2xl transition"
            >
              Contact Emergency Coordinator
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

// Clean up temporary script files to remove Git green status
const tempFiles = [
  "make-bmhbd-worldclass.js",
  "diagnose.js",
  "fix-all.js",
  "fix-error.js",
  "fix-hydration.js",
  "solve-complete.js",
  "unblock.js"
];
tempFiles.forEach((file) => {
  if (fs.existsSync(file)) fs.unlinkSync(file);
});

console.log("Ultimate BMHBD World-Class Homepage built successfully!");
