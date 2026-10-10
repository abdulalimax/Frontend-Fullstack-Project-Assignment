"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Users className="h-6 w-6 text-red-600" /> User Registry Management
          </h1>
          <p className="text-sm text-slate-500">Supervise network access, verified identities, and role assignments.</p>
        </div>
        <Badge variant="outline" className="px-3 py-1 font-mono text-xs">
          Total Users: {users.length}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Administrators</CardTitle>
            <Shield className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "ADMIN").length}</div>
            <p className="text-xs text-muted-foreground">Full system access</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Active Donors</CardTitle>
            <Droplets className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "DONOR").length}</div>
            <p className="text-xs text-muted-foreground">Verified volunteer donors</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Recipients</CardTitle>
            <HeartHandshake className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.filter((u) => u.role === "RECIPIENT").length}</div>
            <p className="text-xs text-muted-foreground">Medical emergency cases</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Registered Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b text-slate-500 font-medium">
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-4 font-medium">{u.name}</td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">{u.email}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant="secondary"
                        className={
                          u.role === "ADMIN"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : u.role === "DONOR"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : "bg-blue-50 text-blue-700 border-blue-200"
                        }
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-300">
                        {u.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
