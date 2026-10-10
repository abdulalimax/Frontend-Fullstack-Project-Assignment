"use client";

import { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";
import { fetchApi } from "@/lib/api";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bloodGroup: "O_POSITIVE",
    district: "Dhaka",
    phoneNumber: "",
    role: "DONOR"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (res) {
        setSuccess(true);
      } else {
        setError("Registration could not be completed. Please check your data.");
      }
    } catch {
      setError("Enrollment failed. Email may already be registered.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-20 relative overflow-hidden">
        <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-xl w-full bg-slate-900/90 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 bg-rose-950 border border-rose-500/40 text-rose-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Life-Saving Registry Enrollment
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Enroll as Verified Donor</h1>
            <p className="text-xs text-slate-400">Join the national fault-tolerant emergency blood transfusion network</p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-950/80 border border-rose-600/50 rounded-xl text-xs font-semibold text-rose-300 text-center">
              {error}
            </div>
          )}

          {success ? (
            <div className="p-6 bg-slate-950 border border-emerald-500/40 rounded-2xl text-center space-y-3">
              <div className="text-3xl">🎉</div>
              <h3 className="font-bold text-white text-base">Donor Enrollment Successful</h3>
              <p className="text-xs text-slate-400">Your life-saving profile has been recorded in the central registry.</p>
              <Link
                href="/login"
                className="inline-block bg-rose-600 hover:bg-rose-500 text-white font-bold px-6 py-2.5 rounded-xl text-xs shadow-md transition"
              >
                Proceed to Sign In &rarr;
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Md. Abdul Alim"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500 text-sm"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Blood Profile</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500 text-sm"
                  >
                    {bloodGroups.map((bg) => (
                      <option key={bg.value} value={bg.value}>{bg.label}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">District / Region</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500 text-sm"
                  >
                    {bangladeshDistricts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    placeholder="+880 17XXXXXXXX"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500 text-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300">Portal Password</label>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white outline-none focus:border-rose-500 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-600/40 transition text-sm disabled:opacity-50"
              >
                {loading ? "Registering Donor Profile..." : "Complete Life-Saving Enrollment →"}
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-slate-800 text-xs text-slate-400">
            Already enrolled?{" "}
            <Link href="/login" className="text-rose-400 font-bold hover:underline">
              Access Your Dashboard
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
