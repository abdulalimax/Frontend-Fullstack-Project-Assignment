export default function AdminReportsPage() {
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
}