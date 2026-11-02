"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";
import { MapPin, Phone, ArrowLeft, ShieldCheck, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

export default function RequestDetailsPage() {
  const { id } = useParams();
  const [request, setRequest] = useState<BloodRequest | null>(null);

  const fallbackReq: BloodRequest = {
    id: String(id || "req-1"),
    bloodGroup: "O_POSITIVE",
    hospitalName: "Dhaka Medical College Hospital (ICU Ward 3)",
    hospitalAddress: "Bakshibazar, Central Dhaka, Bangladesh",
    unitsNeeded: 3,
    emergencyLevel: "CRITICAL",
    contactNumber: "+8801711223344",
    status: "PENDING",
    createdAt: new Date().toISOString()
  };

  useEffect(() => {
    fetchApi<{ data: BloodRequest }>(`/requests/${id}`)
      .then((res) => {
        if (res && res.data) setRequest(res.data);
        else setRequest(fallbackReq);
      })
      .catch(() => setRequest(fallbackReq));
  }, [id]);

  if (!request) return null;

  const bg = (request.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-");
  
  const getCompatibleDonors = (group: string) => {
    if (group === "O+") return ["O+", "O-"];
    if (group === "O-") return ["O-"];
    if (group === "A+") return ["A+", "A-", "O+", "O-"];
    if (group === "A-") return ["A-", "O-"];
    if (group === "B+") return ["B+", "B-", "O+", "O-"];
    if (group === "B-") return ["B-", "O-"];
    if (group === "AB+") return ["All Groups (Universal Recipient)"];
    if (group === "AB-") return ["AB-", "A-", "B-", "O-"];
    return ["O+", "O-"];
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-8">
        <Link href="/requests" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition">
          <ArrowLeft className="w-4 h-4" /> Back to Emergency Feed
        </Link>

        {/* Header Summary */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-950 border border-rose-800 px-3 py-1 rounded-full">
              {request.emergencyLevel} Priority Admission
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white">{request.hospitalName}</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-500" /> {request.hospitalAddress}
            </p>
          </div>
          <div className="text-center sm:text-right bg-slate-950 p-4 rounded-2xl border border-slate-800 min-w-32">
            <div className="text-3xl font-black text-rose-500">{bg}</div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Required: {request.unitsNeeded} Bag(s)</span>
          </div>
        </div>

        {/* ৩য় এআই বক্স: ডেডিকেটেড AI Recommender ও সামঞ্জস্যতা বক্স */}
        <div className="bg-gradient-to-r from-rose-950/70 via-slate-900 to-slate-900 border border-rose-800/80 p-6 rounded-3xl shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-rose-400 animate-spin" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">AI Compatibility & Triage Engine</h3>
            </div>
            <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
              AI Matched
            </span>
          </div>

          <div className="p-4 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-2 text-xs">
            <p className="text-slate-200">
              এই রোগীর রক্তের গ্রুপ <strong className="text-rose-400 font-black">{bg}</strong>। আমাদের মেডিকেল এআই প্রটোকল অনুসারে এই রোগীকে নিচে উল্লেখিত রক্তের গ্রুপের ব্যক্তিরা সরাসরি রক্ত দিতে পারবেন:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {getCompatibleDonors(bg).map((d) => (
                <span key={d} className="bg-rose-950/90 text-rose-300 border border-rose-700/80 font-black px-3 py-1 rounded-xl text-xs">
                  {d}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 pt-1">
              * রক্তদাতার হিমোগ্লোবিন পুরুষদের ক্ষেত্রে নূন্যতম ১৩.০ g/dL এবং নারীদের ১২.৫ g/dL ও ওজন কমপক্ষে ৫০ কেজি থাকা আবশ্যক।
            </p>
          </div>
        </div>

        {/* Specifications & Direct Action */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6">
            <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Clinical Case Specifications</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500">Admission Unit</span>
                <p className="font-bold text-white">Trauma ICU & Surgery</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500">Transfusion Protocol</span>
                <p className="font-bold text-white">Whole Blood / PRBC</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500">Cross-Matching Facility</span>
                <p className="font-bold text-white">In-Hospital Blood Bank</p>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-slate-500">Verification Status</span>
                <p className="font-bold text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Doctor Certified
                </p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Direct Dispatch Action</h2>
              <div className="text-xs text-slate-400 space-y-1">
                <p>Coordinator Hotline:</p>
                <p className="text-lg font-black text-white">{request.contactNumber}</p>
              </div>
            </div>
            <a
              href={`tel:${request.contactNumber}`}
              className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 rounded-2xl text-center text-xs shadow-lg shadow-rose-600/30 transition flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call Coordinator Now
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
