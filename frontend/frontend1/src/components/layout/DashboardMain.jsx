import React from "react";

/**
 * Centered app content with optional Netflix-style hero band (indigo gradient).
 * Keeps gray-50 / indigo-600 theme aligned with landing.
 */
export default function DashboardMain({
  children,
  isDarkMode,
  heroTitle,
  heroSubtitle,
}) {
  return (
    <main
      className={`flex-1 min-w-0 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto w-full px-6 sm:px-8 lg:px-12 py-8 lg:py-12">
        {(heroTitle || heroSubtitle) && (
          <div className="mb-10 sm:mb-12 text-center">
            <div className="rounded-2xl overflow-hidden shadow-xl shadow-indigo-900/15 border border-gray-200/80 dark:border-gray-700/80 max-w-4xl mx-auto">
              <div className="relative bg-gradient-to-r from-indigo-600 via-indigo-600 to-violet-600 px-8 py-11 sm:px-12 sm:py-14">
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 80% at 100% 0%, rgba(255,255,255,0.25), transparent)",
                  }}
                />
                <div className="relative">
                  {heroTitle && (
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                      {heroTitle}
                    </h1>
                  )}
                  {heroSubtitle && (
                    <p className="mt-3 text-indigo-100/95 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                      {heroSubtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="max-w-6xl mx-auto w-full">{children}</div>
      </div>
    </main>
  );
}
