"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";
import { Search, MapPin, Phone } from "lucide-react";

export default function RequestsExplorePage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [filterLevel, setFilterLevel] = useState("");

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
      createdAt: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=20&status=PENDING")
      .then((res) => {
        if (res && res.data && res.data.length > 0) setRequests(res.data);
        else setRequests(fallbackData);
      })
      .catch(() => setRequests(fallbackData));
  }, []);

  const filtered = requests.filter((r) => {
    const matchGroup = filterGroup ? r.bloodGroup === filterGroup : true;
    const matchLevel = filterLevel ? r.emergencyLevel === filterLevel : true;
    const matchSearch =
      r.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.hospitalAddress.toLowerCase().includes(searchTerm.toLowerCase());
    return matchGroup && matchLevel && matchSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">Live Hospital Triage</span>
          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">National Emergency Feed</h1>
          <p className="text-xs text-slate-400 mt-1">Multi-filter search across patient cases seeking voluntary blood donors.</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl shadow-xl grid sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 px-3 py-2.5 rounded-2xl">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search hospital or district..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-xs text-white outline-none w-full"
            />
          </div>

          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white rounded-2xl px-4 py-2.5 text-xs outline-none"
          >
            <option value="">All Blood Profiles</option>
            <option value="O_POSITIVE">O+ Positive</option>
            <option value="O_NEGATIVE">O- Negative</option>
            <option value="A_POSITIVE">A+ Positive</option>
            <option value="A_NEGATIVE">A- Negative</option>
            <option value="B_POSITIVE">B+ Positive</option>
            <option value="B_NEGATIVE">B- Negative</option>
            <option value="AB_POSITIVE">AB+ Positive</option>
            <option value="AB_NEGATIVE">AB- Negative</option>
          </select>

          <select
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            className="bg-slate-950 border border-slate-800 text-white rounded-2xl px-4 py-2.5 text-xs outline-none"
          >
            <option value="">All Emergency Levels</option>
            <option value="CRITICAL">Critical ICU Priority</option>
            <option value="URGENT">Urgent Transfusion</option>
            <option value="NORMAL">Normal Requirement</option>
          </select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-900 border border-slate-800 hover:border-rose-500 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-black text-rose-400 bg-rose-950 border border-rose-800 px-3 py-1 rounded-xl">
                    {(item.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-900/60 px-2.5 py-0.5 rounded-full border border-rose-700">
                    {item.emergencyLevel}
                  </span>
                </div>
                <h3 className="font-bold text-white text-base leading-snug line-clamp-1">{item.hospitalName}</h3>
                <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 line-clamp-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {item.hospitalAddress}
                </p>
                <p className="text-xs text-slate-500 mt-2 font-mono">Needed: {item.unitsNeeded} Bag(s)</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                <Link
                  href={`/requests/${item.id}`}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-center py-2.5 rounded-xl text-xs font-bold transition"
                >
                  View Details
                </Link>
                <a
                  href={"tel:" + (item.contactNumber || "999")}
                  className="bg-rose-600 hover:bg-rose-500 text-white p-2.5 rounded-xl transition shadow"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
