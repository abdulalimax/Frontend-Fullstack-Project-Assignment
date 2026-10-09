"use client";

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
}