import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h1>
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-white border rounded-lg">
            <h2 className="font-semibold text-slate-800">Who is eligible to donate blood?</h2>
            <p className="mt-1 text-sm text-slate-600">Anyone between 18-60 years of age with a minimum weight of 45kg and good general health.</p>
          </div>
          <div className="p-4 bg-white border rounded-lg">
            <h2 className="font-semibold text-slate-800">How frequently can I donate?</h2>
            <p className="mt-1 text-sm text-slate-600">Male donors can donate every 3 months; female donors can donate every 4 months.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}