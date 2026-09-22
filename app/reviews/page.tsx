import type { Metadata } from "next";
import Link from "next/link";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = {
  title: "Patient Reviews & Stories",
  description: `Real patient experiences with ${doctor.name}. Read ${doctor.reviewCount} verified reviews from patients who've undergone angioplasty, heart care, and consultations.`,
  alternates: { canonical: "/reviews" },
};

const reviews = [
  { initials: "VG", name: "Vikram Grover", age: 58, procedure: "Trans-Radial Angioplasty", clinic: "Max Saket", rating: 5, date: "Oct 2024", quote: "Dr. Rohan did my stenting through the wrist. I was walking just 3 hours later and discharged the next morning. His warmth took away 90% of our family's anxiety. He called us himself to check on my post-procedure recovery." },
  { initials: "AS", name: "Ananya Sengupta", age: 51, procedure: "Preventive Calcium Scoring", clinic: "GK-1 Clinic", rating: 5, date: "Sep 2024", quote: "Never felt rushed. Dr. Sharma sat with us for 25 minutes explaining every metric in Hindi and English. He actually removed two redundant medications prescribed elsewhere — that took courage and clinical confidence." },
  { initials: "RK", name: "Rajesh Khanna", age: 54, procedure: "Post-stent Follow-up", clinic: "Video OPD", rating: 5, date: "Sep 2024", quote: "Booked via WhatsApp, got confirmation in 8 minutes. The video call was crystal clear. Digital prescription arrived on WhatsApp within 10 minutes. Sister Neha is exceptional — always responsive and caring." },
  { initials: "PD", name: "Priya Dhingra", age: 44, procedure: "Resistant Hypertension", clinic: "GK-1 Clinic", rating: 5, date: "Aug 2024", quote: "After 3 years of uncontrolled blood pressure with other doctors, Dr. Sharma identified a secondary cause in one visit. My BP is now perfectly controlled. I only wish I had come earlier." },
  { initials: "SM", name: "Suresh Malhotra", age: 63, procedure: "Pacemaker Implant", clinic: "Max Saket", rating: 5, date: "Jul 2024", quote: "Complex dual-chamber device insertion done under local anaesthesia. Dr. Sharma explained the entire procedure to my family before and after. We are grateful for his steady hands and human approach." },
  { initials: "NB", name: "Nisha Bhat", age: 47, procedure: "Cardiac Risk Assessment", clinic: "Video OPD", rating: 5, date: "Jul 2024", quote: "I live in Bengaluru and reached out for a second opinion on my father's angiogram report. Video consultation was thorough, Dr. Sharma asked for all historical reports beforehand. He found a stent overlap issue that nobody else had flagged." },
];

export default function ReviewsPage() {
  return (
    <div className="flex flex-col w-full pb-24 md:pb-0">
      <section className="bg-inverse-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-margin">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div>
              <div className="text-primary-fixed-dim text-label-sm font-display font-semibold uppercase tracking-wider mb-1">Real Patient Experiences</div>
              <h1 className="text-headline-lg-mobile md:text-headline-lg font-display font-bold text-surface-bright tracking-tight">Patient Stories & Reviews</h1>
              <p className="text-body-lg text-secondary-fixed mt-space-sm max-w-2xl">
                {doctor.reviewCount} verified reviews across {doctor.clinics.length} clinics. Every review is real.
              </p>
            </div>
            <div className="bg-surface-container-lowest/10 backdrop-blur-sm rounded-xl p-space-md text-center">
              <div className="flex items-center justify-center gap-space-xs mb-1">
                {[1,2,3,4,5].map((s) => (
                  <span key={s} className="material-symbols-outlined text-amber-400 text-[24px] material-symbols-filled">star</span>
                ))}
              </div>
              <div className="text-display-hero-mobile font-display font-extrabold text-surface-bright">{doctor.rating}</div>
              <div className="text-label-sm text-secondary-fixed font-display font-semibold">{doctor.reviewCount} Reviews</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {reviews.map((r) => (
              <article key={r.name} className="bg-surface-container-lowest/10 backdrop-blur-sm rounded-xl p-space-lg flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-space-md">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-primary-container/30 flex items-center justify-center text-primary-fixed font-display font-bold text-label-lg">
                        {r.initials}
                      </div>
                      <div>
                        <div className="text-label-md font-display font-bold text-surface-bright">{r.name}, {r.age}</div>
                        <div className="text-body-sm text-secondary-fixed">{r.procedure}</div>
                        <div className="text-label-sm text-primary-fixed-dim">{r.clinic}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[14px] text-amber-400 material-symbols-filled">star</span>
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

      <section className="py-space-xl bg-surface-container-low">
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
