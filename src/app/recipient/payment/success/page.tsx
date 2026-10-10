"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, Home, LayoutDashboard, ShieldCheck, HeartPulse } from "lucide-react";

export default function PaymentSuccessPage() {
  const transactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-rose-50/50 via-white to-slate-50">
      <div className="max-w-md w-full bg-white p-8 border border-rose-100 rounded-3xl shadow-xl shadow-rose-100/40 text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Payment Verified
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payment Successful!</h1>
          <p className="text-sm text-slate-500 mt-1">
            Your emergency operational verification fee has been confirmed via Stripe.
          </p>
        </div>

        <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 text-left space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Amount Paid</span>
            <span className="font-extrabold text-slate-900">$15.00 USD</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Payment Method</span>
            <span className="font-medium text-slate-700">Stripe Checkout</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Transaction ID</span>
            <span className="font-mono text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-md">
              {transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Date</span>
            <span className="font-medium text-slate-700">{currentDate}</span>
          </div>
        </div>

        <div className="space-y-2.5 pt-2">
          <Link
            href="/"
            className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 cursor-pointer text-sm"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home Page</span>
          </Link>

          <Link
            href="/recipient/history"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 shadow cursor-pointer text-sm"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>View Requests History</span>
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Payment secured & recorded in live ledger</span>
        </div>
      </div>
    </div>
  );
}
