import Link from "next/link";
export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 py-12 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
        <p className="font-bold text-white text-lg">BloodPulse Foundation</p>
        <p className="text-xs text-slate-500">Voluntary Emergency Blood Donation Registry Bangladesh</p>
        <div className="flex justify-center gap-6 text-xs text-slate-400 pt-2">
          <Link href="/about" className="hover:text-rose-400">About</Link>
          <Link href="/requests" className="hover:text-rose-400">Requests</Link>
          <Link href="/contact" className="hover:text-rose-400">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
