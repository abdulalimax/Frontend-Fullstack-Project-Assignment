import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-12">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950 px-3.5 py-1 rounded-full border border-rose-800">
            About BloodPulse Foundation
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-white">Bridging Critical Transfusion Gaps</h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            BloodPulse is a humanitarian technology initiative engineering digital logistics to ensure zero patient mortality caused by delayed blood transfusions.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <h2 className="text-2xl font-bold text-white">Core Clinical Principles</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-rose-400 text-base">Humanitarian Zero-Cost</h3>
              <p className="text-slate-400 leading-relaxed">Voluntary blood donation is purely humanitarian. Financial transactions for human blood are strictly forbidden.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-emerald-400 text-base">Donor Wellness First</h3>
              <p className="text-slate-400 leading-relaxed">Automated safety systems prohibit repeat donations within 90 days to safeguard donor health.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-amber-400 text-base">Institutional Integrity</h3>
              <p className="text-slate-400 leading-relaxed">Hospital-level verification ensures every request represents a legitimate clinical patient requirement.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
