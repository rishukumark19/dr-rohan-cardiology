import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = {
  title: "Pre-Visit Preparation Guide",
  description: `Everything you need to know before consulting ${doctor.name}. What to bring, what to wear, what to expect — and key questions to ask your cardiologist.`,
  alternates: { canonical: "/preparation" },
};

export default function PreparationPage() {
  const sections = [
    {
      icon: "folder_open",
      title: "Documents & Reports to Carry",
      color: "bg-primary-fixed text-on-primary-fixed",
      items: [
        "All prior ECG print strips (paper tracings, not just photos)",
        "Echocardiogram (2D-Echo) reports with EF% reading",
        "Angiogram CD/DVD or digital images if available",
        "Prior operative notes if you've had cardiac surgery or stenting",
        "Recent blood panel results (lipid profile, HbA1c, creatinine, TSH)",
        "Current medication blister strips — not just the prescription paper",
        "Your Aadhaar card or photo ID for registration",
        "Insurance card / TPA authorization letter if applicable",
      ],
    },
    {
      icon: "medication",
      title: "Medication Information to Have Ready",
      color: "bg-secondary-container text-on-secondary-container",
      items: [
        "List of ALL medications including over-the-counter and supplements",
        "Exact dosage and frequency for each medication",
        "Any medications you've stopped recently and the reason why",
        "Any known allergies — drug or food — with specific reaction details",
        "Whether you are taking blood thinners (aspirin, clopidogrel, warfarin)",
        "Cholesterol medications (statin name and dose)",
        "Diabetic medications or insulin if applicable",
      ],
    },
    {
      icon: "checkroom",
      title: "What to Wear",
      color: "bg-tertiary-fixed text-on-tertiary-fixed",
      items: [
        "Loose, comfortable clothing — ideally a shirt or top with accessible sleeves",
        "Avoid tight full-sleeve shirts — we need quick access to both forearms for BP cuffs",
        "12-lead ECG requires access to chest and ankles — avoid complex undergarments",
        "Comfortable footwear if a treadmill test (TMT) is likely",
        "Avoid heavy jewellery or metal items near the chest area",
      ],
    },
    {
      icon: "quiz",
      title: "Questions to Prepare for Dr. Sharma",
      color: "bg-surface-container-high text-on-surface",
      items: [
        "What exactly does my ECG / Echo result mean in plain language?",
        "Do I actually need an angiogram or can we manage with medication?",
        "What are the specific risks and benefits of the procedure being recommended?",
        "Which diet changes will have the maximum impact for my condition?",
        "Should I be monitoring my blood pressure at home? What numbers should concern me?",
        "What are the warning signs that I should come to emergency vs. book an OPD?",
        "How long will I need to continue blood thinners after stenting?",
        "Is there a family screening I should arrange for my children?",
      ],
    },
    {
      icon: "directions_run",
      title: "Fasting & Physical Preparation",
      color: "bg-primary-container/20 text-on-primary-container",
      items: [
        "For a routine consultation: No fasting required. Eat and drink normally.",
        "For fasting blood tests (if ordered): 10–12 hours of fasting, water is allowed.",
        "For Treadmill Test (TMT): Light meal 3 hours before, avoid heavy exercise that morning.",
        "For echocardiogram: No special preparation needed.",
        "If you are a diabetic on insulin: Take your normal dose, eat before coming.",
        "Do not skip your morning cardiac medications on the day of the visit.",
      ],
    },
  ];

  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">
      {/* Hero */}
      <section className="bg-surface py-space-xl">
        <div className="max-w-5xl mx-auto px-margin">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container text-primary text-label-sm font-display font-semibold uppercase tracking-wider mb-space-md shadow-card">
            <span className="material-symbols-outlined text-[16px]">medical_information</span>
            Pre-Consultation Checklist
          </div>
          <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-on-surface tracking-tight mb-space-sm">
            Preparing for Your Visit with {doctor.shortName}
          </h1>
          <p className="text-body-lg text-secondary max-w-2xl leading-relaxed mb-space-lg">
            An unhurried, clinically precise consultation begins before you walk in. Here is everything you need to be fully prepared.
          </p>

          {/* Quick summary pills */}
          <div className="flex flex-wrap gap-space-xs">
            {["Carry prior ECGs & Echo reports", "Bring actual blister strips", "Wear loose sleeves", "No fasting for routine visits", "Write your questions down"].map((tip) => (
              <span key={tip} className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-full bg-surface-container text-on-surface-variant text-label-sm font-display font-semibold shadow-card">
                <span className="material-symbols-outlined text-[12px] text-primary">check_circle</span>
                {tip}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Preparation sections */}
      <section className="py-space-xl bg-surface-container-low">
        <div className="max-w-5xl mx-auto px-margin flex flex-col gap-space-lg">
          {sections.map((section) => (
            <div key={section.title} className="bg-surface-container-lowest rounded-xl shadow-card p-space-lg">
              <div className="flex items-center gap-space-md mb-space-md">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${section.color}`}>
                  <span className="material-symbols-outlined text-[24px]">{section.icon}</span>
                </div>
                <h2 className="text-headline-sm font-display font-bold text-on-surface">{section.title}</h2>
              </div>
              <ul className="space-y-space-sm">
                {section.items.map((item) => (
                  <li key={item} className="flex items-start gap-space-sm text-body-md text-on-surface">
                    <span className="material-symbols-outlined text-[18px] text-primary mt-0.5 shrink-0 material-symbols-filled">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency reminder + book CTA */}
      <section className="py-space-xl bg-surface">
        <div className="max-w-4xl mx-auto px-margin flex flex-col gap-space-md">
          <div className="bg-error-container/60 rounded-xl p-space-lg flex flex-col sm:flex-row items-center gap-space-md">
            <div className="w-12 h-12 rounded-full bg-error flex items-center justify-center text-on-error shrink-0">
              <span className="material-symbols-outlined text-[24px] material-symbols-filled">emergency</span>
            </div>
            <div>
              <div className="text-label-md font-display font-bold text-error uppercase tracking-wider">If You Are in Active Distress</div>
              <p className="text-body-sm text-on-error-container">{doctor.emergency.message}</p>
            </div>
            <a href="tel:102" className="shrink-0 px-space-lg py-2.5 rounded-full bg-error text-on-error text-label-md font-display font-bold hover:opacity-90 transition-all">
              Call 102
            </a>
          </div>
          <div className="text-center">
            <Link href="/book" className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold shadow-glow-cyan hover:opacity-95 transition-all">
              Book My Consultation
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
