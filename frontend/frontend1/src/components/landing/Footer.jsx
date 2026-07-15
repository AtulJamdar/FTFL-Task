import React from "react";
import { BookMarked, Linkedin, Twitter } from "lucide-react";

export default function FooterFullPage() {
  const y = new Date().getFullYear();

  const groups = [
    {
      title: "Product",
      links: ["Features", "Security", "Pricing", "API"],
    },
    { title: "Company", links: ["About us", "Careers", "Partners"] },
    { title: "Support", links: ["Help centre", "Docs", "Status"] },
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#1e3a5f] text-white px-4 py-16">
      <div className="w-full max-w-6xl">
        {/* Top Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 items-start">
          {/* Brand */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2.5 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
                <BookMarked className="w-5 h-5 text-amber-300" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                BookNest
              </span>
            </div>

            <p className="text-white/75 text-sm leading-relaxed max-w-sm mx-auto lg:mx-0 mb-6">
              Library automation for schools, universities, and public systems
              across India—trusted where reading communities grow.
            </p>

            <div className="flex justify-center lg:justify-start gap-3">
              <a
                href="#"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          {groups.map((g) => (
            <div key={g.title} className="text-center lg:text-left">
              <h4 className="text-xs font-bold uppercase tracking-[0.12em] text-amber-200/90 mb-4">
                {g.title}
              </h4>
              <ul className="space-y-2">
                {g.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-white/80 hover:text-white transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/15 flex flex-col items-center justify-between gap-4 text-sm text-white/65 text-center sm:flex-row">
          <p>© {y} BookNest Technologies. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-white transition-colors">
              Privacy policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of service
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}