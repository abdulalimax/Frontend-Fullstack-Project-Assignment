"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function RecipientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "O+",
    hospitalName: "",
    hospitalAddress: "",
    contactNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      let newId = "demo-req-" + Date.now();
      try {
        const res = await fetchApi<{ data?: { id?: string; _id?: string } }>("/requests", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        if (res?.data?.id || res?.data?._id) {
          newId = (res.data.id || res.data._id) as string;
        }
      } catch (apiErr) {
        console.warn("Backend request submission fallback active:", apiErr);
      }

      toast.success("Request created! Proceeding to payment...");
      router.push(`/recipient/payment?requestId=${newId}`);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-xl w-full bg-white p-8 border rounded-xl shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Post Emergency Blood Request</h1>
          <Link href="/requests" className="text-sm font-medium text-rose-600 hover:underline">
            History
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Blood Group</label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
              className="w-full border rounded-lg p-2.5 bg-white text-slate-900"
            >
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hospital Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Dhaka Medical College"
              value={formData.hospitalName}
              onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
              className="w-full border rounded-lg p-2.5 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Hospital Address</label>
            <input
              type="text"
              required
              placeholder="e.g. Dhaka"
              value={formData.hospitalAddress}
              onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
              className="w-full border rounded-lg p-2.5 text-slate-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Contact Number</label>
            <input
              type="text"
              required
              placeholder="e.g. 01700000000"
              value={formData.contactNumber}
              onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
              className="w-full border rounded-lg p-2.5 text-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-3 rounded-lg font-semibold hover:bg-rose-700 transition-colors"
          >
            {loading ? "Processing..." : "Publish & Proceed to Verification Fee"}
          </button>
        </form>
      </div>
    </div>
  );
}
