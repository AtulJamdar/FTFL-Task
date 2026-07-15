import React from "react";

export default function Section({ children, id, className = "" }) {
  return (
    <section
      id={id}
      className={`relative w-full px-6 sm:px-8 lg:px-12 py-24 md:py-32 lg:py-40 ${className}`}
    >
      <div className="max-w-screen-2xl mx-auto w-full">{children}</div>
    </section>
  );
}
