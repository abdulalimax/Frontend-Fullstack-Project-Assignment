"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { fetchApi } from "@/lib/api";
import { setAuth } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const executeLogin = async (loginEmail: string, loginPass: string) => {
    try {
      setLoading(true);
      const res = await fetchApi<{
        success: boolean;
        data: { accessToken: string; user: { role: string; email: string; name: string } };
      }>("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: loginEmail, password: loginPass }),
      });

      setAuth(res.data.accessToken, res.data.user);
      toast.success("Login successful");

      if (res.data.user.role === "ADMIN") {
        router.push("/admin");
      } else if (res.data.user.role === "DONOR") {
        router.push("/donor");
      } else {
        router.push("/recipient");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleManualLogin = (e: React.FormEvent) => {
    e.preventDefault();
    executeLogin(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl border shadow-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500 mt-1">Sign in to your account</p>
        </div>

        <form onSubmit={handleManualLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-rose-500 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-rose-600 text-white py-2.5 rounded-lg font-medium hover:bg-rose-700 transition"
          >
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <div className="relative border-t my-6">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs text-slate-400">
            OR ONE-CLICK DEMO LOGIN
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => executeLogin("admin@blooddonation.com", "Admin@1234")}
            disabled={loading}
            className="p-2 border rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 text-center"
          >
            Admin
          </button>
          <button
            onClick={() => executeLogin("donor1@example.com", "password123")}
            disabled={loading}
            className="p-2 border rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 text-center"
          >
            Donor
          </button>
          <button
            onClick={() => executeLogin("patient1@example.com", "password123")}
            disabled={loading}
            className="p-2 border rounded-lg bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 text-center"
          >
            Recipient
          </button>
        </div>

        <div className="text-center text-xs text-slate-500">
          Do not have an account?{" "}
          <Link href="/register" className="text-rose-600 font-semibold hover:underline">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}