import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-12">
        <div className="space-y-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-200">
            About Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-950">Bridging the Gap in Critical Care</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            BloodPulse is an open humanitarian initiative designed to streamline blood banking across Bangladesh through reliable digital logistics.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-950">Guiding Clinical Principles</h2>
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Zero Patient Cost</h3>
              <p className="text-slate-600">Voluntary blood donation is purely humanitarian. Financial transactions for human blood are strictly barred.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Donor Wellness First</h3>
              <p className="text-slate-600">Automated protocols block any donor who has completed a donation within the past 90 days to maintain vital health.</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900">Data Integrity</h3>
              <p className="text-slate-600">Direct hospital-level verification prevents fraudulent blood requests and ensures authentic emergency response.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
