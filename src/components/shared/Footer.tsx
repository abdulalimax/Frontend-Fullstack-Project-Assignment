import Link from "next/link";
import { HeartPulse, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-400 py-16 text-sm">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-rose-600 text-white p-2 rounded-xl">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-xl font-black text-white">BloodPulse</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            A voluntary, non-profit humanitarian network working to ensure that no patient suffers due to a lack of safe, compatible blood.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/requests" className="hover:text-rose-400">Emergency Requests Directory</Link></li>
            <li><Link href="/about" className="hover:text-rose-400">About the Foundation</Link></li>
            <li><Link href="/services" className="hover:text-rose-400">Services & Healthcare Partners</Link></li>
            <li><Link href="/faq" className="hover:text-rose-400">Donor Eligibility FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Patient Assistance</h3>
          <ul className="space-y-2 text-xs">
            <li><Link href="/recipient" className="hover:text-rose-400">Post Emergency Request</Link></li>
            <li><Link href="/login" className="hover:text-rose-400">Stripe Emergency Verification</Link></li>
            <li><Link href="/contact" className="hover:text-rose-400">National Ambulance Liaison</Link></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Emergency Desk</h3>
          <p className="text-xs flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" /> Dhaka, Bangladesh
          </p>
          <p className="text-xs flex items-center gap-2">
            <Phone className="w-4 h-4 text-rose-500 shrink-0" /> +880 1700 000000
          </p>
          <p className="text-xs flex items-center gap-2">
            <Mail className="w-4 h-4 text-rose-500 shrink-0" /> emergency@bloodpulse.org
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        BloodPulse Humanitarian Foundation. All Rights Reserved.
      </div>
    </footer>
  );
}
