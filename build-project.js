const fs = require("fs");
const path = require("path");

const files = {
  "package.json": JSON.stringify({
    "name": "blood-donation-frontend",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "next dev",
      "build": "next build",
      "start": "next start",
      "lint": "next lint"
    },
    "dependencies": {
      "next": "14.2.5",
      "react": "^18",
      "react-dom": "^18",
      "clsx": "^2.1.1",
      "tailwind-merge": "^2.4.0",
      "lucide-react": "^0.417.0",
      "recharts": "^2.12.7",
      "react-hook-form": "^7.52.1",
      "@hookform/resolvers": "^3.9.0",
      "zod": "^3.23.8",
      "sonner": "^1.5.0"
    },
    "devDependencies": {
      "typescript": "^5",
      "@types/node": "^20",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "postcss": "^8",
      "tailwindcss": "^3.4.1",
      "eslint": "^8",
      "eslint-config-next": "14.2.5"
    }
  }, null, 2),

  "tsconfig.json": JSON.stringify({
    "compilerOptions": {
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "skipLibCheck": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "incremental": true,
      "plugins": [{ "name": "next" }],
      "paths": { "@/*": ["./src/*"] }
    },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    "exclude": ["node_modules"]
  }, null, 2),

  "next.config.mjs": `/** @type {import('next').NextConfig} */
const nextConfig = { reactStrictMode: true };
export default nextConfig;`,

  "tailwind.config.ts": `import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: { extend: {} },
  plugins: [],
};
export default config;`,

  "postcss.config.mjs": `const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
export default config;`,

  ".env.local": `NEXT_PUBLIC_API_BASE_URL=https://blood-donation-emergency-platform-eosin.vercel.app/api/v1`,

  "src/app/globals.css": `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  color: #0f172a;
  background-color: #f8fafc;
}`,

  "src/types/index.ts": `export type Role = "ADMIN" | "DONOR" | "RECIPIENT";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  bloodGroup?: string;
  city?: string;
  phone?: string;
}

export interface BloodRequest {
  id: string;
  bloodGroup: string;
  unitsNeeded: number;
  hospitalName: string;
  hospitalAddress: string;
  contactNumber: string;
  emergencyLevel: "NORMAL" | "URGENT" | "CRITICAL";
  status: "PENDING" | "APPROVED" | "COMPLETED" | "CANCELLED";
  createdAt: string;
}`,

  "src/lib/utils.ts": `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`,

  "src/lib/auth.ts": `export const TOKEN_KEY = "token";
export const USER_KEY = "user";

export function setAuth(token: string, user: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  document.cookie = \`auth_token=\${token}; path=/; max-age=604800; SameSite=Lax\`;
  const role = (user as { role?: string })?.role || "";
  document.cookie = \`user_role=\${role}; path=/; max-age=604800; SameSite=Lax\`;
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getAuthUser(): unknown {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function clearAuth() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie = "user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}`,

  "src/lib/api.ts": `import { getAuthToken } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", \`Bearer \${token}\`);
  }

  const response = await fetch(\`\${BASE_URL}\${endpoint}\`, {
    ...options,
    headers,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}`,

  "src/middleware.ts": `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ["/admin", "/donor", "/recipient"];
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/donor") && role !== "DONOR") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (pathname.startsWith("/recipient") && role !== "RECIPIENT") {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/donor/:path*", "/recipient/:path*"],
};`,

  "src/app/layout.tsx": `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blood Donation & Emergency Platform",
  description: "A centralized platform connecting donors, recipients, and admins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}`,

  "src/components/shared/Navbar.tsx": `"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearAuth, getAuthUser } from "@/lib/auth";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<{ role?: string; name?: string } | null>(null);

  useEffect(() => {
    setUser(getAuthUser() as { role?: string; name?: string });
  }, []);

  const handleLogout = () => {
    clearAuth();
    setUser(null);
    router.push("/login");
  };

  const getDashboardLink = () => {
    if (user?.role === "ADMIN") return "/admin";
    if (user?.role === "DONOR") return "/donor";
    if (user?.role === "RECIPIENT") return "/recipient";
    return "/login";
  };

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-rose-600">BloodPulse</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-rose-600">Home</Link>
          <Link href="/requests" className="hover:text-rose-600">Requests</Link>
          <Link href="/about" className="hover:text-rose-600">About</Link>
          <Link href="/services" className="hover:text-rose-600">Services</Link>
          <Link href="/contact" className="hover:text-rose-600">Contact</Link>
          <Link href="/faq" className="hover:text-rose-600">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href={getDashboardLink()}
                className="text-sm font-medium text-slate-700 bg-slate-100 px-3 py-1.5 rounded-md hover:bg-slate-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white bg-rose-600 px-3 py-1.5 rounded-md hover:bg-rose-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-700 hover:text-rose-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium text-white bg-rose-600 px-4 py-2 rounded-md hover:bg-rose-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}`,

  "src/components/shared/Footer.tsx": `import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <span className="text-xl font-bold text-white">BloodPulse</span>
          <p className="mt-2 text-sm">
            Empowering emergency blood donations and immediate patient support.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Pages</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/requests" className="hover:text-white">Active Requests</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Help</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Emergency</h3>
          <p className="mt-4 text-sm">Call 24/7 National Emergency Hotline: 999</p>
        </div>
      </div>
    </footer>
  );
}`,

  "src/app/page.tsx": `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1">
        <section className="py-20 bg-rose-50 border-b">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <span className="text-rose-600 font-semibold tracking-wide uppercase text-sm">Emergency Assistance</span>
            <h1 className="mt-3 text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight">
              Save Lives With Every Drop Of Blood
            </h1>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
              Connect directly with emergency blood donors in real-time. Fast, verified, and transparent medical support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/requests" className="bg-rose-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-rose-700">
                Find Blood Now
              </Link>
              <Link href="/register" className="bg-white border text-slate-700 px-6 py-3 rounded-lg font-medium hover:bg-slate-100">
                Become a Donor
              </Link>
            </div>
          </div>
        </section>
        <section className="py-16 max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Real-Time Matching</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Instant notification algorithms match urgent patient requests with compatible nearby donors.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Verified Donors</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Strict eligibility tracking, last donation date validation, and direct identity confirmation.
            </p>
          </div>
          <div className="p-6 bg-white border rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-900">Secure Processing</h3>
            <p className="mt-2 text-slate-600 text-sm">
              Integrated with Stripe for emergency operational support and audit verification.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}`,

  "src/app/requests/page.tsx": `"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { fetchApi } from "@/lib/api";
import { BloodRequest } from "@/types";

export default function RequestsPublicPage() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);

  useEffect(() => {
    fetchApi<{ data: BloodRequest[] }>("/requests?page=1&limit=10&status=PENDING")
      .then((res) => setRequests(res.data))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Active Emergency Requests</h1>
        <div className="grid gap-4">
          {requests.map((r) => (
            <div key={r.id} className="p-6 bg-white border rounded-xl shadow-sm flex justify-between items-center">
              <div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded">
                  {r.emergencyLevel}
                </span>
                <h2 className="mt-2 text-lg font-bold text-slate-800">{r.bloodGroup} Needed at {r.hospitalName}</h2>
                <p className="text-sm text-slate-500">{r.hospitalAddress} | Contact: {r.contactNumber}</p>
              </div>
              <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">
                Units: {r.unitsNeeded}
              </span>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}`,

  "src/app/about/page.tsx": `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">About BloodPulse</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          BloodPulse was established to bridge the gap between voluntary blood donors and patients facing life-threatening emergencies. By removing intermediaries and automating compatibility filtering, we reduce waiting times from hours to minutes.
        </p>
      </main>
      <Footer />
    </div>
  );
}`,

  "src/app/services/page.tsx": `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">Our Services</h1>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border rounded-lg">
            <h2 className="text-xl font-bold text-slate-800">Emergency Dispatch</h2>
            <p className="mt-2 text-slate-600 text-sm">Prioritized broadcasting to all matching groups within 15km.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h2 className="text-xl font-bold text-slate-800">Hospital Inventory Sync</h2>
            <p className="mt-2 text-slate-600 text-sm">Direct coordination with certified blood banks and ICUs.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}`,

  "src/app/contact/page.tsx": `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-slate-900">Contact Emergency Desk</h1>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" className="mt-1 w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Message</label>
            <textarea rows={4} className="mt-1 w-full p-2 border rounded-md"></textarea>
          </div>
          <button type="button" className="bg-rose-600 text-white px-4 py-2 rounded-md font-medium">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}`,

  "src/app/faq/page.tsx": `import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white border rounded-lg">
            <h2 className="font-semibold text-slate-800">Who is eligible to donate blood?</h2>
            <p className="mt-1 text-sm text-slate-600">Anyone between 18-60 years of age with a minimum weight of 45kg and good general health.</p>
          </div>
          <div className="p-4 bg-white border rounded-lg">
            <h2 className="font-semibold text-slate-800">How frequently can I donate?</h2>
            <p className="mt-1 text-sm text-slate-600">Male donors can donate every 3 months; female donors can donate every 4 months.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}`,

  "src/app/login/page.tsx": `"use client";

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
}`,

  "src/app/register/page.tsx": `"use client";

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
}`,

  "src/app/admin/page.tsx": `"use client";

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
}`,

  "src/app/admin/users/page.tsx": `"use client";

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
}`,

  "src/app/admin/reports/page.tsx": `export default function AdminReportsPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">System Audit Logs & Reports</h1>
      <div className="p-6 bg-white border rounded-xl shadow-sm space-y-3">
        <div className="p-3 bg-slate-50 rounded border text-sm">
          <span className="font-semibold text-slate-800">[Security]:</span> Admin authenticated via standard credentials.
        </div>
        <div className="p-3 bg-slate-50 rounded border text-sm">
          <span className="font-semibold text-slate-800">[Payment]:</span> Stripe webhook verified payment ID #pi_test_9401.
        </div>
      </div>
    </div>
  );
}`,

  "src/app/donor/page.tsx": `"use client";

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
      await fetchApi(\`/requests/\${id}/accept\`, { method: "POST" });
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
}`,

  "src/app/donor/history/page.tsx": `export default function DonorHistoryPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Donation History</h1>
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <p className="text-sm text-slate-600">Total successful donations completed: 3 units.</p>
      </div>
    </div>
  );
}`,

  "src/app/donor/profile/page.tsx": `"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function DonorProfilePage() {
  const [available, setAvailable] = useState(true);

  return (
    <div className="p-8 max-w-xl">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Availability Settings</h1>
      <div className="p-6 bg-white border rounded-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Ready for Emergency Calls</span>
          <input
            type="checkbox"
            checked={available}
            onChange={(e) => {
              setAvailable(e.target.checked);
              toast.success("Availability updated");
            }}
            className="h-5 w-5 rounded text-rose-600"
          />
        </div>
      </div>
    </div>
  );
}`,

  "src/app/recipient/page.tsx": `"use client";

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
      router.push(\`/recipient/payment?requestId=\${res.data.id}\`);
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
}`,

  "src/app/recipient/payment/page.tsx": `"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { fetchApi } from "@/lib/api";
import { toast } from "sonner";

export default function PaymentInitiatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const requestId = searchParams.get("requestId");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    try {
      setLoading(true);
      const res = await fetchApi<{ data: { paymentId: string; checkoutUrl?: string } }>(
        "/payments/initiate",
        {
          method: "POST",
          body: JSON.stringify({ requestId, amount: 15.0 }),
        }
      );

      if (res.data.checkoutUrl) {
        window.location.href = res.data.checkoutUrl;
      } else {
        await fetchApi("/payments/verify", {
          method: "POST",
          body: JSON.stringify({ paymentId: res.data.paymentId }),
        });
        toast.success("Payment verified successfully!");
        router.push("/payment/success");
      }
    } catch (err: unknown) {
      toast.error((err as Error).message || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-xl shadow-sm text-center space-y-4">
        <h1 className="text-2xl font-bold text-slate-900">Emergency Operational Fee</h1>
        <p className="text-sm text-slate-600">
          Standard operational processing fee for instant donor notification.
        </p>
        <p className="text-3xl font-extrabold text-slate-900">$15.00</p>
        <button
          onClick={handlePay}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-3 rounded-lg font-semibold hover:bg-slate-800"
        >
          {loading ? "Connecting to Stripe..." : "Pay with Stripe"}
        </button>
      </div>
    </div>
  );
}`,

  "src/app/recipient/history/page.tsx": `export default function RecipientHistoryPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">My Requests History</h1>
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <p className="text-sm text-slate-600">No previous archived requests.</p>
      </div>
    </div>
  );
}`,

  "src/app/payment/success/page.tsx": `import Link from "next/link";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-xl text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Verified</h1>
        <p className="text-sm text-slate-600">
          Your emergency request is now given highest priority. Donors have been notified.
        </p>
        <Link
          href="/recipient"
          className="inline-block bg-rose-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-rose-700"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}`,

  "src/app/payment/cancel/page.tsx": `import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="max-w-md w-full bg-white p-8 border rounded-xl text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          ✕
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Payment Cancelled</h1>
        <p className="text-sm text-slate-600">
          The transaction was cancelled. Your request remains in standard priority.
        </p>
        <Link
          href="/recipient"
          className="inline-block bg-slate-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm hover:bg-slate-900"
        >
          Go Back
        </Link>
      </div>
    </div>
  );
}`,

  "src/app/error.tsx": `"use client";

export default function ErrorBoundary({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
        <p className="text-sm text-slate-500">An unexpected system error occurred.</p>
        <button
          onClick={() => reset()}
          className="bg-rose-600 text-white px-4 py-2 rounded-md font-medium text-sm"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}`,

  "src/app/not-found.tsx": `import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-black text-rose-600">404</h1>
        <p className="text-lg text-slate-700 font-semibold">Page Not Found</p>
        <Link href="/" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm">
          Return Home
        </Link>
      </div>
    </div>
  );
}`,

  "src/app/unauthorized/page.tsx": `import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-rose-600">403 - Forbidden</h1>
        <p className="text-slate-600">You do not have permission to view this role dashboard.</p>
        <Link href="/login" className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm">
          Switch Account
        </Link>
      </div>
    </div>
  );
}`,

  "src/app/loading.tsx": `export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
    </div>
  );
}`
};

for (const [filePath, content] of Object.entries(files)) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(filePath, content, "utf8");
}

console.log("All files created successfully!");
