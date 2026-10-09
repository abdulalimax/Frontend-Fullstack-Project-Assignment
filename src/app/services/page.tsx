import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">Our Services</h1>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border rounded-lg">
            <h2 className="text-xl font-bold text-slate-800">Emergency Dispatch</h2>
            <p className="mt-2 text-slate-600 text-sm">Prioritized broadcasting to all matching groups within 15km.</p>
          </div>
          <div className="p-6 bg-white border rounded-lg">
            <h2 className="text-xl font-bold text-slate-800">Hospital Inventory Sync</h2>
            <p className="mt-2 text-slate-600 text-sm">Direct coordination with certified blood banks and ICUs.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}