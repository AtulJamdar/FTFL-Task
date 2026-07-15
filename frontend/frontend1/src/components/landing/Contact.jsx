import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactFullPage() {
  const [form, setForm] = useState({
    institution: "",
    email: "",
    message: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-[#fafaf9] px-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0f766e] mb-3">
            Contact
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3a5f] leading-tight mb-5">
            We reply within one business day
          </h2>

          <p className="text-stone-600 text-lg leading-relaxed mb-8">
            Share your institution type, locations, and rough volume—we will
            suggest a rollout plan and commercials that fit your budget cycle.
          </p>

          {/* Image */}
          {/* <img
            src="/contact-books.png"
            alt="Library books"
            className="w-56 mx-auto lg:mx-0 mb-8 drop-shadow-xl"
          /> */}

          <ul className="space-y-4 text-center lg:text-left">
            <li className="flex items-center justify-center lg:justify-start gap-3 text-sm text-stone-700">
              <Mail className="w-5 h-5 text-[#0f766e]" />
              <span>hello@booknest.in</span>
            </li>

            <li className="flex items-center justify-center lg:justify-start gap-3 text-sm text-stone-700">
              <Phone className="w-5 h-5 text-[#0f766e]" />
              <span>+91 80 4710 0000</span>
            </li>

            <li className="flex items-center justify-center lg:justify-start gap-3 text-sm text-stone-600">
              <MapPin className="w-5 h-5 text-[#0f766e]" />
              <span>Bengaluru · Serving institutions across India</span>
            </li>
          </ul>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 sm:p-8 shadow-md space-y-4 w-full max-w-md mx-auto">
          <input
            name="institution"
            placeholder="Institution name"
            value={form.institution}
            onChange={update}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#0f766e]/30 focus:border-[#0f766e]"
          />

          <input
            type="email"
            name="email"
            placeholder="Official email"
            value={form.email}
            onChange={update}
            className="w-full rounded-xl border border-stone-200 px-4 py-3 text-sm placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#0f766e]/30 focus:border-[#0f766e]"
          />

          <textarea
            name="message"
            rows={5}
            placeholder="Tell us about branches, users, and timeline"
            value={form.message}
            onChange={update}
            className="w-full resize-none rounded-xl border border-stone-200 px-4 py-3 text-sm placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#0f766e]/30 focus:border-[#0f766e]"
          />

          <button
            type="button"
            className="w-full rounded-xl bg-[#0f766e] py-3.5 text-sm font-semibold text-white hover:bg-[#0d9488] transition-colors"
          >
            Send message
          </button>

          <p className="text-center text-xs text-stone-500">
            By submitting, you agree to be contacted about BookNest.
          </p>
        </div>
      </div>
    </section>
  );
}