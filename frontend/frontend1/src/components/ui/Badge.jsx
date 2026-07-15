import React from "react";
import clsx from "clsx";

export default function Badge({ className = "", color = "primary", children, ...props }) {
  return (
    <span
      className={clsx(
        `inline-block px-3 py-1 rounded-full text-xs font-semibold bg-${color} text-${color}-foreground shadow-sm`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
