import React from "react";
import { ArrowRight, Headphones } from "lucide-react";

export default function CTAFullPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] via-[#1e3a5f] to-[#134e4a] relative overflow-hidden text-center px-4">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[40%] h-full opacity-[0.12] bg-[radial-gradient(circle_at_70%_30%,#f59e0b,transparent)]" />

      <div className="relative z-10 flex flex-col items-center max-w-3xl w-full">
        {/* Badge */}
        <div className="inline-flex items-center justify-center gap-2 text-amber-200 text-sm font-semibold mb-4">
          <Headphones className="w-4 h-4" />
          Implementation & training
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
          Bring your catalogue online this semester
        </h1>

        {/* Description */}
        <p className="text-white/85 text-lg leading-relaxed mb-8">
          Start with a guided pilot, migrate at your pace, and roll out to
          departments when your team is confident—not before.
        </p>

        {/* Image */}
        {/* <img
          src="/books-stack.png"
          alt="Stack of books"
          className="w-44 sm:w-56 md:w-64 mb-10 drop-shadow-2xl"
        /> */}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/register"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#f59e0b] px-8 py-4 text-base font-bold text-[#422006] hover:bg-amber-400 transition-colors"
          >
            Schedule a demo
            <ArrowRight className="w-5 h-5" strokeWidth={2.5} />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border-2 border-white/80 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Request proposal
          </a>
        </div>
      </div>
    </section>
  );
}