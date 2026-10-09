"use client";

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
                    href={`tel:${req.contactNumber}`}
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
}