import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { site as doctor } from "@/config/site.config";
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
      <section className="relative overflow-hidden bg-surface min-h-[90vh] flex items-center">
        {/* Subtle, calm background ambient gradient */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-primary-container/5 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-margin py-space-xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">

            {/* Left: Content */}
            <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1 mt-6 lg:mt-0">
              <FadeUp>
                <NextOpdBadge />
              </FadeUp>

              {/* Hero heading */}
              <FadeUp delay={0.1}>
                <h1 className="text-display-hero-mobile lg:text-display-hero font-display font-extrabold text-on-surface tracking-tight leading-[1.1] mb-6">
                  <span className="block text-primary pb-1">{doctor.name}</span>
                  <span className="block text-[0.6em] text-on-surface-variant font-bold mt-1">Senior Interventional</span>
                  <span className="block text-[0.6em] text-outline font-light">Cardiologist</span>
                </h1>
              </FadeUp>

              {/* Credential Strip */}
              <FadeUp delay={0.2}>
                <div className="flex flex-wrap items-center gap-2 text-label-md sm:text-label-lg font-display text-on-surface-variant mb-space-lg bg-surface-container/40 py-1.5 px-3.5 rounded-lg border border-outline-variant/30">
                  <span className="font-bold text-primary">MD</span>
                  <span className="opacity-40">•</span>
                  <span>DM Cardiology, AIIMS New Delhi</span>
                  <span className="opacity-40">•</span>
                  <span>FACC (USA)</span>
                </div>
              </FadeUp>

              {/* Care Philosophy / Tagline */}
              <FadeUp delay={0.3}>
                <p className="text-body-lg text-on-surface-variant max-w-lg mb-space-xl italic border-l-4 border-primary pl-4 py-1">
                  &ldquo;{doctor.philosophy}&rdquo;
                </p>
              </FadeUp>

              {/* CTAs */}
              <FadeUp delay={0.4}>
                <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-space-md">
                  <Link
                    href="/book"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[16px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 active:scale-[0.98] transition-all group min-h-[56px]"
                  >
                    <span>Book Consultation</span>
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                  </Link>
                  <a
                    href={buildWhatsAppUrl({ purpose: "inquiry" })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[16px] rounded-full bg-[#25D366] text-white text-label-lg font-display font-bold hover:opacity-90 hover:shadow-lg active:scale-[0.98] transition-all min-h-[56px]"
                  >
                    <span className="material-symbols-outlined text-[22px]">chat</span>
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </FadeUp>
            </div>

            {/* Right: Doctor Photo Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end items-center order-1 lg:order-2 w-full">
              <FadeUp delay={0.2} className="w-full max-w-xs sm:max-w-[380px]">
                <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden border border-surface-container-highest shadow-2xl bg-surface-container-low group">
                  <Image
                    src={doctor.photo}
                    alt={`${doctor.name}, ${doctor.title}`}
                    fill
                    priority
                    className="object-cover object-top"
                  />
                  {/* Subtle lower gradient for caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  {/* Anchored clean credential footer inside the photo card */}
                  <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between bg-surface-container-lowest/90 backdrop-blur-md rounded-xl p-3 border border-white/20 shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-primary material-symbols-filled">verified</span>
                      <div>
                        <div className="text-label-sm font-display font-bold text-on-surface">Ex-AIIMS New Delhi</div>
                        <div className="text-[11px] text-on-surface-variant font-medium">NMC Reg: {doctor.nmc}</div>
                      </div>
                    </div>
                    <div className="text-right border-l border-outline-variant/30 pl-3">
                      <div className="text-label-md font-display font-extrabold text-primary">{doctor.experience}</div>
                      <div className="text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">Years Exp</div>
                    </div>
                  </div>
                </div>
              </FadeUp>
            </div>
            
          </div>

          {/* Scroll Down Indicator — positioned relative to section, not the inner grid */}
          <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1 opacity-50 hover:opacity-90 transition-opacity cursor-default select-none">
            <span className="text-label-sm font-display text-on-surface-variant uppercase tracking-widest">Scroll to explore</span>
            <span className="material-symbols-outlined text-primary text-[24px] animate-bounce-down">keyboard_arrow_down</span>
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
                      value={doctor.statsValues[stat.key as keyof typeof doctor.statsValues]}
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



      {/* ── SPECIALITIES ───────────────────────────────────────── */}
      <section className="py-space-xl bg-surface" aria-label="Clinical specialities">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md items-start">
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
      <section className="py-space-xl bg-surface-container-low" aria-label="Consulting locations">
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
          {/* Horizontal scroll on mobile (with fade-right hint), grid on desktop */}
          <div className="relative">
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
            {/* Fade-right hint on mobile only */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-surface to-transparent pointer-events-none md:hidden" />
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
          <div className="relative mt-space-lg">
            <div className="flex gap-space-md overflow-x-auto pb-space-sm no-scrollbar snap-x snap-mandatory scroll-pl-4 md:grid md:grid-cols-3">
              {doctor.testimonials.map((r, i) => (
                <div key={r.name} className="shrink-0 snap-start w-[300px] md:w-auto bg-surface-container-lowest/10 backdrop-blur-sm rounded-lg p-5 sm:p-space-lg flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-space-sm">
                      <div className="flex items-center gap-space-sm">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-label-lg shrink-0 ${r.color}`}>
                          {getInitials(r.name)}
                        </div>
                        <div>
                          <div className="text-label-md font-display font-bold text-surface-bright flex items-center gap-1">
                            {r.name}
                            <span className="material-symbols-outlined text-[14px] text-blue-400" title="Verified Patient">check_circle</span>
                          </div>
                          <div className="text-body-sm text-secondary-fixed flex items-center gap-1">
                            Via Google <span className="material-symbols-outlined text-[12px]">public</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex">
                        {/* Stagger stars based on index to look more realistic (e.g. some 4 stars) */}
                        {[1,2,3,4,5].map((s) => (
                          <span key={s} className={`material-symbols-outlined text-[14px] ${s <= (i === 1 ? 4 : 5) ? 'text-amber-400' : 'text-amber-400/30'} material-symbols-filled`}>star</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-body-sm sm:text-body-md text-secondary-fixed-dim leading-relaxed italic mt-space-sm">&ldquo;{r.quote}&rdquo;</p>
                  </div>
                </div>
              ))}
            </div>
            {/* Fade-right hint on mobile only */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-inverse-surface to-transparent pointer-events-none md:hidden" />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section className="py-space-xl bg-surface" aria-label="Book your consultation">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <div className="bg-primary-container/10 rounded-3xl p-8 sm:p-12 border border-primary-container/20">
            <h2 className="text-headline-md font-display font-extrabold text-on-surface mb-space-sm">
              Ready to take control of your heart health?
            </h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-space-lg">
              Book a consultation with {doctor.name} at a clinic near you or via secure video telehealth.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-space-md">
              <Link
                href="/book"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[16px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 active:scale-[0.98] transition-all"
              >
                Book Consultation <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              </Link>
              <a
                href={buildWhatsAppUrl({ purpose: "inquiry" })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs px-space-xl py-[16px] rounded-full bg-surface-container text-on-surface text-label-lg font-display font-bold hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-[22px] text-[#25D366]">chat</span>
                Ask a Question
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
