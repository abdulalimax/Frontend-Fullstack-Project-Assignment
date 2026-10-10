import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-20">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-rose-950 border border-rose-500/40 text-rose-400 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg shadow-rose-950">
            ✕
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Payment Cancelled</h1>
            <p className="text-xs text-slate-400">The checkout session was terminated. No financial charges were made to your test card.</p>
          </div>
          <Link href="/recipient" className="block w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl transition text-xs">
            Try Again from Dashboard &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
