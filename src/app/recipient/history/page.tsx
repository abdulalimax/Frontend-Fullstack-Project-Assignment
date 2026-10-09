export default function RecipientHistoryPage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">My Requests History</h1>
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <p className="text-sm text-slate-600">No previous archived requests.</p>
      </div>
    </div>
  );
}