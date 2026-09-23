"use client";
import Link from "next/link";
import { doctor } from "@/config/doctor";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24">
          <div className="max-w-md w-full text-center flex flex-col items-center gap-space-lg">
            <div className="w-20 h-20 rounded-full bg-error-container/40 flex items-center justify-center">
              <span className="material-symbols-outlined text-[40px] text-error material-symbols-filled">error</span>
            </div>
            <div>
              <h1 className="text-headline-sm font-display font-bold text-on-surface">Something went wrong</h1>
              <p className="text-body-md text-on-surface-variant mt-space-xs">
                Our team has been notified. You can try again or reach us directly.
              </p>
              {error.digest && (
                <p className="text-label-sm text-outline mt-2 font-mono">Error ID: {error.digest}</p>
              )}
            </div>
            <div className="flex flex-col w-full gap-space-xs">
              <button onClick={reset} className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold hover:opacity-90">
                Try Again
              </button>
              <Link href="/" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high">
                Back to Home
              </Link>
              <a href={buildWhatsAppUrl({ purpose: "inquiry" })} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-tertiary text-label-md font-display font-semibold hover:bg-surface-container-high">
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp Us
              </a>
            </div>
            <p className="text-body-sm text-outline">{doctor.name} · {doctor.phone}</p>
          </div>
        </div>
      </body>
    </html>
  );
}
