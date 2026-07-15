import React from "react";
import clsx from "clsx";

export default function Card({ className = "", children, ...props }) {
  return (
    <div
      className={clsx(
        "bg-card/80 backdrop-blur-xs shadow-card rounded-xl border border-border p-6 transition-all duration-300 ease-out hover:shadow-lg hover:scale-[1.01] hover:-translate-y-1",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
