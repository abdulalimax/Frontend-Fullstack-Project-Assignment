import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ServicesPage() {
  const services = [
    {
      title: "Automated Emergency Dispatch",
      desc: "Algorithms immediately locate and notify matching screened donors within a 15-kilometer radius of the hospital.",
      badge: "Real-Time Logistics"
    },
    {
      title: "Hospital Blood Bank Synchronization",
      desc: "Clinical departments synchronize their reserve volumes to prevent regional stockouts during mass casualty emergencies.",
      badge: "Hospital Central Hub"
    },
    {
      title: "Clinical Donor Wellness & Interval Tracking",
      desc: "Automated health checks enforce 90-day biological replenishment intervals in accordance with WHO guidelines.",
      badge: "Donor Safety Protocol"
    },
    {
      title: "Rare Blood Phenotype Taskforce",
      desc: "Specialized national directory for high-priority rare blood variants (Rh-null, Bombay Phenotype, AB-negative).",
      badge: "Specialized Matching"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-16 w-full space-y-12">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-wider text-rose-500">Enterprise Health Logistics</div>
          <h1 className="text-4xl font-black text-white mt-1">Hospital & Clinical Services</h1>
          <p className="text-slate-400 text-base mt-2">
            Integrated technical tools empowering public medical centers, private trauma hospitals, and voluntary blood banks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-slate-900 border border-slate-800 p-8 rounded-3xl shadow-xl space-y-4 hover:border-rose-500/50 transition">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950 px-3 py-1 rounded-full border border-rose-800">
                {s.badge}
              </span>
              <h3 className="text-xl font-bold text-white pt-2">{s.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
