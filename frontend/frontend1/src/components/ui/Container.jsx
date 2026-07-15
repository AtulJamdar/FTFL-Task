import React from "react";
import clsx from "clsx";

export default function Container({ className = "", children, ...props }) {
  return (
    <div className={clsx("container mx-auto px-4", className)} {...props}>
      {children}
    </div>
  );
}
