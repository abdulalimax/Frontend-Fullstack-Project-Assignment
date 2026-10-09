"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Link from "next/link";

const data = [
  { name: "A+", donations: 14 },
  { name: "B+", donations: 22 },
  { name: "O+", donations: 35 },
  { name: "AB+", donations: 8 },
  { name: "O-", donations: 5 },
];

export default function AdminDashboardPage() {
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    fetchApi<{ data: unknown[] }>("/admin/users")
      .then((res) => setUsersCount(res.data.length))
      .catch(() => setUsersCount(0));
  }, []);

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Admin Control Center</h1>
        <div className="space-x-3 text-sm">
          <Link href="/admin/users" className="bg-slate-900 text-white px-3 py-1.5 rounded-md">Manage Users</Link>
          <Link href="/admin/reports" className="bg-slate-200 text-slate-800 px-3 py-1.5 rounded-md">Audit Logs</Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Registered Users</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{usersCount || 12}</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <p className="text-sm font-medium text-slate-500">Emergency Requests</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">8</p>
        </div>
        <div className="p-6 bg-white border rounded-xl shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Completed Donations</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">84</p>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Donation Distribution by Blood Group</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#888888" />
              <YAxis stroke="#888888" />
              <Tooltip />
              <Bar dataKey="donations" fill="#e11d48" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}