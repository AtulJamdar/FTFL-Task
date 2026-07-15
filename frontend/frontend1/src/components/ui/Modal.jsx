import React from "react";
import clsx from "clsx";

export default function Modal({ open, onClose, title, children, className = "" }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
      <div className={clsx("bg-card shadow-card rounded-xl p-8 w-full max-w-lg relative", className)}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
          aria-label="Close modal"
        >
          <span aria-hidden>×</span>
        </button>
        {title && <h2 className="text-xl font-heading mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
