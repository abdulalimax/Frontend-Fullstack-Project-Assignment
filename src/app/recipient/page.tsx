"use client";

import { useState } from "react";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RecipientDashboardPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bloodGroup: "O_POSITIVE",
    unitsNeeded: 1,
    hospitalName: "",
    hospitalAddress: "",
    contactNumber: "",
    emergencyLevel: "CRITICAL",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetchApi<{ data: { id: string } }>("/requests", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("Blood request broadcasted successfully!");
      router.push(`/recipient/payment?requestId=${res.data.id}`);
    } catch (err: unknown) {
      toast.error((err as Error).message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Post Emergency Blood Request</h1>
        <Link href="/recipient/history" className="text-sm text-rose-600 underline">History</Link>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 border rounded-xl shadow-sm">
        <div>
          <label className="block text-sm font-medium text-slate-700">Blood Group</label>
          <select
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
            className="mt-1 w-full p-2 border rounded-md"
          >
            <option value="O_POSITIVE">O+</option>
            <option value="A_POSITIVE">A+</option>
            <option value="B_POSITIVE">B+</option>
            <option value="AB_POSITIVE">AB+</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Hospital Name</label>
          <input
            type="text"
            required
            value={formData.hospitalName}
            onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Hospital Address</label>
          <input
            type="text"
            required
            value={formData.hospitalAddress}
            onChange={(e) => setFormData({ ...formData, hospitalAddress: e.target.value })}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Contact Number</label>
          <input
            type="text"
            required
            value={formData.contactNumber}
            onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
            className="mt-1 w-full p-2 border rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-rose-600 text-white py-2.5 rounded-lg font-medium hover:bg-rose-700"
        >
          {loading ? "Publishing..." : "Publish & Proceed to Verification Fee"}
        </button>
      </form>
    </div>
  );
}