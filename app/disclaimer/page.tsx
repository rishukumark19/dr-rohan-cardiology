import type { Metadata } from "next";
import { doctor } from "@/config/doctor";

export const metadata: Metadata = { title: "Medical Disclaimer" };

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-surface py-space-xl pb-28 md:pb-space-xl">
      <div className="max-w-3xl mx-auto px-margin">
        <h1 className="text-headline-lg-mobile md:text-headline-md font-display font-bold text-on-surface mb-space-lg">Medical Disclaimer</h1>
        <div className="bg-error-container/40 rounded-lg p-space-md mb-space-lg flex items-start gap-space-sm">
          <span className="material-symbols-outlined text-error text-[24px] shrink-0 mt-0.5 material-symbols-filled">warning</span>
          <p className="text-body-sm text-on-error-container font-display font-semibold">
            This website provides general health information for educational purposes only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical decisions.
          </p>
        </div>
        <div className="flex flex-col gap-space-md text-body-md text-secondary leading-relaxed">
          <p>The information contained on this website is provided by {doctor.name}, {doctor.title}, for general informational and educational purposes only. It is not intended as, and should not be construed as, medical advice.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">No Doctor-Patient Relationship</h2>
          <p>Use of this website or communication through it (including WhatsApp or contact forms) does not establish a doctor-patient relationship. A formal clinical consultation is required before any diagnosis, treatment recommendation, or prescription is valid.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">Emergency Situations</h2>
          <p>If you or someone you know is experiencing a medical emergency — including severe chest pain, breathlessness, loss of consciousness, or stroke symptoms — call <strong className="text-on-surface">102 / 108</strong> immediately. Do not use this website or WhatsApp for emergencies.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">Accuracy of Information</h2>
          <p>While every effort is made to ensure the accuracy of clinical content on this website, medical knowledge evolves rapidly. Content on this site should not replace guidance from your treating physician. Always verify medication dosages and treatment protocols with your own doctor.</p>
          <h2 className="text-title-md font-display font-bold text-on-surface">NMC Compliance</h2>
          <p>This practice operates under the guidelines of the National Medical Commission (NMC) of India. All digital prescriptions issued are NMC-compliant. Advertisements and patient testimonials comply with MCI/NMC ethical guidelines.</p>
          <p className="text-label-sm text-outline">NMC Registration: {doctor.nmc} | Last reviewed: {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
