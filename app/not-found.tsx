import Link from "next/link";
import { doctor } from "@/config/doctor";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-margin py-space-xl pb-24 md:pb-space-xl">
      <div className="max-w-md w-full text-center flex flex-col items-center gap-space-lg">
        <div className="relative">
          <div className="text-[120px] font-display font-extrabold text-primary leading-none select-none opacity-10">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-primary">search_off</span>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-headline-sm font-display font-bold text-on-surface">Page Not Found</h1>
          <p className="text-body-md text-on-surface-variant mt-space-xs">
            This page doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
          </p>
        </div>
        <div className="flex flex-col w-full gap-space-xs">
          <Link href="/" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold hover:opacity-90 transition-all">
            <span className="material-symbols-outlined text-[20px]">home</span>
            Go to Homepage
          </Link>
          <Link href="/book" className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-md font-display font-bold hover:opacity-90 transition-all">
            Book Appointment
          </Link>
          <a
            href={buildWhatsAppUrl({ purpose: "inquiry" })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-space-xs py-[14px] rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary">chat</span>
            Need Help? WhatsApp Us
          </a>
        </div>
        <p className="text-body-sm text-on-surface-variant">
          {doctor.name} • {doctor.phone}
        </p>
      </div>
    </div>
  );
}
