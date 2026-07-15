import React from "react";
import { UserPlus, BookPlus, ArrowLeftRight, BarChart } from "lucide-react";

const steps = [
  { icon: UserPlus, step: "01", title: "Register Members", desc: "Add members and issue digital cards." },
  { icon: BookPlus, step: "02", title: "Add Books", desc: "Catalog books with ISBN scanning." },
  { icon: ArrowLeftRight, step: "03", title: "Issue & Return", desc: "Seamlessly track checkouts and returns." },
  { icon: BarChart, step: "04", title: "Track & Analyze", desc: "Monitor usage patterns and reports." },
];

export default function HowItWorksFullPage() {
  return (
    <section className="min-h-screen w-full flex items-center justify-center bg-secondary/30 px-6 py-16">
      <div className="max-w-6xl mx-auto w-full">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">
            Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold">
            Get Started in Minutes
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {steps.map((item, i) => (
            <div
              key={i}
              className="text-center flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-3xl bg-white border border-gray-200 flex items-center justify-center mb-6 relative shadow-lg">
                <item.icon className="w-8 h-8 text-accent" />

                <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                  {item.step}
                </span>
              </div>

              <h3 className="text-lg font-bold mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}