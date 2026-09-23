import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";
import { REVIEWS } from "@/config/content";

export const metadata: Metadata = {
  title: "Patient Reviews & Stories",
  description: `${doctor.reviewCount} verified patient reviews for ${doctor.name}. Real experiences from ${doctor.speciality.toLowerCase()} patients.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  // AggregateRating + Review JSON-LD for Google star ratings in search results
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: doctor.rating,
      bestRating: "5",
      worstRating: "1",
      reviewCount: String(doctor.reviewCountRaw),
    },
    review: REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      description: r.quote,
      name: r.procedure,
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: "5",
        worstRating: "1",
      },
    })),
  };

  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="bg-inverse-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <div className="text-primary-fixed-dim text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Real Patient Experiences</div>
              <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-surface-bright tracking-tight">Patient Stories &amp; Reviews</h1>
              <p className="text-body-lg text-secondary-fixed mt-space-sm max-w-2xl">
                {doctor.reviewCount} verified reviews across {doctor.clinics.length} clinics. Every story is real.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-space-md text-center min-w-[120px]">
              <div className="flex items-center justify-center gap-0.5 mb-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-amber-400 text-[22px] material-symbols-filled">star</span>
                ))}
              </div>
              <div className="text-display-hero-mobile font-display font-extrabold text-surface-bright">{doctor.rating}</div>
              <div className="text-label-sm text-secondary-fixed font-display font-semibold">{doctor.reviewCount} Reviews</div>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {REVIEWS.map((r) => (
              <article key={r.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-space-lg flex flex-col justify-between hover:bg-white/15 transition-all duration-300">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary-fixed font-display font-extrabold text-label-lg">
                        {r.initials}
                      </div>
                      <div>
                        <div className="text-label-md font-display font-bold text-surface-bright">{r.name}, {r.age}</div>
                        <div className="text-body-sm text-secondary-fixed">{r.procedure}</div>
                        <div className="text-label-sm text-primary-fixed-dim">{r.clinic}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex justify-end">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[13px] text-amber-400 material-symbols-filled">star</span>
                        ))}
                      </div>
                      <div className="text-label-sm text-outline-variant mt-0.5">{r.date}</div>
                    </div>
                  </div>
                  <p className="text-body-md text-secondary-fixed-dim leading-relaxed italic">&ldquo;{r.quote}&rdquo;</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY PATIENTS CHOOSE ─────────────────────────── */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="text-center mb-space-xl">
            <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Factual Trust Indicators</div>
            <h2 className="text-headline-md font-display font-bold text-on-surface">Why Patients Choose {doctor.shortName}</h2>
            <p className="text-body-lg text-secondary mt-space-xs max-w-xl mx-auto">Credentials and outcomes that speak for themselves — no unsupported claims.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-space-md">
            {[
              { icon: "calendar_month", stat: doctor.experience,    label: "Years Clinical Experience",   color: "bg-primary-container/15 text-primary" },
              { icon: "people",         stat: doctor.consultations,  label: "Patients Consulted",          color: "bg-tertiary-container/20 text-tertiary" },
              { icon: "medical_services",stat: doctor.procedures,   label: "Procedures Performed",        color: "bg-secondary-container text-on-secondary-container" },
              { icon: "star",           stat: doctor.satisfaction,   label: "Patient Satisfaction Rate",  color: "bg-primary-fixed text-on-primary-fixed" },
            ].map((m) => (
              <div key={m.label} className="bg-surface-container-lowest rounded-xl p-space-lg text-center shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-space-sm ${m.color}`}>
                  <span className="material-symbols-outlined text-[24px]">{m.icon}</span>
                </div>
                <div className="text-headline-md font-display font-extrabold text-on-surface">{m.stat}</div>
                <div className="text-body-sm text-on-surface-variant mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Differentiators from config */}
          <div className="mt-space-xl grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {doctor.differentiators.map((d) => (
              <div key={d.title} className="bg-surface-container-lowest rounded-lg p-space-md shadow-card flex items-start gap-space-md hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300">
                <span className={`material-symbols-outlined text-[28px] shrink-0 mt-0.5 ${d.color}`}>{d.icon}</span>
                <div>
                  <div className="text-label-lg font-display font-bold text-on-surface">{d.title}</div>
                  <div className="text-body-sm text-on-surface-variant mt-1">{d.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-space-xl bg-surface">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <h2 className="text-headline-md font-display font-bold text-on-surface mb-space-md">Ready to experience this care?</h2>
          <Link href="/book" className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary text-on-primary text-label-lg font-display font-bold shadow-glow-cyan-sm hover:opacity-90 transition-all">
            Book Your Consultation
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
