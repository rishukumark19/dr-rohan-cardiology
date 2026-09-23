import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Consulting Locations & Timings",
  description: `${doctor.name} consults at ${doctor.clinics.length} locations across Delhi NCR. Greater Kailash-1, Max Saket, Medanta Gurugram, and Virtual Video OPD.`,
  alternates: { canonical: "/locations" },
};

// JS getDay(): 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
const WEEKLY_SCHEDULE = [
  { day: "MON", clinic: "Max Saket",        hours: "10am–1:30pm",   dayIndex: 1 },
  { day: "TUE", clinic: "GK-1 Clinic",      hours: "4:30pm–8pm",    dayIndex: 2 },
  { day: "WED", clinic: "Max Saket",        hours: "10am–1:30pm",   dayIndex: 3 },
  { day: "THU", clinic: "GK-1 Clinic",      hours: "4:30pm–8pm",    dayIndex: 4 },
  { day: "FRI", clinic: "Max Saket",        hours: "10am–1:30pm",   dayIndex: 5 },
  { day: "SAT", clinic: "GK-1 / Medanta",  hours: "Alt. Schedule", dayIndex: 6 },
  { day: "SUN", clinic: "Emergency Only",   hours: "Max Saket ER",  dayIndex: 0, isEmergency: true },
] as const;

