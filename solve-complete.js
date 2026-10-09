const fs = require("fs");

// ১. একদম নিরাপদ এবং ক্র্যাশ-প্রুফ হোমপেজ
const homeCode = `"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";

export default function HomePage() {
  const [selectedGroup, setSelectedGroup] = useState("");
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
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

  const bloodGroups = ["A_POSITIVE", "A_NEGATIVE", "B_POSITIVE", "B_NEGATIVE", "O_POSITIVE", "O_NEGATIVE", "AB_POSITIVE", "AB_NEGATIVE"];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      {/* হিরো সেকশন */}
      <section className="relative bg-gradient-to-br from-rose-950 via-rose-850 to-slate-950 text-white py-20 px-4 text-center">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-rose-500/20 border border-rose-400/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-rose-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse"></span>
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
            <div className="flex-1 border rounded-xl px-3 bg-slate-50 flex items-center">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full bg-transparent py-3 outline-none text-sm font-semibold text-slate-700"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group.replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1 border rounded-xl px-3 bg-slate-50 flex items-center">
              <input
                type="text"
                placeholder="District or Hospital Area"
                className="w-full bg-transparent py-3 outline-none text-sm font-medium text-slate-700"
              />
            </div>
            <Link
              href={selectedGroup ? "/requests?bloodGroup=" + selectedGroup : "/requests"}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-8 py-3 rounded-xl flex items-center justify-center transition shadow-md"
            >
              Find Donors
            </Link>
          </div>
        </div>
      </section>

      {/* জাতীয় পরিসংখ্যান মেট্রিক্স */}
      <section className="border-y bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-rose-600">12,450+</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Active Donors</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900">8,920+</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Patients Assisted</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-rose-600">64</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Districts Covered</p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-extrabold text-slate-900">100%</p>
            <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">Verified Safe</p>
          </div>
        </div>
      </section>

      {/* জরুরি রক্তের রিকোয়েস্ট ফিড */}
      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-rose-600 font-bold uppercase tracking-wider text-xs">Live Emergency Feed</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Immediate Blood Requests</h2>
          </div>
          <Link href="/requests" className="text-sm font-bold text-rose-600 hover:underline">
            View All Open Requests &rarr;
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {requests.length > 0 ? (
            requests.map((r) => (
              <div key={r.id} className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-xl">
                      {(r.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                      {r.emergencyLevel}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 leading-snug">{r.hospitalName}</h3>
                  <p className="text-xs text-slate-500 mt-1">{r.hospitalAddress}</p>
                </div>

                <div className="mt-6 pt-4 border-t flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Needed: {r.unitsNeeded} Bag(s)</span>
                  <a
                    href={"tel:" + (r.contactNumber || "01700000000")}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition"
                  >
                    Direct Call
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center bg-white border rounded-2xl">
              <p className="text-slate-500 font-medium text-sm">Synchronizing with live national emergency registry...</p>
            </div>
          )}
        </div>
      </section>

      {/* কম্প্যাটিবিলিটি প্রোটোকল */}
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
}
`;

fs.writeFileSync("src/app/page.tsx", homeCode, "utf8");

// অপ্রয়োজনীয় ডায়াগনস্টিক ফাইলগুলো রিমুভ করা
["diagnose.js", "fix-all.js", "fix-error.js", "fix-hydration.js"].forEach((f) => {
  if (fs.existsSync(f)) fs.unlinkSync(f);
});

console.log("Cleanup and Homepage successfully refreshed!");
