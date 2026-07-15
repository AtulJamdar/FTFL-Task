import React from "react";
import Section from "../ui/Section";
import { Cloud, Lock, Zap, Award } from "lucide-react";

const items = [
  {
    icon: Cloud,
    title: "Cloud-first, India-ready",
    desc: "Host on infrastructure aligned with uptime expectations for academic calendars and exam seasons.",
  },
  {
    icon: Lock,
    title: "Privacy by design",
    desc: "Granular roles for librarians, admins, and IT—so data stays with the people who should see it.",
  },
  {
    icon: Zap,
    title: "Performance at scale",
    desc: "Built for peak periods: admissions, exams, and community events when your desk is busiest.",
  },
  {
    icon: Award,
    title: "Partnership, not just software",
    desc: "Implementation checklists and training paths so adoption succeeds in multi-location setups.",
  },
];

export default function About() {
  return (
    <Section
      id="about"
      className="!py-16 md:!py-24 bg-gradient-to-b from-[#f0fdfa]/80 via-[#f7f5f2] to-[#f7f5f2]"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <p className="text-[0.6875rem] font-bold uppercase tracking-[0.16em] text-[#0f766e] mb-3">
            Why BookNest
          </p>
          <h2 className="text-[1.875rem] sm:text-[2.25rem] font-bold text-[#1e3a5f] tracking-tight leading-tight mb-5">
            The calibre institutions expect from modern library systems
          </h2>
          <p className="text-stone-600 text-[1.0625rem] leading-relaxed mb-6">
            We combine disciplined product design with workflows your staff already
            understand—so change management is practical, not theoretical.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-xl border-2 border-[#1e3a5f] px-6 py-3 text-[0.9375rem] font-semibold text-[#1e3a5f] hover:bg-[#1e3a5f] hover:text-white transition-colors"
          >
            Talk to our team
          </a>
        </div>

        <ul className="space-y-4">
          {items.map((row, i) => {
            const Icon = row.icon;
            return (
              <li
                key={i}
                className="flex gap-4 rounded-2xl border border-stone-200/90 bg-white p-5 sm:p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#fff7ed] text-[#b45309]">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </span>
                <div>
                  <h3 className="text-[1rem] font-semibold text-[#1e3a5f] tracking-tight mb-1">
                    {row.title}
                  </h3>
                  <p className="text-[0.875rem] leading-relaxed text-stone-600">
                    {row.desc}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
