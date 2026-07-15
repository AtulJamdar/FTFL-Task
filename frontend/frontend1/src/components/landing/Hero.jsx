import React from "react";
import { ArrowRight, Building2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[min(88vh,860px)] flex items-center justify-center overflow-hidden text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-stone-900 bg-cover bg-center"
        style={{ backgroundImage: "url('/public/Home.jpg')" }}
        role="img"
        aria-label="Library shelves and reading space"
      />

      {/* Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a5f]/92 via-[#1e3a5f]/78 to-[#0f766e]/75" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1c1917]/55 via-transparent to-[#1e3a5f]/25" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 py-24 flex flex-col items-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-white/95 backdrop-blur-sm mb-6">
          <Building2 className="w-4 h-4 text-amber-200" />
          Trusted by libraries & campuses
        </div>

        {/* Heading */}
        <h1 className="text-[2rem] sm:text-[2.75rem] lg:text-[3.25rem] font-bold text-white leading-[1.2] tracking-tight mb-5">
          Library management software
          <span className="block mt-2 text-amber-100/95 font-semibold">
            built for Indian institutions
          </span>
        </h1>

        {/* Description */}
        <p className="text-[1.0625rem] sm:text-lg text-white/90 leading-relaxed max-w-2xl mb-8 font-medium">
          Catalog, circulation, members, and reports in one secure place—so
          your team spends less time on paperwork and more time supporting
          readers.
        </p>

        {/* Book Image */}
        {/* <img
          src="/Home.jpg"
          alt="Books illustration"
          className="w-40 sm:w-52 md:w-60 mb-8 drop-shadow-xl"
        /> */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <a
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f59e0b] px-6 py-3.5 text-[0.9375rem] font-bold text-[#422006] shadow-lg shadow-black/20 hover:bg-amber-400 transition-colors"
          >
            Start free trial
            <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white/70 bg-white/10 px-6 py-3.5 text-[0.9375rem] font-semibold text-white backdrop-blur-sm hover:bg-white/15 transition-colors"
          >
            View capabilities
          </a>
        </div>

        {/* Footer Note */}
        <p className="mt-8 text-sm text-white/70 tracking-wide">
          ISO-minded workflows · Role-based access · Dedicated onboarding support
        </p>
      </div>
    </section>
  );
}