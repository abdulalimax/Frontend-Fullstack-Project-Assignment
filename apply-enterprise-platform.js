const fs = require("fs");
const path = require("path");

const ensureDir = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

const writeFile = (relPath, content) => {
  ensureDir(relPath);
  fs.writeFileSync(relPath, content, "utf8");
  console.log("Updated: " + relPath);
};

// 1. NAVBAR
const navbar = `"use client";

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
`;

// 2. FOOTER
const footer = `import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-12 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="text-lg font-black text-slate-950">BloodPulse<span className="text-rose-600">Hub</span></div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Centralized clinical registry facilitating rapid, verified blood transfusion logistics and trauma network management across Bangladesh.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-950 uppercase tracking-wider">Navigation</div>
          <ul className="space-y-1 text-xs">
            <li><Link href="/" className="hover:text-rose-600">Overview</Link></li>
            <li><Link href="/requests" className="hover:text-rose-600">Emergency Requests</Link></li>
            <li><Link href="/services" className="hover:text-rose-600">Hospital Network</Link></li>
            <li><Link href="/about" className="hover:text-rose-600">Clinical Standards</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-950 uppercase tracking-wider">Clinical Portals</div>
          <ul className="space-y-1 text-xs">
            <li><Link href="/login" className="hover:text-rose-600">Hospital Staff Login</Link></li>
            <li><Link href="/register" className="hover:text-rose-600">Donor Registration</Link></li>
            <li><Link href="/recipient" className="hover:text-rose-600">Patient Emergency Post</Link></li>
            <li><Link href="/contact" className="hover:text-rose-600">Emergency Dispatch Desk</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-950 uppercase tracking-wider">Emergency Operations</div>
          <p className="text-xs text-slate-500">24/7 National Dispatch Coordination Center</p>
          <p className="text-sm font-bold text-rose-600">+880 1700-000000</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-100 mt-8 pt-6 text-center text-xs text-slate-400">
        &copy; 2026 BloodPulse National Transfusion Logistics Network. All rights reserved.
      </div>
    </footer>
  );
}
`;

