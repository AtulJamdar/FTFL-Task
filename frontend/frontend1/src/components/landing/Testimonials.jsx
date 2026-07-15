import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const quotes = [
  {
    name: "Dr. Meera Nair",
    role: "University Librarian · South India",
    text: "Our consortium moved three colleges onto BookNest in one academic year. Training was short and support was responsive when we needed custom rules.",
  },
  {
    name: "Arjun Kapoor",
    role: "IT Lead · K–12 chain",
    text: "Permissions and audit trails were non-negotiable for our leadership team. BookNest gave us both without slowing librarians down.",
  },
  {
    name: "Sunita Deshpande",
    role: "Public library district",
    text: "Peak-hour checkout finally feels smooth. Patrons notice the shorter wait more than they notice the software—and that is exactly what we wanted.",
  },
];

export default function TestimonialsFullPage() {
  const [idx, setIdx] = useState(0);
  const t = quotes[idx];

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-4xl text-center">
        {/* Heading */}
        <div className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f766e] mb-3">
            Stories
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f]">
            Hear from librarians on the ground
          </h2>
        </div>

        {/* Card */}
        <div className="relative rounded-2xl border border-stone-200 bg-[#fafaf9] p-8 sm:p-10 md:p-12 shadow-sm">
          <Quote className="absolute top-6 right-6 w-10 h-10 text-[#0f766e]/15" />

          <blockquote className="text-lg sm:text-xl leading-relaxed text-stone-800 mb-10">
            “{t.text}”
          </blockquote>

          <div className="flex flex-col items-center gap-6">
            <div>
              <cite className="not-italic text-lg font-semibold text-[#1e3a5f]">
                {t.name}
              </cite>
              <p className="text-sm text-stone-500 mt-1">{t.role}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() =>
                  setIdx((i) => (i - 1 + quotes.length) % quotes.length)
                }
                className="p-3 rounded-xl border border-stone-200 bg-white hover:border-[#0f766e]/40 transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2 px-2">
                {quotes.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === idx ? "w-8 bg-[#0f766e]" : "w-2 bg-stone-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setIdx((i) => (i + 1) % quotes.length)}
                className="p-3 rounded-xl border border-stone-200 bg-white hover:border-[#0f766e]/40 transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}