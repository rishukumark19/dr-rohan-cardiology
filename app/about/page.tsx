import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site as doctor } from "@/config/site.config";

export const metadata: Metadata = {
  title: `About ${doctor.name}`,
  description: `Learn about ${doctor.name}, ${doctor.title} at ${doctor.institution}. Education timeline, clinical experience, qualifications, and hospital affiliations.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full" style={{ paddingBottom: 'calc(var(--mobile-bar-height, 0px) + 1rem)' }}>

      {/* ── HERO ──── */}
      <section className="relative overflow-hidden bg-surface py-space-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/15 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">

            {/* Portrait */}
            <div className="lg:col-span-4 flex flex-col items-center gap-space-md">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-primary-container opacity-20 blur-xl" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-b from-primary-container to-primary shadow-inner opacity-80" />
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  width={288}
                  height={288}
                  className="relative z-10 w-full h-full object-cover object-top rounded-full shadow-xl p-1"
                />
                {/* Verified badge — stays in the bottom-right quadrant, never clips down */}
                <div className="absolute bottom-1 right-1 z-20 flex items-center gap-1 bg-surface-container-lowest py-1.5 px-2.5 rounded-full shadow-card">
                  <span className="material-symbols-outlined text-[13px] text-tertiary material-symbols-filled">verified</span>
                  <span className="text-[11px] font-display font-bold text-on-surface whitespace-nowrap">NMC {doctor.nmc}</span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-space-xs max-w-xs">
                <Link href="/book" className="flex items-center justify-center gap-space-xs py-3 rounded-full bg-primary text-on-primary text-label-md font-display font-bold shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  Book Consultation
                </Link>
                <a href={`tel:${doctor.phoneRaw}`} className="flex items-center justify-center gap-space-xs py-3 rounded-full bg-surface-container text-primary text-label-md font-display font-semibold hover:bg-surface-container-high transition-colors min-h-[48px]">
                  <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                  {doctor.phone}
                </a>
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <div>
                <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-xs">{doctor.title}</div>
                <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-extrabold text-on-surface tracking-tight">{doctor.name}</h1>
                <p className="text-title-md font-display font-semibold text-primary mt-1">{doctor.qualifications}</p>
              </div>
              <p className="text-body-lg text-secondary leading-relaxed">{doctor.aboutBio.p1}</p>
              <p className="text-body-md text-secondary leading-relaxed">{doctor.aboutBio.p2}</p>
              {/* Credential pills — clamp to reasonable sizes on mobile */}
              <div className="flex flex-wrap gap-space-xs">
                {doctor.credentialPills.map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] sm:text-label-sm font-display font-semibold shadow-card max-w-full">
                    <span className="material-symbols-outlined text-[12px] text-primary shrink-0">verified</span>
                    <span className="truncate">{cred}</span>
                  </span>
                ))}
              </div>
              
              {/* Memberships merged here */}
              <div className="mt-space-sm">
                <div className="text-label-sm font-display font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Professional Memberships</div>
                <div className="flex flex-wrap gap-space-xs">
                  {doctor.memberships.map((m) => (
                    <span key={m.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest text-on-surface text-[11px] sm:text-label-sm font-display font-semibold shadow-card border border-surface-container">
                      <span className="text-primary">{m.name}</span> <span className="text-outline-variant font-sans px-0.5">•</span> <span className="text-on-surface-variant font-normal truncate max-w-[200px] sm:max-w-none">{m.full}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION TIMELINE ──── */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Academic Journey</div>
          <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">Education &amp; Qualifications</h2>
          <div className="relative flex flex-col gap-space-md pl-8 sm:pl-space-xl">
            {/* Timeline line */}
            <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary to-primary-container opacity-30 rounded-full" />
            {doctor.education.map((edu, i) => (
              <div key={i} className="relative flex gap-space-md sm:gap-space-lg items-start">
                {/* Dot — centered on the vertical line at left:[10px] */}
                <div className="absolute -left-8 sm:-left-10 top-2 w-[22px] h-[22px] rounded-full bg-primary-container border-4 border-surface-container-low flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-card flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-space-sm">
                    <div>
                      <span className="text-label-md font-display font-bold text-primary block">{edu.degree}</span>
                      <span className="text-body-md font-display font-semibold text-on-surface">{edu.institution}</span>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-surface-container">
                      <span className="text-label-md font-display font-bold text-primary bg-primary-container/20 px-space-sm py-0.5 rounded-full">{edu.year}</span>
                      <span className="text-label-sm text-on-surface-variant">{edu.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE TIMELINE ──── */}
      <section className="py-space-xl bg-surface">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Clinical Career</div>
          <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">Professional Experience</h2>
          <div className="relative flex flex-col gap-space-md pl-8 sm:pl-space-xl">
            <div className="absolute left-[10px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary to-primary-container opacity-30 rounded-full" />
            {doctor.experience_timeline.map((exp, i) => (
              <div key={i} className="relative flex gap-space-md sm:gap-space-lg items-start">
                <div className="absolute -left-8 sm:-left-10 top-2 w-[22px] h-[22px] rounded-full bg-primary-container border-4 border-surface flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-card flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5 sm:gap-space-sm">
                    <div>
                      <span className="text-label-md font-display font-bold text-primary block">{exp.role}</span>
                      <span className="text-body-md font-display font-semibold text-on-surface">{exp.institution}</span>
                    </div>
                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-surface-container">
                      <span className="text-label-md font-display font-bold text-primary bg-primary-container/20 px-space-sm py-0.5 rounded-full">{exp.year}</span>
                      <span className="text-label-sm text-on-surface-variant">{exp.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ── HOSPITAL AFFILIATIONS ──── */}
      <section className="py-space-xl bg-surface">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Where He Works</div>
          <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">Hospital Affiliations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            {doctor.hospitalAffiliations.map((h) => (
              <div key={h.name} className="bg-surface-container-lowest p-space-md rounded-lg shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-space-sm ${h.color}`}>
                  <span className="material-symbols-outlined text-[24px]">{h.icon}</span>
                </div>
                <div className="text-label-lg font-display font-bold text-on-surface">{h.name}</div>
                <div className="text-body-sm text-on-surface-variant mt-1">{h.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-space-xl bg-surface-container-low" aria-label="Book your consultation">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <div className="bg-primary-container/10 rounded-3xl p-8 sm:p-12 border border-primary-container/20">
            <h2 className="text-headline-md font-display font-extrabold text-on-surface mb-space-sm">
              Ready to consult with {doctor.name}?
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-lg">
              Choose an in-person clinic visit or secure video telehealth from the comfort of your home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-space-md">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[16px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 active:scale-[0.98] transition-all"
              >
                Book Appointment <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
