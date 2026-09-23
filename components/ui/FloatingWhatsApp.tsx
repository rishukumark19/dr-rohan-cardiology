"use client";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { doctor } from "@/config/doctor";

export default function FloatingWhatsApp() {
  return (
    <a
      href={buildWhatsAppUrl({ purpose: "inquiry" })}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with our WhatsApp desk"
      className="hidden md:flex fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-tertiary text-on-tertiary items-center justify-center shadow-card-hover hover:scale-110 active:scale-95 transition-transform duration-200 group"
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-tertiary animate-ping opacity-30" />
      <span className="material-symbols-outlined text-[28px] relative z-10">chat</span>

      {/* Tooltip */}
      <div className="absolute right-16 bottom-1/2 translate-y-1/2 bg-inverse-surface text-inverse-on-surface text-label-sm font-display font-semibold px-space-sm py-1.5 rounded-DEFAULT whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-card">
        Chat with {doctor.coordinator.name}
        <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-b-[6px] border-l-[6px] border-t-transparent border-b-transparent border-l-inverse-surface" />
      </div>
    </a>
  );
}
