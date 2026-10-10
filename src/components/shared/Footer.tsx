import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600 py-12 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="space-y-3">
          <div className="text-lg font-black text-slate-950">BloodPulse<span className="text-rose-600">Hub</span></div>
          <p className="text-xs text-slate-500 leading-relaxed">
            Centralized clinical registry facilitating rapid, verified blood transfusion logistics and trauma network management across Bangladesh.
          </p>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-950 uppercase tracking-wider">Navigation</div>
          <ul className="space-y-1 text-xs">
            <li><Link href="/" className="hover:text-rose-600">Overview</Link></li>
            <li><Link href="/requests" className="hover:text-rose-600">Emergency Requests</Link></li>
            <li><Link href="/services" className="hover:text-rose-600">Hospital Network</Link></li>
            <li><Link href="/about" className="hover:text-rose-600">Clinical Standards</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-950 uppercase tracking-wider">Clinical Portals</div>
          <ul className="space-y-1 text-xs">
            <li><Link href="/login" className="hover:text-rose-600">Hospital Staff Login</Link></li>
            <li><Link href="/register" className="hover:text-rose-600">Donor Registration</Link></li>
            <li><Link href="/recipient" className="hover:text-rose-600">Patient Emergency Post</Link></li>
            <li><Link href="/contact" className="hover:text-rose-600">Emergency Dispatch Desk</Link></li>
          </ul>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-bold text-slate-950 uppercase tracking-wider">Emergency Operations</div>
          <p className="text-xs text-slate-500">24/7 National Dispatch Coordination Center</p>
          <p className="text-sm font-bold text-rose-600">+880 1700-000000</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-100 mt-8 pt-6 text-center text-xs text-slate-400">
        &copy; 2026 BloodPulse National Transfusion Logistics Network. All rights reserved.
      </div>
    </footer>
  );
}
