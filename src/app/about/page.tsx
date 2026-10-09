import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-extrabold text-slate-900">About BloodPulse</h1>
        <p className="mt-4 text-slate-600 leading-relaxed">
          BloodPulse was established to bridge the gap between voluntary blood donors and patients facing life-threatening emergencies. By removing intermediaries and automating compatibility filtering, we reduce waiting times from hours to minutes.
        </p>
      </main>
      <Footer />
    </div>
  );
}