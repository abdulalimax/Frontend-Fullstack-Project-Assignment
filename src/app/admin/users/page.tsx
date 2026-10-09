"use client";

import { useEffect, useState } from "react";
import { fetchApi } from "@/lib/api";

interface UserItem {
  id: string;
  name: string;
  email: string;
  role: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);

  useEffect(() => {
    fetchApi<{ data: UserItem[] }>("/admin/users")
      .then((res) => setUsers(res.data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">User Management</h1>
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="min-h-full w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 font-semibold text-slate-700">Name</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Email</th>
              <th className="px-6 py-3 font-semibold text-slate-700">Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4">{u.name}</td>
                <td className="px-6 py-4">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-slate-100">{u.role}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}