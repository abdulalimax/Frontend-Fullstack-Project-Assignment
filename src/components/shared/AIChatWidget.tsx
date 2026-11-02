"use client";

import { useState } from "react";
import { Bot, X, Send, Sparkles } from "lucide-react";

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "আসসালামু আলাইকুম! আমি BloodPulse AI ক্লিনিক্যাল অ্যাসিস্ট্যান্ট।\nরক্তের গ্রুপের সামঞ্জস্যতা, ওজন, হিমোগ্লোবিন বা রক্তদানের যেকোনো নিয়ম নিয়ে বাংলায় বা ইংরেজিতে প্রশ্ন করুন।"
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const askQuestion = async (userText: string) => {
    if (!userText.trim() || typing) return;
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setTyping(true);

    try {
      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userText })
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "ai", text: data.response || "উত্তর পাওয়া যায়নি।" }]);
    } catch {
      setMessages((prev) => [...prev, { role: "ai", text: "সংযোগে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।" }]);
    } finally {
      setTyping(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    askQuestion(input);
  };

  const quickPrompts = [
    "O+ রক্ত কাকে দেওয়া যায়?",
    "হিমোগ্লোবিন কত থাকতে হয়?",
    "৫২ কেজি ওজনে রক্ত দেওয়া যাবে?",
    "রক্তদানের নিয়ম কী কী?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2.5 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 text-white font-bold px-5 py-3.5 rounded-full shadow-2xl transition hover:scale-105 border-2 border-rose-400/30"
        >
          <Bot className="w-5 h-5 animate-bounce" />
          <span className="text-xs tracking-wide">AI Assistant</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px]">
          <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 p-4 border-b border-slate-800 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-rose-500" />
              <div>
                <p className="text-xs font-black">BloodPulse AI Clinical Core</p>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Real-Time Medical AI Active
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div key={idx} className={"flex " + (m.role === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={"max-w-[85%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed " + (
                    m.role === "user"
                      ? "bg-rose-600 text-white font-medium rounded-br-none shadow"
                      : "bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow"
                  )}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-slate-950 border border-slate-800 text-rose-300 p-3 rounded-2xl text-xs italic animate-pulse">
                  এআই উত্তর তৈরি করছে...
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-2 bg-slate-950/90 border-t border-slate-800/80 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickPrompts.map((qp) => (
              <button
                key={qp}
                type="button"
                onClick={() => askQuestion(qp)}
                className="shrink-0 text-[10px] bg-slate-900 hover:bg-rose-950 text-slate-300 hover:text-rose-300 border border-slate-800 hover:border-rose-700 px-2.5 py-1 rounded-full transition"
              >
                {qp}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 bg-slate-950 flex gap-2">
            <input
              type="text"
              placeholder="বাংলা বা ইংরেজিতে যেকোনো প্রশ্ন লিখুন..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 text-white rounded-xl px-3.5 py-2.5 text-xs outline-none focus:border-rose-500"
            />
            <button
              type="submit"
              disabled={typing}
              className="bg-rose-600 hover:bg-rose-500 text-white p-2.5 rounded-xl transition disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}