// 3. HOME PAGE
const home = `"use client";

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
  
  const [calcGroup, setCalcGroup] = useState("O_POSITIVE");
  const [weight, setWeight] = useState(55);
  const [lastDonationMonths, setLastDonationMonths] = useState(4);
  const [eligibilityResult, setEligibilityResult] = useState<string | null>(null);

  const [activeGroupMatrix, setActiveGroupMatrix] = useState("O_POSITIVE");

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=6&status=PENDING")
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
    "Netrokona", "Cumilla", "Gazipur", "Narayanganj", "Bogura", "Jashore", "Cox's Bazar"
  ];

  const divisionStats = [
    { name: "Dhaka Central", donors: "5,420 Active", units: "920 Units", hot: "+880 1700-112233" },
    { name: "Chattogram Coast", donors: "2,840 Active", units: "410 Units", hot: "+880 1800-112233" },
    { name: "Rajshahi North", donors: "1,750 Active", units: "280 Units", hot: "+880 1750-112233" },
    { name: "Khulna Delta", donors: "1,420 Active", units: "210 Units", hot: "+880 1900-112233" },
    { name: "Barishal Coastal", donors: "960 Active", units: "140 Units", hot: "+880 1720-112233" },
    { name: "Sylhet Highlands", donors: "1,120 Active", units: "190 Units", hot: "+880 1600-112233" },
    { name: "Rangpur North", donors: "1,280 Active", units: "210 Units", hot: "+880 1730-112233" },
    { name: "Mymensingh Central", donors: "1,390 Active", units: "240 Units", hot: "+880 1950-112233" },
  ];

  const compatibilityMap: Record<string, { canDonateTo: string[]; canReceiveFrom: string[]; tag: string }> = {
    O_NEGATIVE: {
      tag: "Universal Red Cell Donor",
      canDonateTo: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
      canReceiveFrom: ["O-"]
    },
    O_POSITIVE: {
      tag: "Highest National Clinical Demand",
      canDonateTo: ["O+", "A+", "B+", "AB+"],
      canReceiveFrom: ["O+", "O-"]
    },
    A_POSITIVE: {
      tag: "Common Platelet & Red Cell Type",
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"]
    },
    A_NEGATIVE: {
      tag: "Rare Emergency Blood Type",
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"]
    },
    B_POSITIVE: {
      tag: "High Trauma & Surgical Demand",
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"]
    },
    B_NEGATIVE: {
      tag: "High Priority Rare Group",
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"]
    },
    AB_POSITIVE: {
      tag: "Universal Recipient / Universal Plasma Donor",
      canDonateTo: ["AB+"],
      canReceiveFrom: ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"]
    },
    AB_NEGATIVE: {
      tag: "Specialized Pediatric Compatibility",
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["AB-", "A-", "B-", "O-"]
    }
  };

  const handleCheckEligibility = (e: React.FormEvent) => {
    e.preventDefault();
    if (weight < 50) {
      setEligibilityResult("Ineligible: Clinical guidelines require a minimum donor weight of 50 kg.");
    } else if (lastDonationMonths < 3) {
      setEligibilityResult("Waiting Period Active: A standard 90-day recovery interval is required between donations.");
    } else {
      setEligibilityResult("Eligible: You meet baseline physical prerequisites to donate blood safely today.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-rose-600 selection:text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="border-b border-slate-200 bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-slate-100 border border-slate-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-slate-700">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
                Integrated Healthcare & Critical Transfusion Registry
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
                Every Drop Counts. <br />
                <span className="text-rose-600">Save Lives in Critical Emergencies.</span>
              </h1>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
                Connecting clinical trauma centers, verified voluntary donors, and emergency recipients through a fault-tolerant national logistics platform.
              </p>

              {/* Fast Triage Search Bar */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl shadow-sm space-y-3">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Instant Patient Matching Triage
                </div>
                <div className="grid sm:grid-cols-3 gap-3">
                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="border border-slate-200 bg-white rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">Blood Group Needed</option>
                    {bloodGroups.map((bg) => (
                      <option key={bg.value} value={bg.value}>{bg.label}</option>
                    ))}
                  </select>

                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="border border-slate-200 bg-white rounded-xl p-3 text-sm font-semibold outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">Select Division/District</option>
                    {bangladeshDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>

                  <Link
                    href={selectedGroup ? "/requests?bloodGroup=" + selectedGroup : "/requests"}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl p-3 text-sm flex items-center justify-center transition shadow-sm"
                  >
                    Query Matching Donors
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/register"
                  className="bg-slate-950 hover:bg-slate-800 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition"
                >
                  Enroll as Verified Donor
                </Link>
                <Link
                  href="/requests"
                  className="bg-white border border-slate-200 hover:bg-slate-100 text-slate-800 font-bold px-7 py-3.5 rounded-xl text-sm transition"
                >
                  Browse Emergency Requests
                </Link>
              </div>
            </div>

            {/* Enterprise Telemetry Panel */}
            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 text-white p-8 rounded-3xl shadow-xl space-y-6">
              <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Network Telemetry</div>
                  <div className="text-lg font-black text-white">National Readiness Index</div>
                </div>
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold">
                  99.8% Online
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-3xl font-black text-rose-500">14,280+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Screened Donors</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-3xl font-black text-white">8,920+</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Transfusions Logged</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-3xl font-black text-emerald-400">&lt; 14 Min</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Average Dispatch Match</div>
                </div>
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
                  <div className="text-3xl font-black text-white">64 / 64</div>
                  <div className="text-xs text-slate-400 font-medium mt-1">Districts Connected</div>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 flex items-center justify-between text-xs text-slate-400">
                <span>Central Logistics Server: Verified</span>
                <span className="text-rose-400 font-bold">Priority: O-, B-</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. LIVE HOSPITAL EMERGENCY QUEUE */}
      <section className="py-20 max-w-7xl mx-auto px-4 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600 mb-1">Critical Care Dispatch</div>
            <h2 className="text-3xl font-black text-slate-950">Immediate Patient Requests</h2>
            <p className="text-slate-500 text-sm mt-1">Verified hospital submissions waiting for donor dispatch</p>
          </div>
          <Link href="/requests" className="text-sm font-bold text-rose-600 hover:underline">
            View Complete National Queue &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div key={r.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-xl">
                      {(r.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                      {r.emergencyLevel || "URGENT"}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{r.hospitalName}</h3>
                  <p className="text-xs text-slate-500 mt-1">Location: {r.hospitalAddress}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Requirement: {r.unitsNeeded} Unit(s)</span>
                  <a
                    href={"tel:" + (r.contactNumber || "+8801700000000")}
                    className="bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition"
                  >
                    Direct Contact
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-white border border-slate-200 rounded-2xl">
              <p className="text-slate-500 text-sm font-medium">Synchronizing live patient registry with production API...</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. INTERACTIVE CLINICAL COMPATIBILITY SIMULATOR */}
      <section className="bg-white border-y border-slate-200 py-20">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              WHO Transfusion Standards
            </span>
            <h2 className="text-3xl font-black text-slate-950">Clinical Compatibility Matrix</h2>
            <p className="text-slate-500 text-sm">Select any blood profile to inspect bidirectional compatibility rules</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {Object.keys(compatibilityMap).map((k) => (
              <button
                key={k}
                onClick={() => setActiveGroupMatrix(k)}
                className={"px-4 py-2 rounded-xl text-xs font-bold transition " + (activeGroupMatrix === k ? "bg-slate-950 text-white shadow-md" : "bg-slate-100 text-slate-700 hover:bg-slate-200")}
              >
                {k.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
              </button>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl grid md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="text-xs font-bold text-rose-600 uppercase tracking-wider">Eligible Recipients</div>
              <div className="text-lg font-black text-slate-950">{compatibilityMap[activeGroupMatrix]?.tag}</div>
              <p className="text-xs text-slate-600">Can safely donate red blood cells to patients with blood groups:</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {compatibilityMap[activeGroupMatrix]?.canDonateTo.map((g) => (
                  <span key={g} className="bg-white border border-slate-300 text-slate-900 font-bold px-3 py-1 rounded-lg text-xs">
                    {g}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3 md:border-l md:border-slate-200 md:pl-8">
              <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Permissible Donors</div>
              <div className="text-lg font-black text-slate-950">Transfusion Sourcing</div>
              <p className="text-xs text-slate-600">Can safely receive red blood cells from verified donors with blood groups:</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {compatibilityMap[activeGroupMatrix]?.canReceiveFrom.map((g) => (
                  <span key={g} className="bg-white border border-slate-300 text-slate-900 font-bold px-3 py-1 rounded-lg text-xs">
                    {g}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DONOR ELIGIBILITY HEALTH CHECKER */}
      <section className="max-w-4xl mx-auto px-4 py-20 w-full">
        <div className="bg-white border border-slate-200 p-8 sm:p-12 rounded-3xl shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="text-rose-600 text-xs font-bold uppercase tracking-wider">Automated Pre-Screening</span>
            <h2 className="text-3xl font-black text-slate-950">Check Your Donation Readiness</h2>
            <p className="text-xs sm:text-sm text-slate-500">Verify basic physical parameters before scheduling an emergency hospital donation</p>
          </div>

          <form onSubmit={handleCheckEligibility} className="grid sm:grid-cols-3 gap-4 pt-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Blood Profile</label>
              <select
                value={calcGroup}
                onChange={(e) => setCalcGroup(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 outline-none"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg.value} value={bg.value}>{bg.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Body Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                min={35}
                max={150}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Months Since Last Donation</label>
              <input
                type="number"
                value={lastDonationMonths}
                onChange={(e) => setLastDonationMonths(Number(e.target.value))}
                min={0}
                max={24}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-900 outline-none"
              />
            </div>

            <div className="sm:col-span-3 pt-2">
              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl transition"
              >
                Run Eligibility Assessment
              </button>
            </div>
          </form>

          {eligibilityResult && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-center font-semibold text-sm text-slate-800">
              {eligibilityResult}
            </div>
          )}
        </div>
      </section>

      {/* 5. 8 DIVISIONAL COMMAND CENTERS & EMERGENCY HOTLINES */}
      <section className="bg-white border-t border-slate-200 py-20">
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Regional Coverage</span>
            <h2 className="text-3xl font-black text-slate-950">8 Divisional Command Centers</h2>
            <p className="text-slate-500 text-sm">Real-time volunteer networks and direct emergency contacts across Bangladesh</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisionStats.map((div) => (
              <div key={div.name} className="bg-slate-50 border border-slate-200 p-6 rounded-2xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900 text-sm">{div.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                    Active
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-black text-slate-950">{div.donors}</div>
                  <div className="text-xs text-slate-500">Verified Blood Volunteers</div>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-xs text-slate-600">
                  <span>Immediate Reserve:</span>
                  <span className="font-bold text-slate-900">{div.units}</span>
                </div>
                <a
                  href={"tel:" + div.hot}
                  className="block text-center text-xs font-bold bg-white hover:bg-slate-950 hover:text-white text-slate-800 py-2 rounded-xl transition border border-slate-200"
                >
                  Hotline: {div.hot}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
`;

