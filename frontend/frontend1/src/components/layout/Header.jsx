import React, { useState, useEffect } from "react";
import { BookMarked, Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    {
      name: "Product",
      href: "#features",
      submenu: [
        { name: "Features", href: "#features" },
        { name: "Why BookNest", href: "#about" },
        { name: "Impact", href: "#stats" },
      ],
    },
    { name: "Stories", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollTo = (href) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm shadow-indigo-950/5 border-b border-gray-200/90"
          : "bg-white/85 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="max-w-screen-2xl mx-auto h-[3.75rem] sm:h-16 px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        <a href="/" className="flex items-center gap-2.5 shrink-0">
          <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/25">
            <BookMarked className="w-5 h-5" strokeWidth={2} aria-hidden />
          </span>
          <span className="text-[1.05rem] font-semibold tracking-tight text-gray-900">
            BookNest
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {links.map((item) =>
            item.submenu ? (
              <div key={item.name} className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 text-[0.8125rem] font-medium text-gray-600 hover:text-indigo-600 rounded-lg"
                >
                  {item.name}
                  <ChevronDown className="w-[0.875rem] h-[0.875rem] opacity-70" />
                </button>
                <div className="absolute left-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
                  <div className="min-w-[11rem] rounded-xl border border-gray-200/90 bg-white py-1.5 shadow-lg shadow-indigo-500/10">
                    {item.submenu.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(sub.href);
                        }}
                        className="block px-4 py-2.5 text-[0.8125rem] text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={`px-3 py-2 text-[0.8125rem] font-medium text-gray-600 hover:text-indigo-600 rounded-lg ${
                  item.name === "Contact" ? "ml-5" : ""
                }`}
              >
                {item.name}
              </a>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href="/login"
            className="px-3 py-2 text-[0.8125rem] font-semibold text-gray-600 hover:text-indigo-600"
          >
            Sign in
          </a>
          <a
            href="/register"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-[0.8125rem] font-semibold text-white shadow-md shadow-indigo-600/25 hover:bg-indigo-500 transition-colors"
          >
            Get started
          </a>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-gray-800 hover:bg-indigo-50"
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label="Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-md px-4 py-4">
          {links.map((item) =>
            item.submenu ? (
              <div key={item.name} className="py-2">
                <p className="text-[0.6875rem] font-bold uppercase tracking-wider text-gray-400 px-2 mb-1">
                  {item.name}
                </p>
                {item.submenu.map((sub) => (
                  <a
                    key={sub.name}
                    href={sub.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(sub.href);
                    }}
                    className="block py-2.5 px-2 text-[0.9375rem] text-gray-800"
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={`block py-3 text-[0.9375rem] font-medium text-gray-800 ${
                  item.name === "Contact" ? "mt-2 pt-3 border-t border-gray-100" : ""
                }`}
              >
                {item.name}
              </a>
            )
          )}
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            <a
              href="/login"
              className="block w-full py-3 text-center rounded-xl border border-gray-200 font-semibold text-gray-700"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="block w-full py-3 text-center rounded-xl bg-indigo-600 font-semibold text-white shadow-md shadow-indigo-600/20"
            >
              Get started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
