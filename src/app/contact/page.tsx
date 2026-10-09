import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-1 max-w-2xl mx-auto px-4 py-16 w-full">
        <h1 className="text-3xl font-bold text-slate-900">Contact Emergency Desk</h1>
        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input type="text" className="mt-1 w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Message</label>
            <textarea rows={4} className="mt-1 w-full p-2 border rounded-md"></textarea>
          </div>
          <button type="button" className="bg-rose-600 text-white px-4 py-2 rounded-md font-medium">Send Message</button>
        </form>
      </main>
      <Footer />
    </div>
  );
}