// 4. REQUESTS PAGE
const requests = `"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [filterGroup, setFilterGroup] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=20&status=PENDING")
      .then((res) => {
        if (res && res.data && Array.isArray(res.data)) {
          setRequests(res.data);
        }
      })
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterGroup
    ? requests.filter((r) => r.bloodGroup === filterGroup)
    : requests;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Central Registry</div>
            <h1 className="text-3xl font-black text-slate-950 mt-1">Live Emergency Blood Requests</h1>
            <p className="text-slate-500 text-sm mt-1">Verified medical demands directly linked to intensive care units.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="border border-slate-200 bg-white rounded-xl px-4 py-2 text-sm font-semibold outline-none"
            >
              <option value="">All Blood Profiles</option>
              <option value="A_POSITIVE">A+ Positive</option>
              <option value="A_NEGATIVE">A- Negative</option>
              <option value="B_POSITIVE">B+ Positive</option>
              <option value="B_NEGATIVE">B- Negative</option>
              <option value="O_POSITIVE">O+ Positive</option>
              <option value="O_NEGATIVE">O- Negative</option>
              <option value="AB_POSITIVE">AB+ Positive</option>
              <option value="AB_NEGATIVE">AB- Negative</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="py-20 text-center font-medium text-slate-500 text-sm">Querying active requests from production endpoints...</div>
        ) : filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-2xl font-black text-rose-600 bg-rose-50 border border-rose-100 px-3.5 py-1 rounded-xl">
                    {(item.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-0.5 rounded-full">
                    {item.emergencyLevel || "URGENT"}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-slate-950 text-base leading-snug">{item.hospitalName}</h3>
                  <p className="text-xs text-slate-500 mt-1">Location: {item.hospitalAddress}</p>
                </div>

                <div className="text-xs text-slate-600 border-t border-slate-100 pt-3 flex justify-between">
                  <span>Required Units: <strong>{item.unitsNeeded} Bag(s)</strong></span>
                  <span>Status: <strong className="text-emerald-600">Pending Donor</strong></span>
                </div>

                <a
                  href={"tel:" + (item.contactNumber || "+8801700000000")}
                  className="block text-center w-full bg-slate-950 hover:bg-rose-600 text-white font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Contact Hospital Liaison
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-sm">
            No pending blood requests match your selected criteria.
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
`;

