"use client";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16 space-y-6">
        <h1 className="text-3xl font-black text-white">Terms & Humanitarian Protocol</h1>
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-3xl space-y-4 text-xs text-slate-300 leading-relaxed">
          <p>1. Blood donation facilitated through BloodPulse is 100% voluntary, free, and humanitarian.</p>
          <p>2. Financial charges or compensation for donated blood units are strictly prohibited.</p>
          <p>3. Patient data and donor medical histories are protected under medical privacy standards.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
