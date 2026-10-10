const DEFAULT_BACKEND = "https://blood-donation-emergency-platform.vercel.app/api";

export async function fetchApi<T = any>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND;
  const baseUrl = envUrl.replace(/\/$/, "");
  const targetPath = endpoint.startsWith("/") ? endpoint : "/" + endpoint;
  const fullUrl = baseUrl + targetPath;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(fullUrl, {
      ...options,
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data as T;
  } catch (err) {
    return null;
  }
}
