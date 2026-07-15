import React from "react";

const stats = [
  { value: "1,200+", label: "Libraries & campuses" },
  { value: "8,50,000+", label: "Patrons supported" },
  { value: "42,00,000+", label: "Resources catalogued" },
  { value: "98%", label: "Teams happy with onboarding" },
];

export default function StatsFullPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] mb-4">
            Trusted by Libraries Across India
          </h2>
          <p className="text-gray-600 text-lg">
            Numbers that reflect reliability, scale, and trust.
          </p>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center p-6 rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition"
            >
              <div className="text-3xl sm:text-4xl font-bold text-[#0f766e] mb-2">
                {s.value}
              </div>
              <p className="text-sm font-medium text-stone-600">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}