// 5. SERVICES PAGE
const services = `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Automated Emergency Dispatch",
      desc: "Algorithms instantly alert matching voluntary donors within a 15-kilometer radius of the hospital.",
      badge: "Logistics"
    },
    {
      title: "Hospital Blood Bank Synchronization",
      desc: "Private and public medical facilities integrate inventory counts to prevent critical regional deficits.",
      badge: "Clinical Hub"
    },
    {
      title: "Donor Health & Interval Tracking",
      desc: "Automated safeguards ensure donors adhere to strict 90-day intervals and WHO health screening checks.",
      badge: "Safety Protocol"
    },
    {
      title: "Rare Blood Group Taskforce",
      desc: "Dedicated nationwide directory for rare blood variants (Rh-null, Bombay phenotype, AB-).",
      badge: "Specialized"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full space-y-12">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Enterprise Healthcare Solutions</div>
          <h1 className="text-4xl font-black text-slate-950 mt-1">Hospital & Organization Services</h1>
          <p className="text-slate-600 text-base mt-2">
            Standardized technical tools empowering clinical blood banks, regional clinics, and voluntary student organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {s.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-950 pt-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// 6. ABOUT PAGE
const about = `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-12">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
            About Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950">Bridging the Gap in Critical Care</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            BloodPulse is an open humanitarian initiative designed to streamline blood banking across Bangladesh through reliable digital logistics.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-950">Guiding Clinical Principles</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Zero Patient Cost</h3>
              <p className="text-slate-600">Voluntary blood donation is purely humanitarian. Financial transactions for human blood are strictly barred.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Donor Wellness First</h3>
              <p className="text-slate-600">Automated protocols block any donor who has completed a donation within the past 90 days to maintain vital health.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Data Integrity</h3>
              <p className="text-slate-600">Direct hospital-level verification prevents fraudulent blood requests and ensures authentic emergency response.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// 7. CONTACT PAGE
