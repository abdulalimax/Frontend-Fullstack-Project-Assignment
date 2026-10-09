"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "DONOR",
    bloodGroup: "A_POSITIVE",
    city: "Dhaka",
    phone: "01700000000",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await fetchApi("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      toast.success("Account created successfully. Please login.");
      router.push("/login");
    } catch (err: unknown) {
      toast.error((err as Error).message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border shadow-sm space-y-6">
        <h1 className="text-2xl font-bold text-slate-900 text-center">Create an Account</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md text-sm"
            >
              <option value="DONOR">Donor</option>
              <option value="RECIPIENT">Recipient</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-2 rounded-md font-medium text-sm hover:bg-rose-700 mt-4"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-xs text-slate-500">
          Already registered?{" "}
          <Link href="/login" className="text-rose-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}