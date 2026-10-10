"use client";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

export default function AdminDashboard() {
  const regionalMetrics = [
    { region: "Dhaka Central", capacity: 85, donors: 5420, activeReq: 12 },
    { region: "Chattogram Coast", capacity: 72, donors: 2840, activeReq: 8 },
    { region: "Rajshahi North", capacity: 58, donors: 1750, activeReq: 15 },
    { region: "Khulna Delta", capacity: 64, donors: 1420, activeReq: 6 },
    { region: "Sylhet Highlands", capacity: 78, donors: 1120, activeReq: 4 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500">Administrative Command</div>
            <h1 className="text-3xl font-black text-white mt-1">National Transfusion Analytics & Control</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time supervision across all 64 districts and medical liaison centers.</p>
          </div>

          <div className="flex gap-3">
            <Link href="/admin/users" className="bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition">
              Manage Donors
            </Link>
            <Link href="/admin/reports" className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-md transition">
              Audit Logs & Reports
            </Link>
          </div>
        </div>

        {/* Analytics Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Screened Donors</span>
            <div className="text-3xl font-black text-white">14,280</div>
            <div className="text-xs text-emerald-400 font-semibold">+184 enrolled this week</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Patient Requests</span>
            <div className="text-3xl font-black text-rose-500">47</div>
            <div className="text-xs text-rose-400 font-semibold">12 Marked Critical ICU</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Successful Transfusions</span>
            <div className="text-3xl font-black text-emerald-400">8,920</div>
            <div className="text-xs text-slate-400 font-semibold">Zero transmission errors</div>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dispatch Latency</span>
            <div className="text-3xl font-black text-white">13.8 min</div>
            <div className="text-xs text-emerald-400 font-semibold">Exceeds national SLA</div>
          </div>
        </div>

        {/* Visualization Progress Bars (Requirement: Data Visuals) */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-6">
          <h2 className="text-xl font-bold text-white">Regional Reserve Sufficiency Matrix</h2>
          <div className="space-y-5">
            {regionalMetrics.map((m) => (
              <div key={m.region} className="space-y-2">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-300">{m.region} ({m.donors} Donors)</span>
                  <span className={m.capacity < 60 ? "text-rose-400" : "text-emerald-400"}>
                    {m.capacity}% Reserve ({m.activeReq} Active Cases)
                  </span>
                </div>
                <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={"h-full transition-all duration-500 " + (m.capacity < 60 ? "bg-rose-500" : "bg-emerald-500")}
                    style={{ width: m.capacity + "%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
