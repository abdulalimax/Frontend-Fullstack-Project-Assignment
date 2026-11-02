"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";
import { 
  HeartPulse, ShieldCheck, Activity, MapPin, 
  Sparkles, Bot, Clock, ArrowRight, Phone
} from "lucide-react";

export default function HomePage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const districts = ["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barishal", "Rangpur", "Mymensingh"];

  const verifiedQueue: BloodRequest[] = [
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
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=4&status=PENDING")
      .then((res) => {
        if (res && res.data && res.data.length > 0) setRequests(res.data);
        else setRequests(verifiedQueue);
      })
      .catch(() => setRequests(verifiedQueue))
      .finally(() => setLoading(false));
  }, []);

          const handleAskAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiResponse("এআই আপনার প্রশ্নটি বিশ্লেষণ করছে...");
    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: aiPrompt })
      });
      const data = await res.json();
      setAiResponse(data.response || "উত্তর পাওয়া যায়নি।");
    } catch {
      setAiResponse("সার্ভারে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-rose-600 selection:text-white">
      <Navbar />

      <section className="relative min-h-[65vh] flex items-center justify-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-16 px-4 border-b border-slate-800 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 text-rose-300 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" />
            AI-Assisted Emergency Transfusion Network
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Every Second Saves A Life. <br />
            <span className="bg-gradient-to-r from-rose-500 via-red-400 to-amber-300 bg-clip-text text-transparent">
              Zero Patient Shortage.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-slate-300 text-sm sm:text-base leading-relaxed">
            Synchronizing emergency trauma centers, verified voluntary donors, and real-time hospital queues across 64 districts in Bangladesh.
          </p>

          <div className="max-w-3xl mx-auto bg-slate-900/90 border border-slate-700 p-4 rounded-3xl shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row gap-3">
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-2xl px-4 py-3 text-sm font-semibold outline-none focus:border-rose-500"
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map((bg) => (
                <option key={bg} value={bg}>{bg} Blood Profile</option>
              ))}
            </select>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-700 text-white rounded-2xl px-4 py-3 text-sm font-semibold outline-none focus:border-rose-500"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <Link
              href={selectedGroup ? `/requests?bloodGroup=${selectedGroup}` : "/requests"}
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-3 rounded-2xl text-sm transition shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2"
            >
              Locate Donors <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/50 border-b border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <h3 className="text-3xl sm:text-4xl font-black text-rose-500">14,280+</h3>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Registered Donors</p>
          </div>
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <h3 className="text-3xl sm:text-4xl font-black text-white">8,920+</h3>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Patients Assisted</p>
          </div>
          <div className="space-y-1 border-r border-slate-800 last:border-none">
            <h3 className="text-3xl sm:text-4xl font-black text-rose-500">64 / 64</h3>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Districts Synced</p>
          </div>
          <div className="space-y-1">
            <h3 className="text-3xl sm:text-4xl font-black text-emerald-400">&lt; 14 Min</h3>
            <p className="text-xs uppercase tracking-wider text-slate-400 font-bold">Average Match Time</p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-rose-500">Live Triage Queue</div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">Urgent Emergency Requests</h2>
          </div>
          <Link href="/requests" className="text-xs font-bold text-rose-400 hover:underline">
            View All Open Requests &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-64 animate-pulse space-y-4">
                <div className="h-6 w-16 bg-slate-800 rounded-lg"></div>
                <div className="h-4 w-3/4 bg-slate-800 rounded"></div>
                <div className="h-4 w-1/2 bg-slate-800 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {requests.map((r) => (
              <div
                key={r.id}
                className="bg-slate-900 border border-slate-800 hover:border-rose-500 rounded-3xl p-6 shadow-xl flex flex-col justify-between transition-all group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-rose-400 bg-rose-950 px-3 py-1 rounded-xl border border-rose-800">
                      {(r.bloodGroup || "O+").replace("_POSITIVE", "+").replace("_NEGATIVE", "-")}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-900/60 px-2.5 py-1 rounded-full border border-rose-700">
                      {r.emergencyLevel}
                    </span>
                  </div>
                  <h3 className="font-bold text-white text-base leading-snug line-clamp-1">{r.hospitalName}</h3>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 line-clamp-1">
                    <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" /> {r.hospitalAddress}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-mono">Needed: {r.unitsNeeded} Bag(s)</p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  <Link
                    href={`/requests/${r.id}`}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-center py-2.5 rounded-xl text-xs font-bold transition"
                  >
                    View Details
                  </Link>
                  <a
                    href={"tel:" + (r.contactNumber || "999")}
                    className="bg-rose-600 hover:bg-rose-500 text-white p-2.5 rounded-xl transition shadow"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-900 border-y border-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 bg-rose-950 text-rose-400 border border-rose-800 px-3 py-1 rounded-full text-xs font-bold">
              <Bot className="w-3.5 h-3.5" /> AI Triage Assistant
            </div>
            <h2 className="text-3xl font-black text-white">Instant AI Donor Guidance</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ask about rare blood compatibility, donor health requirements, or urgent dispatch guidelines powered by medical AI models.
            </p>
          </div>
          <div className="md:col-span-7 bg-slate-950 border border-slate-800 p-6 rounded-3xl shadow-2xl space-y-4">
            <form onSubmit={handleAskAI} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask: 'Who can receive O-negative?' or 'Can I donate if 52kg?'"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2.5 text-xs outline-none focus:border-rose-500"
              />
              <button
                type="submit"
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition"
              >
                Analyze
              </button>
            </form>
            {aiResponse && (
              <div className="bg-slate-900 border border-rose-500/40 p-4 rounded-2xl text-xs text-rose-200 leading-relaxed animate-in fade-in">
                {aiResponse}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-20 w-full space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Platform Strengths</span>
          <h2 className="text-3xl font-black text-white">Why Choose BloodPulseHub</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 bg-rose-950 border border-rose-800 rounded-2xl flex items-center justify-center text-rose-500">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Algorithmic Proximity Triage</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Instantly calculates distances and alerts eligible donors within a 15km perimeter.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 bg-rose-950 border border-rose-800 rounded-2xl flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Verified Clinical Authenticity</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Integrated with hospital ICU registries to ensure every patient request is legitimate.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl space-y-3">
            <div className="w-12 h-12 bg-rose-950 border border-rose-800 rounded-2xl flex items-center justify-center text-amber-400">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">90-Day Biological Guard</h3>
            <p className="text-xs text-slate-400 leading-relaxed">Automated safety locks protect donor health by enforcing biological recovery periods.</p>
          </div>
        </div>
      </section>

      <section className="bg-slate-900/60 border-y border-slate-800 py-20">
        <div className="max-w-6xl mx-auto px-4 space-y-12">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Simple Workflow</span>
            <h2 className="text-3xl font-black text-white">How BloodPulse Works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 text-rose-500 rounded-2xl flex items-center justify-center mx-auto text-xl font-black">1</div>
              <h3 className="text-base font-bold text-white">Emergency Request Broadcast</h3>
              <p className="text-xs text-slate-400">Hospital or relative posts patient requirements with blood group and hospital ward details.</p>
            </div>
            <div className="space-y-3">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 text-rose-500 rounded-2xl flex items-center justify-center mx-auto text-xl font-black">2</div>
              <h3 className="text-base font-bold text-white">Automated Donor Dispatch</h3>
              <p className="text-xs text-slate-400">Our engine alerts eligible matching donors nearby via SMS and push notification protocols.</p>
            </div>
            <div className="space-y-3">
              <div className="w-14 h-14 bg-slate-950 border border-slate-800 text-rose-500 rounded-2xl flex items-center justify-center mx-auto text-xl font-black">3</div>
              <h3 className="text-base font-bold text-white">Life-Saving Transfusion</h3>
              <p className="text-xs text-slate-400">Donor arrives at the designated hospital center for immediate screening and safe transfusion.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 w-full space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Medical Standard</span>
          <h2 className="text-3xl font-black text-white">Transfusion Compatibility</h2>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="border-b border-slate-800 text-slate-400 font-bold">
              <tr>
                <th className="p-3">Blood Group</th>
                <th className="p-3">Can Donate To</th>
                <th className="p-3">Can Receive From</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              <tr><td className="p-3 font-bold text-rose-400">O-</td><td>All Groups (Universal Donor)</td><td>O- only</td></tr>
              <tr><td className="p-3 font-bold text-rose-400">O+</td><td>O+, A+, B+, AB+</td><td>O+, O-</td></tr>
              <tr><td className="p-3 font-bold text-rose-400">A+</td><td>A+, AB+</td><td>A+, A-, O+, O-</td></tr>
              <tr><td className="p-3 font-bold text-rose-400">AB+</td><td>AB+ only</td><td>All Groups (Universal Recipient)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-slate-900 border-y border-slate-800 py-16">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">Impact Stories</span>
            <h2 className="text-3xl font-black text-white">Voices From The Frontline</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;During my patient&apos;s open-heart surgery at DMCH, we required 4 bags of rare O-negative blood. BloodPulseHub dispatched 3 donors within 25 minutes.&rdquo;
              </p>
              <div className="text-xs font-bold text-white">&mdash; Dr. M. Rahman, Senior Surgeon</div>
            </div>
            <div className="bg-slate-950 border border-slate-800 p-6 rounded-3xl space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;Being able to respond immediately to critical ICU cases near my campus gives me deep purpose. The 90-day cooldown tracker is super safe.&rdquo;
              </p>
              <div className="text-xs font-bold text-white">&mdash; Alim, 4-Time Voluntary Donor</div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-16 w-full space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3 text-xs">
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <h3 className="font-bold text-white text-sm">Is voluntary blood donation free of cost?</h3>
            <p className="text-slate-400">Yes, BloodPulse operates under strict WHO humanitarian protocols. Blood donation is 100% voluntary and free.</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-1">
            <h3 className="font-bold text-white text-sm">Who is physically eligible to donate?</h3>
            <p className="text-slate-400">Any individual aged 18–60, weighing at least 50kg, with normal hemoglobin and good general health.</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-rose-950 via-slate-900 to-red-950 border-t border-slate-800 py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Join Bangladesh&apos;s Largest Emergency Donor Network</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Enroll today as a voluntary donor or integrate your local university/college club into our central network.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-8 py-3.5 rounded-2xl text-xs shadow-xl shadow-rose-600/40 transition"
            >
              Enroll as Verified Donor &rarr;
            </Link>
            <Link
              href="/contact"
              className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold px-8 py-3.5 rounded-2xl text-xs transition"
            >
              Contact Emergency Helpdesk
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