export default function LocationsPage() {
  // Server-side today detection — correct every time the page is visited
  const todayIndex = new Date().getDay();
  const todayEntry = WEEKLY_SCHEDULE.find((s) => s.dayIndex === todayIndex);
  const todayLabel = todayEntry && !("isEmergency" in todayEntry && todayEntry.isEmergency)
    ? `OPD Today — ${todayEntry.clinic}`
    : "Emergency Only Today — Call 102";

  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <section className="bg-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-md shadow-card">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary" />
            </span>
            {todayLabel}
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-extrabold text-on-surface tracking-tight mb-space-sm">
            Consulting Locations &amp; Timings
          </h1>
          <p className="text-body-lg text-secondary max-w-2xl">
            {doctor.name} consults at {doctor.clinics.length} locations across South Delhi &amp; Gurugram, plus Daily Video Telehealth.
          </p>

          {/* Dynamic weekly day roster */}
          <div className="mt-space-lg overflow-x-auto no-scrollbar">
            <div className="flex gap-space-xs min-w-max pb-1">
              {WEEKLY_SCHEDULE.map((d) => {
                const isToday = d.dayIndex === todayIndex;
                const isEmergency = "isEmergency" in d && d.isEmergency;
                return (
                  <div
                    key={d.day}
                    className={`flex-shrink-0 w-28 p-3 rounded-DEFAULT flex flex-col items-center text-center gap-0.5 transition-all ${
                      isEmergency
                        ? "bg-error-container text-on-error-container"
                        : isToday
                        ? "bg-inverse-surface text-inverse-on-surface shadow-md ring-2 ring-primary-container"
                        : "bg-surface-container text-on-surface"
                    }`}
                  >
                    <span className={`text-label-sm font-display font-bold ${isToday ? "text-primary-fixed-dim" : ""}`}>
                      {d.day}{isToday ? " · TODAY" : ""}
                    </span>
                    <span className={`text-label-md font-display font-extrabold leading-tight ${isToday ? "text-inverse-on-surface" : ""}`}>
                      {d.clinic}
                    </span>
                    <span className={`text-label-sm ${isToday ? "text-inverse-on-surface/80" : "text-on-surface-variant"}`}>
                      {d.hours}
                    </span>
                    {isToday && (
                      <span className="mt-0.5 inline-flex items-center gap-0.5 text-label-sm text-tertiary-fixed font-display font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse" />Live
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CLINIC CARDS ──────────────────────────────────── */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            {doctor.clinics.map((clinic) => {
              // Highlight if this clinic is open today (use daysArray from doctor config)
              const clinicOpenToday = clinic.daysArray.includes(todayIndex);
              return (
                <article
                  key={clinic.id}
                  className={`bg-surface-container-lowest rounded-xl shadow-card p-space-lg flex flex-col gap-space-md transition-all hover:shadow-card-hover ${clinicOpenToday ? "ring-2 ring-primary/30" : ""}`}
                >
                  {/* Badge row */}
                  <div className="flex items-center justify-between">
                    <span className={`text-label-sm font-display font-bold px-space-md py-1.5 rounded-full flex items-center gap-1 ${
                      clinic.type === "flagship" ? "bg-tertiary-fixed text-on-tertiary-fixed" :
                      clinic.type === "telehealth" ? "bg-primary-container/20 text-primary" :
                      "bg-surface-container text-on-surface-variant"
                    }`}>
                      <span className="material-symbols-outlined text-[14px]">
                        {clinic.isVirtual ? "videocam" : clinic.type === "flagship" ? "star" : "local_hospital"}
                      </span>
                      {clinic.badge}
                    </span>
                    <div className="flex items-center gap-space-xs">
                      {clinicOpenToday && (
                        <span className="text-label-sm font-display font-bold text-tertiary flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />Open Today
                        </span>
                      )}
                      <span className="text-headline-sm font-display font-extrabold text-primary">₹{clinic.fee.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Name & address */}
                  <div>
                    <h2 className="text-headline-sm font-display font-bold text-on-surface">{clinic.name}</h2>
                    {!clinic.isVirtual && (
                      <p className="text-body-sm text-on-surface-variant flex items-start gap-1 mt-1">
                        <span className="material-symbols-outlined text-[16px] text-primary flex-shrink-0 mt-0.5">location_on</span>
                        {clinic.address}
                      </p>
                    )}
                    {clinic.isVirtual && (
                      <p className="text-body-sm text-on-surface-variant mt-1">{clinic.address}</p>
                    )}
                  </div>

                  {/* Schedule & diagnostics */}
                  <div className="grid grid-cols-2 gap-space-xs">
                    <div className="p-2.5 rounded-DEFAULT bg-surface-container-low flex flex-col gap-0.5">
                      <span className="text-label-sm text-secondary font-display font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">schedule</span>
                        Schedule
                      </span>
                      <p className="text-label-md font-display font-bold text-on-surface">{clinic.days}</p>
                      <p className="text-body-sm text-on-surface-variant">{clinic.hours}</p>
                    </div>
                    <div className="p-2.5 rounded-DEFAULT bg-surface-container-low flex flex-col gap-0.5">
                      <span className="text-label-sm text-secondary font-display font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">biotech</span>
                        Services
                      </span>
                      <div className="flex flex-wrap gap-1 mt-0.5">
                        {clinic.diagnostics.slice(0, 2).map((d) => (
                          <span key={d} className="text-label-sm bg-surface-container px-1.5 py-0.5 rounded-full text-on-surface-variant">{d}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <p className="text-label-sm text-on-surface-variant bg-surface-container rounded-DEFAULT px-space-sm py-1.5">
                    {clinic.notes}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col gap-space-xs pt-space-xs">
                    <Link
                      href="/book"
                      className="w-full flex items-center justify-center gap-space-xs py-3 rounded-full bg-primary-container text-on-primary-container text-label-md font-display font-bold hover:opacity-90 hover:scale-[1.01] transition-all"
                    >
                      {clinic.isVirtual ? "Book Video OPD" : `Book ${clinic.shortName} Slot`}
                      <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                    </Link>
                    {!clinic.isVirtual && clinic.mapsUrl && (
                      <a
                        href={clinic.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-space-xs py-2.5 rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">directions</span>
                        Get Directions
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {/* Coordinator help */}
          <div className="mt-space-xl bg-surface-container-lowest rounded-xl shadow-card p-space-lg flex flex-col sm:flex-row items-center gap-space-md">
            <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shrink-0">
              <span className="material-symbols-outlined text-[28px]">support_agent</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-title-md font-display font-bold text-on-surface">Unsure which location to choose?</p>
              <p className="text-body-sm text-on-surface-variant">
                Chat with <strong className="text-on-surface">{doctor.coordinator.name}</strong>, {doctor.name}&apos;s Care Coordinator. She will recommend the best clinic for your condition and schedule.
              </p>
            </div>
            <div className="flex gap-space-xs w-full sm:w-auto">
              <a
                href={buildWhatsAppUrl({ purpose: "inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-space-lg py-space-sm rounded-full bg-tertiary text-on-tertiary text-label-md font-display font-bold hover:opacity-90 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                WhatsApp {doctor.coordinator.name}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
