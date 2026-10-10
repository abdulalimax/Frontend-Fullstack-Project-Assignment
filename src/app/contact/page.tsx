import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-600">24/7 Operations</span>
          <h1 className="text-4xl font-black text-slate-950 mt-1">Support & Emergency Dispatch</h1>
          <p className="text-slate-600 text-sm mt-2">Get in touch with regional logistics officers or report emergency requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-950">Direct Emergency Lines</h2>
            <div className="space-y-3 text-sm text-slate-600">
              <p>National Trauma Helpline: <strong>+880 1700-000000</strong></p>
              <p>Logistics Control Desk: <strong>+880 1800-000000</strong></p>
              <p>Email: <strong>dispatch@bloodpulse.org</strong></p>
              <p>Headquarters: <strong>Dhaka Medical Logistics Hub, Bangladesh</strong></p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-950">Submit an Inquiry</h2>
            <form className="space-y-3 text-sm">
              <input type="text" placeholder="Full Name" className="w-full border border-slate-200 rounded-xl p-3 outline-none" />
              <input type="email" placeholder="Official Email Address" className="w-full border border-slate-200 rounded-xl p-3 outline-none" />
              <textarea placeholder="Message / Hospital Affiliation" rows={3} className="w-full border border-slate-200 rounded-xl p-3 outline-none"></textarea>
              <button type="button" className="w-full bg-slate-950 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
                Send Notification
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
