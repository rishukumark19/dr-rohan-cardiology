"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) setVisible(true);
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
        <div className="flex items-center gap-space-xs flex-shrink-0">
          <button
            onClick={decline}
            className="px-space-md py-2 rounded-full text-label-md font-display font-semibold text-secondary-fixed bg-surface-container/10 hover:bg-surface-container/20 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-space-lg py-2 rounded-full text-label-md font-display font-bold bg-primary-container text-on-primary-container hover:opacity-90 transition-opacity"
          >
            Accept & Continue
          </button>
        </div>
      </div>
    </div>
  );
}
