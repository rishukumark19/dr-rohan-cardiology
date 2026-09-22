import Link from "next/link";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function MobileBottomBar() {
  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(19,27,46,0.06)] md:hidden"
      aria-label="Mobile quick actions"
    >
      <div className="px-space-md py-space-sm flex items-center justify-between gap-space-sm max-w-lg mx-auto">
        {/* Call */}
        <a
          href={buildCallUrl()}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-space-xs py-1 rounded-full text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Call clinic"
        >
          <span className="material-symbols-outlined text-[22px]">phone_in_talk</span>
          <span className="text-label-sm font-display font-semibold mt-0.5">Call Clinic</span>
        </a>

        {/* WhatsApp */}
        <a
          href={buildWhatsAppUrl({ purpose: "inquiry" })}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] px-space-xs py-1 rounded-full text-tertiary hover:opacity-90 transition-opacity"
          aria-label="WhatsApp desk"
        >
          <span className="material-symbols-outlined text-[22px]">chat</span>
          <span className="text-label-sm font-display font-semibold mt-0.5">WhatsApp</span>
        </a>

        {/* Book CTA — prominent pill */}
        <Link
          href="/book"
          className="flex-1 flex items-center justify-center gap-space-xs min-h-[48px] px-space-md py-2.5 rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold shadow-glow-cyan transition-transform active:scale-[0.98]"
        >
          <span>Book Appointment</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </Link>
      </div>
    </nav>
  );
}
