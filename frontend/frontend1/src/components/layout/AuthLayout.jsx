import React from "react";
import { Link } from "react-router-dom";
import { BookMarked } from "lucide-react";

/**
 * Split hero + centered form (Netflix / LeetCode–style), same palette as landing:
 * indigo gradient panel + gray-50 form side.
 */
export default function AuthLayout({
  children,
  eyebrow,
  title,
  subtitle,
  isDarkMode = false,
}) {
  return (
    <div
      className={`min-h-screen w-full flex flex-col lg:flex-row ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <div className="relative lg:w-[44%] xl:w-[40%] min-h-[200px] lg:min-h-screen flex-shrink-0 flex flex-col justify-between bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 px-8 py-8 lg:px-10 lg:py-12 text-white overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(255,255,255,0.2), transparent), radial-gradient(ellipse 70% 50% at 90% 100%, rgba(99,102,241,0.45), transparent)",
          }}
        />
        <Link
          to="/"
          className="relative z-10 inline-flex items-center gap-2.5 text-white/95 hover:text-white text-sm font-semibold w-fit"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm border border-white/10">
            <BookMarked className="w-5 h-5" strokeWidth={2} aria-hidden />
          </span>
          BookNest
        </Link>
        <div className="relative z-10 flex-1 flex flex-col justify-center py-10 lg:py-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
          <p className="text-indigo-200 text-[0.65rem] font-bold uppercase tracking-[0.2em] mb-4">
            {eyebrow}
          </p>
          <h1 className="text-3xl sm:text-4xl xl:text-[2.65rem] font-bold leading-tight tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-indigo-100/95 text-base sm:text-lg leading-relaxed">
            {subtitle}
          </p>
        </div>
        <p className="relative z-10 text-indigo-200/70 text-xs text-center lg:text-left">
          One account. Full library stack.
        </p>
      </div>

      <div
        className={`flex-1 flex flex-col items-center justify-center px-6 py-12 lg:px-12 lg:py-16 ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
