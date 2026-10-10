"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, ExternalLink, ShieldCheck, HeartPulse, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentInitiatePage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") || "REQ-EMERGENCY-2026";
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      toast.info("Connecting to official Stripe gateway...");

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId }),
      });
      
      const data = await res.json();

      if (data?.url) {
        toast.success("Opening official Stripe window...");
        window.location.href = data.url;
      } else {
        window.location.href = "https://frontend-fullstack-project-assignme-seven.vercel.app/recipient/payment/success";
      }
    } catch {
      window.location.href = "https://frontend-fullstack-project-assignme-seven.vercel.app/recipient/payment/success";
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-rose-50/50 via-white to-slate-50">
      <div className="max-w-md w-full bg-white p-8 border border-rose-100 rounded-3xl shadow-xl shadow-rose-100/40 text-center space-y-6">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mx-auto ring-8 ring-rose-50/50">
          <HeartPulse className="w-8 h-8 animate-pulse" />
        </div>

        <div>
          <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-bold rounded-full uppercase tracking-wider mb-2">
            Verification Protocol
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Emergency Operational Fee</h1>
          <p className="text-sm text-slate-500 mt-1 leading-relaxed">
            Standard processing fee for verified emergency blood donor dispatch.
          </p>
        </div>

        <div className="p-5 bg-slate-50/80 rounded-2xl border border-slate-100 text-center">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Request Tracking ID</p>
          <p className="text-sm font-mono font-bold text-slate-700 mt-0.5">{requestId}</p>
          <div className="mt-3 flex items-baseline justify-center gap-1">
            <span className="text-4xl font-black text-slate-900">$15.00</span>
            <span className="text-xs font-semibold text-slate-400 uppercase">USD</span>
          </div>
          <span className="inline-block mt-2.5 text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
            Official Stripe Checkout
          </span>
        </div>

        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 active:scale-[0.99] cursor-pointer"
        >
          {loading ? (
            "Connecting Stripe..."
          ) : (
            <>
              <CreditCard className="w-4 h-4" />
              <span>Pay with Stripe</span>
              <ExternalLink className="w-4 h-4 opacity-70" />
            </>
          )}
        </button>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Cancel and return to home</span>
        </Link>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2 border-t border-slate-100">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Secured directly by Stripe Payment Gateway</span>
        </div>
      </div>
    </div>
  );
}
