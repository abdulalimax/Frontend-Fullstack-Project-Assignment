import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto px-4 py-16 w-full space-y-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">24/7 Operations</span>
          <h1 className="text-4xl font-black text-white mt-1">Support & Emergency Dispatch</h1>
          <p className="text-slate-400 text-sm mt-2">Connect directly with regional trauma logistics officers or report emergency transfusion requirements.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white">Direct Emergency Hotlines</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <p>National Trauma Helpline: <strong className="text-rose-400">+880 1700-000000</strong></p>
              <p>Logistics Command Desk: <strong className="text-white">+880 1800-000000</strong></p>
              <p>Email: <strong className="text-white">dispatch@bloodpulse.org</strong></p>
              <p>Headquarters: <strong>National Medical Logistics Complex, Dhaka, Bangladesh</strong></p>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-4">
            <h2 className="text-xl font-bold text-white">Emergency Inquiry</h2>
            <form className="space-y-3 text-sm">
              <input type="text" placeholder="Full Name / Hospital Official" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 outline-none focus:border-rose-500" />
              <input type="email" placeholder="Official Email Address" className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 outline-none focus:border-rose-500" />
              <textarea placeholder="Message / Emergency Requirement Details" rows={3} className="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-3 outline-none focus:border-rose-500"></textarea>
              <button type="button" className="w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-rose-600/30 transition">
                Send Emergency Dispatch Alert
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
