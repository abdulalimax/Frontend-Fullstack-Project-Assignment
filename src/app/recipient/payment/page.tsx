"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function PaymentInitiatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestId = searchParams.get("requestId");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ data: { paymentId: string; checkoutUrl?: string } }>(
        "/payments/initiate",
        {
          method: "POST",
          body: JSON.stringify({ requestId, amount: 15.0 }),
        }
      );

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        await fetchApi("/payments/verify", {
          method: "POST",
          body: JSON.stringify({ paymentId: res.data.paymentId }),
        });
        toast.success("Payment verified successfully!");
        router.push("/payment/success");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-xl shadow-sm text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Emergency Operational Fee</h1>
        <p className="text-sm text-slate-600">
          Standard operational processing fee for instant donor notification.
        </p>
        <p className="text-3xl font-extrabold text-slate-900">$15.00</p>
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800"
        >
          {loading ? "Connecting to Stripe..." : "Pay with Stripe"}
        </button>
      </div>
    </div>
  );
}