"use client";
import { useState, useMemo } from "react";

const CATEGORIES = [
  "All",
  "First Visit & Consultation",
  "Heart Health & Prevention",
  "Procedures & Angioplasty",
  "Medications & Lifestyle",
  "Booking & Appointments",
  "Video OPD",
  "Insurance & Fees",
  "Family Care & Recovery",
];

const FAQS = [
  { category: "First Visit & Consultation", q: "What should I bring to my first consultation with Dr. Sharma?", a: "Please bring all prior ECG print strips, echocardiogram or angiogram CDs/reports, current medication blister strips (not just the prescription paper), and your Aadhaar or ID card. If you have a family history of heart disease, write down the details beforehand. Coming prepared allows us to maximise your 20-minute consultation window." },
  { category: "First Visit & Consultation", q: "How long is a typical consultation?", a: "Dr. Sharma maintains a strict 20–30 minute slot per patient. He does not rush or overbook. You will receive a clear explanation of your ECG findings, medication plan, and next steps — in both Hindi and English if needed." },
  { category: "Booking & Appointments", q: "How do I book an appointment?", a: "You can book online via our Book Appointment page, WhatsApp Sister Neha (our Coordinator) directly, call our clinic desk, or request a slot and we confirm within 10 minutes." },
  { category: "Booking & Appointments", q: "How much advance notice do I need to book?", a: "Same-day slots are available at GK-1 (limited). For Max Saket and Medanta, we recommend booking 1–2 days in advance. Video OPD slots are available with very short notice." },
  { category: "Insurance & Fees", q: "Does Dr. Sharma accept insurance or TPA cashless?", a: "At Max Super Speciality Hospital Saket, TPA cashless facility is active for most major insurers. At the GK-1 private clinic, consultations are cash/UPI and require self-payment. Insurance reimbursement papers are provided on request." },
  { category: "Insurance & Fees", q: "What are the consultation fees?", a: "GK-1 Clinic: ₹1,500 (includes 7-day follow-up WhatsApp access). Max Saket: ₹1,600 (hospital OPD billing). Medanta: ₹1,800 (prior booking required). Video OPD: ₹1,200 (with digital NMC e-prescription)." },
  { category: "Procedures & Angioplasty", q: "What is trans-radial angioplasty and why is it better?", a: "Trans-radial angioplasty is performed via the radial artery in the wrist rather than the groin. Advantages include: no prolonged bed rest, ability to walk within 3 hours, significantly lower bleeding risk, and often same-day discharge. Dr. Sharma is a high-volume trans-radial specialist." },
  { category: "Procedures & Angioplasty", q: "What is the difference between a drug-eluting stent and a bare-metal stent?", a: "Drug-eluting stents (DES) have a medication coating that prevents re-narrowing (restenosis) of the artery. They are now the standard of care and have significantly better long-term outcomes. Dr. Sharma uses only CE-marked or FDA-approved DES for all coronary interventions." },
  { category: "Heart Health & Prevention", q: "What is a coronary calcium score and should I get one?", a: "A coronary CT calcium score (CAC) measures calcified plaque in your arteries — before symptoms appear. It is recommended for people aged 40–70 with borderline risk factors (mild hypertension, slightly elevated cholesterol, family history). It takes 5 minutes and uses low-dose radiation." },
  { category: "Heart Health & Prevention", q: "What are the warning signs that I need to see a cardiologist urgently?", a: "Seek same-day or next-day urgent evaluation for: chest tightness or pressure lasting more than 5 minutes, unexplained breathlessness on mild exertion, palpitations lasting over 30 seconds, or syncope (fainting) episodes. Sudden crushing chest pain with cold sweat = call 102 immediately, do not wait for OPD." },
  { category: "Medications & Lifestyle", q: "Do I need to stop blood thinners before a procedure?", a: "This depends entirely on the procedure type and the specific medication. Never stop blood thinners (aspirin, clopidogrel, warfarin, rivaroxaban) without consulting Dr. Sharma or your treating physician first. Abrupt cessation can trigger a heart attack or stroke in high-risk patients." },
  { category: "Video OPD", q: "How does the Video OPD consultation work?", a: "Book your slot online or via WhatsApp. At the appointment time, you will receive a secure video link on WhatsApp. The 20-minute encrypted HD call covers history, prior reports, and a management plan. Within 15 minutes of the call, an NMC-compliant digital e-prescription is delivered to your WhatsApp." },
  { category: "Video OPD", q: "Can I get a second opinion via video without having to physically visit?", a: "Yes. Send your reports (ECG PDF, echo report, blood panel) to our WhatsApp number beforehand. Dr. Sharma will review them before the call and provide a structured second opinion with clear recommendations." },
  { category: "Family Care & Recovery", q: "What should a family member expect after a pacemaker implantation?", a: "In the first week: limit left arm lifting above shoulder level. Avoid driving for 2–4 weeks. No intense chest or shoulder exercise for 6 weeks. The wound site should be kept dry for 7 days. Call Sister Neha immediately if there is swelling, redness, or fever above 38°C." },
  { category: "Family Care & Recovery", q: "What diet should a patient follow after angioplasty?", a: "Low-salt diet (less than 5g/day), avoid trans-fats, increase omega-3 rich foods (fatty fish, walnuts, flaxseed), and limit refined carbohydrates. A detailed printed diet sheet is provided at the time of discharge. A follow-up dietary consultation can be arranged via video." },
];

