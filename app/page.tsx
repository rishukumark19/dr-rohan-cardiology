import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { doctor } from "@/config/doctor";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getInitials } from "@/lib/utils";
import NextOpdBadge from "@/components/ui/NextOpdBadge";
import { FadeUp, StaggerGrid, StaggerItem, CountUp } from "@/components/ui/Animations";


export const metadata: Metadata = {
  title: `${doctor.name} — ${doctor.title} | New Delhi`,
  description: doctor.seo.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-surface min-h-[calc(100vh-120px)] flex items-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-primary-container/25 via-primary-fixed/10 to-transparent blur-3xl rounded-full -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-tertiary-fixed/10 blur-3xl rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto px-margin py-space-xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl items-center">

            {/* Left: Content */}
            <div className="flex flex-col items-start order-2 lg:order-1">
              {/* Dynamic OPD badge */}
              <NextOpdBadge />


              {/* Hero heading */}
              <h1 className="text-display-hero-mobile lg:text-display-hero font-display font-extrabold text-on-surface tracking-tight leading-none mb-space-md">
                I&apos;m{" "}
                <span className="text-primary">{doctor.name},</span>
                <br />
                <span className="text-[0.75em] text-on-surface-variant font-bold">
                  {doctor.title}
                </span>
              </h1>

              <p className="text-body-lg text-secondary max-w-xl leading-relaxed mb-space-lg">
                {doctor.qualifications}. Practising across{" "}
                <strong className="text-on-surface">{doctor.locationDesc}</strong> with{" "}
                <strong className="text-on-surface">{doctor.experience} years</strong> of clinical
                experience. {doctor.heroTagline}
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-space-xs mb-space-lg">
                {doctor.trustPills.map((pill) => (
                  <span
                    key={pill.text}
                    className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-display font-semibold shadow-card"
                  >
                    <span className="material-symbols-outlined text-[14px] text-primary">{pill.icon}</span>
                    {pill.text}
                  </span>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-space-sm">
                <Link
                  href="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all group min-h-[48px]"
                >
                  <span>Book Consultation</span>
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </Link>
                <a
                  href={buildWhatsAppUrl({ purpose: "inquiry" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-lg font-display font-semibold hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Right: Doctor halo */}
            <div className="flex justify-center items-center order-1 lg:order-2">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
                {/* Outer glow rings */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary via-primary-container to-tertiary-fixed opacity-30 blur-2xl" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-b from-primary-container to-primary shadow-inner opacity-90" />
                {/* Doctor photo */}
                <Image
                  src={doctor.photo}
                  alt={`${doctor.name}, ${doctor.title}`}
                  width={384}
                  height={384}
                  priority
                  className="relative z-10 w-full h-full object-cover object-top rounded-full shadow-2xl p-1"
                />
                {/* Verified badge */}
                <div className="absolute -bottom-2 right-0 sm:right-4 z-20 flex items-center gap-1 bg-surface-container-lowest text-primary py-2 px-3 rounded-full shadow-card">
                  <span className="material-symbols-outlined text-[16px] text-tertiary material-symbols-filled">verified</span>
                  <span className="text-label-sm font-display font-bold text-on-surface">DM Cardiology, AIIMS</span>
                </div>

                {/* Experience card */}
                <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 z-20 bg-surface-container-lowest rounded-lg p-space-sm shadow-card">
                  <div className="text-[28px] sm:text-display-hero-mobile font-display font-extrabold text-primary leading-none">
                    {doctor.experience}
                  </div>
                  <div className="text-label-sm font-display font-bold text-on-surface">Yrs Experience</div>
                  <div className="flex mt-1">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-[12px] text-amber-500 material-symbols-filled">star</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY METRICS ────────────────────────────────────────── */}
      <section className="bg-surface-container-low py-space-xl" aria-label="Key clinical metrics">
        <div className="max-w-7xl mx-auto px-margin">
          <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-space-md">
            {doctor.stats.map((stat) => (
              <StaggerItem key={stat.label}>
                <div className="bg-surface-container-lowest p-3.5 sm:p-space-md rounded-lg shadow-card flex flex-col justify-between h-full">
                  <div className="flex items-center justify-between">
                    <CountUp
                      value={doctor[stat.key]}
                      className={`text-[24px] sm:text-display-hero-mobile font-display font-extrabold ${stat.color} leading-none`}
                    />
                    <span className={`material-symbols-outlined text-[20px] sm:text-[22px] ${stat.color} opacity-50`}>{stat.icon}</span>
                  </div>
                  <div className="mt-space-sm">
                    <div className="text-label-md font-display font-bold text-on-surface">{stat.label}</div>
                    <div className="text-body-sm text-on-surface-variant">{stat.sub}</div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* ── BOOKING MODES ──────────────────────────────────────── */}
      <section className="py-space-xl bg-surface" aria-label="Consultation types">
        <div className="max-w-7xl mx-auto px-margin">
          <FadeUp className="text-center mb-space-xl">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
              Multiple Ways to Consult
            </div>
            <h2 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-on-surface tracking-tight">
              Choose Your Consultation Mode
            </h2>
            <p className="text-body-lg text-secondary max-w-2xl mx-auto mt-space-sm">
              Book however works best for you — instant slot, confirmation-based OPD, WhatsApp triage, or direct call.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {[
              {
                icon: "calendar_month",
                title: "Instant OPD Slot",
                desc: "Select date, time & clinic. Get an immediate SMS + WhatsApp digital pass with queue token.",
                cta: "Book Now",
                href: "/book",
                btnStyle: "bg-primary text-on-primary shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98]",
                iconStyle: "bg-primary-container/20 text-primary",
                badge: "Fastest",
              },
              {
                icon: "assignment_turned_in",
                title: "Request-to-Confirm",
                desc: "Submit your preferred slot. Our coordinator confirms within 10 minutes via WhatsApp.",
                cta: "Request Slot",
                href: "/book",
                btnStyle: "bg-primary text-on-primary shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98]",
                iconStyle: "bg-primary-container/20 text-primary",
                badge: "Most Popular",
              },
              {
                icon: "chat",
                title: "WhatsApp Concierge",
                desc: "Chat directly with Sister Neha, our Clinical Coordinator, to schedule at your convenience.",
                cta: "Open WhatsApp",
                href: buildWhatsAppUrl({ purpose: "inquiry" }),
                btnStyle: "bg-tertiary text-on-tertiary hover:opacity-90 active:scale-[0.98]",
                iconStyle: "bg-tertiary-container/20 text-tertiary",
                badge: "Easiest",
                external: true,
              },
              {
                icon: "videocam",
                title: "Video Tele-Consultation",
                desc: "HD encrypted video OPD daily 8:30–10 PM. Digital NMC e-prescription on WhatsApp within 15 mins.",
                cta: "Book Video OPD",
                href: "/book",
                btnStyle: "bg-primary text-on-primary shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98]",
                iconStyle: "bg-primary-container/20 text-primary",
                badge: "₹1,200",
              },
            ].map((mode) => (
              <div key={mode.title} className="bg-surface-container-lowest rounded-lg p-4 sm:p-space-lg shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${mode.iconStyle}`}>
                      <span className="material-symbols-outlined text-[24px]">{mode.icon}</span>
                    </div>
                    <span className="text-label-sm font-display font-bold text-primary bg-primary-fixed px-space-sm py-0.5 rounded-full">
                      {mode.badge}
                    </span>
                  </div>
                  <h3 className="text-headline-sm font-display font-bold text-on-surface mb-space-xs">{mode.title}</h3>
                  <p className="text-body-sm text-secondary leading-relaxed">{mode.desc}</p>
                </div>
                <a
                  href={mode.href}
                  target={mode.external ? "_blank" : undefined}
                  rel={mode.external ? "noopener noreferrer" : undefined}
                  className={`mt-space-md w-full flex items-center justify-center gap-1.5 py-3 rounded-full text-label-md font-display font-bold transition-all min-h-[44px] ${mode.btnStyle}`}
                >
                  {mode.cta}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALITIES ───────────────────────────────────────── */}
      <section className="py-space-xl bg-surface-container-low" aria-label="Clinical specialities">
        <div className="max-w-7xl mx-auto px-margin">
          <FadeUp className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Clinical Focus Areas</div>
              <h2 className="text-headline-lg-mobile md:text-headline-md font-display font-bold text-on-surface tracking-tight">
                Specialities &amp; Expertise
              </h2>
            </div>
            <Link href="/about" className="text-primary text-label-md font-display font-semibold flex items-center gap-1 hover:underline">
              Full profile <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
            {doctor.specialities.map((s) => (
              <details key={s.id} className="group bg-surface-container-lowest rounded-lg p-space-md shadow-card transition-all">
                <summary className="flex items-center justify-between cursor-pointer list-none min-h-[48px]">
                  <div className="flex items-center gap-space-md">
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-label-lg font-display font-bold text-on-surface">{s.name}</h3>
                      <p className="text-body-sm text-on-surface-variant">{s.subtitle}</p>
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-secondary transition-transform duration-200 group-open:rotate-180 shrink-0 ml-space-sm">
                    expand_more
                  </span>
                </summary>
                <p className="text-body-md text-secondary leading-relaxed pt-space-md mt-space-sm border-t border-surface-container">
                  {s.description}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLINICS PREVIEW ────────────────────────────────────── */}
      <section className="py-space-xl bg-surface" aria-label="Consulting locations">
        <div className="max-w-7xl mx-auto px-margin">
          <FadeUp className="flex items-end justify-between mb-space-lg">
            <div>
              <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Where He Consults</div>
              <h2 className="text-headline-lg-mobile md:text-headline-md font-display font-bold text-on-surface tracking-tight">
                Consulting Locations
              </h2>
            </div>
            <Link href="/locations" className="text-primary text-label-md font-display font-semibold flex items-center gap-1 hover:underline">
              View all <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </FadeUp>
          {/* Horizontal scroll on mobile, grid on desktop */}
          <div className="flex gap-space-md overflow-x-auto pb-space-sm no-scrollbar snap-x snap-mandatory scroll-pl-4 md:grid md:grid-cols-2 lg:grid-cols-4">
            {doctor.clinics.map((clinic) => (
              <div
                key={clinic.id}
                className="shrink-0 snap-start w-[280px] sm:w-[300px] md:w-auto bg-surface-container-lowest rounded-lg p-space-md shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-space-sm">
                    <span className={`text-[11px] font-display font-bold px-space-sm py-0.5 rounded-full whitespace-nowrap shrink-0 ${
                      clinic.isVirtual ? "bg-primary-container/20 text-primary" :
                      clinic.type === "flagship" ? "bg-tertiary-fixed text-on-tertiary-fixed" :
                      "bg-surface-container text-on-surface-variant"
                    }`}>
                      {clinic.badge}
                    </span>
                    <span className="text-title-md font-display font-extrabold text-primary shrink-0">
                      ₹{clinic.fee.toLocaleString()}
                    </span>
                  </div>
                  <h3 className="text-title-md font-display font-bold text-on-surface">{clinic.shortName}</h3>
                  <p className="text-body-sm text-on-surface-variant mt-1">{clinic.address}</p>
                  <div className="mt-space-sm bg-surface-container rounded-DEFAULT p-space-sm flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[18px]">
                      {clinic.isVirtual ? "videocam" : "schedule"}
                    </span>
                    <div>
                      <div className="text-label-sm font-display font-bold text-on-surface">{clinic.days}</div>
                      <div className="text-body-sm text-on-surface-variant">{clinic.hours}</div>
                    </div>
                  </div>
                </div>
                <Link
                  href="/book"
                  className="mt-space-md w-full py-3 rounded-full bg-primary text-on-primary text-label-md font-display font-bold text-center flex items-center justify-center gap-1.5 shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all min-h-[44px]"
                >
                  {clinic.isVirtual ? "Book Video OPD" : `Book ${clinic.shortName}`}
                  <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PATIENT REVIEWS ────────────────────────────────────── */}
      <section className="py-space-xl bg-inverse-surface text-inverse-on-surface" aria-label="Patient testimonials">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <div className="text-primary-fixed-dim text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Real Patient Experiences</div>
              <h2 className="text-headline-lg-mobile md:text-headline-md font-display font-bold text-surface-bright tracking-tight">
                What Patients Say
              </h2>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-amber-400 text-[20px] material-symbols-filled">star</span>
              <span className="text-title-md font-display font-bold text-surface-bright">{doctor.rating} / 5</span>
              <span className="text-body-sm text-secondary-fixed">({doctor.reviewCount})</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {doctor.testimonials.map((r) => (
              <div key={r.name} className="bg-surface-container-lowest/10 backdrop-blur-sm rounded-lg p-space-md sm:p-space-lg">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-space-md">
                  <div className="flex items-center gap-space-sm">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-label-lg shrink-0 ${r.color}`}>
                      {getInitials(r.name)}
                    </div>
                    <div>
                      <div className="text-label-md font-display font-bold text-surface-bright">{r.name}</div>
                      <div className="text-body-sm text-secondary-fixed">{r.detail}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[1,2,3,4,5].map((s) => (
                      <span key={s} className="material-symbols-outlined text-[14px] text-amber-400 material-symbols-filled">star</span>
                    ))}
                  </div>
                </div>
                <p className="text-body-md text-secondary-fixed-dim leading-relaxed italic">&ldquo;{r.quote}&rdquo;</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-space-xl">
            <Link
              href="/reviews"
              className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan-sm hover:opacity-90 active:scale-[0.98] transition-all"
            >
              Read All Patient Stories
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CARE PHILOSOPHY ────────────────────────────────────── */}
      <section className="py-space-xl bg-surface-container-low" aria-label="Care philosophy">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <span className="material-symbols-outlined text-[40px] sm:text-[48px] text-primary-container material-symbols-filled">format_quote</span>
          <blockquote className="text-[19px] sm:text-headline-md font-display font-bold text-on-surface leading-snug mt-space-sm mb-space-lg">
            {doctor.philosophy}
          </blockquote>
          <div className="flex flex-wrap items-center justify-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-display font-bold text-label-lg shrink-0">
              {getInitials(doctor.name)}
            </div>
            <div className="text-left">
              <div className="text-label-lg font-display font-bold text-on-surface">{doctor.name}</div>
              <div className="text-body-sm text-on-surface-variant">{doctor.title}</div>
            </div>
            <span className="inline-flex items-center gap-1 text-label-sm font-display font-bold text-tertiary bg-tertiary-container/20 px-space-sm py-0.5 rounded-full sm:ml-space-sm">
              {doctor.languages.join(" & ")}
            </span>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────────── */}
      <section className="py-space-xl bg-surface" aria-label="Book consultation CTA">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <div className="bg-inverse-surface rounded-xl p-5 sm:p-space-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-primary-container/20 text-primary-fixed text-label-sm font-display font-semibold uppercase tracking-wider mb-space-md">
                <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping" />
                Direct Clinical OPD
              </div>
              <h2 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-surface-bright tracking-tight mb-space-md">
                Ready to consult {doctor.shortName}?
              </h2>
              <p className="text-body-lg text-secondary-fixed max-w-2xl mx-auto leading-relaxed mb-space-xl">
                Unhurried {doctor.experienceYears}-year expertise. Bilingual Hindi &amp; English. In-clinic or video OPD available 6 days a week.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-space-md w-full">
                <Link
                  href="/book"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-90 active:scale-[0.98] transition-all group min-h-[48px]"
                >
                  Book Consultation
                  <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-0.5">arrow_forward</span>
                </Link>
                <a
                  href={buildWhatsAppUrl({ purpose: "inquiry" })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-lg font-display font-semibold hover:opacity-90 active:scale-[0.98] transition-all min-h-[48px]"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  WhatsApp Coordinator
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
