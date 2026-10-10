"use client";

import { useEffect, useState } from "react";
import { Users, Shield, Droplets, HeartHandshake } from "lucide-react";
import { fetchApi } from "@/lib/api";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "DONOR" | "RECIPIENT";
  status: "ACTIVE" | "INACTIVE";
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([
    { id: "1", name: "System Admin", email: "admin@bloodpulse.org", role: "ADMIN", status: "ACTIVE" },
    { id: "2", name: "Alim Donor", email: "donor@bloodpulse.org", role: "DONOR", status: "ACTIVE" },
    { id: "3", name: "Emergency Recipient", email: "recipient@bloodpulse.org", role: "RECIPIENT", status: "ACTIVE" },
  ]);

  useEffect(() => {
    fetchApi<{ data: UserItem[] }>("/admin/users")
      .then((res) => {
        if (res && res.data) {
          setUsers(res.data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-red-600" /> User Registry Management
          </h1>
          <p className="text-sm text-slate-500">Supervise network access, verified identities, and role assignments.</p>
        </div>
        <span className="border border-slate-300 dark:border-slate-700 px-3 py-1 font-mono text-xs rounded-md text-slate-700 dark:text-slate-300">
          Total Users: {users.length}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Administrators</h3>
            <Shield className="h-4 w-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {users.filter((u) => u.role === "ADMIN").length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Full system access</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Active Donors</h3>
            <Droplets className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {users.filter((u) => u.role === "DONOR").length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Verified volunteer donors</p>
        </div>

        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
          <div className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Recipients</h3>
            <HeartHandshake className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {users.filter((u) => u.role === "RECIPIENT").length}
          </div>
          <p className="text-xs text-slate-500 mt-1">Medical emergency cases</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Registered Accounts</h2>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">{u.name}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">{u.email}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          u.role === "ADMIN"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : u.role === "DONOR"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border text-emerald-600 border-emerald-300">
                        {u.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
