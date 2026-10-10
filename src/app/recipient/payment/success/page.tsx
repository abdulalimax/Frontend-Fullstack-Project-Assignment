"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react";

export default function PaymentSuccessPage() {
  const transactionId = "TXN-" + Math.floor(100000 + Math.random() * 900000);
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border border-slate-100 rounded-3xl shadow-xl text-center space-y-6 animate-in fade-in zoom-in duration-300">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Payment Verified
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">Payment Successful!</h1>
          <p className="text-sm text-slate-500 mt-1">
            Your emergency operational verification fee has been confirmed via Stripe.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-left space-y-2.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Amount Paid</span>
            <span className="font-bold text-slate-900">$15.00 USD</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Payment Method</span>
            <span className="font-medium text-slate-700">Stripe Checkout</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Transaction ID</span>
            <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
              {transactionId}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400">Date</span>
            <span className="font-medium text-slate-700">{currentDate}</span>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <Link
            href="/recipient/history"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow cursor-pointer text-sm"
          >
            <span>View Requests History</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Payment secured & recorded in live ledger</span>
        </div>
      </div>
    </div>
  );
}
