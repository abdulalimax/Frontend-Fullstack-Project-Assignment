import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-6 py-20">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-950 border border-emerald-500/40 text-emerald-400 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-lg shadow-emerald-950">
            ✓
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-black text-white">Payment Confirmed</h1>
            <p className="text-xs text-slate-400">Your emergency logistics and hospital requisition fee has been processed securely via Stripe/SSLCommerz Test Gateway.</p>
          </div>
          <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-left space-y-1.5 font-mono text-slate-300">
            <div>Status: <span className="text-emerald-400 font-bold">PAID (Test Mode)</span></div>
            <div>Transaction ID: BP-TXN-2026-98102</div>
            <div>Timestamp: {new Date().toUTCString()}</div>
          </div>
          <Link href="/recipient" className="block w-full bg-rose-600 hover:bg-rose-500 text-white font-bold py-3.5 rounded-xl transition text-xs shadow-md">
            Return to Recipient Dashboard &rarr;
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
