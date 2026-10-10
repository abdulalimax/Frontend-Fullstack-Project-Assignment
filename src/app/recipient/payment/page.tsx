"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, ExternalLink, ShieldCheck } from "lucide-react";

export default function PaymentInitiatePage() {
  const searchParams = useSearchParams();
  const requestId = searchParams.get("requestId") || "REQ-EMERGENCY-2026";
  const [loading, setLoading] = useState(false);

  // অফিশিয়াল Stripe Hosted Checkout ডোমেন
  const handleStripeRedirect = () => {
    try {
      setLoading(true);
      toast.success("Redirecting to Stripe Official Checkout Window...");
      
      // অফিশিয়াল টেস্ট চেকআউট উইন্ডোতে রিডাইরেক্ট
      window.location.href = "https://buy.stripe.com/test_6oEbJ396U2gK95C7ss";
    } catch {
      toast.error("Could not open Stripe window");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-2xl shadow-lg text-center space-y-6">
        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto">
          <CreditCard className="w-8 h-8" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-slate-900">Emergency Operational Fee</h1>
          <p className="text-sm text-slate-500 mt-1">
            Standard processing fee for verified emergency blood donor dispatch.
          </p>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Request Tracking ID</p>
          <p className="text-sm font-mono font-medium text-slate-700">{requestId}</p>
          <p className="text-4xl font-extrabold text-slate-900 mt-2">$15.00</p>
          <span className="inline-block mt-2 text-xs font-semibold px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full">
            Stripe Hosted Mode
          </span>
        </div>

        <button
          onClick={handleStripeRedirect}
          disabled={loading}
          className="w-full bg-[#635BFF] hover:bg-[#534be8] text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
        >
          {loading ? (
            "Opening Official Stripe Window..."
          ) : (
            <>
              <span>Pay with Stripe</span>
              <ExternalLink className="w-4 h-4" />
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Secured directly by Stripe Payment Gateway</span>
        </div>
      </div>
    </div>
  );
}
