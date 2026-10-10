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
