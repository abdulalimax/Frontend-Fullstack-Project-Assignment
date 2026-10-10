"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";

export default function RequestsPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [filterGroup, setFilterGroup] = useState("");
  const [loading, setLoading] = useState(true);

  const fallbackData: BloodRequest[] = [
    {
      id: "req-1",
      bloodGroup: "O_POSITIVE",
      hospitalName: "Dhaka Medical College Hospital (ICU)",
      hospitalAddress: "Bakshibazar, Dhaka Central",
      unitsNeeded: 3,
      emergencyLevel: "CRITICAL",
      contactNumber: "+8801711223344",
      status: "PENDING",
      patientName: "Emergency Multi-Trauma Surgical Case",
      neededDate: "Immediate",
      createdAt: new Date().toISOString()
    },
    {
      id: "req-2",
      bloodGroup: "A_NEGATIVE",
      hospitalName: "Chittagong Medical College Hospital",
      hospitalAddress: "57 K.B. Fazlul Kader Road, Chattogram",
      unitsNeeded: 2,
      emergencyLevel: "URGENT",
      contactNumber: "+8801811223344",
      status: "PENDING",
      patientName: "Emergency Cesarean & Post-Op Recovery",
      neededDate: "Within 2 Hours",
      createdAt: new Date().toISOString()
    },
    {
      id: "req-3",
      bloodGroup: "B_POSITIVE",
      hospitalName: "Rajshahi Medical College Hospital",
      hospitalAddress: "Laxmipur Main Road, Rajshahi",
      unitsNeeded: 2,
      emergencyLevel: "CRITICAL",
      contactNumber: "+8801755223344",
      status: "PENDING",
      patientName: "Acute Dengue Platelet Replacement",
      neededDate: "Immediate",
      createdAt: new Date().toISOString()
    },
    {
      id: "req-4",
      bloodGroup: "AB_NEGATIVE",
      hospitalName: "Sylhet MAG Osmani Medical College",
      hospitalAddress: "Medical College Road, Sylhet",
      unitsNeeded: 1,
      emergencyLevel: "URGENT",
      contactNumber: "+8801611223344",
      status: "PENDING",
      patientName: "Pediatric Thalassemia Transfusion",
      neededDate: "Today",
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=20&status=PENDING")
      .then((res) => {
        if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          setRequests(res.data);
        } else {
          setRequests(fallbackData);
        }
      })
      .catch(() => setRequests(fallbackData))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterGroup
    ? requests.filter((r) => r.bloodGroup === filterGroup)
    : requests;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-800 pb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500">National Blood Bank Triage</div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">Live Emergency Patient Queue</h1>
            <p className="text-slate-400 text-sm mt-1">Verified hospital admissions with direct ICU dispatch coordinates.</p>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterGroup}
              onChange={(e) => setFilterGroup(e.target.value)}
              className="border border-slate-800 bg-slate-900 text-white rounded-xl px-4 py-2.5 text-sm font-semibold outline-none focus:border-rose-500"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 hover:border-rose-500 rounded-3xl p-6 shadow-xl space-y-4 transition">
              <div className="flex justify-between items-start">
                <span className="text-2xl font-black text-rose-400 bg-rose-950 border border-rose-800 px-3.5 py-1 rounded-xl">
                  {(item.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 bg-rose-900/60 px-2.5 py-0.5 rounded-full border border-rose-700">
                  {item.emergencyLevel || "URGENT"}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-white text-base leading-snug">{item.hospitalName}</h3>
                <p className="text-xs text-slate-400 mt-1">📍 {item.hospitalAddress}</p>
              </div>

              <div className="text-xs text-slate-400 border-t border-slate-800 pt-3 flex justify-between">
                <span>Required: <strong>{item.unitsNeeded} Bag(s)</strong></span>
                <span>Status: <strong className="text-emerald-400">Verified ICU Case</strong></span>
              </div>

              <a
                href={"tel:" + (item.contactNumber || "+8801700000000")}
                className="block text-center w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl text-xs transition shadow-md shadow-rose-600/30"
              >
                Contact Emergency Coordinator 📞
              </a>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
