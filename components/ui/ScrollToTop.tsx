"use client";
import { useEffect, useState } from "react";

/**
 * ScrollToTop — floating button that appears after scrolling 400px.
 * Smooth, non-intrusive, follows the design system.
 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll to top"
      className="fixed bottom-24 right-4 md:bottom-8 md:right-6 z-40 w-11 h-11 rounded-full bg-surface-container-lowest shadow-card-hover border border-outline-variant text-primary flex items-center justify-center transition-all duration-300 hover:bg-primary hover:text-on-primary hover:shadow-glow-cyan-sm hover:-translate-y-0.5 animate-fade-in"
    >
      <span className="material-symbols-outlined text-[22px]">arrow_upward</span>
    </button>
  );
}
