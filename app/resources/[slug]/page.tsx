import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctor } from "@/config/doctor";

// Static article content — expand to a CMS later
const ARTICLES: Record<string, { title: string; category: string; desc: string; readTime: string; date: string; content: string[] }> = {
  "understanding-ecg-echo": {
    title: "Understanding Your ECG & Echo: What Those Numbers & Waves Really Mean",
    category: "Diagnostic Guidance",
    desc: "A demystifying look at electrocardiograms and 2D-echocardiography reports.",
    readTime: "5 min read",
    date: "Oct 18, 2024",
    content: [
      "When your doctor hands you an ECG printout or an Echocardiogram report, it can feel like reading a foreign language. Terms like 'Ejection Fraction', 'LVH', 'ST changes', and 'LBBB' appear without context, and most OPDs don't have time to explain them. This guide changes that.",
      "**What is an ECG?** An electrocardiogram (ECG or EKG) records the electrical activity of your heart over a short period. It takes about 30 seconds and involves 10 electrodes placed on your chest, wrists, and ankles. The result is a paper printout with 12 'leads' — 12 different views of your heart's electrical behaviour.",
      "Key things your cardiologist looks for on an ECG: Heart rate and rhythm (is it regular? Too fast? Too slow?), P waves (do the upper chambers activate correctly?), QRS complex width (do the lower chambers contract normally?), ST segment (any signs of reduced blood supply to the heart muscle?), and QT interval (are you at risk for dangerous rhythm problems?).",
      "**What is Ejection Fraction (EF%)?** On your Echo report, the most important number is your Ejection Fraction (EF) — typically measured as a percentage. EF tells us how much blood the left ventricle (the main pumping chamber) squeezes out with each beat. Normal EF is 55–70%. Below 40% is considered 'reduced EF' or heart failure with reduced ejection fraction (HFrEF). 40–54% is 'mildly reduced'. Above 70% can sometimes indicate hypertrophic cardiomyopathy.",
      "**What does 'LVH' mean?** Left Ventricular Hypertrophy (LVH) means the walls of your heart's main pumping chamber have thickened — usually from years of high blood pressure or aortic valve disease. LVH is reversible with good BP control and often improves significantly over 12–24 months of treatment.",
      "**When should you worry?** If your ECG shows new ST depression or elevation, a new left bundle branch block (LBBB), or a very fast irregular rhythm — these warrant prompt attention. However, many 'abnormalities' on an ECG are incidental findings that your cardiologist will contextualise for your specific clinical situation.",
      `If you have questions about your ECG or Echo report, ${doctor.shortName} conducts dedicated report-review sessions both in-clinic and via Video OPD. You can share your reports securely with Sister ${doctor.coordinator.name} in advance and ask your cardiologist directly in the consultation.`,
    ],
  },
  "when-to-see-specialist": {
    title: "When Should You See a Specialist? Red Flags vs. Routine Discomfort",
    category: "Symptom Triage",
    desc: "How to distinguish everyday stress from signs that warrant prompt cardiac evaluation.",
    readTime: "4 min read",
    date: "Oct 12, 2024",
    content: [
      "Not every chest sensation is a heart attack. And not every 'nothing to worry about' should be dismissed. This guide helps you triage your symptoms the way a cardiologist would.",
      "**Go to Emergency immediately** (call 102/108) if you experience: Crushing, squeezing, or heavy pressure in the centre or left of your chest lasting more than 5 minutes. Chest pain spreading to the left arm, jaw, or upper back. Sudden severe breathlessness at rest. Loss of consciousness or near-fainting with palpitations. Cold sweating combined with chest discomfort. These symptoms, especially if new or severe, represent a potential cardiac emergency and should not wait for an OPD appointment.",
      "**Book a specialist appointment within 1–2 days** if you have: Exertional chest discomfort that appears only during walking or climbing stairs and goes away with rest. Palpitations that last several minutes and occur repeatedly. Unexplained fatigue that limits your usual activity level. Swelling of both feet and ankles that is new or worsening. Breathlessness when lying flat that forces you to use extra pillows at night.",
      "**Schedule a routine consultation** (within 2 weeks) for: High blood pressure readings on home monitoring (>140/90 consistently). A family history of heart attack before age 55 in first-degree relatives. Diabetes with no recent cardiac risk assessment. High cholesterol detected on routine blood tests. Incidental findings on a health check ECG that your physician wants reviewed.",
      "**What doesn't usually need urgent attention**: Brief episodes of chest wall pain that are sharp, localised, and worsen when you press on the rib. Occasional 'skipped beats' in otherwise healthy young individuals with no other symptoms. Anxiety-related palpitations that settle with calm breathing.",
      "When in doubt, always err on the side of getting checked. The cost of a consultation is infinitely less than the cost of a missed diagnosis.",
    ],
  },
  "trans-radial-angioplasty": {
    title: "Trans-Radial Angioplasty: Why Wrist-Entry Changes the Recovery Journey",
    category: "Procedures & Stents",
    desc: "Why entering through the radial artery in the wrist allows patients to walk within 3 hours.",
    readTime: "7 min read",
    date: "Sep 29, 2024",
    content: [
      "For decades, coronary angioplasty — the procedure that reopens blocked heart arteries — was performed by accessing the femoral artery in the groin. Patients spent 12–24 hours lying flat, unable to move, with a large bandage pressed against their inner thigh. Recovery was uncomfortable, and the risk of bleeding was significant.",
      "Trans-radial angioplasty (TRA) changes all of this. By accessing the heart through the radial artery in the wrist — a vessel the size of your index finger — interventional cardiologists can perform the same complex coronary procedures with dramatically better patient outcomes.",
      "**How does it work?** A small sheath (like a thin straw) is placed in the radial artery at the wrist under local anaesthesia. Thin, flexible wires and catheters are advanced through this sheath, past the elbow, through the shoulder, and into the coronary arteries of the heart — all under X-ray guidance. The cardiologist can then open blocked arteries, place stents, and restore blood flow.",
      "**Why is the wrist approach better?** Immediate mobilisation: You can sit up and walk to the bathroom within 2–3 hours of the procedure, compared to 12–24 hours of bed rest with the groin approach. Lower bleeding risk: The radial artery can be compressed easily by a simple wristband, whereas the femoral artery requires sustained manual or mechanical pressure and carries a much higher risk of haematoma. Same-day or next-day discharge: Most trans-radial angioplasty patients in our practice are discharged within 24 hours. Lower infection risk: The wrist site is easier to keep clean and sterile.",
      "**Is it suitable for everyone?** Trans-radial access is possible for the majority of patients. In some cases — very small radial arteries, prior radial artery use, or complex multi-vessel disease requiring large-bore equipment — the femoral route may still be preferred. Your interventional cardiologist will assess this before the procedure.",
      `Dr. Sharma has performed over 2,000 trans-radial angioplasty procedures. If you or a family member has been advised stenting or angiography, a pre-procedure consultation is available at the GK-1 Clinic or via Video OPD.`,
    ],
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.desc,
    alternates: { canonical: `/resources/${slug}` },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    author: { "@type": "Person", name: doctor.name },
    datePublished: article.date,
    description: article.desc,
    publisher: { "@type": "Organization", name: `${doctor.name} Practice` },
  };

  return (
    <div className="min-h-screen bg-surface pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Breadcrumb */}
      <div className="bg-surface-container-low border-b border-outline-variant">
        <div className="max-w-3xl mx-auto px-margin py-space-sm">
          <nav className="flex items-center gap-space-xs text-label-sm text-on-surface-variant font-display">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link href="/resources" className="hover:text-primary transition-colors">Resources</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface font-semibold truncate max-w-[200px]">{article.category}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-margin py-space-xl">
        {/* Category + meta */}
        <div className="flex items-center gap-space-xs mb-space-md">
          <span className="text-label-sm font-display font-bold px-space-md py-1 rounded-full bg-primary-fixed text-on-primary-fixed">{article.category}</span>
          <span className="text-label-sm text-outline font-display">·</span>
          <span className="text-label-sm text-outline font-display">{article.readTime}</span>
          <span className="text-label-sm text-outline font-display">·</span>
          <span className="text-label-sm text-outline font-display">{article.date}</span>
        </div>

        {/* Title */}
        <h1 className="text-headline-lg-mobile md:text-headline-md font-display font-bold text-on-surface tracking-tight mb-space-lg">
          {article.title}
        </h1>

        {/* Author */}
        <div className="flex items-center gap-space-md mb-space-xl pb-space-md border-b border-outline-variant">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px] text-primary">person</span>
          </div>
          <div>
            <div className="text-label-md font-display font-bold text-on-surface">Reviewed by {doctor.name}</div>
            <div className="text-body-sm text-on-surface-variant">{doctor.title} · {doctor.qualifications.split("•")[0].trim()}</div>
          </div>
        </div>

        {/* Article content */}
        <div className="flex flex-col gap-space-lg mb-space-xl">
          {article.content.map((para, i) => {
            if (para.startsWith("**") && para.includes("**")) {
              // Heading paragraph
              const headingEnd = para.indexOf("**", 2);
              const heading = para.slice(2, headingEnd);
              const rest = para.slice(headingEnd + 2);
              return (
                <div key={i}>
                  <h2 className="text-headline-sm font-display font-bold text-on-surface mb-space-xs">{heading}</h2>
                  {rest && <p className="text-body-lg text-secondary leading-relaxed">{rest}</p>}
                </div>
              );
            }
            return <p key={i} className="text-body-lg text-secondary leading-relaxed">{para}</p>;
          })}
        </div>

        {/* Related articles */}
        <div className="border-t border-outline-variant pt-space-xl mb-space-xl">
          <h2 className="text-headline-sm font-display font-bold text-on-surface mb-space-md">Related Guides</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            {Object.entries(ARTICLES)
              .filter(([s]) => s !== slug)
              .slice(0, 2)
              .map(([s, a]) => (
                <Link key={s} href={`/resources/${s}`} className="group bg-surface-container-low rounded-lg p-space-md hover:bg-surface-container transition-all">
                  <span className="text-label-sm font-display font-bold text-primary block mb-1">{a.category}</span>
                  <span className="text-label-md font-display font-semibold text-on-surface group-hover:text-primary transition-colors">{a.title}</span>
                  <span className="text-body-sm text-outline block mt-1">{a.readTime}</span>
                </Link>
              ))}
          </div>
        </div>

        {/* Book CTA */}
        <div className="bg-inverse-surface rounded-xl p-space-xl text-center relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-primary-container/20 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-headline-sm font-display font-bold text-surface-bright mb-space-sm">Have questions about your heart health?</h2>
            <p className="text-body-md text-secondary-fixed mb-space-lg">Schedule an in-depth consultation with {doctor.shortName}.</p>
            <Link href="/book" className="inline-flex items-center gap-space-xs px-space-xl py-[14px] rounded-full bg-primary-container text-on-primary-container text-label-lg font-display font-bold hover:opacity-90 transition-all">
              Book Consultation <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
