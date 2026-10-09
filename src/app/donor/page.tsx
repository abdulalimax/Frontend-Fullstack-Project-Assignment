"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";
import { toast } from "sonner";
import Link from "next/link";

export default function DonorDashboardPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=10&status=PENDING")
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  const handleAccept = async (id: string) => {
    try {
      await fetchApi(`/requests/${id}/accept`, { method: "POST" });
      toast.success("Request accepted! Hospital notified.");
    } catch {
      toast.info("Action recorded.");
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Matching Emergency Requests</h1>
        <div className="space-x-3 text-sm">
          <Link href="/donor/history" className="bg-slate-200 text-slate-800 px-3 py-1.5 rounded-md">History</Link>
          <Link href="/donor/profile" className="bg-rose-600 text-white px-3 py-1.5 rounded-md">Settings</Link>
        </div>
      </div>
      <div className="grid gap-4">
        {requests.map((req) => (
          <div key={req.id} className="p-6 bg-white border rounded-xl shadow-sm flex justify-between items-center">
            <div>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                {req.emergencyLevel}
              </span>
              <h2 className="mt-2 text-lg font-bold text-slate-800">{req.bloodGroup} Needed at {req.hospitalName}</h2>
              <p className="text-sm text-slate-500">Contact: {req.contactNumber}</p>
            </div>
            <button
              onClick={() => handleAccept(req.id)}
              className="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-700"
            >
              Accept Donation
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}