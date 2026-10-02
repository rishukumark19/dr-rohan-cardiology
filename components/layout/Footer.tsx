import Link from "next/link";
import { site as doctor } from "@/config/site.config";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

export default function Footer() {
  return (
    <footer className="bg-inverse-surface text-secondary-fixed font-body pt-space-xl" style={{ paddingBottom: 'calc(var(--mobile-bar-height, 0px) + 1.5rem)' }}>
      <div className="max-w-7xl mx-auto px-margin">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl divide-y divide-outline/10 md:divide-y-0">

          {/* Col 1+2: Doctor bio */}
          <div className="lg:col-span-2 space-y-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-glow-cyan-sm">
                <span className="material-symbols-outlined text-[20px] material-symbols-filled">cardiology</span>
              </div>
              <span className="font-display text-[13px] font-bold text-surface-bright uppercase tracking-widest">
                {doctor.name.toUpperCase()}
              </span>
            </div>
            <p className="text-secondary-fixed-dim text-body-sm leading-relaxed max-w-sm">
              {doctor.footerBio}
            </p>
            <div className="text-label-sm text-outline-variant">
              Delhi Medical Council (NMC) Reg:{" "}
              <strong className="text-surface-bright">{doctor.nmc}</strong>
            </div>
            {/* Quick contact */}
            <div className="flex flex-wrap gap-space-xs pt-space-xs">
              <a
                href={buildCallUrl()}
                className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-full bg-surface-container/10 text-primary-fixed-dim text-label-sm font-display font-semibold hover:bg-surface-container/20 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">call</span>
                {doctor.phone}
              </a>
              <a
                href={buildWhatsAppUrl({ purpose: "inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-full bg-tertiary/20 text-tertiary-fixed text-label-sm font-display font-semibold hover:bg-tertiary/30 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">chat</span>
                WhatsApp Desk
              </a>
            </div>
            {/* Social Links */}
            <div className="flex items-center gap-space-sm pt-space-xs">
              {doctor.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-surface-container/5 flex items-center justify-center text-outline-variant hover:text-surface-bright hover:bg-surface-container/20 transition-all"
                  title={s.name}
                >
                  <span className="material-symbols-outlined text-[16px]">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="lg:col-span-1 pt-space-md md:pt-0">
            <h4 className="font-display text-label-md text-surface-bright uppercase tracking-wider mb-space-md font-bold">
              Quick Links
            </h4>
            <ul className="space-y-space-sm text-body-sm">
              {[
                { href: "/about", label: `About ${doctor.shortName}` },
                { href: "/locations", label: "Locations & Hours" },
                { href: "/book", label: "Book Consultation" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-secondary-fixed-dim hover:text-primary-fixed transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4+5: Emergency */}
          <div className="lg:col-span-2 pt-space-md md:pt-0">
            <h4 className="font-display text-label-md text-surface-bright uppercase tracking-wider mb-space-md font-bold">
              Emergency Care
            </h4>
            <div className="bg-error-container/20 rounded-DEFAULT p-space-md text-body-sm leading-relaxed">
              <strong className="text-error font-display text-label-md block mb-1">Acute Cardiac Emergency:</strong>
              <span className="text-secondary-fixed">
                {doctor.emergency.message}
              </span>
              <a
                href={`tel:${doctor.emergency.number}`}
                className="mt-space-sm inline-flex items-center gap-1.5 px-space-md py-2 rounded-full bg-error text-on-error font-display text-label-md font-bold justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">emergency</span>
                Call {doctor.emergency.number} Now
              </a>
            </div>
            <div className="mt-space-sm text-body-sm text-outline-variant">
              <span className="font-display font-semibold text-surface-bright">{doctor.emergency.hospital}</span>
              <br />
              24/7 Cardiac ER: {doctor.emergency.hospitalPhone}
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="pt-space-md border-t border-outline/20 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-label-sm text-outline-variant text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {doctor.name} {doctor.speciality} Practice. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-space-md gap-y-1">
            <Link href="/privacy" className="hover:text-surface-bright transition-colors">
              Patient Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/disclaimer" className="hover:text-surface-bright transition-colors">
              Medical Disclaimer
            </Link>
            <span>•</span>
            <span>NMC Reg. {doctor.nmc}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