export default function FAQPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    return FAQS.filter((faq) => {
      const matchCategory = activeCategory === "All" || faq.category === activeCategory;
      const matchSearch =
        !query.trim() ||
        faq.q.toLowerCase().includes(query.toLowerCase()) ||
        faq.a.toLowerCase().includes(query.toLowerCase()) ||
        faq.category.toLowerCase().includes(query.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [query, activeCategory]);

  function toggleFaq(idx: number) {
    setOpenFaqs((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  }

  function expandAll() {
    setOpenFaqs(new Set(filtered.map((_, i) => i)));
  }

  function collapseAll() {
    setOpenFaqs(new Set());
  }

  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">
      {/* Hero */}
      <section className="relative overflow-hidden bg-surface py-space-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-primary-container/20 to-transparent blur-3xl rounded-full -translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-margin text-center relative">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-md shadow-card">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            Clinical Knowledge & Patient Guidance
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-on-surface tracking-tight mb-space-md">
            Frequently Asked Questions
          </h1>
          <p className="text-body-lg text-secondary mb-space-lg max-w-2xl mx-auto">
            Evidence-based answers reviewed by Dr. Sharma. Search or browse by category.
          </p>

          {/* Search bar */}
          <div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-full shadow-card flex items-center px-space-md py-1.5 gap-space-sm">
            <span className="material-symbols-outlined text-primary text-[22px]">search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search questions, symptoms, medications, procedures..."
              className="flex-1 bg-transparent text-on-surface text-body-md placeholder:text-outline focus:outline-none py-2"
            />
            {query && (
              <button onClick={() => setQuery("")} className="text-outline hover:text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="bg-surface border-b border-outline-variant sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-margin py-space-xs overflow-x-auto no-scrollbar">
          <div className="flex gap-space-xs min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-space-md py-1.5 rounded-full text-label-md font-display font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? "bg-inverse-surface text-inverse-on-surface shadow-sm"
                    : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ list */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-4xl mx-auto px-margin">
          <div className="flex items-center justify-between mb-space-md">
            <span className="text-body-sm text-on-surface-variant font-display font-semibold">
              {filtered.length} {filtered.length === 1 ? "question" : "questions"} found
            </span>
            <div className="flex gap-space-xs">
              <button onClick={expandAll} className="text-primary text-label-sm font-display font-semibold hover:underline">
                Expand All
              </button>
              <span className="text-outline">•</span>
              <button onClick={collapseAll} className="text-primary text-label-sm font-display font-semibold hover:underline">
                Collapse All
              </button>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-space-xl flex flex-col items-center gap-space-md bg-surface-container-lowest rounded-xl shadow-card">
              <span className="material-symbols-outlined text-[48px] text-outline">search_off</span>
              <p className="text-title-md font-display font-bold text-on-surface">No results for &ldquo;{query}&rdquo;</p>
              <p className="text-body-md text-on-surface-variant">Try a broader search term, or browse by category above.</p>
              <button onClick={() => { setQuery(""); setActiveCategory("All"); }} className="text-primary text-label-md font-display font-semibold hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-space-sm">
              {filtered.map((faq, idx) => (
                <div key={idx} className="bg-surface-container-lowest rounded-lg shadow-card overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-space-md text-left gap-space-md"
                    aria-expanded={openFaqs.has(idx)}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-label-sm font-display font-semibold text-primary uppercase tracking-wider">{faq.category}</span>
                      <span className="text-label-lg font-display font-bold text-on-surface">{faq.q}</span>
                    </div>
                    <span className={`material-symbols-outlined text-secondary transition-transform duration-200 shrink-0 ${openFaqs.has(idx) ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {openFaqs.has(idx) && (
                    <div className="px-space-md pb-space-md pt-0 border-t border-surface-container">
                      <p className="text-body-md text-secondary leading-relaxed pt-space-sm">{faq.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
