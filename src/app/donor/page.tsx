"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchApi } from "@/lib/api";
import { Droplet, Heart, Clock, Award, ShieldAlert, CheckCircle2 } from "lucide-react";

interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: string;
  hospitalName: string;
  urgencyLevel: string;
  requiredDate: string;
  status: string;
}

export default function DonorDashboardPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=10&status=PENDING")
      .then((res) => {
        if (res && res.data) {
          setRequests(res.data);
        } else {
          setRequests([]);
        }
      })
      .catch(() => setRequests([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 rounded-lg">
              <Droplet className="h-6 w-6" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Verified Donor Portal
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time emergency matching, donation readiness status, and lifecycle records.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="h-3.5 w-3.5" /> Eligible to Donate
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 pb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Total Donations</span>
            <Award className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">4 Times</div>
          <p className="text-xs text-muted-foreground mt-1">12 lives impacted</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 pb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Last Donation</span>
            <Clock className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">92 Days Ago</div>
          <p className="text-xs text-emerald-600 mt-1">Readiness cooling period passed</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 pb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Blood Group</span>
            <Heart className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-600">O+ (Universal)</div>
          <p className="text-xs text-muted-foreground mt-1">Rh Positive</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 pb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Active Alerts</span>
            <ShieldAlert className="h-4 w-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-600">{requests.length} Requests</div>
          <p className="text-xs text-muted-foreground mt-1">Matching proximity radar</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
              Emergency Matching Feed
            </h2>
            <p className="text-xs text-slate-500">Live urgent patient requests waiting for immediate donors</p>
          </div>
          <Link
            href="/requests"
            className="text-xs font-medium text-red-600 hover:text-red-700 underline underline-offset-4"
          >
            View All Broadcasts
          </Link>
        </div>

        <div className="p-5">
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-14 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No pending blood requisitions currently in your sector.
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {requests.slice(0, 5).map((req) => (
                <div key={req.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-red-100 text-red-700">
                        {req.bloodGroup}
                      </span>
                      <span className="font-medium text-sm text-slate-900 dark:text-slate-100">
                        {req.patientName}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{req.hospitalName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs uppercase font-mono px-2 py-0.5 rounded border border-amber-300 text-amber-700 bg-amber-50">
                      {req.urgencyLevel}
                    </span>
                    <Link
                      href={`/requests/${req.id}`}
                      className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
                    >
                      Respond
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
