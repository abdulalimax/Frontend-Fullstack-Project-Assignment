import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 text-slate-400 py-16 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="text-xl font-black text-white">
            BloodPulse<span className="text-rose-500">Hub</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Centralized clinical logistics platform facilitating instant blood matching, hospital emergency reserves, and ethical transfusion coordination across Bangladesh.
          </p>
          <div className="inline-flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            99.98% Network Uptime
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-black text-white uppercase tracking-wider">Clinical Navigation</div>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/" className="hover:text-rose-400 transition">Central Overview</Link></li>
            <li><Link href="/requests" className="hover:text-rose-400 transition">Live Emergency Requests</Link></li>
            <li><Link href="/services" className="hover:text-rose-400 transition">Hospital Integration Hub</Link></li>
            <li><Link href="/about" className="hover:text-rose-400 transition">WHO Clinical Standards</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-black text-white uppercase tracking-wider">Portal Access</div>
          <ul className="space-y-2 text-xs font-medium">
            <li><Link href="/login" className="hover:text-rose-400 transition">Hospital Staff & Doctor Login</Link></li>
            <li><Link href="/register" className="hover:text-rose-400 transition">Voluntary Donor Enrollment</Link></li>
            <li><Link href="/recipient" className="hover:text-rose-400 transition">Post Urgent Blood Request</Link></li>
            <li><Link href="/contact" className="hover:text-rose-400 transition">Central Dispatch Helpdesk</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-black text-white uppercase tracking-wider">Emergency Operations</div>
          <p className="text-xs text-slate-400">24/7 National Dispatch Coordination Desk</p>
          <p className="text-lg font-black text-rose-500">+880 1700-000000</p>
          <p className="text-xs text-slate-500">Directorate General of Health Services (DGHS) Affiliated Operations</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-slate-900 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <div>&copy; 2026 BloodPulse National Transfusion Logistics Network. All rights reserved.</div>
        <div className="flex gap-6">
          <span className="hover:text-slate-400 cursor-pointer">HIPAA Compliant</span>
          <span className="hover:text-slate-400 cursor-pointer">WHO Transfusion Protocols</span>
          <span className="hover:text-slate-400 cursor-pointer">Humanitarian Zero-Cost</span>
        </div>
      </div>
    </footer>
  );
}
