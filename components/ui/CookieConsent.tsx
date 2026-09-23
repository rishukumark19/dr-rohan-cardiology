"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    // Use a callback form to avoid direct setState in effect body
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);


  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 inset-x-0 z-[200] bg-inverse-surface text-inverse-on-surface shadow-2xl"
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="max-w-7xl mx-auto px-margin py-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
        <p className="text-body-sm text-secondary-fixed leading-relaxed">
          <strong className="text-surface-bright font-display font-semibold">Your Privacy Matters.</strong>{" "}
          We use anonymous analytics to improve your experience. No medical data is collected by our website.{" "}
          <Link href="/privacy" className="text-primary-fixed-dim hover:underline">
            Privacy Policy
          </Link>
          {" · "}
          <Link href="/disclaimer" className="text-primary-fixed-dim hover:underline">
            Disclaimer
          </Link>
        </p>
        <div className="flex items-center gap-space-xs flex-shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none flex items-center justify-center px-space-md py-2.5 rounded-full text-label-md font-display font-semibold text-secondary-fixed bg-surface-container/10 hover:bg-surface-container/20 transition-colors min-h-[44px]"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none flex items-center justify-center px-space-lg py-2.5 rounded-full text-label-md font-display font-bold bg-primary text-on-primary shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px]"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
