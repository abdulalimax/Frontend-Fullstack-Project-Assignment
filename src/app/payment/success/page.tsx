import Link from "next/link";

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
}