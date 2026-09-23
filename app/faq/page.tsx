"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { doctor } from "@/config/doctor";
import { FAQS } from "@/config/content";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

const CATEGORIES = ["All", ...Array.from(new Set(FAQS.map((f) => f.category)))];

function FAQContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initialQ);
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Sync query to URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (query) params.set("q", query);
    else params.delete("q");
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = FAQS.filter((f) => {
    const matchCat = activeCategory === "All" || f.category === activeCategory;
    const matchQ = !query || f.q.toLowerCase().includes(query.toLowerCase()) || f.a.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
    <>
      {/* Search */}
      <div className="relative mb-space-lg max-w-xl">
        <span className="absolute left-space-md top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">search</span>
        <input
          id="faq-search"
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpenIndex(null); }}
          placeholder="Search questions about booking, fees, locations…"
          className="w-full pl-12 pr-space-md py-3.5 rounded-full bg-surface-container text-on-surface text-body-md placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
        {query && (
          <button onClick={() => setQuery("")} className="absolute right-space-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-space-xs mb-space-lg">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
            className={`px-space-md py-1.5 rounded-full text-label-sm font-display font-bold transition-all ${activeCategory === cat ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"}`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto text-label-sm text-on-surface-variant self-center">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* FAQ accordion */}
      <div className="flex flex-col gap-space-xs">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-space-md py-space-xl text-center">
            <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
            <p className="text-body-md text-on-surface-variant">No questions match &ldquo;{query}&rdquo;</p>
            <a
              href={buildWhatsAppUrl({ purpose: "inquiry" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-space-xs px-space-lg py-space-sm rounded-full bg-tertiary text-on-tertiary text-label-md font-display font-bold hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Ask {doctor.coordinator.name} on WhatsApp
            </a>
          </div>
        )}
        {filtered.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className={`bg-surface-container-lowest rounded-lg shadow-card overflow-hidden transition-all ${isOpen ? "shadow-card-hover" : ""}`}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-space-md px-space-lg py-space-md text-left group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start gap-space-md">
                  <span className={`text-label-sm font-display font-bold px-space-xs py-0.5 rounded-full shrink-0 mt-0.5 ${
                    faq.category === "Booking" ? "bg-primary-fixed text-on-primary-fixed" :
                    faq.category === "Payments" ? "bg-secondary-container text-on-secondary-container" :
                    faq.category === "Locations" ? "bg-tertiary-fixed text-on-tertiary-fixed" :
                    "bg-surface-container text-on-surface-variant"
                  }`}>{faq.category}</span>
                  <span className="text-label-lg font-display font-semibold text-on-surface group-hover:text-primary transition-colors">{faq.q}</span>
                </div>
                <span className={`material-symbols-outlined text-[20px] text-outline shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}>
                  expand_more
                </span>
              </button>
              {isOpen && (
                <div className="px-space-lg pb-space-md border-t border-surface-container">
                  <p className="text-body-md text-secondary leading-relaxed pt-space-md">{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function FAQPage() {
  // FAQ JSON-LD schema for Google rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-surface py-space-xl">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-md shadow-card">
            <span className="material-symbols-outlined text-[16px]">help</span>
            {FAQS.length} answered questions
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-on-surface tracking-tight mb-space-sm">
            Frequently Asked Questions
          </h1>
          <p className="text-body-lg text-secondary max-w-2xl">
            Questions patients ask before booking with {doctor.shortName}. If you don&apos;t find your answer here, WhatsApp {doctor.coordinator.name} directly.
          </p>
        </div>
      </section>

      <section className="py-space-xl bg-surface-container-low flex-1">
        <div className="max-w-5xl mx-auto px-margin">
          <Suspense fallback={<div className="h-12 bg-surface-container-high rounded-full animate-pulse mb-space-lg" />}>
            <FAQContent />
          </Suspense>
        </div>
      </section>

      {/* CTA */}
      <section className="py-space-xl bg-surface">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <h2 className="text-headline-sm font-display font-bold text-on-surface mb-space-sm">Still have a question?</h2>
          <p className="text-body-md text-on-surface-variant mb-space-lg">Our Care Coordinator responds within minutes on WhatsApp.</p>
          <a
            href={buildWhatsAppUrl({ purpose: "inquiry" })}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-tertiary text-on-tertiary text-label-lg font-display font-bold hover:opacity-90 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            WhatsApp {doctor.coordinator.name}
          </a>
        </div>
      </section>
    </div>
  );
}
