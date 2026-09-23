import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = {
  title: `About ${doctor.name}`,
  description: `Learn about ${doctor.name}, ${doctor.title} at ${doctor.institution}. Education timeline, clinical experience, qualifications, and hospital affiliations.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <Image
                  src={doctor.photo}
                  alt={doctor.name}
                  width={288}
                  height={288}
                  className="relative z-10 w-full h-full object-cover object-top rounded-full shadow-xl p-1"
                />
                <div className="absolute -bottom-2 right-2 z-20 flex items-center gap-1 bg-surface-container-lowest py-2 px-3 rounded-full shadow-card">
                  <span className="material-symbols-outlined text-[14px] text-tertiary material-symbols-filled">verified</span>
                  <span className="text-label-sm font-display font-bold text-on-surface">NMC {doctor.nmc}</span>
                </div>
              </div>
              <div className="flex flex-col w-full gap-space-xs max-w-xs">
                <Link href="/book" className="flex items-center justify-center gap-space-xs py-space-sm rounded-full bg-primary text-on-primary text-label-md font-display font-bold hover:opacity-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                  Book Consultation
                </Link>
                <a href={`tel:${doctor.phoneRaw}`} className="flex items-center justify-center gap-space-xs py-space-sm rounded-full bg-surface-container text-on-surface text-label-md font-display font-semibold hover:bg-surface-container-high transition-all">
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
              <p className="text-body-lg text-secondary leading-relaxed">
                {doctor.name} is a {doctor.title} with over {doctor.experience} years of hands-on clinical experience in complex coronary interventions, preventive cardiology, and advanced cardiac device implantation. Trained at {doctor.institution} — one of India&apos;s most prestigious medical institutions — he is a Fellow of the American College of Cardiology (FACC) and the Cardiological Society of India (FCSI).
              </p>
              <p className="text-body-md text-secondary leading-relaxed">
                Dr. Sharma is widely recognised for his expertise in trans-radial (wrist-entry) coronary angioplasty, enabling patients to walk within 3 hours of the procedure with same-day discharge in eligible cases. He conducts unhurried 20–30 minute consultations and communicates clinical findings in both Hindi and English, believing that informed patients make better health decisions.
              </p>
              {/* Credential pills */}
              <div className="flex flex-wrap gap-space-xs">
                {["MD, AIIMS New Delhi", "DM Cardiology (Gold Medalist)", "FACC — American College of Cardiology", "FCSI — Cardiological Society of India", "FSCAI — Interventional Cardiology", `NMC ${doctor.nmc}`].map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-display font-semibold shadow-card">
                    <span className="material-symbols-outlined text-[12px] text-primary">verified</span>{cred}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDUCATION TIMELINE ──── */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Academic Journey</div>
          <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">Education & Qualifications</h2>
          <div className="relative flex flex-col gap-space-md pl-space-xl">
            {/* Timeline line */}
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-primary to-primary-container opacity-30 rounded-full" />
            {doctor.education.map((edu, i) => (
              <div key={i} className="relative flex gap-space-lg items-start">
                {/* Dot */}
                <div className="absolute -left-space-xl w-[22px] h-[22px] rounded-full bg-primary-container border-4 border-surface-container-low flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-card flex-1">
                  <div className="flex items-start justify-between gap-space-sm flex-wrap">
                    <div>
                      <span className="text-label-md font-display font-bold text-primary block">{edu.degree}</span>
                      <span className="text-body-md font-display font-semibold text-on-surface">{edu.institution}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-label-md font-display font-bold text-on-surface bg-surface-container px-space-sm py-0.5 rounded-full">{edu.year}</span>
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
          <div className="relative flex flex-col gap-space-md pl-space-xl">
            <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-tertiary to-tertiary-container opacity-30 rounded-full" />
            {doctor.experience_timeline.map((exp, i) => (
              <div key={i} className="relative flex gap-space-lg items-start">
                <div className="absolute -left-space-xl w-[22px] h-[22px] rounded-full bg-tertiary-container border-4 border-surface flex items-center justify-center shrink-0 mt-1">
                  <div className="w-2 h-2 rounded-full bg-tertiary" />
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-card flex-1">
                  <div className="flex items-start justify-between gap-space-sm flex-wrap">
                    <div>
                      <span className="text-label-md font-display font-bold text-tertiary block">{exp.role}</span>
                      <span className="text-body-md font-display font-semibold text-on-surface">{exp.institution}</span>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-label-md font-display font-bold text-on-surface bg-surface-container px-space-sm py-0.5 rounded-full">{exp.year}</span>
                      <span className="text-label-sm text-on-surface-variant">{exp.type}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MEMBERSHIPS ──── */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">International & National Bodies</div>
          <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">Professional Memberships</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {doctor.memberships.map((m) => (
              <div key={m.name} className="bg-surface-container-lowest rounded-lg p-space-md shadow-card flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-display font-extrabold text-label-md shrink-0">
                  {m.name.slice(0, 1)}
                </div>
                <div>
                  <span className="text-label-lg font-display font-extrabold text-primary block">{m.name}</span>
                  <span className="text-body-sm text-on-surface block">{m.full}</span>
                  <span className="text-label-sm text-on-surface-variant">{m.country}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOSPITAL AFFILIATIONS ──── */}
      <section className="py-space-xl bg-surface">
        <div className="max-w-5xl mx-auto px-margin">
          <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">Hospital Affiliations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            {[
              { name: "AIIMS New Delhi", role: "Senior Resident & Fellowship Training", icon: "school", color: "bg-primary-container/15 text-primary" },
              { name: "Max Super Speciality Hospital, Saket", role: "Consultant Interventional Cardiologist", icon: "local_hospital", color: "bg-tertiary-container/20 text-tertiary" },
              { name: "Medanta – The Medicity, Gurugram", role: "Visiting Specialist", icon: "apartment", color: "bg-secondary-container text-on-secondary-container" },
            ].map((h) => (
              <div key={h.name} className="bg-surface-container-lowest p-space-md rounded-lg shadow-card">
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

      {/* ── CARE PHILOSOPHY ──── */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <span className="material-symbols-outlined text-[48px] text-primary-container material-symbols-filled">format_quote</span>
          <blockquote className="text-headline-md font-display font-bold text-on-surface leading-snug mt-space-sm mb-space-xl">
            {doctor.philosophy}
          </blockquote>
          <Link href="/book" className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan-sm hover:opacity-90 transition-all">
            Book a Consultation <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
