import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";
import { buildCallUrl, buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: `About ${doctor.name}`,
  description: `Learn about ${doctor.name}, ${doctor.title} at ${doctor.institution}. ${doctor.experience} years of clinical experience in trans-radial angioplasty and cardiac care across Delhi NCR.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">

      {/* Hero */}
      <section className="relative overflow-hidden bg-surface py-space-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/15 blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
            {/* Doctor portrait */}
            <div className="lg:col-span-4 flex flex-col items-center gap-space-md">
              <div className="relative w-56 h-56 sm:w-72 sm:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-primary-container opacity-20 blur-xl" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-b from-primary-container to-primary shadow-inner opacity-80" />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={doctor.photo}
                  alt={doctor.name}
                  className="relative z-10 w-full h-full object-cover object-top rounded-full shadow-xl"
                  style={{ padding: "4px" }}
                />
                <div className="absolute -bottom-2 right-2 z-20 flex items-center gap-1 bg-surface-container-lowest py-2 px-3 rounded-full shadow-card">
                  <span className="material-symbols-outlined text-[14px] text-tertiary material-symbols-filled">verified</span>
                  <span className="text-label-sm font-display font-bold text-on-surface">NMC {doctor.nmc}</span>
                </div>
              </div>
              {/* Quick contact */}
              <div className="flex flex-col w-full gap-space-xs max-w-xs">
                <a href={buildCallUrl()} className="flex items-center justify-center gap-space-xs py-space-sm rounded-full bg-primary text-on-primary text-label-md font-display font-bold hover:opacity-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  {doctor.phone}
                </a>
                <a href={buildWhatsAppUrl({ purpose: "inquiry" })} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-space-xs py-space-sm rounded-full bg-tertiary text-on-tertiary text-label-md font-display font-semibold hover:opacity-90 transition-all">
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  WhatsApp Desk
                </a>
              </div>
            </div>

            {/* Bio content */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <div>
                <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-xs">
                  Senior Interventional Cardiologist
                </div>
                <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-extrabold text-on-surface tracking-tight">
                  {doctor.name}
                </h1>
                <p className="text-title-md font-display font-semibold text-primary mt-1">
                  {doctor.qualifications}
                </p>
              </div>

              <p className="text-body-lg text-secondary leading-relaxed">
                Dr. Rohan Sharma is a Senior Interventional Cardiologist with over {doctor.experience} years of hands-on clinical experience in complex coronary interventions, preventive cardiology, and advanced cardiac device implantation. Trained at the All India Institute of Medical Sciences (AIIMS), New Delhi, he is a Fellow of the American College of Cardiology (FACC) and the Cardiological Society of India (FCSI).
              </p>

              <p className="text-body-md text-secondary leading-relaxed">
                Dr. Sharma is widely recognized for pioneering trans-radial (wrist-entry) coronary angioplasty in South Delhi, enabling patients to walk within 3 hours of the procedure with same-day discharge. He conducts unhurried 20–30 minute consultations and communicates clinical findings in both Hindi and English — believing that informed patients make better health decisions.
              </p>

              {/* Credential pills */}
              <div className="flex flex-wrap gap-space-xs">
                {[
                  "MD, AIIMS New Delhi",
                  "DM Cardiology (Gold Medalist)",
                  "FACC — Fellow, American College of Cardiology",
                  "FCSI — Fellow, Cardiological Society of India",
                  "FSCAI — Society for Cardiovascular Angiography",
                  `NMC Registration ${doctor.nmc}`,
                ].map((cred) => (
                  <span key={cred} className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-display font-semibold shadow-card">
                    <span className="material-symbols-outlined text-[12px] text-primary">verified</span>
                    {cred}
                  </span>
                ))}
              </div>

              {/* Hospital affiliations */}
              <div>
                <h2 className="text-title-md font-display font-bold text-on-surface mb-space-sm">Hospital Affiliations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                  {[
                    { name: "AIIMS New Delhi", role: "Senior Resident & Fellowship", icon: "school" },
                    { name: "Max Super Speciality, Saket", role: "Consultant Cardiologist", icon: "local_hospital" },
                    { name: "Medanta – The Medicity", role: "Visiting Specialist", icon: "apartment" },
                  ].map((h) => (
                    <div key={h.name} className="bg-surface-container-lowest p-space-md rounded-lg shadow-card">
                      <span className="material-symbols-outlined text-primary text-[24px]">{h.icon}</span>
                      <div className="text-label-lg font-display font-bold text-on-surface mt-space-xs">{h.name}</div>
                      <div className="text-body-sm text-on-surface-variant">{h.role}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care philosophy */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <span className="material-symbols-outlined text-[48px] text-primary-container material-symbols-filled">format_quote</span>
          <blockquote className="text-headline-md font-display font-bold text-on-surface leading-snug mt-space-sm mb-space-xl">
            {doctor.philosophy}
          </blockquote>
          <Link href="/book" className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan-sm hover:opacity-90 transition-all">
            Book a Consultation
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
