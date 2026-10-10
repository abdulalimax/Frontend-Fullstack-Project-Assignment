import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Automated Emergency Dispatch",
      desc: "Algorithms instantly alert matching voluntary donors within a 15-kilometer radius of the hospital.",
      badge: "Logistics"
    },
    {
      title: "Hospital Blood Bank Synchronization",
      desc: "Private and public medical facilities integrate inventory counts to prevent critical regional deficits.",
      badge: "Clinical Hub"
    },
    {
      title: "Donor Health & Interval Tracking",
      desc: "Automated safeguards ensure donors adhere to strict 90-day intervals and WHO health screening checks.",
      badge: "Safety Protocol"
    },
    {
      title: "Rare Blood Group Taskforce",
      desc: "Dedicated nationwide directory for rare blood variants (Rh-null, Bombay phenotype, AB-).",
      badge: "Specialized"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full space-y-12">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-600">Enterprise Healthcare Solutions</div>
          <h1 className="text-4xl font-black text-slate-950 mt-1">Hospital & Organization Services</h1>
          <p className="text-slate-600 text-base mt-2">
            Standardized technical tools empowering clinical blood banks, regional clinics, and voluntary student organizations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {s.badge}
              </span>
              <h3 className="text-xl font-bold text-slate-950 pt-2">{s.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
