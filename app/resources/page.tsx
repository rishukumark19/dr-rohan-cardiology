import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = {
  title: "Patient Resources & Clinical Guides",
  description: `Evidence-based cardiovascular health guides authored by ${doctor.name}. Understand ECGs, angioplasty, prevention, and post-procedure care.`,
  alternates: { canonical: "/resources" },
};

const articles = [
  { category: "Diagnostic Guidance", icon: "ecg_heart", color: "text-primary bg-primary-container/15", title: "Understanding Your ECG & Echo: What Those Numbers & Waves Really Mean", desc: "A demystifying look at electrocardiograms and 2D-echocardiography reports, explaining ejection fraction and rhythm without alarming medical jargon.", time: "5 min read", date: "Oct 18, 2024" },
  { category: "Symptom Triage", icon: "warning", color: "text-error bg-error-container/40", title: "When Should You See a Specialist? Red Flags vs. Routine Discomfort", desc: "From unexplained fatigue to subtle exertion breathlessness: how to distinguish everyday stress from signs that warrant prompt cardiac evaluation.", time: "4 min read", date: "Oct 12, 2024" },
  { category: "Procedures & Stents", icon: "microbiology", color: "text-on-primary-fixed-variant bg-primary-fixed", title: "Trans-Radial Angioplasty: Why Wrist-Entry Changes the Recovery Journey", desc: "Why entering through the radial artery in the wrist allows patients to walk within 3 hours and facilitates safe same-day discharge.", time: "7 min read", date: "Sep 29, 2024" },
  { category: "Medications & Safety", icon: "medication", color: "text-on-secondary-fixed bg-secondary-fixed", title: "Questions Every Patient Should Ask Before Starting Blood Thinners or Statins", desc: "Key questions regarding drug interactions, dental procedure precautions, dietary considerations, and blood pressure monitoring routines.", time: "5 min read", date: "Sep 15, 2024" },
  { category: "Preventive Care", icon: "monitor_heart", color: "text-on-tertiary-container bg-tertiary-container/20", title: "Preventive Calcium Scoring: Evaluating Plaque Before Symptoms Appear", desc: "How low-dose CT coronary calcium scans help asymptomatic individuals in their 40s and 50s take proactive, lifesaving preventive steps.", time: "6 min read", date: "Aug 30, 2024" },
  { category: "Family & Caregiving", icon: "volunteer_activism", color: "text-on-surface-variant bg-surface-container-highest", title: "Caregiver Guide: Supporting a Family Member Post-Angioplasty or Pacemaker", desc: "Practical, compassionate recommendations for families on diet adjustments, walking regimens, wound care, and when to call the clinic desk.", time: "8 min read", date: "Aug 14, 2024" },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">
      <section className="relative overflow-hidden bg-surface py-space-xl">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-primary-container/20 to-transparent blur-3xl rounded-full" />
        </div>
        <div className="max-w-7xl mx-auto px-margin relative">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-md shadow-card">
            <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
            Clinical Knowledge & Patient Guidance • Evidence-Based
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-on-surface tracking-tight mb-space-md max-w-3xl">
            Empowering You With <span className="text-primary-container">Clarity</span>, Care & Evidence
          </h1>
          <p className="text-body-lg text-secondary max-w-2xl leading-relaxed">
            Unhurried, clinician-curated guides to help patients understand cardiovascular health, procedure preparation, and proactive lifestyle medicine.
          </p>
        </div>
      </section>

      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-sm mb-space-lg">
            <div>
              <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Comprehensive Repository</div>
              <h2 className="text-headline-md font-display font-bold text-on-surface tracking-tight">Clinician-Authored Educational Guides</h2>
            </div>
            <span className="text-label-sm text-secondary font-display font-semibold">Displaying {articles.length} of 28 Verified Papers</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
            {articles.map((article) => (
              <article key={article.title} className="group flex flex-col justify-between bg-surface-container-lowest rounded-lg p-space-lg shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
                <div>
                  <div className="flex items-center justify-between mb-space-sm">
                    <span className={`text-label-sm font-display font-semibold px-space-sm py-1 rounded-full uppercase tracking-wider ${article.color}`}>{article.category}</span>
                    <span className={`material-symbols-outlined text-outline group-hover:text-primary transition-colors ${article.icon === "warning" ? "group-hover:text-error" : ""}`}>{article.icon}</span>
                  </div>
                  <h3 className="text-title-md font-display font-bold text-on-surface mb-space-xs group-hover:text-primary transition-colors">{article.title}</h3>
                  <p className="text-body-md text-secondary leading-relaxed mb-space-md">{article.desc}</p>
                </div>
                <div className="pt-space-sm border-t border-surface-container">
                  <div className="flex items-center justify-between text-label-sm text-outline">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-body-sm">schedule</span>{article.time}</span>
                    <span className="text-secondary font-display font-semibold">{article.date}</span>
                  </div>
                  <div className="mt-2 text-primary text-label-sm font-display font-semibold flex items-center gap-1 group-hover:underline">
                    Reviewed by {doctor.shortName} <span className="material-symbols-outlined text-label-sm">arrow_forward</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Download handouts */}
          <div className="mt-space-xl">
            <div className="mb-space-lg">
              <div className="text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">download_done</span>Directly Printable Triage Sheets</div>
              <h2 className="text-headline-md font-display font-bold text-on-surface">Patient Care Trackers & Quick References</h2>
              <p className="text-body-md text-secondary mt-1">Designed to print on standard A4 or save directly to your phone.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
              {[
                { icon: "table_chart", color: "bg-primary-container/20 text-primary", label: "01", title: "First Visit Medication Log Sheet", desc: "Structured layout for brand names, generics, dosages.", size: "PDF • 240 KB" },
                { icon: "monitor_heart", color: "bg-tertiary-container/20 text-tertiary", label: "02", title: "Home Blood Pressure & Pulse Daily Tracker", desc: "30-day morning and evening log with warning thresholds.", size: "PDF • 185 KB" },
                { icon: "event_repeat", color: "bg-secondary-container text-on-secondary-container", label: "03", title: "Post-Procedure Recovery 14-Day Timeline", desc: "Daily milestones for walking, diet resumption, and dressing care.", size: "PDF • 310 KB" },
              ].map((d) => (
                <div key={d.title} className="bg-surface-container-lowest rounded-lg p-space-md flex flex-col justify-between shadow-card hover:shadow-card-hover transition-all">
                  <div className="flex items-start gap-space-sm mb-space-md">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${d.color}`}>
                      <span className="material-symbols-outlined text-headline-sm">{d.icon}</span>
                    </div>
                    <div>
                      <span className={`text-label-sm font-display font-semibold uppercase tracking-wide ${d.color.split(" ")[1]}`}>Document {d.label}</span>
                      <h4 className="text-title-md font-display font-bold text-on-surface leading-snug">{d.title}</h4>
                      <p className="text-body-sm text-secondary mt-1">{d.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-space-sm border-t border-surface-container">
                    <span className="text-label-sm text-outline font-display">{d.size}</span>
                    <button className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface transition-colors text-label-md font-display font-semibold">
                      Download <span className="material-symbols-outlined text-body-sm">download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-space-xl bg-surface">
        <div className="max-w-4xl mx-auto px-margin text-center">
          <div className="bg-inverse-surface rounded-xl p-space-xl relative overflow-hidden">
            <div className="absolute -right-20 -bottom-20 w-72 h-72 rounded-full bg-primary-container/20 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-headline-md font-display font-bold text-surface-bright mb-space-md">Have specific clinical questions?</h2>
              <p className="text-body-lg text-secondary-fixed mb-space-xl">Schedule an unhurried consultation with {doctor.shortName}.</p>
              <Link href="/book" className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold hover:opacity-95 transition-all">
                Book Consultation <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
