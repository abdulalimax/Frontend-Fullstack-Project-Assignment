const fs = require("fs");
const path = require("path");

const files = {
  "src/app/page.tsx": `"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";
import { Search, PhoneCall, Droplets, MapPin } from "lucide-react";

export default function HomePage() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=4&status=PENDING")
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  const bloodGroups = ["A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE", "O_POSITIVE", "O_NEGATIVE", "AB_POSITIVE", "AB_NEGATIVE"];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />

      <section className="relative bg-gradient-to-br from-rose-900 via-rose-800 to-slate-900 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase text-rose-200">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
            Bangladesh Central Emergency Blood Network
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-tight">
            Every Drop Counts. <br className="hidden sm:inline" />
            <span className="text-rose-400">Save Lives</span> in Critical Emergencies.
          </h1>
          <p className="max-w-2xl mx-auto text-rose-100/80 text-base sm:text-lg">
            A real-time humanitarian platform connecting emergency recipients, verified blood donors, and hospital networks across the nation instantly.
          </p>

          <div className="max-w-3xl mx-auto bg-white p-4 rounded-2xl shadow-2xl flex flex-col sm:flex-row gap-3 text-slate-800 border">
            <div className="flex-1 flex items-center gap-2 border rounded-xl px-3 bg-slate-50">
              <Droplets className="text-rose-600 w-5 h-5 shrink-0" />
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full bg-transparent py-2.5 outline-none text-sm font-medium"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 flex items-center gap-2 border rounded-xl px-3 bg-slate-50">
              <MapPin className="text-rose-600 w-5 h-5 shrink-0" />
              <input
                type="text"
                placeholder="District or Hospital Area"
                className="w-full bg-transparent py-2.5 outline-none text-sm font-medium"
              />
            </div>
            <Link
              href={selectedGroup ? \`/requests?bloodGroup=\${selectedGroup}\` : "/requests"}
              className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Search className="w-4 h-4" /> Find Donors
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-rose-600">12,450+</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Active Donors</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900">8,920+</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Patients Assisted</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-rose-600">64</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Districts Covered</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900">100%</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Verified Safe</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-rose-600 font-bold uppercase tracking-wider text-xs">Live Emergency Feed</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Immediate Blood Requests</h2>
          </div>
          <Link href="/requests" className="text-sm font-bold text-rose-600 hover:underline">
            View All Open Requests →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.map((r) => (
            <div key={r.id} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl">
                    {r.bloodGroup.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    {r.emergencyLevel}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 leading-snug">{r.hospitalName}</h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 shrink-0" /> {r.hospitalAddress}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Needed: {r.unitsNeeded} Bag(s)</span>
                <a
                  href={\`tel:\${r.contactNumber}\`}
                  className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg transition"
                >
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-100 py-16 border-y">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Blood Compatibility Protocol</h2>
            <p className="text-sm text-slate-600 mt-2">Certified medical compatibility matrix for safe transfusion</p>
          </div>
          <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b text-slate-700 font-bold">
                <tr>
                  <th className="p-4">Blood Group</th>
                  <th className="p-4">Eligible to Donate Blood To</th>
                  <th className="p-4">Eligible to Receive Blood From</th>
                </tr>
              </thead>
              <tbody className="divide-y text-slate-600">
                <tr>
                  <td className="p-4 font-bold text-rose-600">O-</td>
                  <td className="p-4">Everyone (Universal Donor)</td>
                  <td className="p-4 font-semibold text-slate-800">O- only</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-rose-600">O+</td>
                  <td className="p-4">O+, A+, B+, AB+</td>
                  <td className="p-4 font-semibold text-slate-800">O+, O-</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-rose-600">A+</td>
                  <td className="p-4">A+, AB+</td>
                  <td className="p-4 font-semibold text-slate-800">A+, A-, O+, O-</td>
                </tr>
                <tr>
                  <td className="p-4 font-bold text-rose-600">AB+</td>
                  <td className="p-4">AB+ only</td>
                  <td className="p-4 font-semibold text-slate-800">Everyone (Universal Recipient)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}`,

  "src/app/requests/page.tsx": `"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";
import { Search, MapPin, PhoneCall, AlertCircle } from "lucide-react";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGroup, setFilterGroup] = useState("");

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=20&status=PENDING")
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  const filtered = requests.filter((r) => {
    const matchesGroup = filterGroup ? r.bloodGroup === filterGroup : true;
    const matchesSearch =
      r.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hospitalAddress.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <div className="mb-8 space-y-2">
          <h1 className="text-3xl font-black text-slate-900">National Blood Bank Directory</h1>
          <p className="text-slate-600 text-sm">Verified emergency blood requests seeking immediate voluntary donors</p>
        </div>

        <div className="bg-white p-4 rounded-2xl border shadow-sm flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 flex items-center gap-2 border rounded-xl px-3 bg-slate-50">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by hospital name, city or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent py-2.5 outline-none text-sm font-medium"
            />
          </div>
          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            className="border rounded-xl px-4 py-2.5 text-sm font-medium bg-slate-50 outline-none"
          >
            <option value="">All Blood Groups</option>
            <option value="A_POSITIVE">A+</option>
            <option value="A_NEGATIVE">A-</option>
            <option value="B_POSITIVE">B+</option>
            <option value="B_NEGATIVE">B-</option>
            <option value="O_POSITIVE">O+</option>
            <option value="O_NEGATIVE">O-</option>
            <option value="AB_POSITIVE">AB+</option>
            <option value="AB_NEGATIVE">AB-</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold">No active emergency requests found matching criteria</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((req) => (
              <div key={req.id} className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-3xl font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl">
                      {req.bloodGroup.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2.5 py-1 rounded-full">
                      {req.emergencyLevel}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{req.hospitalName}</h3>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {req.hospitalAddress}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400">Required Quantity</p>
                    <p className="text-sm font-bold text-slate-800">{req.unitsNeeded} Bag(s)</p>
                  </div>
                  <a
                    href={\`tel:\${req.contactNumber}\`}
                    className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> Direct Call
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}`,

  "src/components/shared/Navbar.tsx": `"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuth, getAuthUser } from "@/lib/auth";
import { HeartPulse, PhoneCall } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ role?: string; name?: string } | null>(null);

  useEffect(() => {
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
            {user ? (
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
}`,

  "src/components/shared/Footer.tsx": `import Link from "next/link";
import { HeartPulse, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 text-white p-2 rounded-xl">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">BloodPulse</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A voluntary, non-profit humanitarian network working to ensure that no patient suffers due to a lack of safe, compatible blood.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/requests" className="hover:text-rose-400">Emergency Requests Directory</Link></li>
            <li><Link href="/about" className="hover:text-rose-400">About the Foundation</Link></li>
            <li><Link href="/services" className="hover:text-rose-400">Services & Healthcare Partners</Link></li>
            <li><Link href="/faq" className="hover:text-rose-400">Donor Eligibility FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Patient Assistance</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/recipient" className="hover:text-rose-400">Post Emergency Request</Link></li>
            <li><Link href="/login" className="hover:text-rose-400">Stripe Emergency Verification</Link></li>
            <li><Link href="/contact" className="hover:text-rose-400">National Ambulance Liaison</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Emergency Desk</h3>
          <p className="text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" /> Dhaka, Bangladesh
          </p>
          <p className="text-xs flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-500 shrink-0" /> +880 1700 000000
          </p>
          <p className="text-xs flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-500 shrink-0" /> emergency@bloodpulse.org
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} BloodPulse Humanitarian Foundation. All Rights Reserved.
      </div>
    </footer>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
}

console.log("All UI updates applied successfully!");