const contact = `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">24/7 Operations</span>
          <h1 className="text-4xl font-black text-slate-950 mt-1">Support & Emergency Dispatch</h1>
          <p className="text-slate-600 text-sm mt-2">Get in touch with regional logistics officers or report emergency requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-950">Direct Emergency Lines</h2>
            <div className="space-y-3 text-sm text-slate-600">
              <p>National Trauma Helpline: <strong>+880 1700-000000</strong></p>
              <p>Logistics Control Desk: <strong>+880 1800-000000</strong></p>
              <p>Email: <strong>dispatch@bloodpulse.org</strong></p>
              <p>Headquarters: <strong>Dhaka Medical Logistics Hub, Bangladesh</strong></p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-950">Submit an Inquiry</h2>
            <form className="space-y-3 text-sm">
              <input type="text" placeholder="Full Name" className="w-full border border-slate-200 rounded-xl p-3 outline-none" />
              <input type="email" placeholder="Official Email Address" className="w-full border border-slate-200 rounded-xl p-3 outline-none" />
              <textarea placeholder="Message / Hospital Affiliation" rows={3} className="w-full border border-slate-200 rounded-xl p-3 outline-none"></textarea>
              <button type="button" className="w-full bg-slate-950 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
                Send Notification
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
`;

// WRITE ALL FILES
writeFile("src/components/shared/Navbar.tsx", navbar);
writeFile("src/components/shared/Footer.tsx", footer);
writeFile("src/app/page.tsx", home);
writeFile("src/app/requests/page.tsx", requests);
writeFile("src/app/services/page.tsx", services);
writeFile("src/app/about/page.tsx", about);
writeFile("src/app/contact/page.tsx", contact);

// CLEANUP
["upgrade-enterprise.js", "build-ultimate-bmhbd.js", "build-mega-bmhbd.js"].forEach(f => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

console.log("ALL ENTERPRISE FILES WRITTEN SUCCESSFULLY!");
